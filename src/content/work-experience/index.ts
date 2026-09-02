import "server-only";

import { readFile, readdir } from "fs/promises";
import path from "node:path";
import { cache } from "react";
import { parse } from "yaml";
import { workExperienceFileSchema } from "./schema";
import type { WorkExperience } from "./types";

const WORK_EXPERIENCE_DIRECTORY = path.join(
  process.cwd(),
  "src",
  "content",
  "work-experience",
);
const FILE_NAME_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*\.yaml$/;

async function getWorkExperienceFileNames() {
  const entries = await readdir(WORK_EXPERIENCE_DIRECTORY, {
    withFileTypes: true,
  });

  const fileNames = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".yaml"))
    .map((entry) => entry.name);

  const invalidFileName = fileNames.find(
    (fileName) => !FILE_NAME_PATTERN.test(fileName),
  );

  if (invalidFileName) {
    throw new Error(
      `職歴YAMLのファイル名が不正です: ${invalidFileName}`,
    );
  }

  return fileNames.sort((left, right) => left.localeCompare(right));
}

async function readWorkExperience(fileName: string): Promise<WorkExperience> {
  const filePath = path.join(WORK_EXPERIENCE_DIRECTORY, fileName);

  let source: string;

  try {
    source = await readFile(filePath, "utf8");
  } catch (error) {
    throw new Error(`職歴YAMLを読み込めません: ${filePath}`, {
      cause: error,
    });
  }

  let rawExperience: unknown;

  try {
    rawExperience = parse(source);
  } catch (error) {
    throw new Error(`職歴YAMLの解析に失敗しました: ${filePath}`, {
      cause: error,
    });
  }

  const result = workExperienceFileSchema.safeParse(rawExperience);

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => {
        const field = issue.path.length > 0 ? issue.path.join(".") : "(root)";

        return `- ${field}: ${issue.message}`;
      })
      .join("\n");

    throw new Error(
      [`職歴YAMLが不正です: ${filePath}`, issues].join("\n"),
    );
  }

  const expectedId = path.basename(fileName, ".yaml");

  if (result.data.id !== expectedId) {
    throw new Error(
      `職歴IDとファイル名が一致しません: ${result.data.id} / ${fileName}`,
    );
  }

  return {
    ...result.data,
    projects: [...result.data.projects].sort((left, right) =>
      right.period.start.localeCompare(left.period.start),
    ),
  };
}

export const getWorkExperiences = cache(
  async (): Promise<readonly WorkExperience[]> => {
    const fileNames = await getWorkExperienceFileNames();
    const experiences = await Promise.all(
      fileNames.map((fileName) => readWorkExperience(fileName)),
    );

    const duplicatedExperienceId = experiences.find(
      (experience, index) =>
        experiences.findIndex(
          (candidate) => candidate.id === experience.id,
        ) !== index,
    )?.id;

    if (duplicatedExperienceId) {
      throw new Error(`職歴IDが重複しています: ${duplicatedExperienceId}`);
    }

    return experiences.sort((left, right) =>
      right.period.start.localeCompare(left.period.start),
    );
  },
);

export type {
  ExperiencePeriod,
  ExperienceProject,
  WorkExperience,
  WorkExperienceDictionary,
} from "./types";
