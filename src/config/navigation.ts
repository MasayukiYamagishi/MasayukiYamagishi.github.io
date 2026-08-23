export const sectionIds = {
  about: "about",
  skills: "skills",
  posts: "posts",
  projects: "projects",
  experience: "experience",
} as const;

export type SectionKey = keyof typeof sectionIds;

export const navigationItems = [
  {
    key: "about",
    sectionId: sectionIds.about,
  },
  {
    key: "skills",
    sectionId: sectionIds.skills,
  },
  {
    key: "posts",
    sectionId: sectionIds.posts,
  },
  {
    key: "projects",
    sectionId: sectionIds.projects,
  },
  {
    key: "experience",
    sectionId: sectionIds.experience,
  },
] as const satisfies ReadonlyArray<{
  key: SectionKey;
  sectionId: string;
}>;
