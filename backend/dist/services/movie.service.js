"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieService = void 0;
const http_error_1 = require("../utils/http-error");
const movie_repository_1 = require("../repositories/movie.repository");
const omdb_service_1 = require("./omdb.service");
const ensureOwnership = (movie, userId) => {
    if (!movie || movie.userId !== userId) {
        throw new http_error_1.HttpError(404, 'Movie not found');
    }
    return movie;
};
class MovieService {
    async create(auth, input) {
        if (!auth.userId) {
            throw new http_error_1.HttpError(401, 'Authentication required');
        }
        if (input.omdbId) {
            const existing = await movie_repository_1.movieRepository.findByOmdbId(auth.userId, input.omdbId);
            if (existing) {
                throw new http_error_1.HttpError(409, 'Movie already exists in your library');
            }
        }
        return movie_repository_1.movieRepository.create(auth.userId, input);
    }
    async update(auth, id, input) {
        if (!auth.userId) {
            throw new http_error_1.HttpError(401, 'Authentication required');
        }
        const movie = await movie_repository_1.movieRepository.findById(id);
        ensureOwnership(movie, auth.userId);
        return movie_repository_1.movieRepository.update(id, input);
    }
    async delete(auth, id) {
        if (!auth.userId) {
            throw new http_error_1.HttpError(401, 'Authentication required');
        }
        const movie = await movie_repository_1.movieRepository.findById(id);
        ensureOwnership(movie, auth.userId);
        await movie_repository_1.movieRepository.delete(id);
    }
    async importFromOmdb(auth, input) {
        if (!auth.userId) {
            throw new http_error_1.HttpError(401, 'Authentication required');
        }
        const details = await omdb_service_1.omdbService.getDetailsById(input.omdbId);
        const title = input.overrides?.title ?? details.title;
        const director = input.overrides?.director ?? details.director;
        const location = input.overrides?.location ?? details.location;
        const duration = input.overrides?.duration ?? details.duration;
        if (!title || !director || !location || !duration) {
            throw new http_error_1.HttpError(400, 'OMDb data missing required fields. Provide overrides to continue.');
        }
        const payload = {
            title,
            director,
            location,
            duration,
            budget: input.overrides?.budget ?? details.budget,
            releaseYear: input.overrides?.releaseYear ?? details.releaseYear,
            releaseDate: input.overrides?.releaseDate ?? details.releaseDate,
            description: input.overrides?.description ?? details.description,
            posterUrl: input.overrides?.posterUrl ?? details.posterUrl,
            omdbId: details.omdbId,
        };
        return this.create(auth, payload);
    }
    async get(auth, id) {
        if (!auth.userId) {
            throw new http_error_1.HttpError(401, 'Authentication required');
        }
        const movie = await movie_repository_1.movieRepository.findById(id);
        return ensureOwnership(movie, auth.userId);
    }
    async list(auth, query) {
        if (!auth.userId) {
            throw new http_error_1.HttpError(401, 'Authentication required');
        }
        return movie_repository_1.movieRepository.list(auth.userId, query);
    }
}
exports.movieService = new MovieService();
//# sourceMappingURL=movie.service.js.map