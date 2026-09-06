import type { Book } from "@/schemas/interests";
import { calculateBookWeight } from "./calculateBookWeight";

/**
 * 書籍一覧から読書状況の概要指標を計算する
 *
 * @param books 書籍一覧
 * @returns 読了冊数・ページ数・重量と読書中の冊数
 */
export function calculateReadingSummary(books: readonly Book[]) {
  const completedBooks = books.filter((book) => book.status === "completed");

  return {
    // A combined manga series is intentionally one row in the reading log.
    // Keep counts aligned with that user-facing unit while pages and weight
    // still use the exact per-volume totals stored on the book.
    completedCount: completedBooks.length,
    completedPages: completedBooks.reduce((sum, book) => sum + book.pages, 0),
    completedWeightKg:
      completedBooks.reduce(
        (sum, book) => sum + calculateBookWeight(book),
        0,
      ) / 1000,
    readingCount: books.filter((book) => book.status === "reading").length,
  };
}
