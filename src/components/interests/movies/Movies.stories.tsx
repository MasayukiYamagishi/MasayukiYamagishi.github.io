import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ja } from "@/i18n/dictionaries/ja";
import type { Movie, WatchEntry } from "@/schemas/interests";
import { DirectorRanking } from "./DirectorRanking";
import { GenreRanking } from "./GenreRanking";
import { MovieHistory } from "./MovieHistory";
import { MovieSummary } from "./MovieSummary";
import { PopcornMetric } from "./PopcornMetric";
import { WatchTimeMetric } from "./WatchTimeMetric";

const movie: Movie = {
  id: "arrival",
  title: "メッセージ",
  originalTitle: "Arrival",
  releaseYear: 2016,
  runtimeMinutes: 116,
  directors: ["Denis Villeneuve"],
  genres: ["Science Fiction", "Drama"],
  countries: ["United States", "Canada"],
};

const watch: WatchEntry = {
  id: "watch-arrival",
  movieId: "arrival",
  watchedAt: "2026-08-10",
  location: "home",
  favorite: true,
};

const meta = {
  title: "Interests/Movies",
  component: MovieSummary,
  parameters: { layout: "padded" },
  args: {
    locale: "ja",
    summary: {
      watchCount: 15,
      totalHours: 34.2,
      thisYearCount: 4,
      theaterCount: 6,
      rewatchedMovieCount: 3,
      favoriteCount: 6,
    },
    dictionary: ja.interests.movies,
  },
} satisfies Meta<typeof MovieSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Summary: Story = {};

export const WatchTime: Story = {
  render: () => (
    <WatchTimeMetric
      watchTime={{ days: 1, hours: 10, minutes: 12, totalMinutes: 2052 }}
      film={{
        filmLengthM: 56291,
        reel2000FtEquivalent: 92.3,
        earthLapEquivalent: 0.0014,
      }}
      dictionary={ja.interests.movies}
    />
  ),
};

export const WithoutCalories: Story = {
  render: () => (
    <PopcornMetric
      estimate={{ count: 6, weightKg: 0.6 }}
      dictionary={ja.interests.movies.popcorn}
    />
  ),
};

export const WithCalories: Story = {
  render: () => (
    <PopcornMetric
      estimate={{ count: 6, weightKg: 0.6, caloriesKcal: 3000 }}
      dictionary={ja.interests.movies.popcorn}
    />
  ),
};

export const LargeEstimate: Story = {
  render: () => (
    <PopcornMetric
      estimate={{ count: 137, weightKg: 13.7, caloriesKcal: 68500 }}
      dictionary={ja.interests.movies.popcorn}
    />
  ),
};

export const Genres: Story = {
  render: () => (
    <GenreRanking
      heading={ja.interests.movies.rankings.genres}
      note={ja.interests.movies.rankings.genreNote}
      values={[
        { rank: 1, label: "Drama", count: 9 },
        { rank: 2, label: "Science Fiction", count: 6 },
        { rank: 3, label: "Action", count: 4 },
      ]}
    />
  ),
};

export const Directors: Story = {
  render: () => (
    <DirectorRanking
      heading={ja.interests.movies.rankings.directors}
      values={[
        { rank: 1, label: "Denis Villeneuve", count: 3 },
        { rank: 2, label: "宮﨑駿", count: 1 },
      ]}
    />
  ),
};

export const HistoryTable: Story = {
  render: () => (
    <MovieHistory
      movies={[movie]}
      watches={[watch]}
      locale="ja"
      dictionary={ja.interests.movies}
    />
  ),
};
