import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { InlineText } from "./InlineText";

const meta = {
  title: "Posts/InlineText",
  component: InlineText,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    tone: "info",
    children: "補足情報",
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
} satisfies Meta<typeof InlineText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Info: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const text = canvas.getByText("補足情報");

    await expect(text).toBeVisible();
    await expect(text).toHaveClass("text-info");
  },
};

export const Warn: Story = {
  args: {
    tone: "warn",
    children: "注意が必要な情報",
  },
};

export const Alert: Story = {
  args: {
    tone: "alert",
    children: "重要な情報",
  },
};

export const AllTones: Story = {
  render: () => (
    <p className="flex flex-wrap gap-4">
      <InlineText tone="info">Info</InlineText>
      <InlineText tone="warn">Warn</InlineText>
      <InlineText tone="alert">Alert</InlineText>
    </p>
  ),
};
