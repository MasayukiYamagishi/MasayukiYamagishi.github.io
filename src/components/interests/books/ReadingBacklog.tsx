import type { Book } from "@/schemas/interests";
import type { InterestsDictionary } from "../types";
import { ReadingTable } from "./ReadingTable";

type ReadingBacklogProps = {
  books: readonly Book[];
  locale: "ja" | "en";
  dictionary: InterestsDictionary["books"];
};

export function ReadingBacklog({
  books,
  locale,
  dictionary,
}: ReadingBacklogProps) {
  return (
    <section aria-labelledby="reading-backlog-heading">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h3 id="reading-backlog-heading" className="text-xl font-semibold">
          {dictionary.lists.backlog}
        </h3>
        <span className="font-mono text-xs text-muted">{books.length}</span>
      </div>
      <ReadingTable
        books={books}
        locale={locale}
        dictionary={dictionary.lists}
        caption={dictionary.lists.backlog}
      />
    </section>
  );
}
