import { z } from 'zod';

const nonEmptyString = z.string().min(1, 'Field is required').trim();

const budgetSchema = z
  .union([
    z.number().nonnegative(),
    z.string().regex(/^\d+(?:\.\d{1,2})?$/, 'Budget must be a positive number with up to two decimals'),
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

const releaseYearSchema = z
  .union([z.number().int().gte(1888).lte(new Date().getFullYear() + 2), z.string().length(4)])
  .optional()
  .transform((value) => {
    if (value === undefined) {
      return undefined;
    }

    return typeof value === 'string' ? Number.parseInt(value, 10) : value;
  });

const releaseDateSchema = z
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
  }, z.string().datetime({ offset: true }).optional())
  .transform((value) => (value ? new Date(value) : undefined));

export const createMovieSchema = z.object({
  title: nonEmptyString,
  director: nonEmptyString,
  budget: budgetSchema,
  location: nonEmptyString,
  duration: z.coerce.number().int().positive(),
  releaseYear: releaseYearSchema,
  releaseDate: releaseDateSchema,
  description: z.string().trim().max(10_000).optional(),
  posterUrl: z.string().url().optional(),
  omdbId: z.string().trim().optional(),
});

export const updateMovieSchema = createMovieSchema.partial();

export const listMoviesQuerySchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(50).default(20),
  search: z.string().trim().optional(),
  sort: z.enum(['createdAt', 'title', 'releaseYear']).default('createdAt'),
  order: z.enum(['asc', 'desc']).default('desc'),
});

export const deleteMovieParamsSchema = z.object({
  id: z.string(),
});

export const getMovieParamsSchema = deleteMovieParamsSchema;

export const omdbSearchQuerySchema = z.object({
  query: z.string().min(1, 'Search query is required'),
  type: z.enum(['movie', 'series', 'episode']).optional(),
  year: z.string().regex(/^\d{4}$/).optional(),
  page: z.coerce.number().int().min(1).max(10).default(1),
});

export const preferenceSchema = z.object({
  theme: z.enum(['light', 'dark', 'system', 'sunset', 'lagoon']).default('system'),
  accentColor: z
    .string()
    .regex(/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/)
    .optional()
    .nullable(),
});

export const importFromOmdbSchema = z.object({
  omdbId: z.string().min(1, 'omdbId is required'),
  overrides: updateMovieSchema.optional(),
});

export type CreateMovieInput = z.infer<typeof createMovieSchema>;
export type UpdateMovieInput = z.infer<typeof updateMovieSchema>;
export type ListMoviesQuery = z.infer<typeof listMoviesQuerySchema>;
export type OmdbSearchQuery = z.infer<typeof omdbSearchQuerySchema>;
export type PreferenceInput = z.infer<typeof preferenceSchema>;
export type ImportFromOmdbInput = z.infer<typeof importFromOmdbSchema>;
