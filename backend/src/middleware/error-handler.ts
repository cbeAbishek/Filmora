import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { env } from '../config/env';
import { HttpError } from '../utils/http-error';

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response => {
  const isDevelopment = env.NODE_ENV === 'development';

  if (error instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation failed',
      issues: error.issues,
    });
  }

  if (error instanceof HttpError) {
    return res.status(error.status).json({
      message: error.message,
      details: error.details,
    });
  }

  const status = 500;
  const message = 'Internal server error';

  if (isDevelopment) {
    console.error('Unhandled error:', error);
  }

  return res.status(status).json({
    message,
    ...(isDevelopment && { stack: error instanceof Error ? error.stack : error }),
  });
};
