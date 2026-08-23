import { Locale, localeLabels, localePaths, locales } from "@/i18n/config";
import Link from "next/link";

type LanguageSwitcherProps = {
  locale: Locale;
};

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  return (
    <nav aria-label="Language">
      {locales.map((targetLocale) => (
        <Link
          key={targetLocale}
          href={localePaths[targetLocale]}
          aria-current={locale === targetLocale ? "page" : undefined}
        >
          {localeLabels[targetLocale]}
        </Link>
      ))}
    </nav>
  );
}
