import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { YoutubeEmbed } from "./YoutubeEmbed";

const meta = {
  title: "Posts/Embeds/YoutubeEmbed",
  component: YoutubeEmbed,
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
    videoId: "aqz-KE-bpKQ",
    title: "サンプル動画",
    watchLabel: "YouTubeで見る",
    caption: "動画の内容を補足するキャプションです。",
  },
} satisfies Meta<typeof YoutubeEmbed>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const iframe = canvas.getByTitle("サンプル動画");
    const link = canvas.getByRole("link", { name: "YouTubeで見る" });

    await expect(iframe).toHaveAttribute(
      "src",
      "https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ?playsinline=1",
    );
    await expect(link).toHaveAttribute(
      "href",
      "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    );
  },
};

export const WithStartTime: Story = {
  args: {
    start: 90,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByTitle("サンプル動画")).toHaveAttribute(
      "src",
      "https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ?playsinline=1&start=90",
    );
    await expect(
      canvas.getByRole("link", { name: "YouTubeで見る" }),
    ).toHaveAttribute(
      "href",
      "https://www.youtube.com/watch?v=aqz-KE-bpKQ&t=90s",
    );
  },
};

export const WithoutCaption: Story = {
  args: {
    caption: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.queryByText("動画の内容を補足するキャプションです。"),
    ).not.toBeInTheDocument();
  },
};
