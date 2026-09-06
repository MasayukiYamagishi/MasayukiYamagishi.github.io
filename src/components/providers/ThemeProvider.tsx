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

/**
 * システムのカラースキームから解決済みテーマを取得する
 *
 * @returns システム設定に対応するライトまたはダークテーマ
 */
function getSystemTheme(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * ローカルストレージを考慮して初期テーマを取得する
 *
 * @returns 保存済みテーマ。取得できない場合はデフォルトテーマ
 */
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

    /**
     * システムのカラースキーム変更をテーマ状態へ反映する
     *
     * @returns 戻り値なし
     */
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
    /**
     * 別タブで変更されたテーマ設定を現在のタブへ反映する
     *
     * @param event ローカルストレージの変更イベント
     * @returns 戻り値なし
     */
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

/**
 * テーマ設定と更新関数を取得する
 *
 * @returns 現在のテーマ情報と更新関数
 */
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeはThemeProvider内で使用してください。");
  }

  return context;
}
