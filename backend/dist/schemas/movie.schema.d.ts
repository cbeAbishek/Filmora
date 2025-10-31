import { z } from 'zod';
export declare const createMovieSchema: z.ZodObject<{
    title: z.ZodString;
    director: z.ZodString;
    budget: z.ZodPipe<z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>>, z.ZodTransform<string | undefined, string | number | undefined>>;
    location: z.ZodString;
    duration: z.ZodCoercedNumber<unknown>;
    releaseYear: z.ZodPipe<z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>>, z.ZodTransform<number | undefined, string | number | undefined>>;
    releaseDate: z.ZodPipe<z.ZodPipe<z.ZodTransform<{} | undefined, unknown>, z.ZodOptional<z.ZodString>>, z.ZodTransform<Date | undefined, string | undefined>>;
    description: z.ZodOptional<z.ZodString>;
    posterUrl: z.ZodOptional<z.ZodString>;
    omdbId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateMovieSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    director: z.ZodOptional<z.ZodString>;
    budget: z.ZodOptional<z.ZodPipe<z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>>, z.ZodTransform<string | undefined, string | number | undefined>>>;
    location: z.ZodOptional<z.ZodString>;
    duration: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    releaseYear: z.ZodOptional<z.ZodPipe<z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>>, z.ZodTransform<number | undefined, string | number | undefined>>>;
    releaseDate: z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodTransform<{} | undefined, unknown>, z.ZodOptional<z.ZodString>>, z.ZodTransform<Date | undefined, string | undefined>>>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    posterUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    omdbId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export declare const listMoviesQuerySchema: z.ZodObject<{
    cursor: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    search: z.ZodOptional<z.ZodString>;
    sort: z.ZodDefault<z.ZodEnum<{
        title: "title";
        releaseYear: "releaseYear";
        createdAt: "createdAt";
    }>>;
    order: z.ZodDefault<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.core.$strip>;
export declare const deleteMovieParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export declare const getMovieParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export declare const omdbSearchQuerySchema: z.ZodObject<{
    query: z.ZodString;
    type: z.ZodOptional<z.ZodEnum<{
        movie: "movie";
        series: "series";
        episode: "episode";
    }>>;
    year: z.ZodOptional<z.ZodString>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export declare const preferenceSchema: z.ZodObject<{
    theme: z.ZodDefault<z.ZodEnum<{
        light: "light";
        dark: "dark";
        system: "system";
        sunset: "sunset";
        lagoon: "lagoon";
    }>>;
    accentColor: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export declare const importFromOmdbSchema: z.ZodObject<{
    omdbId: z.ZodString;
    overrides: z.ZodOptional<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        director: z.ZodOptional<z.ZodString>;
        budget: z.ZodOptional<z.ZodPipe<z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>>, z.ZodTransform<string | undefined, string | number | undefined>>>;
        location: z.ZodOptional<z.ZodString>;
        duration: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        releaseYear: z.ZodOptional<z.ZodPipe<z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>>, z.ZodTransform<number | undefined, string | number | undefined>>>;
        releaseDate: z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodTransform<{} | undefined, unknown>, z.ZodOptional<z.ZodString>>, z.ZodTransform<Date | undefined, string | undefined>>>;
        description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        posterUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        omdbId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type CreateMovieInput = z.infer<typeof createMovieSchema>;
export type UpdateMovieInput = z.infer<typeof updateMovieSchema>;
export type ListMoviesQuery = z.infer<typeof listMoviesQuerySchema>;
export type OmdbSearchQuery = z.infer<typeof omdbSearchQuerySchema>;
export type PreferenceInput = z.infer<typeof preferenceSchema>;
export type ImportFromOmdbInput = z.infer<typeof importFromOmdbSchema>;
//# sourceMappingURL=movie.schema.d.ts.map