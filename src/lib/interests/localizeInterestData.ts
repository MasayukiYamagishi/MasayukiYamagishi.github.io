import type { Book, Director, Movie } from "@/schemas/interests";

export type InterestLocale = "ja" | "en";

/**
 * 表示言語に応じた書籍タイトルを取得する
 *
 * @param book 書籍データ
 * @param locale 表示言語
 * @returns ローカライズされた書籍タイトル
 */
export function getLocalizedBookTitle(book: Book, locale: InterestLocale) {
  return locale === "en" ? (book.titleEn ?? book.title) : book.title;
}

/**
 * 表示言語に応じた映画タイトルを取得する
 *
 * @param movie 映画データ
 * @param locale 表示言語
 * @returns ローカライズされた映画タイトル
 */
export function getLocalizedMovieTitle(movie: Movie, locale: InterestLocale) {
  return locale === "en"
    ? (movie.titleEn ?? movie.originalTitle ?? movie.title)
    : movie.title;
}

/**
 * 分類値に対応する翻訳を取得する
 *
 * @param value 翻訳する分類値
 * @param translations 分類値と翻訳の対応表
 * @returns 翻訳。対応する翻訳がない場合は元の値
 */
export function localizeTaxonomyValue(
  value: string,
  translations: Readonly<Record<string, string>>,
) {
  return translations[value] ?? value;
}

/**
 * 日本語の監督名から表示名を取得する対応表を作成する
 *
 * @param directors 監督データ一覧
 * @param locale 表示言語
 * @returns 日本語名とローカライズ済み表示名の対応表
 */
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

/**
 * 監督名の対応表からローカライズ済み表示名を取得する
 *
 * @param name 日本語の監督名
 * @param directorNames 監督名の対応表
 * @returns ローカライズ済み表示名。対応する名前がない場合は元の名前
 */
export function getLocalizedDirectorName(
  name: string,
  directorNames: Readonly<Record<string, string>>,
) {
  return directorNames[name] ?? name;
}
