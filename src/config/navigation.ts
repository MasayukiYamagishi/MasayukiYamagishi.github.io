export const sectionIds = {
  about: "about",
  posts: "posts",
  projects: "projects",
  skills: "skills",
  experience: "experience",
} as const;

export const pageTopIds = {
  section: "hero",
  heading: "hero-heading",
} as const;

export type SectionKey = keyof typeof sectionIds;

export const navigationItems = [
  {
    key: "about",
    sectionId: sectionIds.about,
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
    key: "skills",
    sectionId: sectionIds.skills,
  },
  {
    key: "experience",
    sectionId: sectionIds.experience,
  },
] as const satisfies ReadonlyArray<{
  key: SectionKey;
  sectionId: string;
}>;
