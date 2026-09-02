export const locales = ["ja", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ja";

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

export function getLocalizedPathname(pathname: string, targetLocale: Locale) {
  const pathnameWithoutLocale =
    pathname === localeLabels.en
      ? localePaths.ja
      : pathname.startsWith(`${localePaths.en}`)
        ? pathname.slice(localePaths.en.length)
        : pathname;

  if (targetLocale === defaultLocale) {
    return pathnameWithoutLocale;
  }

  return pathnameWithoutLocale === localePaths.ja
    ? localePaths.en
    : `${localePaths.en}${pathnameWithoutLocale}`;
}
