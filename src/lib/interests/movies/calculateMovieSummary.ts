import type { Movie, WatchEntry } from "@/schemas/interests";
import { calculateWatchTime } from "./calculateWatchTime";

/**
 * 映画の鑑賞記録から概要指標を計算する
 *
 * @param movies 映画一覧
 * @param watches 鑑賞記録一覧
 * @param currentYear 今年として集計する西暦年
 * @returns 鑑賞回数・作品数・時間などの概要指標
 */
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
