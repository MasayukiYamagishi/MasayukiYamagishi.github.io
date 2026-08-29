"use client";

import { defaultTheme } from "@/config/theme";
import { ThemeProvider as NextThemeProvider } from "next-themes";

type ThemeProviderProps = {
  children: React.ReactNode;
};

/**
 * テーマ設定を子孫コンポーネントへ提供するプロバイダー
 *
 * @param ThemeProviderProps props
 * @returns テーマプロバイダーのJSX
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemeProvider
      attribute="data-theme"
      defaultTheme={defaultTheme}
      enableSystem
    >
      {children}
    </NextThemeProvider>
  );
}
