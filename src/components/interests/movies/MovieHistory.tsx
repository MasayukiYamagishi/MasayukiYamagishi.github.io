import type { Movie, WatchEntry } from "@/schemas/interests";
import type { InterestsDictionary } from "../types";

type MovieHistoryProps = {
  movies: readonly Movie[];
  watches: readonly WatchEntry[];
  locale: "ja" | "en";
  dictionary: InterestsDictionary["movies"];
};

export function MovieHistory({
  movies,
  watches,
  locale,
  dictionary,
}: MovieHistoryProps) {
  const moviesById = new Map(movies.map((movie) => [movie.id, movie]));
  const sortedWatches = [...watches].sort((left, right) =>
    (right.watchedAt ?? "").localeCompare(left.watchedAt ?? ""),
  );

  function formatDate(value: string) {
    return new Intl.DateTimeFormat(locale === "ja" ? "ja-JP" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "Asia/Tokyo",
    }).format(new Date(value));
  }

  return (
    <section aria-labelledby="movie-history-heading">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h3 id="movie-history-heading" className="text-xl font-semibold">
          {dictionary.history.heading}
        </h3>
        <span className="font-mono text-xs text-muted">
          {watches.length}
        </span>
      </div>
      <div
        className="overflow-x-auto rounded-2xl border border-border bg-surface"
        role="region"
        aria-label={dictionary.history.heading}
        tabIndex={0}
      >
        <table className="w-full min-w-[58rem] border-collapse text-left text-sm">
          <caption className="sr-only">{dictionary.history.heading}</caption>
          <thead className="bg-background text-xs text-muted">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium sm:px-5">
                {dictionary.history.title}
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                {dictionary.history.originalTitle}
              </th>
              <th scope="col" className="px-4 py-3 text-right font-medium">
                {dictionary.history.releaseYear}
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                {dictionary.history.watchedAt}
              </th>
              <th scope="col" className="px-4 py-3 text-right font-medium">
                {dictionary.history.runtime}
              </th>
              <th scope="col" className="px-4 py-3 font-medium sm:pr-5">
                {dictionary.history.genres}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedWatches.map((watch) => {
              const movie = moviesById.get(watch.movieId);

              if (!movie) return null;

              return (
                <tr
                  key={watch.id}
                  className="border-t border-border transition-colors hover:bg-surface-hover"
                >
                  <th
                    scope="row"
                    className="max-w-72 px-4 py-3 font-semibold text-foreground sm:px-5"
                  >
                    {movie.title}
                  </th>
                  <td className="max-w-72 px-4 py-3 text-muted">
                    {movie.originalTitle ?? "—"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right font-mono tabular-nums">
                    {movie.releaseYear}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-muted">
                    {watch.watchedAt ? (
                      <time dateTime={watch.watchedAt}>
                        {formatDate(watch.watchedAt)}
                      </time>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right font-mono tabular-nums">
                    {movie.runtimeMinutes.toLocaleString(locale)}
                  </td>
                  <td className="px-4 py-3 text-muted sm:pr-5">
                    {movie.genres.join(" / ")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
