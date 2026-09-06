import type { Book, Shelf } from "@/schemas/interests";
import { calculateBookWeight } from "./calculateBookWeight";

export type ShelfStage = 1 | 2 | 3 | 4;

/**
 * 棚板への負荷率から表示ステージを判定する
 *
 * @param loadPercentage 棚板への負荷率
 * @returns 負荷率に対応するステージ
 */
export function getShelfStage(loadPercentage: number): ShelfStage {
  if (loadPercentage < 40) return 1;
  if (loadPercentage < 60) return 2;
  if (loadPercentage < 80) return 3;
  return 4;
}

/**
 * 読了した本の重量から棚板への負荷を計算する
 *
 * @param shelf 棚板データ
 * @param books 書籍一覧
 * @returns 累積重量・破壊枚数・負荷率・表示ステージ
 */
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
