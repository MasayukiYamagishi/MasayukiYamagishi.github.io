"use client";

import { useEffect, useState } from "react";
import { MobileNavigation } from "./MobileNavigation";

type HeaderNavigationItem = {
  sectionId: string;
  href: string;
  label: string;
};

type HeaderNavigationProps = {
  items: ReadonlyArray<HeaderNavigationItem>;
  openLabel: string;
  closeLabel: string;
  title: string;
  description: string;
};

const ACTIVE_OFFSET_PX = 80;

function useActiveSection(items: ReadonlyArray<HeaderNavigationItem>) {
  const [activeSectionId, setActiveSectionId] = useState(
    items[0]?.sectionId ?? "",
  );

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.sectionId))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    let frameId: number | null = null;

    const updateActiveSection = () => {
      frameId = null;

      let nextActiveSectionId = sections[0].id;

      for (const section of sections) {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop <= ACTIVE_OFFSET_PX + 1) {
          nextActiveSectionId = section.id;
        } else {
          break;
        }
      }

      const isAtPageBottom =
        Math.ceil(window.scrollY + window.innerHeight) >=
        document.documentElement.scrollHeight;

      if (isAtPageBottom) {
        nextActiveSectionId = sections[sections.length - 1].id;
      }

      setActiveSectionId(nextActiveSectionId);
    };

    const scheduleUpdate = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [items]);

  return activeSectionId;
}

export function HeaderNavigation({
  items,
  openLabel,
  closeLabel,
  title,
  description,
}: HeaderNavigationProps) {
  const activeSectionId = useActiveSection(items);

  return (
    <>
      <div className="md:hidden">
        <MobileNavigation
          items={items}
          activeSectionId={activeSectionId}
          openLabel={openLabel}
          closeLabel={closeLabel}
          title={title}
          description={description}
        />
      </div>

      <nav className="hidden items-center gap-1 md:flex" aria-label={title}>
        {items.map((item) => {
          const isActive = item.sectionId === activeSectionId;

          return (
            <a
              key={item.sectionId}
              href={item.href}
              aria-current={isActive ? "location" : undefined}
              className={[
                "rounded-lg px-3 py-2 text-sm font-medium",
                "transition-colors duration-150",
                "active:scale-[0.98]",
                "motion-reduce:transition-none",
                isActive
                  ? "bg-surface-hover text-foreground"
                  : "text-muted hover:bg-surface-hover hover:text-foreground",
              ].join(" ")}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </>
  );
}
