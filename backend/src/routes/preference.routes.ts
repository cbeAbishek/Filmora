import { Router } from 'express';
import { getPreferences, updatePreferences } from '../controllers/preference.controller';
import { requireAuth } from '../middleware/require-auth';

export const preferenceRouter = Router();

preferenceRouter.use(requireAuth);
preferenceRouter.get('/', getPreferences);
preferenceRouter.put('/', updatePreferences);
