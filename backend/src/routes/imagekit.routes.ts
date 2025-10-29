import { Router } from 'express';
import { getImagekitAuthParameters } from '../controllers/imagekit.controller';
import { requireAuth } from '../middleware/require-auth';

export const imagekitRouter = Router();

imagekitRouter.use(requireAuth);
imagekitRouter.get('/auth', getImagekitAuthParameters);
