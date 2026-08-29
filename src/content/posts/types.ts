import type { Locale } from "@/i18n/config";

type LocalizedText = Record<Locale, string>;

type PostImagePath = `/images/posts/${string}/${string}`;

type GeneratedImage = {
  src: PostImagePath;
  width: number;
  height: number;
};

type ArticleThumbnail = GeneratedImage & {
  alt: LocalizedText;
};

type SocialImage = GeneratedImage & {
  alt: LocalizedText;
};

export type Post = {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  publishedAt: string;
  updatedAt?: string;
  thumbnail: ArticleThumbnail;
  ogImage: SocialImage;
};
