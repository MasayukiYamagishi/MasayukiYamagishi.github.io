"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { IconButton } from "./Button";
import { Icon } from "./icons/Icon";

type ThemeSwitcherProps = {
  label: string;
};

/**
 * ライトテーマとダークテーマを切り替えるボタン
 *
 * @param ThemeSwitcherProps props
 * @returns テーマ切り替えボタンのJSX
 */
export function ThemeSwitcher({ label }: ThemeSwitcherProps) {
  const { resolvedTheme, setTheme } = useTheme();

  function toggleMenu() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  return (
    <IconButton aria-label={label} onClick={toggleMenu}>
      <Icon icon={Moon} size={18} className="theme-icon-light" />
      <Icon icon={Sun} size={18} className="theme-icon-dark" />
    </IconButton>
  );
}
