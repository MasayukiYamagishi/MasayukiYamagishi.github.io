import { technologyIds } from "@/content/skills";
import type { TechnologyId } from "@/content/skills";
import { z } from "zod";

const technologyIdSet = new Set<string>(technologyIds);

const yearMonthSchema = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, "YYYY-MM形式で指定してください。");

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

const localizedTitleSchema = createLocalizedTextSchema("タイトル", 100);
const localizedRoleSchema = createLocalizedTextSchema("役割", 100);
const localizedSummarySchema = createLocalizedTextSchema("概要", 300);
const localizedDescriptionSchema = createLocalizedTextSchema("説明", 300);
const localizedHighlightSchema = createLocalizedTextSchema("担当内容", 300);

const periodSchema = z
  .object({
    start: yearMonthSchema,
    end: yearMonthSchema.optional(),
  })
  .strict()
  .superRefine((period, context) => {
    if (period.end && period.end < period.start) {
      context.addIssue({
        code: "custom",
        path: ["end"],
        message: "終了年月は開始年月以降を指定してください。",
      });
    }
  });

const technologyIdSchema = z.custom<TechnologyId>(
  (value) => typeof value === "string" && technologyIdSet.has(value),
  "Technologyに定義されている技術IDを指定してください。",
);

const projectSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: localizedTitleSchema,
    role: localizedRoleSchema,
    period: periodSchema,
    description: localizedDescriptionSchema,
    highlights: z.array(localizedHighlightSchema).min(1),
    technologies: z.array(technologyIdSchema).min(1),
  })
  .strict()
  .superRefine((project, context) => {
    const duplicatedTechnologyId = project.technologies.find(
      (technologyId, index) =>
        project.technologies.indexOf(technologyId) !== index,
    );

    if (duplicatedTechnologyId) {
      context.addIssue({
        code: "custom",
        path: ["technologies"],
        message: `技術IDが重複しています: ${duplicatedTechnologyId}`,
      });
    }
  });

export const workExperienceFileSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    company: createLocalizedTextSchema("会社名", 100),
    companyUrl: z.string().url().optional(),
    role: localizedRoleSchema,
    period: periodSchema,
    summary: localizedSummarySchema,
    projects: z.array(projectSchema).min(1),
  })
  .strict()
  .superRefine((experience, context) => {
    const duplicatedProjectId = experience.projects.find(
      (project, index) =>
        experience.projects.findIndex((candidate) => candidate.id === project.id) !==
        index,
    )?.id;

    if (duplicatedProjectId) {
      context.addIssue({
        code: "custom",
        path: ["projects"],
        message: `案件IDが重複しています: ${duplicatedProjectId}`,
      });
    }
  });
