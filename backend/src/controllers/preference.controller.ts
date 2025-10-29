import type { Request, Response } from 'express';
import { preferenceSchema } from '../schemas/movie.schema';
import { validateBody } from '../middleware/validate';
import { asyncHandler } from '../utils/async-handler';
import { preferenceService } from '../services/preference.service';

export const getPreferences = [
  asyncHandler(async (req: Request, res: Response) => {
    const preferences = await preferenceService.get(req.auth!);
    res.json(preferences);
  }),
];

export const updatePreferences = [
  validateBody(preferenceSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const body = preferenceSchema.parse(req.body);
    const preferences = await preferenceService.upsert(req.auth!, body);
    res.json(preferences);
  }),
];
