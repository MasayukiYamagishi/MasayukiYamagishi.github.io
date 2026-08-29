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
    <header
      className="
      fixed
      inset-x-0
      top-0
      z-40
      border-b
      border-border/60
      bg-background/90
      backdrop-blur-sm
      backdrop-saturate-150
      supports-backdrop-filter:bg-background/65
    "
    >
      <div
        className="
          mx-auto
          flex
          h-16
          w-full
          max-w-5xl
          items-center
          justify-end
          gap-6
          px-6
          sm:px-8
      "
      >
        <nav className="mr-2 gap-4 flex" aria-label="Global navigation">
          {navigationItems.map((item) => (
            <a className="text-base" key={item.key} href={`#${item.sectionId}`}>
              {dictionary.navigation[item.key]}
            </a>
          ))}
        </nav>

        <ThemeSwitcher label={dictionary.controls.toggleTheme} />
        <LanguageSwitcher
          locale={locale}
          label={dictionary.controls.selectLanguage}
        />
      </div>
    </header>
  );
}
