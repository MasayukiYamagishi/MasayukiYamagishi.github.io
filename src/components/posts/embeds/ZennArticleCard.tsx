import {
  ExternalLinkCard,
  type ExternalLinkCardProps,
} from "../../ui/ExternalLinkCard";

type ZennArticleCardProps = Omit<
  ExternalLinkCardProps,
  "brand" | "siteName"
>;

/**
 * Zennの記事情報を表示する外部リンクカードコンポーネント
 *
 * @param ZennArticleCardProps props
 * @returns Zenn記事リンクカードのJSX
 */
export function ZennArticleCard(props: ZennArticleCardProps) {
  const url = new URL(props.href);

  const isZennArticle =
    url.hostname === "zenn.dev" &&
    /^\/[^/]+\/articles\/[^/]+\/?$/.test(url.pathname);

  if (!isZennArticle) {
    throw new Error(`Zennの記事URLを指定してください: ${props.href}`);
  }

  return <ExternalLinkCard {...props} brand="zenn" siteName="Zenn.dev" />;
}
