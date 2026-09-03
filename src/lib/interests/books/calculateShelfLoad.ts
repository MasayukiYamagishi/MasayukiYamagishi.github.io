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
  const currentWeightKg =
    books
      .filter((book) => book.shelfId === shelf.id)
      .reduce((sum, book) => sum + calculateBookWeight(book), 0) / 1000;
  const loadPercentage =
    (currentWeightKg / shelf.referenceCapacityKg) * 100;

  return {
    currentWeightKg,
    loadPercentage,
    stage: getShelfStage(loadPercentage),
    exceeded: loadPercentage >= 100,
  };
}
