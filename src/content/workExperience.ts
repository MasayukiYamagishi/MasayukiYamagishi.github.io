import type { Locale } from "@/i18n/config";
import { en } from "@/i18n/dictionaries/en";
import { ja } from "@/i18n/dictionaries/ja";

type LocalizedText = Record<Locale, string>;

export type WorkExperienceDictionary = {
  present: string;
  showProjects: string;
  hideProjects: string;
  technologies: string;
};

export type ExperiencePeriod = {
  start: string;
  end?: string;
};

export type ExperienceTechnology = {
  id: string;
  label: LocalizedText;
};

export type ExperienceProject = {
  id: string;
  title: LocalizedText;
  role: LocalizedText;
  period: ExperiencePeriod;
  contributions: LocalizedText[];
  technologies: ExperienceTechnology[];
};

export type WorkExperience = {
  id: string;
  company: LocalizedText;
  companyUrl?: string;
  role: LocalizedText;
  period: ExperiencePeriod;
  summary: LocalizedText;
  projects: ExperienceProject[];
};

export const workExperiences = [
  {
    id: "current-employer",

    company: {
      ja: "株式会社MIT",
      en: "MIT Corp.",
    },

    companyUrl: "https://k-mit.jp/",

    role: {
      ja: "システムエンジニア",
      en: "System Engineer",
    },

    period: {
      start: "2021-04",
      end: undefined,
    },

    summary: {
      ja: "業務システムを中心に、要件定義や基本設計から実装・単体テストまで一貫して担当しています。",
      en: "I work across business-system delivery, from requirements definition and basic design through implementation and unit testing.",
    },

    projects: [
      {
        id: "sales-management-renewal",

        title: {
          ja: "販売管理システムの刷新",
          en: "Sales management system renewal",
        },

        role: {
          ja: "サブリーダー / フルスタックエンジニア",
          en: "Sub-lead / Full-stack Engineer",
        },

        period: {
          start: "2026-01",
          end: undefined,
        },

        contributions: [
          {
            ja: "お客様へのヒアリング、要件整理・提案、AI駆動開発による製造、技術支援とレビューを担当。",
            en: "Handled client interviews, requirements, proposals, AI-driven development, technical support, and reviews.",
          },
        ],

        technologies: [
          {
            id: "nextjs",
            label: {
              ja: ja.skills.nextjs,
              en: en.skills.nextjs,
            },
          },
          {
            id: "typescript",
            label: {
              ja: ja.skills.typescript,
              en: en.skills.typescript,
            },
          },
          {
            id: "java",
            label: {
              ja: ja.skills.java,
              en: en.skills.java,
            },
          },
          {
            id: "springboot",
            label: {
              ja: ja.skills.springboot,
              en: en.skills.springboot,
            },
          },
          {
            id: "postgresql",
            label: {
              ja: ja.skills.postgresql,
              en: en.skills.postgresql,
            },
          },
          {
            id: "claudecode",
            label: {
              ja: ja.skills.claudecode,
              en: en.skills.claudecode,
            },
          },
        ],
      },
    ],
  },
] as const satisfies readonly WorkExperience[];
