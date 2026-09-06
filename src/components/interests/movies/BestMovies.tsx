import {
  getLocalizedDirectorName,
  getLocalizedMovieTitle,
} from "@/lib/interests/localizeInterestData";
import type { Movie } from "@/schemas/interests";
import type { InterestsDictionary } from "../types";

type BestMoviesProps = {
  movies: readonly Movie[];
  directorNames: Readonly<Record<string, string>>;
  genreNames: Readonly<Record<string, string>>;
  locale: "ja" | "en";
  dictionary: InterestsDictionary["movies"]["bestMovies"];
};

export function BestMovies({
  movies,
  directorNames,
  genreNames,
  locale,
  dictionary,
}: BestMoviesProps) {
  return (
    <section aria-labelledby="best-movies-heading">
      <h3 id="best-movies-heading" className="mb-4 text-xl font-semibold">
        {dictionary.heading}
      </h3>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {movies.map((movie, index) => (
          <li
            key={movie.id}
            className={[
              "relative flex min-h-40 flex-col overflow-hidden rounded-2xl border border-border bg-surface p-4 text-foreground lg:col-span-2",
              index >= 3 ? "lg:col-span-3" : "",
            ].join(" ")}
          >
            <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xs text-muted">
              <span className="font-mono tabular-nums">
                {movie.releaseYear}
              </span>
              <span aria-hidden="true">·</span>
              <span className="break-keep">
                {movie.genres
                  .map((genre) => genreNames[genre] ?? genre)
                  .join(" / ")}
              </span>
            </p>
            <h4 className="mt-3 break-keep text-lg leading-snug font-semibold tracking-[-0.02em]">
              {getLocalizedMovieTitle(movie, locale)}
            </h4>
            <p className="mt-auto break-keep pt-4 text-xs leading-5 text-muted">
              {movie.directors
                .map((director) =>
                  getLocalizedDirectorName(director, directorNames),
                )
                .join(" / ")}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
