import { navigationItems } from "@/config/navigation";
import { getDictionary } from "@/i18n/getDictionary";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";
import { ThemeSwitcher } from "../ui/ThemeSwitcher";

type HeaderProps = {
  locale: "ja" | "en";
};

export function Header({ locale }: HeaderProps) {
  const dictionary = getDictionary(locale);

  return (
    <header className="p-4 flex justify-end items-center gap-6">
      <nav className="gap-4 flex" aria-label="Global navigation">
        {navigationItems.map((item) => (
          <a className="text-base" key={item.key} href={`#${item.sectionId}`}>
            {dictionary.navigation[item.key]}
          </a>
        ))}
      </nav>

      <ThemeSwitcher label={dictionary.controls.toggleTheme} />
      <LanguageSwitcher locale={locale} />
    </header>
  );
}
