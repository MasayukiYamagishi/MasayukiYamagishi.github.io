import { ScrollToTopButton } from "@/components/layout/ScrollTopButton";
import { getInterestsData } from "@/content/interests";
import { pageTopIds } from "@/config/navigation";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import {
  calculateCountryRanking,
  calculateDecadeRanking,
  calculateDirectorRanking,
  calculateFilmEquivalent,
  calculateGenreRanking,
  calculateLocationRates,
  calculateMovieSummary,
  calculatePopcornEstimate,
  calculateReadingSummary,
  calculateShelfLoad,
  calculateWatchTime,
  getReadingWarnings,
} from "@/lib/interests";
import { BooksPanel } from "./books/BooksPanel";
import { MoviesPanel } from "./movies/MoviesPanel";
import { InterestsTabs } from "./InterestsTabs";

type InterestsPageProps = {
  locale: Locale;
};

export async function InterestsPage({ locale }: InterestsPageProps) {
  const data = await getInterestsData();
  const dictionary = getDictionary(locale);
  const readingSummary = calculateReadingSummary(data.books);
  const activeShelf = data.shelves.find((shelf) => shelf.status === "active");

  if (!activeShelf) {
    throw new Error("表示できる現役の棚板がありません。");
  }

  const shelfLoad = calculateShelfLoad(activeShelf, data.books);
  const destroyedShelfCount = data.shelves.filter(
    (shelf) => shelf.status === "retired",
  ).length;
  const movieSummary = calculateMovieSummary(
    data.movies,
    data.watches,
    new Date().getFullYear(),
  );
  const watchTime = calculateWatchTime(data.movies, data.watches);

  return (
    <>
      <main className="mx-auto w-full max-w-5xl px-6 pb-20 sm:px-8">
        <section
          id={pageTopIds.section}
          aria-labelledby={pageTopIds.heading}
          className="pt-16 pb-10 sm:pt-20 sm:pb-12"
        >
          <p className="font-mono text-xs font-medium tracking-[0.14em] text-muted uppercase">
            {dictionary.interests.eyebrow}
          </p>
          <h1
            id={pageTopIds.heading}
            tabIndex={-1}
            className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-6xl"
          >
            {dictionary.interests.title}
          </h1>
          <p className="mt-5 max-w-[60ch] text-base leading-7 text-muted sm:text-lg">
            {dictionary.interests.description}
          </p>
        </section>

        <InterestsTabs
          label={dictionary.interests.tabs.label}
          labels={{
            books: dictionary.interests.tabs.books,
            movies: dictionary.interests.tabs.movies,
          }}
          booksPanel={
            <BooksPanel
              locale={locale}
              books={data.books}
              shelf={activeShelf}
              summary={readingSummary}
              load={shelfLoad}
              destroyedShelfCount={destroyedShelfCount}
              warnings={getReadingWarnings(
                readingSummary.backlogCount,
                readingSummary.readingCount,
              )}
              dictionary={dictionary.interests.books}
            />
          }
          moviesPanel={
            <MoviesPanel
              locale={locale}
              movies={data.movies}
              watches={data.watches}
              summary={movieSummary}
              watchTime={watchTime}
              film={calculateFilmEquivalent(
                watchTime.totalMinutes,
                data.references.film,
              )}
              popcorn={calculatePopcornEstimate(
                data.watches,
                data.references.popcorn,
              )}
              rankings={{
                genres: calculateGenreRanking(data.movies),
                directors: calculateDirectorRanking(data.movies),
                decades: calculateDecadeRanking(data.movies),
                countries: calculateCountryRanking(data.movies),
              }}
              locationRates={calculateLocationRates(data.watches)}
              dictionary={dictionary.interests.movies}
            />
          }
        />
      </main>
      <ScrollToTopButton label={dictionary.controls.backToTop} />
    </>
  );
}
