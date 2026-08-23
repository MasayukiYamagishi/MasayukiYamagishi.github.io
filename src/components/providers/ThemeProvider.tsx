"use client";

import { defaultTheme } from "@/config/theme";
import { ThemeProvider as NextThemeProvider } from "next-themes";

type ThemeProviderProps = {
  children: React.ReactNode;
};

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
