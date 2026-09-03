import { BrandIcon } from "@/components/ui/icons/BrandIcon";
import { Icon } from "@/components/ui/icons/Icon";
import type { Brand } from "@/components/ui/icons/brandIcons";
import { Link } from "lucide-react";
import Image, { type ImageProps } from "next/image";

export type ExternalLinkCardProps = {
  href: string;
  siteName: string;
  title: string;
  description?: string;
  publishedAt?: string;
  imageSrc?: ImageProps["src"];
  brand?: Brand;
  newTabLabel?: string;
};

/**
 * 外部サイトの概要を表示するリンクカード
 *
 * @param ExternalLinkCardProps props
 * @returns 外部リンクカードのJSX
 */
export function ExternalLinkCard({
  href,
  siteName,
  title,
  description,
  publishedAt,
  imageSrc,
  brand,
  newTabLabel,
}: ExternalLinkCardProps) {
  const url = new URL(href);

  if (url.protocol !== "https:") {
    throw new Error(`外部リンクにはHTTPS URLを指定してください: ${href}`);
  }

  return (
    <aside aria-label={`${siteName}: ${title}`}>
      <a
        href={href}
        target={newTabLabel ? "_blank" : undefined}
        rel={newTabLabel ? "noopener noreferrer" : undefined}
        aria-label={newTabLabel}
        className={[
          `
            grid
            min-h-32
            overflow-hidden
            rounded-xl
            border
            border-border
            bg-surface
            transition
            hover:bg-surface-hover
            no-underline!
          `,
          imageSrc
            ? "sm:min-h-40 sm:grid-cols-[minmax(0,3fr)_minmax(12rem,2fr)]"
            : undefined,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="flex min-w-0 flex-col p-4">
          <p className="text-base leading-snug font-semibold text-foreground">
            {title}
          </p>

          {description && (
            <p className="mt-1.5 text-sm leading-6 text-muted">
              {description}
            </p>
          )}

          <p className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-3 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
              {brand ? (
                <BrandIcon
                  brand={brand}
                  size={14}
                  className="inline-block shrink-0"
                />
              ) : (
                <Icon icon={Link} size={14} strokeWidth={1.75} />
              )}
              <span>{siteName}</span>
            </span>

            {publishedAt && <time dateTime={publishedAt}>{publishedAt}</time>}
          </p>
        </div>

        {imageSrc && (
          <div className="relative aspect-[40/21] min-h-0 bg-border sm:aspect-auto">
            <Image
              src={imageSrc}
              alt=""
              fill
              sizes="(max-width: 639px) calc(100vw - 3rem), (max-width: 767px) 40vw, 288px"
              className="object-cover rounded-none! border-0!"
            />
          </div>
        )}
      </a>
    </aside>
  );
}
