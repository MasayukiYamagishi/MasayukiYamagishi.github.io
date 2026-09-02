import { Post } from "@/content/posts/types";
import { defaultLocale, Locale, localePaths } from "@/i18n/config";
import Image from "next/image";
import Link from "next/link";

type ArticleCardProps = {
  post: Post;
  locale: Locale;
  dictionary: {
    publishedAt: string;
    updatedAt: string;
  };
};

const dateLocales = {
  ja: "ja-JP",
  en: "en-US",
} as const satisfies Record<Locale, string>;

function getPostHref(locale: Locale, slug: string) {
  const prefix = locale === defaultLocale ? "" : localePaths[locale];

  return `${prefix}/posts/${slug}`;
}

function formatDate(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(dateLocales[locale], {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "Asia/Tokyo",
  }).format(new Date(value));
}

/**
 * Postsセクションに掲載するカードコンポーネント
 *
 * @param ArticleCardProps props
 * @returns Posts用カードコンポーネント
 */
export function ArticleCard({ post, locale, dictionary }: ArticleCardProps) {
  return (
    <article className="h-full">
      <Link
        href={getPostHref(locale, post.slug)}
        className="
          group
          flex
          h-full
          flex-col
          overflow-hidden
          rounded-2xl
          border
          border-border
          bg-surface
          transition
          duration-200
          hover:-translate-y-0.5
          hover:bg-surface-hover
          hover:shadow-lg
        "
      >
        <div className="relative aspect-video overflow-hidden bg-border">
          <Image
            src={post.thumbnail.src}
            alt={post.thumbnail.alt[locale]}
            width={post.thumbnail.width}
            height={post.thumbnail.height}
            sizes="
              (max-width: 639px) calc(100vw - 3rem),
              (max-width: 1023px) 50vw,
              320px
            "
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
          <h3 className="text-base leading-snug font-semibold text-foreground">
            {post.title[locale]}
          </h3>
          <dl className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
            <div className="flex gap-1">
              <dt>{dictionary.publishedAt}</dt>
              <dd>
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt, locale)}
                </time>
              </dd>
            </div>

            {post.updatedAt && (
              <div className="flex gap-1">
                <dt>{dictionary.updatedAt}</dt>
                <dd>
                  <time dateTime={post.updatedAt}>
                    {formatDate(post.updatedAt, locale)}
                  </time>
                </dd>
              </div>
            )}
          </dl>

          <p className="line-clamp-2 text-sm leading-6 text-muted">
            {post.description[locale]}
          </p>
        </div>
      </Link>
    </article>
  );
}
