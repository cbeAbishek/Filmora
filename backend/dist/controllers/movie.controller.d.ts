import type { Request, Response } from 'express';
export declare const listMovies: ((req: Request, _res: Response, next: import("express").NextFunction) => void)[];
export declare const getMovie: ((req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: import("express").NextFunction) => void)[];
export declare const createMovie: ((req: Request, _res: Response, next: import("express").NextFunction) => void)[];
export declare const updateMovie: ((req: Request, _res: Response, next: import("express").NextFunction) => void)[];
export declare const deleteMovie: ((req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: import("express").NextFunction) => void)[];
export declare const importMovieFromOmdb: ((req: Request, _res: Response, next: import("express").NextFunction) => void)[];
//# sourceMappingURL=movie.controller.d.ts.map