import { describe, expect, it } from "vitest";
import type { Book, Movie } from "@/schemas/interests";
import {
  createDirectorNameLookup,
  getLocalizedBookTitle,
  getLocalizedDirectorName,
  getLocalizedMovieTitle,
  localizeTaxonomyValue,
} from "./localizeInterestData";

const book = {
  id: "test-book",
  title: "日本語の書名",
  titleEn: "English Book Title",
} as Book;

const movie = {
  id: "test-movie",
  title: "日本語の映画名",
  titleEn: "English Movie Title",
  originalTitle: "Titre original",
} as Movie;

describe("interest data localization", () => {
  it("uses the localized book title only for English", () => {
    expect(getLocalizedBookTitle(book, "ja")).toBe("日本語の書名");
    expect(getLocalizedBookTitle(book, "en")).toBe("English Book Title");
  });

  it("prefers an English movie title over the original title", () => {
    expect(getLocalizedMovieTitle(movie, "ja")).toBe("日本語の映画名");
    expect(getLocalizedMovieTitle(movie, "en")).toBe("English Movie Title");
  });

  it("falls back to an original movie title when no English title is stored", () => {
    expect(getLocalizedMovieTitle({ ...movie, titleEn: undefined }, "en")).toBe(
      "Titre original",
    );
  });

  it("falls back to the canonical taxonomy value", () => {
    expect(localizeTaxonomyValue("Drama", { Drama: "ドラマ" })).toBe("ドラマ");
    expect(localizeTaxonomyValue("Unknown", { Drama: "ドラマ" })).toBe("Unknown");
  });

  it("uses the English director name only for the English locale", () => {
    const directors = [
      {
        nameJa: "黒澤明",
        nameEn: "Akira Kurosawa",
        sourceUrl: "https://www.wikidata.org/wiki/Q8006",
      },
    ];
    const japaneseNames = createDirectorNameLookup(directors, "ja");
    const englishNames = createDirectorNameLookup(directors, "en");

    expect(getLocalizedDirectorName("黒澤明", japaneseNames)).toBe("黒澤明");
    expect(getLocalizedDirectorName("黒澤明", englishNames)).toBe(
      "Akira Kurosawa",
    );
    expect(getLocalizedDirectorName("Unknown", englishNames)).toBe("Unknown");
  });
});
