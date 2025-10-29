import { Router } from 'express';
import { healthRouter } from './health.routes';
import { movieRouter } from './movie.routes';
import { preferenceRouter } from './preference.routes';
import { imagekitRouter } from './imagekit.routes';

export const apiRouter = Router();

apiRouter.use('/health', healthRouter);
apiRouter.use('/movies', movieRouter);
apiRouter.use('/preferences', preferenceRouter);
apiRouter.use('/imagekit', imagekitRouter);
