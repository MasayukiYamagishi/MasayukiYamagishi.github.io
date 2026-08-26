import "server-only";

import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { parse } from "yaml";
import { projectFileSchema } from "./schema";
import type { Project } from "./types";

const PROJECT_DIRECTORY = path.join(
  process.cwd(),
  "src",
  "content",
  "projects",
);

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

async function getProjectSlugs() {
  const entries = await readdir(PROJECT_DIRECTORY, {
    withFileTypes: true,
  });

  const directories = entries.filter(
    (entry) => entry.isDirectory() && !entry.name.startsWith("."),
  );

  const invalidDirectory = directories.find(
    (entry) => !SLUG_PATTERN.test(entry.name),
  );

  if (invalidDirectory) {
    throw new Error(
      [
        `プロジェクトディレクトリ名が不正です: ${invalidDirectory.name}`,
        `小文字英数字をハイフンで区切った名称を使用しないでください。`,
      ].join(" "),
    );
  }

  return directories.map((entry) => entry.name);
}

async function readProject(slug: string): Promise<Project> {
  const filePath = path.join(PROJECT_DIRECTORY, slug, "project.yaml");

  let source: string;

  try {
    source = await readFile(filePath, "utf8");
  } catch (error) {
    throw new Error(`プロジェクトメタデータを読み込めません: ${filePath}`, {
      cause: error,
    });
  }

  let rawProject: unknown;

  try {
    rawProject = parse(source);
  } catch (error) {
    throw new Error(`YAMLの解析に失敗しました: ${filePath}`, {
      cause: error,
    });
  }

  const result = projectFileSchema.safeParse(rawProject);

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => {
        const field = issue.path.length > 0 ? issue.path.join(".") : "(root)";

        return `- ${field}: ${issue.message}`;
      })
      .join("\n");

    throw new Error(
      [`プロジェクトメタデータが不正です: ${filePath}`, issues].join("\n"),
    );
  }

  return {
    slug,
    ...result.data,
  } satisfies Project;
}

export const getProject = cache(async (): Promise<readonly Project[]> => {
  const slugs = await getProjectSlugs();

  const projects = await Promise.all(slugs.map(readProject));

  projects.sort(
    (left, right) =>
      left.order - right.order || left.slug.localeCompare(right.slug),
  );

  return projects;
});

export type { Project, ProjectTag } from "./types";
