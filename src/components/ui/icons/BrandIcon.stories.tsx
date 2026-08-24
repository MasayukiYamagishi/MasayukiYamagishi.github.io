import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { BrandIcon } from "./BrandIcon";
import { brandIcons } from "./brandIcons";

const meta = {
  title: "UI/Icons/BrandIcon",
  component: BrandIcon,

  args: {
    brand: "github",
    size: 24,
    color: "#000000",
  },

  argTypes: {
    brand: {
      control: "select",
      options: Object.keys(brandIcons),
    },

    size: {
      control: {
        type: "range",
        min: 12,
        max: 64,
        step: 2,
      },
    },

    color: {
      control: "color",
    },
  },
} satisfies Meta<typeof BrandIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
