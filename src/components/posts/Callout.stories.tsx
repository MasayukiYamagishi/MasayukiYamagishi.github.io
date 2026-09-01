import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { Callout } from "./Callout";

const meta = {
  title: "Posts/Callout",
  component: Callout,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-160 max-w-[calc(100vw-2rem)]">
        <Story />
      </div>
    ),
  ],
  args: {
    tone: "info",
    title: "補足",
    children: "本文を理解するための補足情報です。",
  },
  argTypes: {
    tone: {
      control: "inline-radio",
      options: ["info", "warn", "alert"],
    },
    children: {
      control: "text",
    },
  },
} satisfies Meta<typeof Callout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Info: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole("complementary", { name: "補足" }),
    ).toBeVisible();
    await expect(
      canvas.getByText("本文を理解するための補足情報です。"),
    ).toBeVisible();
  },
};

export const Warn: Story = {
  args: {
    tone: "warn",
    title: "注意",
    children: "この手順を実行する前に設定内容を確認してください。",
  },
};

export const Alert: Story = {
  args: {
    tone: "alert",
    title: "重要",
    children: "この条件を満たさない場合は処理を続行できません。",
  },
};

export const MultipleParagraphs: Story = {
  args: {
    title: "背景情報",
    children: (
      <>
        <p>最初の段落では前提となる情報を説明します。</p>
        <p>次の段落では、具体的な判断基準を説明します。</p>
      </>
    ),
  },
};
