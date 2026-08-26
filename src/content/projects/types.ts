import type { Locale } from "@/i18n/config";

type LocalizedText = Record<Locale, string>;

export type ProjectTag = {
  id: string;
  label: LocalizedText;
};

export type Project = {
  slug: string;
  order: number;
  url: string;
  title: LocalizedText;
  description: LocalizedText;
  tags: ProjectTag[];
};
