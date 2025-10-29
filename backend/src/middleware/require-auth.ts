import type { NextFunction, Request, Response } from 'express';
import { clerk } from '../config/clerk';
import { env } from '../config/env';
import { HttpError } from '../utils/http-error';
import type { AuthContext } from '../utils/auth-context';

const BEARER_PREFIX = 'Bearer ';

export const requireAuth = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader?.startsWith(BEARER_PREFIX)) {
    return next(new HttpError(401, 'Authentication required'));
  }

  const token = authorizationHeader.substring(BEARER_PREFIX.length).trim();

  try {
    const verifyOptions: Parameters<typeof clerk.verifyToken>[1] | undefined = env.CLERK_JWT_TEMPLATE_NAME
      ? ({ template: env.CLERK_JWT_TEMPLATE_NAME } as unknown as Parameters<typeof clerk.verifyToken>[1])
      : undefined;

    const verification = await clerk.verifyToken(token, verifyOptions);

    const authContext: AuthContext = {
      userId: verification.sub,
    };

    if (verification.sid) {
      authContext.sessionId = verification.sid;
    }

    if (typeof verification.email === 'string') {
      authContext.email = verification.email;
    }

    if (!authContext.userId) {
      throw new Error('Missing user identifier in token');
    }

    req.auth = authContext;
    next();
  } catch (error) {
    next(new HttpError(401, 'Invalid or expired token', error instanceof Error ? error.message : error));
  }
};
