import type { Book } from "@/schemas/interests";

export const BOOK_SIZE_PROFILES = {
  bunko: { widthMm: 105, heightMm: 148 },
  shinsho: { widthMm: 103, heightMm: 182 },
  comicSmall: { widthMm: 112, heightMm: 174 },
  comicLarge: { widthMm: 128, heightMm: 188 },
  shiroku: { widthMm: 127, heightMm: 188 },
  b6: { widthMm: 128, heightMm: 182 },
  a5: { widthMm: 148, heightMm: 210 },
  b5: { widthMm: 182, heightMm: 257 },
} as const;

const PAPER_GSM_BY_FORMAT = {
  bunko: 60,
  shinsho: 60,
  comicSmall: 70,
  comicLarge: 92,
  shiroku: 70,
  b6: 70,
  a5: 70,
  b5: 100,
  custom: 70,
} as const satisfies Record<Book["format"], number>;

export function calculateBookWeight(book: Book) {
  if (book.actualWeightG) {
    return book.actualWeightG;
  }

  const fallbackSize =
    book.format === "custom" ? undefined : BOOK_SIZE_PROFILES[book.format];
  const widthMm = book.widthMm ?? fallbackSize?.widthMm;
  const heightMm = book.heightMm ?? fallbackSize?.heightMm;

  if (!widthMm || !heightMm) {
    throw new Error(`重量推定に必要な判型がありません: ${book.id}`);
  }

  const leafCount = Math.ceil(book.pages / 2);
  const pageAreaM2 = (widthMm / 1000) * (heightMm / 1000);
  const bodyPaperWeightG =
    pageAreaM2 * leafCount * PAPER_GSM_BY_FORMAT[book.format];

  if (book.binding === "hardcover") {
    return Math.round(bodyPaperWeightG + 120);
  }

  return Math.round(bodyPaperWeightG * 1.15);
}
