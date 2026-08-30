import "server-only";

import { readFile, readdir } from "fs/promises";
import path from "node:path";
import { cache } from "react";
import { parse } from "yaml";
import { postFileSchema } from "./schema";
import type { Post } from "./types";

const EMPTY_POST_ROUTE_SLUG = "__placeholder__";
const POSTS_DIRECTORY = path.join(process.cwd(), "src", "content", "posts");
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

async function getPostSlugs() {
  const entries = await readdir(POSTS_DIRECTORY, {
    withFileTypes: true,
  });

  const directories = entries.filter(
    (entry) => entry.isDirectory() && !entry.name.startsWith("."),
  );

  const invalidDirectory = directories.find(
    (entry) => !SLUG_PATTERN.test(entry.name),
  );

  if (invalidDirectory) {
    throw new Error(
      [
        `記事ディレクトリ名が不正です: ${invalidDirectory.name}`,
        `小文字英数字をハイフンで区切った名称を使用してください。`,
      ].join(" "),
    );
  }

  return directories
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right));
}

async function readPost(slug: string): Promise<Post> {
  const filePath = path.join(POSTS_DIRECTORY, slug, "post.yaml");

  let source: string;

  try {
    source = await readFile(filePath, "utf8");
  } catch (error) {
    throw new Error(`記事メタデータを読み込めません: ${filePath}`, {
      cause: error,
    });
  }

  let rawPost: unknown;

  try {
    rawPost = parse(source);
  } catch (error) {
    throw new Error(`YAMLの解析に失敗しました: ${filePath}`, {
      cause: error,
    });
  }

  const result = postFileSchema.safeParse(rawPost);

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => {
        const field = issue.path.length > 0 ? issue.path.join(".") : "(root)";

        return `- ${field}: ${issue.message}`;
      })
      .join("\n");

    throw new Error(
      [`記事メタデータが不正です: ${filePath}`, issues].join("\n"),
    );
  }

  const { thumbnail, ogImage, ...metadata } = result.data;

  return {
    slug,
    ...metadata,
    thumbnail: {
      src: `/images/posts/${slug}/thumbnail-detail.webp`,
      width: 1600,
      height: 900,
      alt: thumbnail.alt,
    },
    ogImage: {
      src: `/images/posts/${slug}/og.jpg`,
      width: 1200,
      height: 630,
      alt: ogImage.alt,
    },
  } satisfies Post;
}

export const getPosts = cache(async (): Promise<readonly Post[]> => {
  const slugs = await getPostSlugs();

  const posts = await Promise.all(slugs.map((slug) => readPost(slug)));

  posts.sort(
    (left, right) =>
      Date.parse(right.publishedAt) - Date.parse(left.publishedAt),
  );

  return posts;
});

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();

  return posts.find((post) => post.slug === slug);
}

export type { Post } from "./types";

export async function getPostRouteParams() {
  const posts = await getPosts();

  if (posts.length === 0) {
    return [
      {
        slug: EMPTY_POST_ROUTE_SLUG,
      },
    ];
  }

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
