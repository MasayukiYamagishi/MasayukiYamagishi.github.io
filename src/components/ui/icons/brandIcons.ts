import linkedinWhite from "@/assets/brand/linkedin/InBug-White.png";
import linkedinOriginal from "@/assets/brand/linkedin/LI-In-Bug.png";
import zennWhite from "@/assets/brand/zenn/logo-only-white.svg";
import zennOriginal from "@/assets/brand/zenn/logo-only.svg";
import { siGithub } from "simple-icons";

export const brandIcons = {
  github: {
    type: "simple-icon",
    viewBox: "0 0 24 24",
    path: siGithub.path,
  },

  linkedin: {
    type: "image",
    viewBox: "0 0 24 24",
    light: linkedinOriginal,
    dark: linkedinWhite,
  },

  zenn: {
    type: "image",
    viewBox: "0 0 24 24",
    light: zennOriginal,
    dark: zennWhite,
  },
} as const;

export type Brand = keyof typeof brandIcons;
