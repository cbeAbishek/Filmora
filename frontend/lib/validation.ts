import { z } from "zod";

const budgetRegex = /^\d+(?:\.\d{1,2})?$/;
const year = new Date().getFullYear() + 2;

const normalizeReleaseDate = (value: unknown) => {
  if (typeof value !== "string") return value;

  const trimmed = value.trim();
  if (!trimmed) return null;

  const candidate = trimmed.includes("T") ? trimmed : `${trimmed}T00:00:00Z`;
  const date = new Date(candidate);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toISOString();
};

export const movieSchema = z.object({
  title: z.string().min(1, "Title is required"),
  director: z.string().min(1, "Director is required"),
  budget: z
    .string()
    .optional()
    .nullable()
    .refine((value) => !value || budgetRegex.test(value), {
      message: "Budget must be a positive number with up to two decimals",
    }),
  location: z.string().min(1, "Location is required"),
  duration: z.coerce
    .number()
    .int("Duration must be an integer")
    .positive("Duration must be greater than zero"),
  releaseYear: z
    .number()
    .int()
    .min(1888, "Release year must be valid")
    .max(year, `Release year must be before ${year}`)
    .optional()
    .nullable(),
  releaseDate: z
    .preprocess((value) => {
      if (value === "" || value === null || value === undefined) {
        return null;
      }

      if (value instanceof Date) {
        return value.toISOString();
      }

      const normalized = normalizeReleaseDate(value);
      return typeof normalized === "string" ? normalized : value;
    }, z.string().datetime({ offset: true }).nullable().optional())
    .nullable()
    .optional(),
  description: z.string().max(10_000).optional().nullable(),
  posterUrl: z.string().url("Poster must be a valid URL").optional().nullable(),
  omdbId: z.string().optional().nullable(),
});

export const preferenceSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  accentColor: z
    .string()
    .regex(/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/)
    .optional()
    .nullable(),
});

export type MovieSchema = z.infer<typeof movieSchema>;
export type PreferenceSchema = z.infer<typeof preferenceSchema>;
