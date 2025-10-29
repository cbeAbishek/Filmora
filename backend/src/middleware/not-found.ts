import type { Request, Response } from 'express';

export const notFoundHandler = (req: Request, res: Response): Response => {
  return res.status(404).json({
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
};
