import type { ShelfStage } from "@/lib/interests";
import type { ReadingWarningKey } from "@/lib/interests";
import type { Book, Shelf } from "@/schemas/interests";
import { SectionHeading } from "../SectionHeading";
import type { InterestsDictionary } from "../types";
import { CurrentlyReading } from "./CurrentlyReading";
import { ReadingBacklog } from "./ReadingBacklog";
import { ReadingHistory } from "./ReadingHistory";
import { ReadingSummary } from "./ReadingSummary";
import { ReadingWarnings } from "./ReadingWarnings";
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
    backlogCount: number;
  };
  load: {
    currentWeightKg: number;
    loadPercentage: number;
    stage: ShelfStage;
    exceeded: boolean;
  };
  destroyedShelfCount: number;
  warnings: readonly ReadingWarningKey[];
  dictionary: InterestsDictionary["books"];
};

export function BooksPanel({
  locale,
  books,
  shelf,
  summary,
  load,
  destroyedShelfCount,
  warnings,
  dictionary,
}: BooksPanelProps) {
  const currentlyReading = books.filter((book) => book.status === "reading");
  const backlog = books.filter((book) => book.status === "backlog");
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
        destroyedShelfCount={destroyedShelfCount}
        dictionary={dictionary}
      />
      <ShelfStatus
        locale={locale}
        shelf={shelf}
        destroyedShelfCount={destroyedShelfCount}
        load={load}
        dictionary={dictionary.shelf}
      />
      <ReadingWarnings warnings={warnings} dictionary={dictionary} />
      <CurrentlyReading
        books={currentlyReading}
        locale={locale}
        dictionary={dictionary}
      />
      <ReadingBacklog books={backlog} locale={locale} dictionary={dictionary} />
      <ReadingHistory
        books={completed}
        locale={locale}
        dictionary={dictionary}
      />
    </div>
  );
}
