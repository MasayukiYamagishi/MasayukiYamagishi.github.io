import "server-only";

import { postContentComponents } from "@/components/posts/PostContentComponents";
import type { Locale } from "@/i18n/config";
import { evaluate } from "@mdx-js/mdx";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import * as runtime from "react/jsx-runtime";
import { getPostBySlug } from "./index";

const POSTS_DIRECTORY = path.join(process.cwd(), "src", "content", "posts");

export async function getPostContent(slug: string, locale: Locale) {
  const post = await getPostBySlug(slug);

  if (!post) {
    return undefined;
  }

  const filePath = path.join(POSTS_DIRECTORY, slug, `${locale}.mdx`);

  let source: string;

  try {
    source = await readFile(filePath, "utf8");
  } catch (error) {
    throw new Error(`記事本文を読み込めません: ${filePath}`, {
      cause: error,
    });
  }

  try {
    const { default: Content } = await evaluate(source, {
      ...runtime,
      baseUrl: pathToFileURL(filePath),
      useMDXComponents: () => postContentComponents,
    });

    return Content;
  } catch (error) {
    throw new Error(`MDXのコンパイルに失敗しました: ${filePath}`, {
      cause: error,
    });
  }
}
