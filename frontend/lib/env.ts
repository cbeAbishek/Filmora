import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1, "Missing Clerk publishable key"),
  NEXT_PUBLIC_API_URL: z.string().url("NEXT_PUBLIC_API_URL must be a valid URL"),
  NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY: z.string().min(1, "Missing ImageKit public key"),
  NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT: z.string().url("NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT must be a valid URL"),
  NEXT_PUBLIC_CLERK_JWT_TEMPLATE: z.string().optional().nullable(),
});

type Env = {
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
  NEXT_PUBLIC_API_URL: string;
  NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY: string;
  NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT: string;
  NEXT_PUBLIC_CLERK_JWT_TEMPLATE?: string;
};

let cachedEnv: Env | null = null;

export function getEnv(): Env {
  if (!cachedEnv) {
    const parsed = envSchema.parse({
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      NEXT_PUBLIC_CLERK_JWT_TEMPLATE: process.env.NEXT_PUBLIC_CLERK_JWT_TEMPLATE,
      NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
      NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
    });

    cachedEnv = {
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: parsed.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      NEXT_PUBLIC_API_URL: parsed.NEXT_PUBLIC_API_URL,
      NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY: parsed.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
      NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT: parsed.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
      ...(parsed.NEXT_PUBLIC_CLERK_JWT_TEMPLATE?.trim()
        ? { NEXT_PUBLIC_CLERK_JWT_TEMPLATE: parsed.NEXT_PUBLIC_CLERK_JWT_TEMPLATE.trim() }
        : {}),
    };
  }

  return cachedEnv;
}
