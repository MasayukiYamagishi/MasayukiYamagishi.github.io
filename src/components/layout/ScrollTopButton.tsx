"use client";

import { sectionIds } from "@/config/navigation";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { IconButton } from "../ui/Button";
import { Icon } from "../ui/icons/Icon";

type ScrollTopToButtonProps = {
  label: string;
};

export function ScrollToTopButton({ label }: ScrollTopToButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const aboutSection = document.getElementById(sectionIds.about);

    if (!aboutSection) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      {
        rootMargin: "-80px 0px 0px 0px",
        threshold: 0,
      },
    );

    observer.observe(aboutSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleClick = () => {
    const prefersReduceMotion = window.matchMedia(
      "(prefers-reduces-motion: reduce",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReduceMotion ? "auto" : "smooth",
    });

    const topHeading = document.getElementById(`${sectionIds.about}-heading`);

    if (topHeading instanceof HTMLElement) {
      topHeading.focus({ preventScroll: true });
    }
  };

  return (
    <IconButton
      aria-label={label}
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      variant="outline"
      onClick={handleClick}
      className={[
        "fixed right-6 bottom-6 z-30",
        "sm:right-8 sm:bottom-8",
        isVisible
          ? "transition-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0",
      ].join(" ")}
    >
      <Icon icon={ArrowUp} size={20} />
    </IconButton>
  );
}
