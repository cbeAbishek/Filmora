import type { Request, Response } from 'express';
import { omdbSearchQuerySchema } from '../schemas/movie.schema';
import { validateQuery } from '../middleware/validate';
import { asyncHandler } from '../utils/async-handler';
import { omdbService } from '../services/omdb.service';
import { HttpError } from '../utils/http-error';

export const searchOmdb = [
  validateQuery(omdbSearchQuerySchema),
  asyncHandler(async (req: Request, res: Response) => {
    const query = omdbSearchQuerySchema.parse(req.query);
    const result = await omdbService.search(query);
    res.json(result);
  }),
];

export const getOmdbDetails = [
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      throw new HttpError(400, 'OMDb id is required');
    }
    const result = await omdbService.getDetailsById(id);
    res.json(result);
  }),
];
