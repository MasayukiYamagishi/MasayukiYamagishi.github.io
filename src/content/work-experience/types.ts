import type { z } from "zod";
import type { workExperienceFileSchema } from "./schema";

export type WorkExperienceDictionary = {
  present: string;
  openOfficialSite: string;
  showProjects: string;
  hideProjects: string;
  technologies: string;
};

export type WorkExperience = z.infer<typeof workExperienceFileSchema>;
export type ExperienceProject = WorkExperience["projects"][number];
export type ExperiencePeriod = WorkExperience["period"];
