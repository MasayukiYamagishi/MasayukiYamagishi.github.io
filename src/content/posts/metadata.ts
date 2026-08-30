import "server-only";

import { siteConfig } from "@/config/site";
import { defaultLocale, localePaths, type Locale } from "@/i18n/config";
import type { Metadata } from "next";
import { getPostBySlug } from "./index";

const openGraphLocales = {
  ja: "ja-JP",
  en: "en-US",
} as const satisfies Record<Locale, string>;

function getPostPath(locale: Locale, slug: string) {
  const prefix = locale === defaultLocale ? "" : localePaths[locale];

  return `${prefix}/posts/${slug}`;
}

export async function getPostMetadata(
  slug: string,
  locale: Locale,
): Promise<Metadata> {
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  const title = post.title[locale];
  const description = post.description[locale];

  const japanesePath = getPostPath("ja", slug);
  const englishPath = getPostPath("en", slug);
  const canonicalPath = getPostPath(locale, slug);

  const canonicalUrl = new URL(canonicalPath, siteConfig.url);
  const ogImageUrl = new URL(post.ogImage.src, siteConfig.url);

  return {
    title,
    description,

    alternates: {
      canonical: canonicalUrl,
      languages: {
        ja: new URL(japanesePath, siteConfig.url),
        en: new URL(englishPath, siteConfig.url),
        "x-default": new URL(japanesePath, siteConfig.url),
      },
    },

    openGraph: {
      type: "article",
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: openGraphLocales[locale],
      alternateLocale:
        locale === "ja" ? openGraphLocales.en : openGraphLocales.ja,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: [
        {
          url: ogImageUrl,
          width: post.ogImage.width,
          height: post.ogImage.height,
          alt: post.ogImage.alt[locale],
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          alt: post.ogImage.alt[locale],
        },
      ],
    },
  };
}
