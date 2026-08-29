import { z } from "zod";

function isIsoCalendarDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00Z`);

  if (Number.isNaN(date.getTime())) {
    return false;
  }

  return date.toISOString().slice(0, 10) === value;
}

const dateSchema = z.string().refine(isIsoCalendarDate, {
  message: "YYYY-MM-DD形式の有効な日付を指定してください。",
});

const localizedTextSchema = z
  .object({
    ja: z.string().min(1, "日本語のテキストを指定してください。"),
    en: z.string().min(1, "英語のテキストを指定してください。"),
  })
  .strict();

const imageMetadataSchema = z
  .object({
    alt: localizedTextSchema,
  })
  .strict();

export const postFileSchema = z
  .object({
    title: localizedTextSchema,
    description: localizedTextSchema,
    publishedAt: dateSchema,
    updatedAt: dateSchema.optional(),
    thumbnail: imageMetadataSchema,
    ogImage: imageMetadataSchema,
  })
  .strict();

export type PostFile = z.infer<typeof postFileSchema>;
