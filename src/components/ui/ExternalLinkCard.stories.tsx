import storyImage from "@/stories/assets/assets.png";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { ExternalLinkCard } from "./ExternalLinkCard";

const meta = {
  title: "UI/ExternalLinkCard",
  component: ExternalLinkCard,
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
    href: "https://example.com/articles/accessible-components",
    siteName: "Example Docs",
    title: "アクセシブルなコンポーネントを設計する",
    description:
      "セマンティックHTMLとキーボード操作を考慮した設計方法を紹介します。",
    publishedAt: "2026-08-18",
    imageSrc: storyImage,
  },
  argTypes: {
    imageSrc: {
      control: false,
    },
  },
} satisfies Meta<typeof ExternalLinkCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByRole("complementary", {
      name: "Example Docs: アクセシブルなコンポーネントを設計する",
    });
    const link = within(card).getByRole("link", {
      name: /アクセシブルなコンポーネントを設計する/,
    });
    const image = card.querySelector("img");

    await expect(link).toHaveAttribute(
      "href",
      "https://example.com/articles/accessible-components",
    );
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute("alt", "");
  },
};

export const WithoutImage: Story = {
  args: {
    imageSrc: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.queryByRole("img")).not.toBeInTheDocument();
  },
};

export const OpenInNewTab: Story = {
  args: {
    newTabLabel: "外部サイトを新しいタブで開く",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", {
      name: "外部サイトを新しいタブで開く",
    });

    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  },
};

export const WithoutDescription: Story = {
  args: {
    description: undefined,
  },
};

export const WithoutPublishedAt: Story = {
  args: {
    publishedAt: undefined,
  },
};

export const LongText: Story = {
  args: {
    title:
      "アクセシビリティと保守性を両立するためのコンポーネント設計について詳しく解説する",
    description:
      "セマンティックHTML、キーボード操作、スクリーンリーダーでの読み上げ、レスポンシブ表示、長いテキストの折り返しまで考慮した実装方法を紹介します。",
  },
};
