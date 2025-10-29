import type { AuthContext } from '../utils/auth-context';
import { HttpError } from '../utils/http-error';
import {
  type CreateMovieInput,
  type ImportFromOmdbInput,
  type ListMoviesQuery,
  type UpdateMovieInput,
} from '../schemas/movie.schema';
import { movieRepository } from '../repositories/movie.repository';
import { omdbService } from './omdb.service';

type MovieRecord = Awaited<ReturnType<typeof movieRepository.findById>>;

const ensureOwnership = (movie: MovieRecord, userId: string) => {
  if (!movie || movie.userId !== userId) {
    throw new HttpError(404, 'Movie not found');
  }

  return movie;
};

class MovieService {
  async create(auth: AuthContext, input: CreateMovieInput) {
    if (!auth.userId) {
      throw new HttpError(401, 'Authentication required');
    }

    if (input.omdbId) {
      const existing = await movieRepository.findByOmdbId(auth.userId, input.omdbId);
      if (existing) {
        throw new HttpError(409, 'Movie already exists in your library');
      }
    }

    return movieRepository.create(auth.userId, input);
  }

  async update(auth: AuthContext, id: string, input: UpdateMovieInput) {
    if (!auth.userId) {
      throw new HttpError(401, 'Authentication required');
    }

    const movie = await movieRepository.findById(id);
    ensureOwnership(movie, auth.userId);

    return movieRepository.update(id, input);
  }

  async delete(auth: AuthContext, id: string) {
    if (!auth.userId) {
      throw new HttpError(401, 'Authentication required');
    }

    const movie = await movieRepository.findById(id);
    ensureOwnership(movie, auth.userId);

    await movieRepository.delete(id);
  }

  async importFromOmdb(auth: AuthContext, input: ImportFromOmdbInput) {
    if (!auth.userId) {
      throw new HttpError(401, 'Authentication required');
    }

    const details = await omdbService.getDetailsById(input.omdbId);

    const title = input.overrides?.title ?? details.title;
    const director = input.overrides?.director ?? details.director;
    const location = input.overrides?.location ?? details.location;
    const duration = input.overrides?.duration ?? details.duration;

    if (!title || !director || !location || !duration) {
      throw new HttpError(400, 'OMDb data missing required fields. Provide overrides to continue.');
    }

    const payload: CreateMovieInput = {
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

  async get(auth: AuthContext, id: string) {
    if (!auth.userId) {
      throw new HttpError(401, 'Authentication required');
    }

    const movie = await movieRepository.findById(id);
    return ensureOwnership(movie, auth.userId);
  }

  async list(auth: AuthContext, query: ListMoviesQuery) {
    if (!auth.userId) {
      throw new HttpError(401, 'Authentication required');
    }

    return movieRepository.list(auth.userId, query);
  }
}

export const movieService = new MovieService();
