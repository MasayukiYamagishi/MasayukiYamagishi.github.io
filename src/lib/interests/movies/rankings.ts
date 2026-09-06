import type { Movie, WatchEntry } from "@/schemas/interests";

export type RankedValue = {
  label: string;
  count: number;
  rank: number;
};

function toRanking(counts: Map<string, number>): RankedValue[] {
  const sorted = [...counts.entries()].sort(
    ([leftLabel, leftCount], [rightLabel, rightCount]) =>
      rightCount - leftCount || leftLabel.localeCompare(rightLabel),
  );

  return sorted.map(([label, count], index) => ({
    label,
    count,
    rank:
      index > 0 && sorted[index - 1][1] === count
        ? sorted.findIndex((entry) => entry[1] === count) + 1
        : index + 1,
  }));
}

function countValues(values: readonly string[]) {
  const counts = new Map<string, number>();

  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return toRanking(counts);
}

export function calculateGenreRanking(movies: readonly Movie[]) {
  return countValues(movies.flatMap((movie) => movie.genres));
}

export function calculateDirectorRanking(movies: readonly Movie[]) {
  return countValues(movies.flatMap((movie) => movie.directors));
}

export function calculateCountryRanking(movies: readonly Movie[]) {
  return countValues(movies.flatMap((movie) => movie.countries));
}

export function calculateDecadeRanking(movies: readonly Movie[]) {
  return countValues(
    movies.map((movie) => `${Math.floor(movie.releaseYear / 10) * 10}s`),
  );
}

export function calculateLocationRates(watches: readonly WatchEntry[]) {
  const total = watches.length;

  return (["theater", "home", "other"] as const).map((location) => {
    const count = watches.filter((watch) => watch.location === location).length;

    return {
      location,
      count,
      rate: total === 0 ? 0 : count / total,
    };
  });
}
