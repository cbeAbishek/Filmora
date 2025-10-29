import type { NextFunction, Request, Response } from 'express';
export type RouteHandler<TRequest extends Request = Request, TResponse = unknown> = (req: TRequest, res: Response<TResponse>, next: NextFunction) => Promise<void> | void;
export declare const asyncHandler: <TRequest extends Request = Request, TResponse = unknown>(handler: RouteHandler<TRequest, TResponse>) => (req: TRequest, res: Response<TResponse>, next: NextFunction) => void;
//# sourceMappingURL=async-handler.d.ts.map