import type { PopcornReference, WatchEntry } from "@/schemas/interests";

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
