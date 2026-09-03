import type { Book } from "@/schemas/interests";
import { calculateBookWeight } from "./calculateBookWeight";

export function calculateReadingSummary(books: readonly Book[]) {
  const completedBooks = books.filter((book) => book.status === "completed");

  return {
    completedCount: completedBooks.length,
    completedPages: completedBooks.reduce((sum, book) => sum + book.pages, 0),
    completedWeightKg:
      completedBooks.reduce(
        (sum, book) => sum + calculateBookWeight(book),
        0,
      ) / 1000,
    readingCount: books.filter((book) => book.status === "reading").length,
    backlogCount: books.filter((book) => book.status === "backlog").length,
  };
}
