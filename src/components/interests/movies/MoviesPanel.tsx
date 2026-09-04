import {
  createDirectorNameLookup,
  localizeTaxonomyValue,
} from "@/lib/interests/localizeInterestData";
import type { RankedValue } from "@/lib/interests/movies/rankings";
import type { Director, Movie, WatchEntry } from "@/schemas/interests";
import { MetricCard } from "../MetricCard";
import { SectionHeading } from "../SectionHeading";
import type { InterestsDictionary } from "../types";
import { BestMovies } from "./BestMovies";
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
  bestMovies: readonly Movie[];
  directors: readonly Director[];
  watches: readonly WatchEntry[];
  summary: {
    watchCount: number;
    totalHours: number;
    thisYearCount: number;
    theaterCount: number;
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
    earthCircumferenceKm: number;
    earthLapEquivalent: number;
  };
  popcorn: {
    count: number;
    weightKg: number;
    caloriesKcal?: number;
    bodyFatEquivalentKg?: number;
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
  pagination: InterestsDictionary["common"]["pagination"];
  dictionary: InterestsDictionary["movies"];
};

export function MoviesPanel({
  locale,
  movies,
  bestMovies,
  directors,
  watches,
  summary,
  watchTime,
  film,
  popcorn,
  rankings,
  locationRates,
  pagination,
  dictionary,
}: MoviesPanelProps) {
  const theaterRate =
    locationRates.find((entry) => entry.location === "theater")?.rate ?? 0;
  const homeRate =
    locationRates.find((entry) => entry.location === "home")?.rate ?? 0;
  const localizedGenres = rankings.genres.map((entry) => ({
    ...entry,
    label: localizeTaxonomyValue(entry.label, dictionary.taxonomy.genres),
  }));
  const localizedCountries = rankings.countries.map((entry) => ({
    ...entry,
    label: localizeTaxonomyValue(entry.label, dictionary.taxonomy.countries),
  }));
  const directorNames = createDirectorNameLookup(directors, locale);
  const localizedDirectors = rankings.directors.map((entry) => ({
    ...entry,
    label: directorNames[entry.label] ?? entry.label,
  }));

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
      <BestMovies
        movies={bestMovies}
        directorNames={directorNames}
        genreNames={dictionary.taxonomy.genres}
        locale={locale}
        dictionary={dictionary.bestMovies}
      />

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
            values={localizedGenres}
          />
          <DirectorRanking
            heading={dictionary.rankings.directors}
            values={localizedDirectors}
          />
          <DecadeRanking
            heading={dictionary.rankings.decades}
            values={rankings.decades}
          />
          <CountryRanking
            heading={dictionary.rankings.countries}
            values={localizedCountries}
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
        directorNames={directorNames}
        watches={watches}
        locale={locale}
        pagination={pagination}
        dictionary={dictionary}
      />
    </div>
  );
}
