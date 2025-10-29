import type { NextFunction, Request, Response } from 'express';
import type { ZodTypeAny } from 'zod';
export declare const validateBody: (schema: ZodTypeAny) => (req: Request, _res: Response, next: NextFunction) => void;
export declare const validateQuery: (schema: ZodTypeAny) => (req: Request, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=validate.d.ts.map