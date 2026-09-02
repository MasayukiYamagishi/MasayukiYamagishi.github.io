export const technologyIds = [
  "typescript",
  "javascript",
  "jquery",
  "react",
  "nextjs",
  "html5",
  "css",
  "tailwindcss",
  "storybook",
  "zod",
  "java",
  "springboot",
  "thymeleaf",
  "python",
  "fastapi",
  "postgresql",
  "prisma",
  "flyway",
  "git",
  "githubactions",
  "linux",
  "apachemaven",
  "apachejmeter",
  "gradle",
  "junit5",
  "intellijidea",
  "claudecode",
  "cursor",
  "githubcopilot",
  "codex",
] as const;

export type TechnologyId = (typeof technologyIds)[number];

export const skillGroups = [
  {
    id: "frontend",
    skills: [
      "typescript",
      "javascript",
      "jquery",
      "react",
      "nextjs",
      "html5",
      "css",
      "tailwindcss",
      "storybook",
      "zod",
      "thymeleaf",
    ],
  },
  {
    id: "backend",
    skills: ["java", "springboot", "python", "fastapi"],
  },
  {
    id: "database",
    skills: ["postgresql", "prisma", "flyway"],
  },
  {
    id: "engineering",
    skills: [
      "git",
      "githubactions",
      "linux",
      "apachemaven",
      "apachejmeter",
      "gradle",
      "junit5",
      "intellijidea",
    ],
  },
  {
    id: "aiDevelopment",
    skills: ["claudecode", "cursor", "githubcopilot", "codex"],
    wide: true,
  },
] as const satisfies readonly {
  id: string;
  skills: readonly TechnologyId[];
  wide?: boolean;
}[];

export type SkillGroupId = (typeof skillGroups)[number]["id"];
export type SkillId = (typeof skillGroups)[number]["skills"][number];

export type SkillsDictionary = Record<TechnologyId, string> & {
  categories: Record<SkillGroupId, string>;
};
