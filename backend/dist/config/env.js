"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = require("dotenv");
const zod_1 = require("zod");
(0, dotenv_1.config)();
const environmentSchema = zod_1.z
    .object({
    NODE_ENV: zod_1.z.enum(['development', 'test', 'production']).default('development'),
    PORT: zod_1.z.string().default('4000'),
    DATABASE_URL: zod_1.z.string().min(1, 'DATABASE_URL is required'),
    CLERK_PUBLISHABLE_KEY: zod_1.z.string().min(1, 'CLERK_PUBLISHABLE_KEY is required'),
    CLERK_SECRET_KEY: zod_1.z.string().min(1, 'CLERK_SECRET_KEY is required'),
    CLERK_JWT_TEMPLATE_NAME: zod_1.z.string().optional(),
    OMDB_API_KEY: zod_1.z.string().min(1, 'OMDB_API_KEY is required'),
    OMDB_BASE_URL: zod_1.z
        .string()
        .default('https://www.omdbapi.com')
        .refine((value) => value.startsWith('http'), 'OMDB_BASE_URL must be a valid URL'),
    IMAGEKIT_PUBLIC_KEY: zod_1.z.string().min(1, 'IMAGEKIT_PUBLIC_KEY is required'),
    IMAGEKIT_PRIVATE_KEY: zod_1.z.string().min(1, 'IMAGEKIT_PRIVATE_KEY is required'),
    IMAGEKIT_URL_ENDPOINT: zod_1.z
        .string()
        .refine((value) => value.startsWith('http'), 'IMAGEKIT_URL_ENDPOINT must be a valid URL'),
    CORS_ORIGIN: zod_1.z
        .string()
        .optional()
        .transform((value) => value?.split(',').map((origin) => origin.trim()).filter(Boolean) ?? []),
    LOG_LEVEL: zod_1.z.enum(['debug', 'info', 'warn', 'error']).default('info'),
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
exports.env = parsed.data;
//# sourceMappingURL=env.js.map