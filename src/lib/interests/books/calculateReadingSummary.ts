import type { Book } from "@/schemas/interests";
import { calculateBookWeight } from "./calculateBookWeight";

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
