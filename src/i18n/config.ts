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
  ja: "JA",
  en: "EN",
} as const satisfies Record<Locale, string>;
