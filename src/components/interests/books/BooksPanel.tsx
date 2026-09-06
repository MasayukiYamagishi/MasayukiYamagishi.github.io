import type { ReadingWarningKey, ShelfStage } from "@/lib/interests";
import type { Book, Shelf } from "@/schemas/interests";
import { SectionHeading } from "../SectionHeading";
import type { InterestsDictionary } from "../types";
import { CurrentlyReading } from "./CurrentlyReading";
import { ReadingHistory } from "./ReadingHistory";
import { ReadingSummary } from "./ReadingSummary";
import { ShelfStatus } from "./ShelfStatus";

type BooksPanelProps = {
  locale: "ja" | "en";
  books: readonly Book[];
  shelf: Shelf;
  summary: {
    completedCount: number;
    completedPages: number;
    completedWeightKg: number;
    readingCount: number;
  };
  load: {
    completedWeightKg: number;
    destroyedShelfCount: number;
    damagePercentage: number;
    stage: ShelfStage;
  };
  warnings: readonly ReadingWarningKey[];
  pagination: InterestsDictionary["common"]["pagination"];
  dictionary: InterestsDictionary["books"];
};

export function BooksPanel({
  locale,
  books,
  shelf,
  summary,
  load,
  warnings,
  pagination,
  dictionary,
}: BooksPanelProps) {
  const currentlyReading = books.filter((book) => book.status === "reading");
  const completed = books
    .filter((book) => book.status === "completed")
    .sort((left, right) =>
      (right.completedAt ?? "").localeCompare(left.completedAt ?? ""),
    );

  return (
    <div className="space-y-14 sm:space-y-16">
      <SectionHeading heading={dictionary.heading} description={dictionary.intro} />
      <ReadingSummary
        locale={locale}
        summary={summary}
        dictionary={dictionary}
      />
      <ShelfStatus
        shelf={shelf}
        load={load}
        dictionary={dictionary.shelf}
      />
      <CurrentlyReading
        books={currentlyReading}
        locale={locale}
        warnings={warnings}
        dictionary={dictionary}
      />
      <ReadingHistory
        books={completed}
        locale={locale}
        pagination={pagination}
        dictionary={dictionary}
      />
    </div>
  );
}
