"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons/Icon";
import type { InterestsDictionary } from "./types";

type PaginationProps = {
  name: string;
  locale: "ja" | "en";
  currentPage: number;
  totalPages: number;
  startItem: number;
  endItem: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  dictionary: InterestsDictionary["common"]["pagination"];
};

export function Pagination({
  name,
  locale,
  currentPage,
  totalPages,
  startItem,
  endItem,
  totalItems,
  onPageChange,
  dictionary,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const numberFormat = new Intl.NumberFormat(
    locale === "ja" ? "ja-JP" : "en-US",
  );
  const range = dictionary.range
    .replace("{start}", numberFormat.format(startItem))
    .replace("{end}", numberFormat.format(endItem))
    .replace("{total}", numberFormat.format(totalItems));
  const page = dictionary.page
    .replace("{current}", numberFormat.format(currentPage))
    .replace("{total}", numberFormat.format(totalPages));

  return (
    <nav
      aria-label={dictionary.navigationLabel.replace("{name}", name)}
      className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <p
        className="whitespace-nowrap font-mono text-xs text-muted"
        aria-live="polite"
      >
        {range}
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <Icon icon={ChevronLeft} size={16} aria-hidden="true" />
          {dictionary.previous}
        </Button>
        <span className="min-w-24 whitespace-nowrap text-center font-mono text-xs text-muted">
          {page}
        </span>
        <Button
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          {dictionary.next}
          <Icon icon={ChevronRight} size={16} aria-hidden="true" />
        </Button>
      </div>
    </nav>
  );
}
