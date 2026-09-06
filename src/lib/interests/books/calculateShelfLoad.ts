import type { Book, Shelf } from "@/schemas/interests";
import { calculateBookWeight } from "./calculateBookWeight";

export type ShelfStage = 1 | 2 | 3 | 4;

export function getShelfStage(loadPercentage: number): ShelfStage {
  if (loadPercentage < 40) return 1;
  if (loadPercentage < 60) return 2;
  if (loadPercentage < 80) return 3;
  return 4;
}

export function calculateShelfLoad(
  shelf: Shelf,
  books: readonly Book[],
) {
  const completedWeightG = books
    .filter((book) => book.status === "completed")
    .reduce((sum, book) => sum + calculateBookWeight(book), 0);
  const referenceCapacityG = shelf.referenceCapacityKg * 1000;
  const destroyedShelfCount = Math.floor(
    completedWeightG / referenceCapacityG,
  );
  const currentShelfWeightG =
    completedWeightG - destroyedShelfCount * referenceCapacityG;
  const damagePercentage =
    (currentShelfWeightG / referenceCapacityG) * 100;

  return {
    completedWeightKg: completedWeightG / 1000,
    destroyedShelfCount,
    damagePercentage,
    stage: getShelfStage(damagePercentage),
  };
}
