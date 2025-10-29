"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importMovieFromOmdb = exports.deleteMovie = exports.updateMovie = exports.createMovie = exports.getMovie = exports.listMovies = void 0;
const movie_schema_1 = require("../schemas/movie.schema");
const async_handler_1 = require("../utils/async-handler");
const validate_1 = require("../middleware/validate");
const movie_service_1 = require("../services/movie.service");
exports.listMovies = [
    (0, validate_1.validateQuery)(movie_schema_1.listMoviesQuerySchema),
    (0, async_handler_1.asyncHandler)(async (req, res) => {
        const query = movie_schema_1.listMoviesQuerySchema.parse(req.query);
        const result = await movie_service_1.movieService.list(req.auth, query);
        res.json(result);
    }),
];
exports.getMovie = [
    (0, async_handler_1.asyncHandler)(async (req, res) => {
        const params = movie_schema_1.deleteMovieParamsSchema.parse(req.params);
        const movie = await movie_service_1.movieService.get(req.auth, params.id);
        res.json(movie);
    }),
];
exports.createMovie = [
    (0, validate_1.validateBody)(movie_schema_1.createMovieSchema),
    (0, async_handler_1.asyncHandler)(async (req, res) => {
        const body = movie_schema_1.createMovieSchema.parse(req.body);
        const movie = await movie_service_1.movieService.create(req.auth, body);
        res.status(201).json(movie);
    }),
];
exports.updateMovie = [
    (0, validate_1.validateBody)(movie_schema_1.updateMovieSchema),
    (0, async_handler_1.asyncHandler)(async (req, res) => {
        const params = movie_schema_1.deleteMovieParamsSchema.parse(req.params);
        const body = movie_schema_1.updateMovieSchema.parse(req.body);
        const movie = await movie_service_1.movieService.update(req.auth, params.id, body);
        res.json(movie);
    }),
];
exports.deleteMovie = [
    (0, async_handler_1.asyncHandler)(async (req, res) => {
        const params = movie_schema_1.deleteMovieParamsSchema.parse(req.params);
        await movie_service_1.movieService.delete(req.auth, params.id);
        res.status(204).send();
    }),
];
exports.importMovieFromOmdb = [
    (0, validate_1.validateBody)(movie_schema_1.importFromOmdbSchema),
    (0, async_handler_1.asyncHandler)(async (req, res) => {
        const body = movie_schema_1.importFromOmdbSchema.parse(req.body);
        const movie = await movie_service_1.movieService.importFromOmdb(req.auth, body);
        res.status(201).json(movie);
    }),
];
//# sourceMappingURL=movie.controller.js.map