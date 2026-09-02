"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import {
  defaultTheme,
  isTheme,
  ResolvedTheme,
  Theme,
  themeAttribute,
  themeStorageKey,
} from "@/config/theme";

type ThemeProviderProps = {
  children: ReactNode;
};

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme?: ResolvedTheme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return defaultTheme;
  }

  try {
    const storedTheme = localStorage.getItem(themeStorageKey);

    return isTheme(storedTheme) ? storedTheme : defaultTheme;
  } catch {
    return defaultTheme;
  }
}

/**
 * テーマ設定を子孫コンポーネントへ提供するプロバイダー
 *
 * @param ThemeProviderProps props
 * @returns テーマプロバイダーのJSX
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>();
  const resolvedTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    function handleSystemThemeChange() {
      setSystemTheme(getSystemTheme());
    }

    handleSystemThemeChange();
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  useEffect(() => {
    if (!resolvedTheme) {
      return;
    }

    document.documentElement.setAttribute(themeAttribute, resolvedTheme);
    document.documentElement.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  useEffect(() => {
    function handleStorageChange(event: StorageEvent) {
      if (event.key !== themeStorageKey) {
        return;
      }

      setThemeState(isTheme(event.newValue) ? event.newValue : defaultTheme);
    }

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme);

    try {
      localStorage.setItem(themeStorageKey, nextTheme);
    } catch {}
  }, []);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [resolvedTheme, setTheme, theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeはThemeProvider内で使用してください。");
  }

  return context;
}
