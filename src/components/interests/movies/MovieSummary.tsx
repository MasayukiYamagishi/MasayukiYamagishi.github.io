import { MetricCard } from "../MetricCard";
import type { InterestsDictionary } from "../types";

type MovieSummaryProps = {
  locale: "ja" | "en";
  summary: {
    watchCount: number;
    totalHours: number;
    thisYearCount: number;
    theaterCount: number;
    rewatchedMovieCount: number;
    favoriteCount: number;
  };
  dictionary: InterestsDictionary["movies"];
};

export function MovieSummary({
  locale,
  summary,
  dictionary,
}: MovieSummaryProps) {
  const format = new Intl.NumberFormat(locale === "ja" ? "ja-JP" : "en-US");

  return (
    <section aria-labelledby="movie-summary-heading">
      <h3
        id="movie-summary-heading"
        className="mb-4 text-sm font-semibold text-foreground"
      >
        {dictionary.summaryHeading}
      </h3>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        <MetricCard
          label={dictionary.metrics.watched}
          value={format.format(summary.watchCount)}
          unit={dictionary.units.movies}
          accent
        />
        <MetricCard
          label={dictionary.metrics.hours}
          value={format.format(Math.round(summary.totalHours))}
          unit={dictionary.units.hours}
        />
        <MetricCard
          label={dictionary.metrics.thisYear}
          value={format.format(summary.thisYearCount)}
          unit={dictionary.units.movies}
        />
        <MetricCard
          label={dictionary.metrics.theaters}
          value={format.format(summary.theaterCount)}
          unit={dictionary.units.movies}
        />
        <MetricCard
          label={dictionary.metrics.rewatched}
          value={format.format(summary.rewatchedMovieCount)}
          unit={dictionary.units.movies}
        />
        <MetricCard
          label={dictionary.metrics.favorites}
          value={format.format(summary.favoriteCount)}
          unit={dictionary.units.movies}
        />
      </div>
    </section>
  );
}
