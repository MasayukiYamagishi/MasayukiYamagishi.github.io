import type { RankedValue } from "@/lib/interests";
import type { Movie, WatchEntry } from "@/schemas/interests";
import { MetricCard } from "../MetricCard";
import { SectionHeading } from "../SectionHeading";
import type { InterestsDictionary } from "../types";
import { CountryRanking } from "./CountryRanking";
import { DecadeRanking } from "./DecadeRanking";
import { DirectorRanking } from "./DirectorRanking";
import { GenreRanking } from "./GenreRanking";
import { MovieHistory } from "./MovieHistory";
import { MovieSummary } from "./MovieSummary";
import { PopcornMetric } from "./PopcornMetric";
import { WatchTimeMetric } from "./WatchTimeMetric";

type MoviesPanelProps = {
  locale: "ja" | "en";
  movies: readonly Movie[];
  watches: readonly WatchEntry[];
  summary: {
    watchCount: number;
    totalHours: number;
    thisYearCount: number;
    theaterCount: number;
    rewatchedMovieCount: number;
    favoriteCount: number;
  };
  watchTime: {
    days: number;
    hours: number;
    minutes: number;
    totalMinutes: number;
  };
  film: {
    filmLengthM: number;
    reel2000FtEquivalent: number;
    earthLapEquivalent: number;
  };
  popcorn: {
    count: number;
    weightKg: number;
    caloriesKcal?: number;
  };
  rankings: {
    genres: readonly RankedValue[];
    directors: readonly RankedValue[];
    decades: readonly RankedValue[];
    countries: readonly RankedValue[];
  };
  locationRates: readonly {
    location: "theater" | "home" | "other";
    count: number;
    rate: number;
  }[];
  dictionary: InterestsDictionary["movies"];
};

export function MoviesPanel({
  locale,
  movies,
  watches,
  summary,
  watchTime,
  film,
  popcorn,
  rankings,
  locationRates,
  dictionary,
}: MoviesPanelProps) {
  const theaterRate =
    locationRates.find((entry) => entry.location === "theater")?.rate ?? 0;
  const homeRate =
    locationRates.find((entry) => entry.location === "home")?.rate ?? 0;

  return (
    <div className="space-y-14 sm:space-y-16">
      <SectionHeading heading={dictionary.heading} description={dictionary.intro} />
      <MovieSummary locale={locale} summary={summary} dictionary={dictionary} />
      <WatchTimeMetric
        watchTime={watchTime}
        film={film}
        dictionary={dictionary}
      />
      <PopcornMetric estimate={popcorn} dictionary={dictionary.popcorn} />

      <section aria-labelledby="movie-patterns-heading">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h3 id="movie-patterns-heading" className="text-xl font-semibold">
            {dictionary.rankings.heading}
          </h3>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <GenreRanking
            heading={dictionary.rankings.genres}
            note={dictionary.rankings.genreNote}
            values={rankings.genres}
          />
          <DirectorRanking
            heading={dictionary.rankings.directors}
            values={rankings.directors}
          />
          <DecadeRanking
            heading={dictionary.rankings.decades}
            values={rankings.decades}
          />
          <CountryRanking
            heading={dictionary.rankings.countries}
            values={rankings.countries}
          />
          <MetricCard
            label={dictionary.rankings.location}
            value={`${Math.round(theaterRate * 100)}% / ${Math.round(homeRate * 100)}%`}
            detail={`${dictionary.history.locations.theater} / ${dictionary.history.locations.home}`}
          />
        </div>
      </section>

      <MovieHistory
        movies={movies}
        watches={watches}
        locale={locale}
        dictionary={dictionary}
      />
    </div>
  );
}
