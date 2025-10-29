import type { AuthContext } from '../utils/auth-context';

declare global {
  namespace Express {
    interface Request {
      auth?: AuthContext;
    }
  }
}

export {};
