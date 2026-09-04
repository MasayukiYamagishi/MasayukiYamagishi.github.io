import { z } from "zod";

const idSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const dateSchema = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])-([0-2]\d|3[01])$/);

export const bookStatusSchema = z.enum(["backlog", "reading", "completed"]);
export const bookBindingSchema = z.enum(["paperback", "hardcover", "other"]);
export const bookFormatSchema = z.enum([
  "bunko",
  "shinsho",
  "comicSmall",
  "comicLarge",
  "shiroku",
  "b6",
  "a5",
  "b5",
  "custom",
]);
export const weightSourceSchema = z.enum([
  "measured",
  "publisher",
  "metadata",
  "estimated",
]);

const sourceUrlSchema = z.url();

const bookVolumeSchema = z
  .object({
    label: z.string().trim().min(1),
    pages: z.number().int().positive(),
    isbn: z.string().trim().min(10).max(20).optional(),
    format: bookFormatSchema.optional(),
    binding: bookBindingSchema.optional(),
    sourceUrl: sourceUrlSchema.optional(),
  })
  .strict();

export const bookSchema = z
  .object({
    id: idSchema,
    title: z.string().trim().min(1),
    titleEn: z.string().trim().min(1).optional(),
    titleEnSourceUrl: sourceUrlSchema.optional(),
    author: z.string().trim().min(1),
    publisher: z.string().trim().min(1).optional(),
    isbn: z.string().trim().min(10).max(20).optional(),
    pages: z.number().int().positive(),
    format: bookFormatSchema,
    widthMm: z.number().positive().optional(),
    heightMm: z.number().positive().optional(),
    binding: bookBindingSchema,
    status: bookStatusSchema,
    category: z.string().trim().min(1).optional(),
    startedAt: dateSchema.optional(),
    completedAt: dateSchema.optional(),
    shelfId: idSchema.optional(),
    actualWeightG: z.number().positive().optional(),
    weightSource: weightSourceSchema,
    sourceUrl: sourceUrlSchema.optional(),
    volumes: z.array(bookVolumeSchema).min(2).optional(),
  })
  .strict()
  .superRefine((book, context) => {
    if (book.format === "custom" && (!book.widthMm || !book.heightMm)) {
      context.addIssue({
        code: "custom",
        path: ["format"],
        message: "custom判型にはwidthMmとheightMmが必要です。",
      });
    }

    if (book.volumes) {
      const totalPages = book.volumes.reduce(
        (total, volume) => total + volume.pages,
        0,
      );

      if (book.pages !== totalPages) {
        context.addIssue({
          code: "custom",
          path: ["pages"],
          message: "複数巻のページ数は各巻の合計と一致する必要があります。",
        });
      }
    }

  });

export const shelfSchema = z
  .object({
    id: idSchema,
    label: z.string().trim().min(1),
    referenceCapacityKg: z.number().positive(),
    capacitySource: z.enum(["manufacturer", "user-assumption"]),
    status: z.enum(["active", "retired"]),
    retiredReason: z.string().trim().min(1).optional(),
  })
  .strict();

export const movieSchema = z
  .object({
    id: idSchema,
    title: z.string().trim().min(1),
    titleEn: z.string().trim().min(1).optional(),
    titleEnSourceUrl: sourceUrlSchema.optional(),
    originalTitle: z.string().trim().min(1).optional(),
    releaseYear: z.number().int().min(1888).max(2100),
    runtimeMinutes: z.number().int().positive(),
    directors: z.array(z.string().trim().min(1)).min(1),
    genres: z.array(z.string().trim().min(1)).min(1),
    countries: z.array(z.string().trim().min(1)).min(1),
    sourceUrl: sourceUrlSchema.optional(),
  })
  .strict();

export const directorSchema = z
  .object({
    nameJa: z.string().trim().min(1),
    nameEn: z.string().trim().min(1),
    sourceUrl: sourceUrlSchema,
  })
  .strict();

export const watchEntrySchema = z
  .object({
    id: idSchema,
    movieId: idSchema,
    watchedAt: dateSchema.optional(),
    location: z.enum(["theater", "home", "other"]),
    note: z.string().trim().min(1).optional(),
  })
  .strict();

export const popcornReferenceSchema = z
  .object({
    size: z.literal("M"),
    estimatedWeightG: z.number().positive(),
    estimatedCaloriesKcal: z.number().positive().optional(),
    bodyFatKcalPerKg: z.number().positive(),
  })
  .strict();

export const filmReferenceSchema = z
  .object({
    format: z.literal("35mm 4-perf"),
    fps: z.literal(24),
    metersPerMinute: z.number().positive(),
    reel2000FtMeters: z.number().positive(),
    earthEquatorialCircumferenceM: z.number().positive(),
  })
  .strict();

export const booksFileSchema = z
  .object({ asOfDate: dateSchema.optional(), books: z.array(bookSchema) })
  .strict();
export const shelvesFileSchema = z
  .object({ shelves: z.array(shelfSchema) })
  .strict();
export const moviesFileSchema = z
  .object({
    asOfDate: dateSchema.optional(),
    bestMovieIds: z
      .array(idSchema)
      .length(5)
      .refine((movieIds) => new Set(movieIds).size === movieIds.length, {
        message: "マイベスト映画5選の映画IDは重複できません。",
      }),
    movies: z.array(movieSchema),
  })
  .strict();
export const directorsFileSchema = z
  .object({ directors: z.array(directorSchema) })
  .strict();
export const watchesFileSchema = z
  .object({ asOfDate: dateSchema.optional(), watches: z.array(watchEntrySchema) })
  .strict();
export const referencesFileSchema = z
  .object({
    popcorn: popcornReferenceSchema,
    film: filmReferenceSchema,
  })
  .strict();

export type Book = z.infer<typeof bookSchema>;
export type Shelf = z.infer<typeof shelfSchema>;
export type Movie = z.infer<typeof movieSchema>;
export type Director = z.infer<typeof directorSchema>;
export type WatchEntry = z.infer<typeof watchEntrySchema>;
export type PopcornReference = z.infer<typeof popcornReferenceSchema>;
export type FilmReference = z.infer<typeof filmReferenceSchema>;
