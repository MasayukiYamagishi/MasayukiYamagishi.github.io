import { calculateBookWeight } from "@/lib/interests";
import type { Book } from "@/schemas/interests";
import type { InterestsDictionary } from "../types";

type ReadingTableProps = {
  books: readonly Book[];
  locale: "ja" | "en";
  dictionary: InterestsDictionary["books"]["lists"];
  caption: string;
};

export function ReadingTable({
  books,
  locale,
  dictionary,
  caption,
}: ReadingTableProps) {
  return (
    <div
      className="overflow-x-auto rounded-2xl border border-border bg-surface"
      role="region"
      aria-label={caption}
      tabIndex={0}
    >
      <table className="w-full min-w-[58rem] border-collapse text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-background text-xs text-muted">
          <tr>
            <th scope="col" className="px-4 py-3 font-medium sm:px-5">
              {dictionary.columns.title}
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              {dictionary.columns.author}
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              {dictionary.columns.publisher}
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              {dictionary.columns.format}
            </th>
            <th scope="col" className="px-4 py-3 text-right font-medium">
              {dictionary.columns.pages}
            </th>
            <th scope="col" className="px-4 py-3 text-right font-medium">
              {dictionary.columns.weight}
            </th>
            <th scope="col" className="px-4 py-3 font-medium sm:pr-5">
              {dictionary.columns.isbn}
            </th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr
              key={book.id}
              className="border-t border-border transition-colors hover:bg-surface-hover"
            >
              <th
                scope="row"
                className="max-w-72 px-4 py-3 font-semibold text-foreground sm:px-5"
              >
                {book.title}
              </th>
              <td className="px-4 py-3 text-muted">{book.author}</td>
              <td className="px-4 py-3 text-muted">
                {book.publisher ?? "—"}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-muted">
                {dictionary.formats[book.format]}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right font-mono tabular-nums">
                {book.pages.toLocaleString(locale)}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right font-mono tabular-nums">
                {calculateBookWeight(book).toLocaleString(locale)} g
              </td>
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-muted sm:pr-5">
                {book.isbn ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
