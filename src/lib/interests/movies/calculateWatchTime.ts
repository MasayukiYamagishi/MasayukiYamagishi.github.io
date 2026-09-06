import type { Movie, WatchEntry } from "@/schemas/interests";

export function calculateWatchTime(
  movies: readonly Movie[],
  watches: readonly WatchEntry[],
) {
  const runtimeByMovieId = new Map(
    movies.map((movie) => [movie.id, movie.runtimeMinutes]),
  );
  const totalMinutes = watches.reduce((sum, watch) => {
    const runtime = runtimeByMovieId.get(watch.movieId);

    if (!runtime) {
      throw new Error(`上映時間を取得できません: ${watch.movieId}`);
    }

    return sum + runtime;
  }, 0);

  return {
    totalMinutes,
    days: Math.floor(totalMinutes / 1440),
    hours: Math.floor((totalMinutes % 1440) / 60),
    minutes: totalMinutes % 60,
    totalHours: totalMinutes / 60,
  };
}
