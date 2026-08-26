export const skillGroups = [
  {
    id: "frontend",
    skills: [
      "typescript",
      "react",
      "nextjs",
      "html5",
      "css",
      "tailwindcss",
      "storybook",
      "zod",
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
      "gradle",
      "junit5",
    ],
  },
  {
    id: "aiDevelopment",
    skills: ["claudecode", "cursor", "githubcopilot", "codex"],
    wide: true,
  },
] as const;

export type SkillGroupId = (typeof skillGroups)[number]["id"];
export type SkillId = (typeof skillGroups)[number]["skills"][number];

export type SkillsDictionary = Record<SkillId, string> & {
  categories: Record<SkillGroupId, string>;
};
