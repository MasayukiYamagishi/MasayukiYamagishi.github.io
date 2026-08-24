import { Brand } from "@/components/ui/icons/brandIcons";
import type { Metadata } from "next";

type SocialLink = {
  key: Brand;
  label: string;
  url: string;
};

export const siteConfig = {
  name: "Masayuki Yamagishi",
  url: "https://MasayukiYamagishi.github.io",
  title: "Masayuki Yamagishi | Frontend Engineer",
  description:
    "Frontend engineer portfolio focused on React, Next.js, TypeScript, UI quality, accessibility and web performance",
} as const;

export const siteMetadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export const socialLinks = [
  {
    key: "github",
    label: "GitHub",
    url: "https://github.com/MasayukiYamagishi",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/ma-yamagishi-mdpt9731/",
  },
  {
    key: "zenn",
    label: "Zenn",
    url: "https://zenn.dev/midpt",
  },
] as const satisfies readonly SocialLink[];
