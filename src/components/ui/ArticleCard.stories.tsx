import type { Post } from "@/content/posts/types";
import { en } from "@/i18n/dictionaries/en";
import { ja } from "@/i18n/dictionaries/ja";
import storyThumbnail from "@/stories/assets/assets.png";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { ArticleCard } from "./ArticleCard";

const mockPost = {
  slug: "building-my-portfolio",
  title: {
    ja: "TypeScriptとNext.jsでポートフォリオを構築した",
    en: "Building my portfolio with TypeScript and Next.js",
  },
  description: {
    ja: "設計方針、コンポーネント構成、記事管理、画像最適化について紹介します。",
    en: "An overview of the architecture, components, content management, and image optimization.",
  },
  publishedAt: "2026-08-25",
  updatedAt: "2026-09-01",
  thumbnail: {
    // Storybook用画像はNext.jsによって内部URLへ返還されるため、Story内に限ってPostの画像パス型として扱う
    src: storyThumbnail.src as Post["thumbnail"]["src"],
    width: storyThumbnail.width,
    height: storyThumbnail.height,
    alt: {
      ja: "ポートフォリオ構築記事のサムネイル",
      en: "Thumbnail for the portfolio development article",
    },
  },
  ogImage: {
    // ArticleCardではogImageを表示しないが、Post型の必須項目なので含めている
    src: "/images/posts/building-my-portfolio/og.jpg",
    width: 1200,
    height: 630,
    alt: {
      ja: "ポートフォリオ構築記事のOG画像",
      en: "Open Graph image for the portfolio development article",
    },
  },
} satisfies Post;

const meta = {
  title: "UI/ArticleCard",
  component: ArticleCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[22rem] max-w-[calc(100vw-2rem)]">
        <Story />
      </div>
    ),
  ],
  args: {
    post: mockPost,
    locale: "ja",
    dictionary: ja.posts,
  },
  argTypes: {
    post: {
      control: false,
    },
    locale: {
      control: false,
    },
    dictionary: {
      control: false,
    },
  },
} satisfies Meta<typeof ArticleCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Japanese: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const link = canvas.getByRole("link", {
      name: /TypeScriptとNext.jsでポートフォリオを構築した/,
    });

    await expect(link).toHaveAttribute("href", "/posts/building-my-portfolio");

    await expect(
      canvas.getByRole("img", {
        name: "ポートフォリオ構築記事のサムネイル",
      }),
    ).toBeVisible();

    await expect(canvas.getByText("最終更新日")).toBeVisible();
  },
};

export const English: Story = {
  args: {
    locale: "en",
    dictionary: en.posts,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const link = canvas.getByRole("link", {
      name: /Building my portfolio with TypeScript and Next.js/,
    });

    await expect(link).toHaveAttribute(
      "href",
      "/en/posts/building-my-portfolio",
    );
  },
};

export const WithoutUpdatedAt: Story = {
  args: {
    post: {
      ...mockPost,
      updatedAt: undefined,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.queryByText("最終更新日")).not.toBeInTheDocument();
  },
};

export const LongText: Story = {
  args: {
    post: {
      ...mockPost,
      title: {
        ja: "Next.jsとTypeScriptを利用した他言語対応ポートフォリオサイトの設計と実装について詳しく解説する",
        en: "Designing and implementing a multilingual portfolio website using Next.js and TypeScript",
      },
      description: {
        ja: "コンポーネント設計、コンテンツ管理、国際化、アクセシビリティ、画像変換、静的エクスポート、GitHub Pagesへのデプロイまで詳しく紹介します。",
        en: "A detailed look at component architecture, content management, internationalization, accessibility, static exports, and deployment to GitHub Pages.",
      },
    },
  },
};
