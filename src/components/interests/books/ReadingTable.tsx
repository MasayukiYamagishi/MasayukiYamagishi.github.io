import { calculateBookWeight } from "@/lib/interests/books/calculateBookWeight";
import { getLocalizedBookTitle } from "@/lib/interests/localizeInterestData";
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
  const numberFormat = new Intl.NumberFormat(locale === "ja" ? "ja-JP" : "en-US");

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
            <th scope="col" className="whitespace-nowrap px-4 py-3 font-medium sm:px-5">
              {dictionary.columns.title}
            </th>
            <th scope="col" className="whitespace-nowrap px-4 py-3 font-medium">
              {dictionary.columns.author}
            </th>
            <th scope="col" className="whitespace-nowrap px-4 py-3 font-medium">
              {dictionary.columns.publisher}
            </th>
            <th scope="col" className="whitespace-nowrap px-4 py-3 font-medium">
              {dictionary.columns.format}
            </th>
            <th scope="col" className="whitespace-nowrap px-4 py-3 text-right font-medium">
              {dictionary.columns.pages}
            </th>
            <th scope="col" className="whitespace-nowrap px-4 py-3 text-right font-medium">
              {dictionary.columns.weight}
            </th>
            <th scope="col" className="whitespace-nowrap px-4 py-3 font-medium sm:pr-5">
              {dictionary.columns.isbn}
            </th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => {
            const isbnEntries = book.volumes
              ? book.volumes
                  .filter((volume) => volume.isbn)
                  .map((volume) => ({
                    label: volume.label,
                    isbn: volume.isbn as string,
                    sourceUrl: volume.sourceUrl,
                  }))
              : book.isbn
                ? [{ label: "", isbn: book.isbn, sourceUrl: book.sourceUrl }]
                : [];

            return (
              <tr
                key={book.id}
                className="border-t border-border transition-colors hover:bg-surface-hover"
              >
                <th
                  scope="row"
                  className="max-w-72 px-4 py-3 font-semibold text-foreground sm:px-5"
                >
                  {getLocalizedBookTitle(book, locale)}
                </th>
                <td className="px-4 py-3 text-muted">{book.author}</td>
                <td className="px-4 py-3 text-muted">
                  {book.publisher ?? "—"}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-muted">
                  {dictionary.formats[book.format]}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right font-mono tabular-nums">
                  {numberFormat.format(book.pages)}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right font-mono tabular-nums">
                  {numberFormat.format(calculateBookWeight(book))} g
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted sm:pr-5">
                  {isbnEntries.length === 0 ? (
                    "—"
                  ) : isbnEntries.length === 1 ? (
                    isbnEntries[0].sourceUrl ? (
                      <a
                        href={isbnEntries[0].sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="whitespace-nowrap underline decoration-border underline-offset-4 hover:text-foreground"
                      >
                        {isbnEntries[0].isbn}
                      </a>
                    ) : (
                      isbnEntries[0].isbn
                    )
                  ) : (
                    <details className="group min-w-28">
                      <summary className="cursor-pointer whitespace-nowrap text-foreground marker:text-muted">
                        {locale === "ja"
                          ? `${numberFormat.format(isbnEntries.length)}件`
                          : `${numberFormat.format(isbnEntries.length)} ISBNs`}
                      </summary>
                      <ul className="mt-2 space-y-1.5 whitespace-nowrap">
                        {isbnEntries.map((entry) => (
                          <li key={`${book.id}-${entry.label}`}>
                            <span className="mr-2 text-muted">
                              {entry.label}
                            </span>
                            {entry.sourceUrl ? (
                              <a
                                href={entry.sourceUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="underline decoration-border underline-offset-4 hover:text-foreground"
                              >
                                {entry.isbn}
                              </a>
                            ) : (
                              entry.isbn
                            )}
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
