import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { parse } from "yaml";
import type { z } from "zod";
import {
  booksFileSchema,
  directorsFileSchema,
  moviesFileSchema,
  referencesFileSchema,
  shelvesFileSchema,
  watchesFileSchema,
} from "@/schemas/interests";

const CONTENT_DIRECTORY = path.join(
  process.cwd(),
  "src",
  "content",
  "interests",
);

async function readYamlFile<T>(fileName: string, schema: z.ZodType<T>) {
  const filePath = path.join(CONTENT_DIRECTORY, fileName);
  let source: string;

  try {
    source = await readFile(filePath, "utf8");
  } catch (error) {
    throw new Error(`趣味データを読み込めません: ${filePath}`, {
      cause: error,
    });
  }

  let rawValue: unknown;

  try {
    rawValue = parse(source);
  } catch (error) {
    throw new Error(`趣味データのYAML解析に失敗しました: ${filePath}`, {
      cause: error,
    });
  }

  const result = schema.safeParse(rawValue);

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => {
        const field = issue.path.length > 0 ? issue.path.join(".") : "(root)";

        return `- ${field}: ${issue.message}`;
      })
      .join("\n");

    throw new Error([`趣味データが不正です: ${filePath}`, issues].join("\n"));
  }

  return result.data;
}

function assertUniqueIds(
  values: readonly { id: string }[],
  collectionName: string,
) {
  const duplicatedId = values.find(
    (value, index) =>
      values.findIndex((candidate) => candidate.id === value.id) !== index,
  )?.id;

  if (duplicatedId) {
    throw new Error(`${collectionName}のIDが重複しています: ${duplicatedId}`);
  }
}

export const getInterestsData = cache(async () => {
  const [
    booksFile,
    shelvesFile,
    moviesFile,
    directorsFile,
    watchesFile,
    references,
  ] =
    await Promise.all([
      readYamlFile("books.yaml", booksFileSchema),
      readYamlFile("shelves.yaml", shelvesFileSchema),
      readYamlFile("movies.yaml", moviesFileSchema),
      readYamlFile("directors.yaml", directorsFileSchema),
      readYamlFile("watches.yaml", watchesFileSchema),
      readYamlFile("references.yaml", referencesFileSchema),
    ]);

  assertUniqueIds(booksFile.books, "書籍");
  assertUniqueIds(shelvesFile.shelves, "棚板");
  assertUniqueIds(moviesFile.movies, "映画");
  assertUniqueIds(watchesFile.watches, "鑑賞記録");

  const duplicatedDirectorName = directorsFile.directors.find(
    (director, index) =>
      directorsFile.directors.findIndex(
        (candidate) => candidate.nameJa === director.nameJa,
      ) !== index,
  )?.nameJa;

  if (duplicatedDirectorName) {
    throw new Error(`監督名が重複しています: ${duplicatedDirectorName}`);
  }

  const shelfIds = new Set(shelvesFile.shelves.map((shelf) => shelf.id));
  const movieIds = new Set(moviesFile.movies.map((movie) => movie.id));
  const directorNames = new Set(
    directorsFile.directors.map((director) => director.nameJa),
  );
  const unknownShelfId = booksFile.books.find(
    (book) => book.shelfId && !shelfIds.has(book.shelfId),
  )?.shelfId;
  const unknownMovieId = watchesFile.watches.find(
    (watch) => !movieIds.has(watch.movieId),
  )?.movieId;
  const unknownBestMovieId = moviesFile.bestMovieIds.find(
    (movieId) => !movieIds.has(movieId),
  );
  const unknownDirectorName = moviesFile.movies
    .flatMap((movie) => movie.directors)
    .find((director) => !directorNames.has(director));

  if (unknownShelfId) {
    throw new Error(`書籍が未定義の棚板を参照しています: ${unknownShelfId}`);
  }

  if (unknownMovieId) {
    throw new Error(`鑑賞記録が未定義の映画を参照しています: ${unknownMovieId}`);
  }

  if (unknownBestMovieId) {
    throw new Error(
      `マイベスト映画5選が未定義の映画を参照しています: ${unknownBestMovieId}`,
    );
  }

  if (unknownDirectorName) {
    throw new Error(`映画が未定義の監督を参照しています: ${unknownDirectorName}`);
  }

  return {
    books: booksFile.books,
    shelves: shelvesFile.shelves,
    movies: moviesFile.movies,
    bestMovies: moviesFile.bestMovieIds.flatMap((movieId) => {
      const movie = moviesFile.movies.find((candidate) => candidate.id === movieId);

      return movie ? [movie] : [];
    }),
    directors: directorsFile.directors,
    watches: watchesFile.watches,
    references,
  } as const;
});

export type InterestsData = Awaited<ReturnType<typeof getInterestsData>>;
