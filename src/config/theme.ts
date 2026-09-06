export const themes = ["system", "light", "dark"] as const;

export type Theme = (typeof themes)[number];
export type ResolvedTheme = Exclude<Theme, "system">;

export const defaultTheme: Theme = "system";
export const themeStorageKey = "theme";
export const themeAttribute = "data-theme";

/**
 * 値が利用可能なテーマかを判定する
 *
 * @param value 判定する値
 * @returns 利用可能なテーマの場合はtrue
 */
export function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && themes.includes(value as Theme);
}

export const themeInitializationScript = `
(() => {
  const root = document.documentElement;
  let theme = ${JSON.stringify(defaultTheme)};

  try {
    const storedTheme = localStorage.getItem(${JSON.stringify(themeStorageKey)});

    if (${JSON.stringify(themes)}.includes(storedTheme)) {
      theme = storedTheme;
    }
  } catch {}

  const resolvedTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  root.setAttribute(${JSON.stringify(themeAttribute)}, resolvedTheme);
  root.style.colorScheme = resolvedTheme;
})();
`;
