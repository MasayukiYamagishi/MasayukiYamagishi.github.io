import { Icon } from "@/components/ui/icons/Icon";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export type ExternalLinkCardProps = {
  href: string;
  siteName: string;
  title: string;
  description?: string;
  publishedAt?: string;
  imageSrc: `/images/posts/${string}`;
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
}: ExternalLinkCardProps) {
  const url = new URL(href);

  if (url.protocol !== "https:") {
    throw new Error(`埋め込みリンクにはHTTPS URLを指定してください: ${href}`);
  }

  return (
    <aside aria-label="`${siteName}: ${title}`">
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
                    sm:grid-cols-[minmax(0,1fr)_12rem]
                "
      >
        <div className="min-w-0 p-4">
          <p className="flex flex-wrap gap-2 text-xs text-muted">
            <span>{siteName}</span>

            {publishedAt && <time dateTime={publishedAt}>{publishedAt}</time>}
          </p>

          <p className="mt-2 flex items-start gap-2 font-semibold text-foreground">
            <span>{title}</span>
            <Icon icon={ArrowUpRight} size={16} className="mt-1 shrink-0" />
          </p>

          {description && (
            <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
          )}
        </div>

        {imageSrc && (
          <Image
            src={imageSrc}
            alt=""
            width={1200}
            height={630}
            sizes="(max-width: 640px) 100vw, 192px"
            className="h-full w-full object-cover rounded-none! border-0!"
          />
        )}
      </a>
    </aside>
  );
}
