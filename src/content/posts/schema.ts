import { z } from "zod";

export const POST_TITLE_MAX_LENGTH = 80;
export const POST_DESCRIPTION_MAX_LENGTH = 180;
export const POST_IMAGE_ALT_MAX_LENGTH = 160;

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

function createLocalizedTextSchema(fieldName: string, maxLength: number) {
  function createTextSchema(languageName: string) {
    return z
      .string()
      .trim()
      .min(1, `${languageName}の${fieldName}を指定してください。`)
      .max(
        maxLength,
        `${languageName}の${fieldName}は${maxLength}文字以内で指定してください。`,
      );
  }

  return z
    .object({
      ja: createTextSchema("日本語"),
      en: createTextSchema("英語"),
    })
    .strict();
}

const postTitleSchema = createLocalizedTextSchema(
  "タイトル",
  POST_TITLE_MAX_LENGTH,
);

const postDescriptionSchema = createLocalizedTextSchema(
  "説明",
  POST_DESCRIPTION_MAX_LENGTH,
);

const imageAltSchema = createLocalizedTextSchema(
  "画像の代替テキスト",
  POST_IMAGE_ALT_MAX_LENGTH,
);

const imageMetadataSchema = z
  .object({
    alt: imageAltSchema,
  })
  .strict();

export const postFileSchema = z
  .object({
    title: postTitleSchema,
    description: postDescriptionSchema,
    publishedAt: dateSchema,
    updatedAt: dateSchema.optional(),
    thumbnail: imageMetadataSchema,
    ogImage: imageMetadataSchema,
  })
  .strict()
  .superRefine((post, context) => {
    if (
      post.updatedAt &&
      isIsoCalendarDate(post.publishedAt) &&
      isIsoCalendarDate(post.updatedAt) &&
      post.updatedAt < post.publishedAt
    ) {
      context.addIssue({
        code: "custom",
        path: ["updatedAt"],
        message: "更新日は公開日以降の日付を指定してください。",
      });
    }
  });

export type PostFile = z.infer<typeof postFileSchema>;
