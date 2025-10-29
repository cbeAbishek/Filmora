import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import { env } from './config/env';
import { apiRouter } from './routes';
import { notFoundHandler } from './middleware/not-found';
import { errorHandler } from './middleware/error-handler';

export const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(compression());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  const allowedOrigins = env.CORS_ORIGIN.length > 0 ? env.CORS_ORIGIN : undefined;
  app.use(
    cors({
      origin: allowedOrigins ?? '*',
      credentials: true,
    }),
  );

  app.use(
    morgan(env.NODE_ENV === 'development' ? 'dev' : 'combined', {
      skip: () => env.NODE_ENV === 'test',
    }),
  );

  app.use('/api', apiRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
