import type { Book } from "@/schemas/interests";
import type { InterestsDictionary } from "../types";
import { ReadingTable } from "./ReadingTable";

type ReadingHistoryProps = {
  books: readonly Book[];
  locale: "ja" | "en";
  dictionary: InterestsDictionary["books"];
};

export function ReadingHistory({
  books,
  locale,
  dictionary,
}: ReadingHistoryProps) {
  return (
    <section aria-labelledby="reading-history-heading">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h3 id="reading-history-heading" className="text-xl font-semibold">
          {dictionary.lists.completed}
        </h3>
        <span className="font-mono text-xs text-muted">{books.length}</span>
      </div>
      <ReadingTable
        books={books}
        locale={locale}
        dictionary={dictionary.lists}
        caption={dictionary.lists.completed}
      />
    </section>
  );
}
