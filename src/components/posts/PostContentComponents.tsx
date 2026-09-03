import { ArrowUpRight } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import { Icon } from "../ui/icons/Icon";
import { ExternalLinkCard } from "../ui/ExternalLinkCard";
import { Callout } from "./Callout";
import { YoutubeEmbed } from "./embeds/YoutubeEmbed";
import { ZennArticleCard } from "./embeds/ZennArticleCard";
import { InlineText } from "./InlineText";

type LinkProps = ComponentPropsWithoutRef<"a">;
type ImageProps = ComponentPropsWithoutRef<"img">;

function PostContentLink({ href, children, ...props }: LinkProps) {
  const isExternal = typeof href === "string" && /^https?:\/\//.test(href);

  return (
    <a href={href} {...props}>
      {children}
      {isExternal && (
        <span aria-hidden="true" className="ml-1 inline-flex align-[-0.125em]">
          <Icon icon={ArrowUpRight} size={16} />
        </span>
      )}
    </a>
  );
}

function PostContentImage({ alt, loading, decoding, ...props }: ImageProps) {
  if (alt === undefined) {
    throw new Error(
      '記事本文の画像にはaltを指定してください。装飾画像にはalt=""を指定します。',
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- Markdown画像には静的な幅・高さ情報がないため
    <img
      {...props}
      alt={alt}
      loading={loading ?? "lazy"}
      decoding={decoding ?? "async"}
    />
  );
}

export const postContentComponents = {
  a: PostContentLink,
  img: PostContentImage,
  ExternalLinkCard,
  YoutubeEmbed,
  ZennArticleCard,
  InlineText,
  Callout,
};
