import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { parse } from "yaml";
import type { z } from "zod";
import {
  booksFileSchema,
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
  const [booksFile, shelvesFile, moviesFile, watchesFile, references] =
    await Promise.all([
      readYamlFile("books.yaml", booksFileSchema),
      readYamlFile("shelves.yaml", shelvesFileSchema),
      readYamlFile("movies.yaml", moviesFileSchema),
      readYamlFile("watches.yaml", watchesFileSchema),
      readYamlFile("references.yaml", referencesFileSchema),
    ]);

  assertUniqueIds(booksFile.books, "書籍");
  assertUniqueIds(shelvesFile.shelves, "棚板");
  assertUniqueIds(moviesFile.movies, "映画");
  assertUniqueIds(watchesFile.watches, "鑑賞記録");

  const shelfIds = new Set(shelvesFile.shelves.map((shelf) => shelf.id));
  const movieIds = new Set(moviesFile.movies.map((movie) => movie.id));
  const unknownShelfId = booksFile.books.find(
    (book) => book.shelfId && !shelfIds.has(book.shelfId),
  )?.shelfId;
  const unknownMovieId = watchesFile.watches.find(
    (watch) => !movieIds.has(watch.movieId),
  )?.movieId;

  if (unknownShelfId) {
    throw new Error(`書籍が未定義の棚板を参照しています: ${unknownShelfId}`);
  }

  if (unknownMovieId) {
    throw new Error(`鑑賞記録が未定義の映画を参照しています: ${unknownMovieId}`);
  }

  return {
    books: booksFile.books,
    shelves: shelvesFile.shelves,
    movies: moviesFile.movies,
    watches: watchesFile.watches,
    references,
  } as const;
});

export type InterestsData = Awaited<ReturnType<typeof getInterestsData>>;
