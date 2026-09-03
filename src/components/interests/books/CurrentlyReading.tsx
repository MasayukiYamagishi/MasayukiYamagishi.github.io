import type { Book } from "@/schemas/interests";
import type { InterestsDictionary } from "../types";
import { ReadingTable } from "./ReadingTable";

type CurrentlyReadingProps = {
  books: readonly Book[];
  locale: "ja" | "en";
  dictionary: InterestsDictionary["books"];
};

export function CurrentlyReading({
  books,
  locale,
  dictionary,
}: CurrentlyReadingProps) {
  return (
    <section aria-labelledby="currently-reading-heading">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h3 id="currently-reading-heading" className="text-xl font-semibold">
          {dictionary.lists.currentlyReading}
        </h3>
        <span className="font-mono text-xs text-muted">{books.length}</span>
      </div>
      <ReadingTable
        books={books}
        locale={locale}
        dictionary={dictionary.lists}
        caption={dictionary.lists.currentlyReading}
      />
    </section>
  );
}
