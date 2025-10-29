import { createClerkClient } from '@clerk/clerk-sdk-node';
import { env } from './env';

export const clerk = createClerkClient({
  secretKey: env.CLERK_SECRET_KEY,
});
