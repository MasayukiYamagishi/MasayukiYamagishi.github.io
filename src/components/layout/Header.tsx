import { navigationItems } from "@/config/navigation";
import { getDictionary } from "@/i18n/getDictionary";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";

type HeaderProps = {
  locale: "ja" | "en";
};

export function Header({ locale }: HeaderProps) {
  const dictionary = getDictionary(locale);

  return (
    <header>
      <nav aria-label="Global navigation">
        {navigationItems.map((item) => (
          <a key={item.key} href={`#${item.sectionId}`}>
            {dictionary.navigation[item.key]}
          </a>
        ))}
      </nav>

      <LanguageSwitcher locale={locale} />
    </header>
  );
}
