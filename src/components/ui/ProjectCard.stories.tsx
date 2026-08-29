import type { Project } from "@/content/projects/types";
import { en } from "@/i18n/dictionaries/en";
import { ja } from "@/i18n/dictionaries/ja";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { ProjectCard } from "./ProjectCard";

const mockProject = {
  slug: "portfolio-site",
  order: 1,
  url: "https://github.com/MasayukiYamagishi/masayukiyamagishi.github.io",
  title: {
    ja: "多言語対応ポートフォリオサイト",
    en: "Multilingual Portfolio Website",
  },
  tags: [
    {
      id: "nextjs",
      label: {
        ja: "Next.js",
        en: "Next.js",
      },
    },
    {
      id: "accessibility",
      label: {
        ja: "アクセシビリティ",
        en: "Accessibility",
      },
    },
  ],
  description: {
    ja: "UI品質、アクセシビリティパフォーマンスを重視して構築したポートフォリオサイトです。",
    en: "A portfolio website built with a focus on UI quality, accessibility, and performance.",
  },
} satisfies Project;

const meta = {
  title: "UI/ProjectCard",
  component: ProjectCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-240 max-w-[calc(100vw-2rem)]">
        <Story />
      </div>
    ),
  ],
  args: {
    project: mockProject,
    locale: "ja",
    dictionary: ja.projects,
  },
  argTypes: {
    project: {
      control: false,
    },
    locale: {
      control: false,
    },
    dictionary: {
      control: false,
    },
  },
} satisfies Meta<typeof ProjectCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Japanese: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const link = canvas.getByRole("link", {
      name: `${mockProject.title.ja} — github.com (${ja.projects.externalSite})`,
    });

    await expect(link).toHaveAttribute("href", mockProject.url);
    await expect(link).not.toHaveAttribute("target");

    const nextjsTag = canvas.getByText("Next.js").closest("li");

    await expect(nextjsTag).toBeInTheDocument();
    await expect(nextjsTag?.querySelector("svg")).toBeInTheDocument();

    const accessibilityTag = canvas.getByText("アクセシビリティ").closest("li");

    await expect(accessibilityTag).toBeInTheDocument();
    await expect(
      accessibilityTag?.querySelector("svg"),
    ).not.toBeInTheDocument();
  },
};

export const English: Story = {
  args: {
    locale: "en",
    dictionary: en.projects,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole("link", {
        name: /Multilingual Portfolio Website.*github\.com.*External site/,
      }),
    ).toBeVisible();

    await expect(canvas.getByText("Accessibility")).toBeVisible();
  },
};

export const LongText: Story = {
  args: {
    project: {
      ...mockProject,
      title: {
        ja: "Next.jsとTypeScriptを利用した多言語対応ポートフォリオサイト",
        en: "A multilingual portfolio website built with Next.js and TypeScript",
      },
      description: {
        ja: "アクセシビリティ、パフォーマンス、静的エクスポート、コンテンツ管理、レスポンシブデザインを考慮して設計したポートフォリオサイトです。",
        en: "A portfolio website designed around accessibility, performance, static exports, content management, and responsive design.",
      },
    },
  },
};
