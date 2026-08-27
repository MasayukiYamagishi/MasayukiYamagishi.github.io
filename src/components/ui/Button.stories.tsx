import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Languages, Moon } from "lucide-react";
import { expect, within } from "storybook/test";
import { Button, IconButton } from "./Button";
import { Icon } from "./icons/Icon";

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Button",
    size: "default",
    variant: "ghost",
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["default", "icon"],
    },
    variant: {
      control: "inline-radio",
      options: ["ghost", "outline"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Icon icon={Languages} size={18} />
        日本語
      </>
    ),
  },
};

export const IconOnly: Story = {
  render: () => (
    <IconButton aria-label="テーマを切り替える">
      <Icon icon={Moon} size={18} />
    </IconButton>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", {
      name: "テーマを切り替える",
    });

    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute("type", "button");
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};
