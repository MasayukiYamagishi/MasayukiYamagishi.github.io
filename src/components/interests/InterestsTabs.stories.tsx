import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { InterestsTabs } from "./InterestsTabs";

const meta = {
  title: "Interests/InterestsTabs",
  component: InterestsTabs,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    label: "趣味の記録を切り替える",
    labels: { books: "Books", movies: "Movies" },
    booksPanel: <div className="p-6">Books panel</div>,
    moviesPanel: <div className="p-6">Movies panel</div>,
  },
} satisfies Meta<typeof InterestsTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const KeyboardNavigation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const booksTab = canvas.getByRole("tab", { name: "Books" });
    const moviesTab = canvas.getByRole("tab", { name: "Movies" });

    booksTab.focus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(moviesTab).toHaveAttribute("aria-selected", "true");
    await expect(canvas.getByRole("tabpanel")).toHaveTextContent("Movies panel");
  },
};
