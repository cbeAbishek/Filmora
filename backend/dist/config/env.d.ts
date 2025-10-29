export declare const env: {
    PORT: number;
    NODE_ENV: "development" | "test" | "production";
    DATABASE_URL: string;
    CLERK_PUBLISHABLE_KEY: string;
    CLERK_SECRET_KEY: string;
    OMDB_API_KEY: string;
    OMDB_BASE_URL: string;
    IMAGEKIT_PUBLIC_KEY: string;
    IMAGEKIT_PRIVATE_KEY: string;
    IMAGEKIT_URL_ENDPOINT: string;
    CORS_ORIGIN: string[];
    LOG_LEVEL: "error" | "debug" | "info" | "warn";
    CLERK_JWT_TEMPLATE_NAME?: string | undefined;
};
export type AppEnvironment = typeof env;
//# sourceMappingURL=env.d.ts.map