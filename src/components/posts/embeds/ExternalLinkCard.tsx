import { BrandIcon } from "@/components/ui/icons/BrandIcon";
import { Icon } from "@/components/ui/icons/Icon";
import type { Brand } from "@/components/ui/icons/brandIcons";
import { Link } from "lucide-react";
import Image from "next/image";

export type ExternalLinkCardProps = {
  href: string;
  siteName: string;
  title: string;
  description?: string;
  publishedAt?: string;
  imageSrc: `/images/posts/${string}`;
  brand?: Brand;
};

/**
 * 外部リンクカードコンポーネント
 *
 * @param ExternalLinkCardProps props
 * @returns 外部リンクカードコンポーネントのJSX
 */
export function ExternalLinkCard({
  href,
  siteName,
  title,
  description,
  publishedAt,
  imageSrc,
  brand,
}: ExternalLinkCardProps) {
  const url = new URL(href);

  if (url.protocol !== "https:") {
    throw new Error(`埋め込みリンクにはHTTPS URLを指定してください: ${href}`);
  }

  return (
    <aside aria-label={`${siteName}: ${title}`}>
      <a
        href={href}
        className="
                    grid
                    overflow-hidden
                    rounded-xl
                    border
                    border-border
                    bg-surface
                    transition
                    hover:bg-surface-hover
                    no-underline!
                    sm:min-h-40
                    sm:grid-cols-[minmax(0,3fr)_minmax(12rem,2fr)]
                "
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
