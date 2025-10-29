import type { Request, Response } from 'express';
import {
  createMovieSchema,
  deleteMovieParamsSchema,
  importFromOmdbSchema,
  listMoviesQuerySchema,
  updateMovieSchema,
} from '../schemas/movie.schema';
import { asyncHandler } from '../utils/async-handler';
import { validateBody, validateQuery } from '../middleware/validate';
import { movieService } from '../services/movie.service';

export const listMovies = [
  validateQuery(listMoviesQuerySchema),
  asyncHandler(async (req, res: Response) => {
    const query = listMoviesQuerySchema.parse(req.query);
    const result = await movieService.list(req.auth!, query);
    res.json(result);
  }),
];

export const getMovie = [
  asyncHandler(async (req: Request, res: Response) => {
    const params = deleteMovieParamsSchema.parse(req.params);
    const movie = await movieService.get(req.auth!, params.id);
    res.json(movie);
  }),
];

export const createMovie = [
  validateBody(createMovieSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const body = createMovieSchema.parse(req.body);
    const movie = await movieService.create(req.auth!, body);
    res.status(201).json(movie);
  }),
];

export const updateMovie = [
  validateBody(updateMovieSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const params = deleteMovieParamsSchema.parse(req.params);
    const body = updateMovieSchema.parse(req.body);
    const movie = await movieService.update(req.auth!, params.id, body);
    res.json(movie);
  }),
];

export const deleteMovie = [
  asyncHandler(async (req: Request, res: Response) => {
    const params = deleteMovieParamsSchema.parse(req.params);
    await movieService.delete(req.auth!, params.id);
    res.status(204).send();
  }),
];

export const importMovieFromOmdb = [
  validateBody(importFromOmdbSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const body = importFromOmdbSchema.parse(req.body);
    const movie = await movieService.importFromOmdb(req.auth!, body);
    res.status(201).json(movie);
  }),
];
