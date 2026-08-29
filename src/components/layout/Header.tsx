import { navigationItems } from "@/config/navigation";
import { getDictionary } from "@/i18n/getDictionary";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";
import { ThemeSwitcher } from "../ui/ThemeSwitcher";
import { HeaderNavigation } from "./HeaderNavigation";

type HeaderProps = {
  locale: "ja" | "en";
};

export function Header({ locale }: HeaderProps) {
  const dictionary = getDictionary(locale);
  const headerNavigationItems = navigationItems.map((item) => ({
    sectionId: item.sectionId,
    href: `#${item.sectionId}`,
    label: dictionary.navigation[item.key],
  }));

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
          flex
          h-16
          w-full
          items-center
          justify-between
          gap-2
          px-6
          sm:px-8
          md:justify-end
          md:gap-6
      "
      >
        <HeaderNavigation
          items={headerNavigationItems}
          openLabel={dictionary.controls.openNavigation}
          closeLabel={dictionary.controls.closeNavigation}
          title={dictionary.controls.navigationTitle}
          description={dictionary.controls.navigationDescription}
        />

        <div className="flex items-center gap-2">
          <ThemeSwitcher label={dictionary.controls.toggleTheme} />
          <LanguageSwitcher
            locale={locale}
            label={dictionary.controls.selectLanguage}
          />
        </div>
      </div>
    </header>
  );
}
