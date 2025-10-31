"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importFromOmdbSchema = exports.preferenceSchema = exports.omdbSearchQuerySchema = exports.getMovieParamsSchema = exports.deleteMovieParamsSchema = exports.listMoviesQuerySchema = exports.updateMovieSchema = exports.createMovieSchema = void 0;
const zod_1 = require("zod");
const nonEmptyString = zod_1.z.string().min(1, 'Field is required').trim();
const budgetSchema = zod_1.z
    .union([
    zod_1.z.number().nonnegative(),
    zod_1.z.string().regex(/^\d+(?:\.\d{1,2})?$/, 'Budget must be a positive number with up to two decimals'),
])
    .optional()
    .transform((value) => {
    if (value === undefined) {
        return undefined;
    }
    if (typeof value === 'number') {
        return value.toFixed(2);
    }
    return value;
});
const releaseYearSchema = zod_1.z
    .union([zod_1.z.number().int().gte(1888).lte(new Date().getFullYear() + 2), zod_1.z.string().length(4)])
    .optional()
    .transform((value) => {
    if (value === undefined) {
        return undefined;
    }
    return typeof value === 'string' ? Number.parseInt(value, 10) : value;
});
const releaseDateSchema = zod_1.z
    .preprocess((value) => {
    if (value === undefined || value === null || value === '') {
        return undefined;
    }
    if (value instanceof Date) {
        return value.toISOString();
    }
    if (typeof value === 'string') {
        const trimmed = value.trim();
        return trimmed ? trimmed : undefined;
    }
    return value;
}, zod_1.z.string().datetime({ offset: true }).optional())
    .transform((value) => (value ? new Date(value) : undefined));
exports.createMovieSchema = zod_1.z.object({
    title: nonEmptyString,
    director: nonEmptyString,
    budget: budgetSchema,
    location: nonEmptyString,
    duration: zod_1.z.coerce.number().int().positive(),
    releaseYear: releaseYearSchema,
    releaseDate: releaseDateSchema,
    description: zod_1.z.string().trim().max(10_000).optional(),
    posterUrl: zod_1.z.string().url().optional(),
    omdbId: zod_1.z.string().trim().optional(),
});
exports.updateMovieSchema = exports.createMovieSchema.partial();
exports.listMoviesQuerySchema = zod_1.z.object({
    cursor: zod_1.z.string().optional(),
    limit: zod_1.z.coerce.number().int().min(1).max(50).default(20),
    search: zod_1.z.string().trim().optional(),
    sort: zod_1.z.enum(['createdAt', 'title', 'releaseYear']).default('createdAt'),
    order: zod_1.z.enum(['asc', 'desc']).default('desc'),
});
exports.deleteMovieParamsSchema = zod_1.z.object({
    id: zod_1.z.string(),
});
exports.getMovieParamsSchema = exports.deleteMovieParamsSchema;
exports.omdbSearchQuerySchema = zod_1.z.object({
    query: zod_1.z.string().min(1, 'Search query is required'),
    type: zod_1.z.enum(['movie', 'series', 'episode']).optional(),
    year: zod_1.z.string().regex(/^\d{4}$/).optional(),
    page: zod_1.z.coerce.number().int().min(1).max(10).default(1),
});
exports.preferenceSchema = zod_1.z.object({
    theme: zod_1.z.enum(['light', 'dark', 'system', 'sunset', 'lagoon']).default('system'),
    accentColor: zod_1.z
        .string()
        .regex(/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/)
        .optional()
        .nullable(),
});
exports.importFromOmdbSchema = zod_1.z.object({
    omdbId: zod_1.z.string().min(1, 'omdbId is required'),
    overrides: exports.updateMovieSchema.optional(),
});
//# sourceMappingURL=movie.schema.js.map