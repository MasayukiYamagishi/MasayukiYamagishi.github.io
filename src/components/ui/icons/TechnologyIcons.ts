import type { SimpleIcon } from "simple-icons";
import {
  siNextdotjs,
  siReact,
  siStorybook,
  siTailwindcss,
  siTypescript,
  siZod,
} from "simple-icons";

export const technologyIcons = {
  nextjs: siNextdotjs,
  react: siReact,
  storybook: siStorybook,
  tailwindcss: siTailwindcss,
  typescript: siTypescript,
  zod: siZod,
} as const satisfies Record<string, SimpleIcon>;

/**
 * 技術系アイコンを取得する
 *
 * @param id アイコンid
 * @returns アイコン
 */
export function getTechnologyIcon(id: string): SimpleIcon | undefined {
  return (technologyIcons as Record<string, SimpleIcon | undefined>)[id];
}
