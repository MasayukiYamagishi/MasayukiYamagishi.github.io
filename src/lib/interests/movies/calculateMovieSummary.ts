import type { Movie, WatchEntry } from "@/schemas/interests";
import { calculateWatchTime } from "./calculateWatchTime";

export function calculateMovieSummary(
  movies: readonly Movie[],
  watches: readonly WatchEntry[],
  currentYear: number,
) {
  const watchCounts = new Map<string, number>();

  for (const watch of watches) {
    watchCounts.set(watch.movieId, (watchCounts.get(watch.movieId) ?? 0) + 1);
  }

  return {
    watchCount: watches.length,
    uniqueMovieCount: watchCounts.size,
    totalHours: calculateWatchTime(movies, watches).totalHours,
    thisYearCount: watches.filter((watch) =>
      watch.watchedAt?.startsWith(`${currentYear}-`),
    ).length,
    theaterCount: watches.filter((watch) => watch.location === "theater")
      .length,
  };
}
