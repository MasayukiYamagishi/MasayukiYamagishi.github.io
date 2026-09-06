import type { Book, Director, Movie } from "@/schemas/interests";

export type InterestLocale = "ja" | "en";

export function getLocalizedBookTitle(book: Book, locale: InterestLocale) {
  return locale === "en" ? (book.titleEn ?? book.title) : book.title;
}

export function getLocalizedMovieTitle(movie: Movie, locale: InterestLocale) {
  return locale === "en"
    ? (movie.titleEn ?? movie.originalTitle ?? movie.title)
    : movie.title;
}

export function localizeTaxonomyValue(
  value: string,
  translations: Readonly<Record<string, string>>,
) {
  return translations[value] ?? value;
}

export function createDirectorNameLookup(
  directors: readonly Director[],
  locale: InterestLocale,
) {
  return Object.fromEntries(
    directors.map((director) => [
      director.nameJa,
      locale === "en" ? director.nameEn : director.nameJa,
    ]),
  ) as Readonly<Record<string, string>>;
}

export function getLocalizedDirectorName(
  name: string,
  directorNames: Readonly<Record<string, string>>,
) {
  return directorNames[name] ?? name;
}
