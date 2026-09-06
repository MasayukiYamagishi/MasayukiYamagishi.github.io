export const locales = ["ja", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ja";

/**
 * 値がサポート対象の言語かを判定する
 *
 * @param value 判定する文字列
 * @returns サポート対象の言語の場合はtrue
 */
export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const localePaths = {
  ja: "/",
  en: "/en",
} as const satisfies Record<Locale, string>;

export const localeLabels = {
  ja: "日本語",
  en: "English",
} as const satisfies Record<Locale, string>;

/**
 * パスを指定した言語向けのパスに変換する
 *
 * @param pathname 変換元のパス
 * @param targetLocale 変換先の言語
 * @returns 指定した言語向けのパス
 */
export function getLocalizedPathname(pathname: string, targetLocale: Locale) {
  const pathnameWithoutLocale =
    pathname === localePaths.en
      ? localePaths.ja
      : pathname.startsWith(`${localePaths.en}/`)
        ? pathname.slice(localePaths.en.length)
        : pathname;

  if (targetLocale === defaultLocale) {
    return pathnameWithoutLocale;
  }

  return pathnameWithoutLocale === localePaths.ja
    ? localePaths.en
    : `${localePaths.en}${pathnameWithoutLocale}`;
}
