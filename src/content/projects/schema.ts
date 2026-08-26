import { z } from "zod";

const TAG_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const PROJECT_TITLE_MAX_LENGTH = 50;
export const PROJECT_DESCRIPTION_MAX_LENGTH = 200;

function createLocalizedTextSchema(fieldName: string, maxLength?: number) {
  function createTextSchema(languageName: string) {
    const schema = z
      .string()
      .trim()
      .min(1, `${languageName}の${fieldName}を指定してください。`);

    return maxLength
      ? schema.max(
          maxLength,
          `${languageName}の${fieldName}は${maxLength}文字以内で指定してください。`,
        )
      : schema;
  }

  return z
    .object({
      ja: createTextSchema("日本語"),
      en: createTextSchema("英語"),
    })
    .strict();
}

const projectTitleSchema = createLocalizedTextSchema(
  "タイトル",
  PROJECT_TITLE_MAX_LENGTH,
);

const projectDescriptionSchema = createLocalizedTextSchema(
  "説明",
  PROJECT_DESCRIPTION_MAX_LENGTH,
);

const projectTagLabelSchema = createLocalizedTextSchema("タグラベル");

const httpsUrlSchema = z
  .string()
  .trim()
  .refine(
    (value) => {
      try {
        return new URL(value).protocol === "https:";
      } catch (error) {
        return false;
      }
    },
    {
      message: "https://から始まる有効なURLを指定してください。",
    },
  );

const projectTagSchema = z
  .object({
    id: z.string().regex(TAG_ID_PATTERN, {
      message: "タグIDは小文字英数字をハイフンで区切ってください。",
    }),
    label: projectTagLabelSchema,
  })
  .strict();

const projectTagsSchema = z
  .array(projectTagSchema)
  .min(1, "タグを1件以上指定してください。")
  .refine((tags) => new Set(tags.map((tag) => tag.id)).size === tags.length, {
    message: "同じタグIDを重複して指定できません。",
  });

export const projectFileSchema = z
  .object({
    order: z.number().int().positive(),
    url: httpsUrlSchema,
    title: projectTitleSchema,
    tags: projectTagsSchema,
    description: projectDescriptionSchema,
  })
  .strict();

export type ProjectFile = z.infer<typeof projectFileSchema>;
