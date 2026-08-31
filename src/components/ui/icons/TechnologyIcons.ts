import { StaticImageData } from "next/image";
import type { SimpleIcon } from "simple-icons";
import {
  siApachemaven,
  siClaudecode,
  siCss,
  siCursor,
  siFastapi,
  siFlyway,
  siGit,
  siGithubactions,
  siGithubcopilot,
  siGradle,
  siGrafana,
  siHtml5,
  siJunit5,
  siLinux,
  siNextdotjs,
  siOpenjdk,
  siOpentelemetry,
  siPostgresql,
  siPrisma,
  siPython,
  siReact,
  siSpringboot,
  siStorybook,
  siTailwindcss,
  siTypescript,
  siZod,
} from "simple-icons";

import openaiBlossomBlack from "@/assets/brand/openai/OAI_OpenAI-Blossom_Black.svg";
import openaiBlossomWhite from "@/assets/brand/openai/OAI_OpenAI-Blossom_White.svg";

export const technologyIcons = {
  nextjs: siNextdotjs,
  react: siReact,
  storybook: siStorybook,
  tailwindcss: siTailwindcss,
  typescript: siTypescript,
  zod: siZod,
  springboot: siSpringboot,
  postgresql: siPostgresql,
  claudecode: siClaudecode,
  css: siCss,
  html5: siHtml5,
  python: siPython,
  fastapi: siFastapi,
  prisma: siPrisma,
  flyway: siFlyway,
  git: siGit,
  githubactions: siGithubactions,
  linux: siLinux,
  apachemaven: siApachemaven,
  gradle: siGradle,
  junit5: siJunit5,
  cursor: siCursor,
  githubcopilot: siGithubcopilot,
  java: siOpenjdk,
  grafana: siGrafana,
  opentelemetry: siOpentelemetry,
} as const satisfies Record<string, SimpleIcon>;

export type ThemedTechnologyIcon = {
  light: StaticImageData;
  dark: StaticImageData;
  visualScale?: number;
};

export const themedTechnologyIcons = {
  codex: {
    light: openaiBlossomBlack,
    dark: openaiBlossomWhite,
    visualScale: 2,
  },
} as const satisfies Record<string, ThemedTechnologyIcon>;

/**
 * 技術系アイコンを取得する
 *
 * @param id アイコンid
 * @returns アイコン
 */
export function getTechnologyIcon(id: string): SimpleIcon | undefined {
  return (technologyIcons as Record<string, SimpleIcon | undefined>)[id];
}

export function getThemedTechnologyIcon(
  id: string,
): ThemedTechnologyIcon | undefined {
  return (
    themedTechnologyIcons as Record<string, ThemedTechnologyIcon | undefined>
  )[id];
}
