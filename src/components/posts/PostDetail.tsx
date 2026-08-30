import { localePaths, type Locale } from "@/i18n/config";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { Post } from "../../content/posts/types";
import { Icon } from "../ui/icons/Icon";

type PostDetailProps = {
  post: Post;
  locale: Locale;
  dictionary: {
    publishedAt: string;
    updatedAt: string;
    backToPosts: string;
  };
  children: ReactNode;
};

const dateLocales = {
  ja: "ja-JP",
  en: "en-US",
} as const satisfies Record<Locale, string>;

function formatDate(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(dateLocales[locale], {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "Asia/Tokyo",
  }).format(new Date(value));
}

/**
 * 記事詳細
 *
 * @param PostDetailProps props
 * @returns 記事詳細のJSX
 */
export function PostDetail({
  post,
  locale,
  dictionary,
  children,
}: PostDetailProps) {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12 sm:px-8 sm:py-16">
      <Link
        href={`${localePaths[locale]}#posts`}
        className="
          inline-flex
          items-center
          gap-2
          rounded-sm
          text-sm
          font-medium
          text-muted
          underline
          underline-offset-4
          hover:text-foreground
        "
      >
        <span aria-hidden="true">
          <Icon icon={ArrowLeft} size={18} />
          {dictionary.backToPosts}
        </span>
      </Link>

      <article className="mt-8">
        <header className="border-b border-border pb-8">
          <h1 className="text-3xl leading-tight font-semibold text-foreground sm:text-4xl">
            {post.title[locale]}
          </h1>

          <p className="mt-4 text-base leading-7 text-muted">
            {post.description[locale]}
          </p>

          <dl className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
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
        </header>

        <div
          className="
            mt-10
            min-w-0
            space-y-6
            wrap-break-word
            text-base
            leading-8
            text-foreground

            [&_a]:font-medium
            [&_a]:underline
            [&_a]:decoration-muted
            [&_a]:underline-offset-4
            [&_a:hover]:decoration-foreground

            [&_blockquote]:border-l-4
            [&_blockquote]:border-border
            [&_blockquote]:pl-4
            [&_blockquote]:text-muted

            [&_code]:rounded
            [&_code]:bg-surface
            [&_code]:px-1.5
            [&_code]:py-0.5
            [&_code]:font-mono
            [&_code]:text-sm

            [&_h2]:scroll-mt-24
            [&_h2]:border-b
            [&_h2]:border-border
            [&_h2]:pt-8
            [&_h2]:pb-2
            [&_h2]:text-2xl
            [&_h2]:leading-tight
            [&_h2]:font-semibold

            [&_h3]:scroll-mt-24
            [&_h3]:pt-6
            [&_h3]:text-xl
            [&_h3]:leading-snug
            [&_h3]:font-semibold

            [&_hr]:border-border

            [&_img]:h-auto
            [&_img]:max-w-full
            [&_img]:rounded-xl
            [&_img]:border
            [&_img]:border-border

            [&_li]:pl-1
            [&_ol]:list-decimal
            [&_ol]:space-y-2
            [&_ol]:pl-6

            [&_pre]:max-w-full
            [&_pre]:overflow-x-auto
            [&_pre]:overscroll-x-contain
            [&_pre]:rounded-xl
            [&_pre]:border
            [&_pre]:border-border
            [&_pre]:bg-surface
            [&_pre]:p-4
            [&_pre_code]:bg-transparent
            [&_pre_code]:p-0

            [&_table]:block
            [&_table]:w-full
            [&_table]:overflow-x-auto

            [&_ul]:list-disc
            [&_ul]:space-y-2
            [&_ul]:pl-6
        "
        >
          {children}
        </div>
      </article>
    </main>
  );
}
