import type { PopcornReference, WatchEntry } from "@/schemas/interests";

/**
 * 劇場鑑賞回数からポップコーンの消費量を推定する
 *
 * @param watches 鑑賞記録一覧
 * @param reference ポップコーンの換算基準
 * @returns 個数・重量・カロリー・体脂肪相当量の推定値
 */
export function calculatePopcornEstimate(
  watches: readonly WatchEntry[],
  reference: PopcornReference,
) {
  const count = watches.filter((watch) => watch.location === "theater").length;
  const caloriesKcal = reference.estimatedCaloriesKcal
    ? count * reference.estimatedCaloriesKcal
    : undefined;

  return {
    count,
    weightKg: (count * reference.estimatedWeightG) / 1000,
    caloriesKcal,
    bodyFatEquivalentKg:
      caloriesKcal === undefined
        ? undefined
        : caloriesKcal / reference.bodyFatKcalPerKg,
  };
}
