import { describe, expect, it } from "vitest";
import type {
  FilmReference,
  Movie,
  PopcornReference,
  WatchEntry,
} from "@/schemas/interests";
import { calculateFilmEquivalent } from "./calculateFilmEquivalent";
import { calculateMovieSummary } from "./calculateMovieSummary";
import { calculatePopcornEstimate } from "./calculatePopcornEstimate";
import { calculateWatchTime } from "./calculateWatchTime";
import {
  calculateDirectorRanking,
  calculateGenreRanking,
} from "./rankings";

const movies: Movie[] = [
  {
    id: "movie-one",
    title: "Movie one",
    releaseYear: 2020,
    runtimeMinutes: 90,
    directors: ["Director A", "Director B"],
    genres: ["Drama", "Comedy"],
    countries: ["Japan"],
  },
  {
    id: "movie-two",
    title: "Movie two",
    releaseYear: 2021,
    runtimeMinutes: 120,
    directors: ["Director A"],
    genres: ["Drama", "Science Fiction"],
    countries: ["United States"],
  },
];

const watches: WatchEntry[] = [
  {
    id: "watch-one",
    movieId: "movie-one",
    watchedAt: "2026-01-01",
    location: "theater",
  },
  {
    id: "watch-two",
    movieId: "movie-two",
    watchedAt: "2025-01-01",
    location: "home",
  },
  {
    id: "watch-three",
    movieId: "movie-one",
    watchedAt: "2024-01-01",
    location: "theater",
  },
];

const filmReference: FilmReference = {
  format: "35mm 4-perf",
  fps: 24,
  metersPerMinute: 27.432,
  reel2000FtMeters: 609.6,
  earthEquatorialCircumferenceM: 40_075_036,
};

const popcornReference: PopcornReference = {
  size: "M",
  estimatedWeightG: 100,
  estimatedCaloriesKcal: 500,
  bodyFatKcalPerKg: 7200,
};

describe("calculateWatchTime", () => {
  it("returns zero for no watches", () => {
    expect(calculateWatchTime(movies, [])).toMatchObject({
      totalMinutes: 0,
      days: 0,
      hours: 0,
      minutes: 0,
    });
  });

  it("adds one movie runtime", () => {
    expect(calculateWatchTime(movies, watches.slice(0, 1)).totalMinutes).toBe(90);
  });

  it("counts repeated watches and converts beyond 24 hours", () => {
    const repeated = Array.from({ length: 20 }, (_, index) => ({
      ...watches[0],
      id: `watch-${index}`,
    }));

    expect(calculateWatchTime(movies, repeated)).toMatchObject({
      totalMinutes: 1800,
      days: 1,
      hours: 6,
    });
  });

  it("converts beyond 30 days", () => {
    const repeated = Array.from({ length: 500 }, (_, index) => ({
      ...watches[1],
      id: `watch-${index}`,
    }));

    expect(calculateWatchTime(movies, repeated).days).toBe(41);
  });
});

describe("calculateFilmEquivalent", () => {
  it("returns zero for zero minutes", () => {
    expect(calculateFilmEquivalent(0, filmReference).filmLengthM).toBe(0);
  });

  it("uses the Kodak 90ft-per-minute reference", () => {
    expect(calculateFilmEquivalent(90, filmReference).filmLengthM).toBeCloseTo(
      2468.88,
    );
  });

  it("converts exactly one 2000ft reel", () => {
    const runtime = filmReference.reel2000FtMeters / filmReference.metersPerMinute;

    expect(
      calculateFilmEquivalent(runtime, filmReference).reel2000FtEquivalent,
    ).toBeCloseTo(1);
  });

  it("calculates an earth-lap equivalent", () => {
    const runtime =
      filmReference.earthEquatorialCircumferenceM /
      filmReference.metersPerMinute;

    const equivalent = calculateFilmEquivalent(runtime, filmReference);

    expect(equivalent.earthCircumferenceKm).toBeCloseTo(40_075.036);
    expect(equivalent.earthLapEquivalent).toBeCloseTo(1);
  });
});

describe("calculatePopcornEstimate", () => {
  it("returns zero when no theater watches exist", () => {
    expect(calculatePopcornEstimate([], popcornReference)).toEqual({
      count: 0,
      weightKg: 0,
      caloriesKcal: 0,
      bodyFatEquivalentKg: 0,
    });
  });

  it("estimates weight and calories from theater watches", () => {
    expect(calculatePopcornEstimate(watches, popcornReference)).toEqual({
      count: 2,
      weightKg: 0.2,
      caloriesKcal: 1000,
      bodyFatEquivalentKg: 1000 / 7200,
    });
  });

  it("supports references without calories", () => {
    expect(
      calculatePopcornEstimate(watches, {
        size: "M",
        estimatedWeightG: 100,
        bodyFatKcalPerKg: 7200,
      }),
    ).toEqual({
      count: 2,
      weightKg: 0.2,
      caloriesKcal: undefined,
      bodyFatEquivalentKg: undefined,
    });
  });
});

describe("rankings", () => {
  it("counts multiple genres per movie and preserves tied ranks", () => {
    expect(calculateGenreRanking(movies)).toEqual([
      { label: "Drama", count: 2, rank: 1 },
      { label: "Comedy", count: 1, rank: 2 },
      { label: "Science Fiction", count: 1, rank: 2 },
    ]);
  });

  it("counts multiple directors", () => {
    expect(calculateDirectorRanking(movies)[0]).toEqual({
      label: "Director A",
      count: 2,
      rank: 1,
    });
  });
});

describe("calculateMovieSummary", () => {
  it("counts watches and unique movies", () => {
    expect(calculateMovieSummary(movies, watches, 2026)).toMatchObject({
      watchCount: 3,
      uniqueMovieCount: 2,
      thisYearCount: 1,
    });
  });

  it("does not count a watch with an unknown date toward the current year", () => {
    const undatedWatch: WatchEntry = {
      id: "watch-undated",
      movieId: "movie-two",
      location: "home",
    };

    expect(
      calculateMovieSummary(movies, [...watches, undatedWatch], 2026),
    ).toMatchObject({ watchCount: 4, thisYearCount: 1 });
  });
});
