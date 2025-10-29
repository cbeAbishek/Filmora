import { config as loadEnv } from 'dotenv';
import { z } from 'zod';

loadEnv();

const environmentSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PORT: z.string().default('4000'),
    DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
    CLERK_PUBLISHABLE_KEY: z.string().min(1, 'CLERK_PUBLISHABLE_KEY is required'),
    CLERK_SECRET_KEY: z.string().min(1, 'CLERK_SECRET_KEY is required'),
    CLERK_JWT_TEMPLATE_NAME: z.string().optional(),
    OMDB_API_KEY: z.string().min(1, 'OMDB_API_KEY is required'),
    OMDB_BASE_URL: z
      .string()
      .default('https://www.omdbapi.com')
      .refine((value) => value.startsWith('http'), 'OMDB_BASE_URL must be a valid URL'),
    IMAGEKIT_PUBLIC_KEY: z.string().min(1, 'IMAGEKIT_PUBLIC_KEY is required'),
    IMAGEKIT_PRIVATE_KEY: z.string().min(1, 'IMAGEKIT_PRIVATE_KEY is required'),
    IMAGEKIT_URL_ENDPOINT: z
      .string()
      .refine((value) => value.startsWith('http'), 'IMAGEKIT_URL_ENDPOINT must be a valid URL'),
    CORS_ORIGIN: z
      .string()
      .optional()
      .transform((value) => value?.split(',').map((origin) => origin.trim()).filter(Boolean) ?? []),
    LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  })
  .transform((env) => ({
    ...env,
    PORT: Number(env.PORT),
  }));

const parsed = environmentSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment configuration:', parsed.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables. Please check your .env file.');
}

export const env = parsed.data;
export type AppEnvironment = typeof env;
