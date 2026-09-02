"use client";

import {
  getLocalizedPathname,
  Locale,
  localeLabels,
  locales,
} from "@/i18n/config";
import { Menu } from "@base-ui/react";
import { Check, ChevronDown, Languages } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./Button";
import { Icon } from "./icons/Icon";

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
};

const menuItemStyles = `
  flex
  cursor-pointer
  select-none
  items-center
  gap-3
  rounded-lg
  px-3
  py-2
  text-sm
  text-foreground
  outline-none
  data-highlighted:bg-surface-hover
`;

/**
 * 表示言語を切り替えるメニュー
 *
 * @param LanguageSwitcherProps props
 * @returns 言語切り替えメニューのJSX
 */
export function LanguageSwitcher({ locale, label }: LanguageSwitcherProps) {
  const pathname = usePathname();

  return (
    <Menu.Root>
      <Menu.Trigger
        render={<Button aria-label={`${label}: ${localeLabels[locale]}`} />}
      >
        <Icon icon={Languages} size={18} />
        <span>{localeLabels[locale]}</span>
        <Icon icon={ChevronDown} size={14} className="opacity-60" />
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Positioner
          align="end"
          sideOffset={8}
          className="z-50 outline-hidden"
        >
          <Menu.Popup
            className="
            origin-(--transform-origin)
            min-w-40
            rounded-xl
            border
            border-border
            bg-background
            p-1
            text-foreground
            shadow-1g
            outline-hidden
            transition-[transform,opacity]
            duration-150
            data-starting-style:scale-95
            data-starting-style:opacity-0
            data-ending-style:scale-95
            data-ending-style:opacity-0
            motion-reduce:transition-none
          "
          >
            {locales.map((targetLocale) => {
              const isCurrent = locale === targetLocale;

              return (
                <Menu.LinkItem
                  key={targetLocale}
                  label={localeLabels[targetLocale]}
                  closeOnClick
                  render={
                    <Link
                      href={getLocalizedPathname(pathname, targetLocale)}
                      hrefLang={targetLocale}
                      lang={targetLocale}
                      aria-current={isCurrent ? "page" : undefined}
                    />
                  }
                  className={[
                    menuItemStyles,
                    isCurrent ? "bg-surface font-semibold" : "",
                  ].join(" ")}
                >
                  <span className="flex-1">{localeLabels[targetLocale]}</span>

                  <span
                    aria-hidden="true"
                    className="inline-flex size-4 items-center justify-center"
                  >
                    {isCurrent && <Icon icon={Check} size={16} />}
                  </span>
                </Menu.LinkItem>
              );
            })}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
