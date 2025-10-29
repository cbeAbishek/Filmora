import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/async-handler';
import { imagekit } from '../config/imagekit';

export const getImagekitAuthParameters = [
  asyncHandler((_req: Request, res: Response) => {
    const params = imagekit.getAuthenticationParameters();
    res.json(params);
  }),
];
