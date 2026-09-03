import storyImage from "@/stories/assets/assets.png";
import type { ExternalLinkCardProps } from "@/components/ui/ExternalLinkCard";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { ZennArticleCard } from "./ZennArticleCard";

const imageSrc = storyImage.src as ExternalLinkCardProps["imageSrc"];

const meta = {
  title: "Posts/Embeds/ZennArticleCard",
  component: ZennArticleCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-180 max-w-[calc(100vw-2rem)]">
        <Story />
      </div>
    ),
  ],
  args: {
    href: "https://zenn.dev/midpt/articles/google-stitch-intro",
    title: "画面UIのたたき台作成はGoogle Stitchが楽",
    description:
      "Google StitchでUIのたたき台を作る流れと、主要な機能を紹介します。",
    publishedAt: "2026-03-30",
    imageSrc,
  },
  argTypes: {
    imageSrc: {
      control: false,
    },
  },
} satisfies Meta<typeof ZennArticleCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByRole("complementary", {
      name: "Zenn.dev: 画面UIのたたき台作成はGoogle Stitchが楽",
    });
    const link = within(card).getByRole("link", {
      name: /画面UIのたたき台作成はGoogle Stitchが楽/,
    });

    await expect(link).toHaveAttribute(
      "href",
      "https://zenn.dev/midpt/articles/google-stitch-intro",
    );
    await expect(within(card).getByText("Zenn.dev")).toBeVisible();
    await expect(within(card).getByText("2026-03-30")).toBeVisible();
  },
};

export const LongTitle: Story = {
  args: {
    href: "https://zenn.dev/midpt/articles/designing-better-ai-built-web-apps-with-hbd",
    title: "Webアプリの「良い設計」を考えるためのHumane by Design入門",
    description:
      "Humane by Designを手掛かりに、AI時代のWebアプリ設計を考える記事です。",
    publishedAt: "2026-08-18",
    imageSrc:
      "/images/posts/humane-by-design-for-ai-built-apps/content/zenn-og.webp",
  },
};

export const WithoutDescription: Story = {
  args: {
    description: undefined,
  },
};
