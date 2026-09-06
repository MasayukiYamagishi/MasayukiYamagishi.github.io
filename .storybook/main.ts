import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp",
    "@storybook/addon-themes",
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {
      image: {
        // Windows absolute paths are not escaped correctly by the current image plugin.
        // Let Vite serve image imports as URLs until that upstream issue is resolved.
        excludeFiles: ["**/*"],
      },
    },
  },
  staticDirs: ["../public"],

  async viteFinal(config) {
    config.optimizeDeps ??= {};
    config.optimizeDeps.include = [
      ...new Set([...(config.optimizeDeps.include ?? []), "lucide-react"]),
    ];

    return config;
  },
};
export default config;
