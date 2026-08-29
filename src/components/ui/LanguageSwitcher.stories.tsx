import { Meta, StoryObj } from "@storybook/nextjs-vite";

import { expect, waitFor, within } from "storybook/test";
import { LanguageSwitcher } from "./LanguageSwitcher";

const meta = {
  title: "UI/LanguageSwitcher",
  component: LanguageSwitcher,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    locale: "ja",
    label: "表示言語を選択",
  },
} satisfies Meta<typeof LanguageSwitcher>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Japanese: Story = {
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole("button", {
      name: "表示言語を選択: 日本語",
    });

    await userEvent.click(trigger);

    await waitFor(async () => {
      await expect(trigger).toHaveAttribute("aria-expanded", "true");
    });

    // Menu.PortalはStoryのcanvas外、body直下に描画される
    const body = within(canvasElement.ownerDocument.body);
    const menu = await body.findByRole("menu");

    await waitFor(async () => {
      await expect(menu).toBeVisible();
    });

    const menuItems = within(menu);

    await expect(
      menuItems.getByRole("menuitem", { name: "日本語" }),
    ).toHaveAttribute("aria-current", "page");

    await expect(
      menuItems.getByRole("menuitem", { name: "English" }),
    ).toHaveAttribute("href", "/en");
  },
};

export const English: Story = {
  args: {
    locale: "en",
    label: "Select display language",
  },
};
