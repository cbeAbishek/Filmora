import type { NextFunction, Request, Response } from 'express';

export type RouteHandler<TRequest extends Request = Request, TResponse = unknown> = (
  req: TRequest,
  res: Response<TResponse>,
  next: NextFunction,
) => Promise<void> | void;

export const asyncHandler = <TRequest extends Request = Request, TResponse = unknown>(
  handler: RouteHandler<TRequest, TResponse>,
) => {
  return (req: TRequest, res: Response<TResponse>, next: NextFunction): void => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
};
