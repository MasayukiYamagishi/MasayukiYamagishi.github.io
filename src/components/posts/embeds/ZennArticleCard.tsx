import { ExternalLinkCard, ExternalLinkCardProps } from "./ExternalLinkCard";

type ZennArticleCardProps = Omit<ExternalLinkCardProps, "siteName">;

export function ZennArticleCard(props: ZennArticleCardProps) {
  const url = new URL(props.href);

  const isZennArticle =
    url.hostname === "zenn.dev" &&
    /^\/[^/]+\/articles\/[^/]+\/?$/.test(url.pathname);

  if (!isZennArticle) {
    throw new Error(`Zennの記事URLを指定してください: ${props.href}`);
  }

  return <ExternalLinkCard {...props} siteName="Zenn" />;
}
