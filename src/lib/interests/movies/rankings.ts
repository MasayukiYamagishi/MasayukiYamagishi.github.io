import type { Movie, WatchEntry } from "@/schemas/interests";

export type RankedValue = {
  label: string;
  count: number;
  rank: number;
};

/**
 * ラベルごとの件数を同順位に対応したランキングへ変換する
 *
 * @param counts ラベルと件数の対応表
 * @returns 件数の多い順に並べたランキング
 */
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

/**
 * 文字列の出現回数を集計してランキングを作成する
 *
 * @param values 集計する文字列一覧
 * @returns 出現回数に基づくランキング
 */
function countValues(values: readonly string[]) {
  const counts = new Map<string, number>();

  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return toRanking(counts);
}

/**
 * 映画のジャンル別ランキングを計算する
 *
 * @param movies 映画一覧
 * @returns ジャンル別ランキング
 */
export function calculateGenreRanking(movies: readonly Movie[]) {
  return countValues(movies.flatMap((movie) => movie.genres));
}

/**
 * 映画の監督別ランキングを計算する
 *
 * @param movies 映画一覧
 * @returns 監督別ランキング
 */
export function calculateDirectorRanking(movies: readonly Movie[]) {
  return countValues(movies.flatMap((movie) => movie.directors));
}

/**
 * 映画の製作国別ランキングを計算する
 *
 * @param movies 映画一覧
 * @returns 製作国別ランキング
 */
export function calculateCountryRanking(movies: readonly Movie[]) {
  return countValues(movies.flatMap((movie) => movie.countries));
}

/**
 * 映画の公開年代別ランキングを計算する
 *
 * @param movies 映画一覧
 * @returns 公開年代別ランキング
 */
export function calculateDecadeRanking(movies: readonly Movie[]) {
  return countValues(
    movies.map((movie) => `${Math.floor(movie.releaseYear / 10) * 10}s`),
  );
}

/**
 * 鑑賞場所ごとの件数と割合を計算する
 *
 * @param watches 鑑賞記録一覧
 * @returns 鑑賞場所ごとの件数と割合
 */
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
