"use client";

import { useRef } from "react";
import type { Book } from "@/schemas/interests";
import { Pagination } from "../Pagination";
import type { InterestsDictionary } from "../types";
import { usePagination } from "../usePagination";
import { ReadingTable } from "./ReadingTable";

type ReadingHistoryProps = {
  books: readonly Book[];
  locale: "ja" | "en";
  pagination: InterestsDictionary["common"]["pagination"];
  dictionary: InterestsDictionary["books"];
};

export function ReadingHistory({
  books,
  locale,
  pagination,
  dictionary,
}: ReadingHistoryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const {
    currentPage,
    totalPages,
    startItem,
    endItem,
    pageItems,
    setCurrentPage,
  } = usePagination(books);

  function handlePageChange(page: number) {
    setCurrentPage(page);
    sectionRef.current?.scrollIntoView({ block: "start" });
  }

  return (
    <section
      ref={sectionRef}
      aria-labelledby="reading-history-heading"
      className="scroll-mt-24"
    >
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h3 id="reading-history-heading" className="text-xl font-semibold">
          {dictionary.lists.completed}
        </h3>
        <span className="font-mono text-xs text-muted">{books.length}</span>
      </div>
      <ReadingTable
        books={pageItems}
        locale={locale}
        dictionary={dictionary.lists}
        caption={dictionary.lists.completed}
      />
      <Pagination
        name={dictionary.lists.completed}
        locale={locale}
        currentPage={currentPage}
        totalPages={totalPages}
        startItem={startItem}
        endItem={endItem}
        totalItems={books.length}
        onPageChange={handlePageChange}
        dictionary={pagination}
      />
    </section>
  );
}
