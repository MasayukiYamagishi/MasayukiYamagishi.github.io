import { PostDetail } from "@/components/posts/PostDetail";
import { getPostBySlug, getPostRouteParams } from "@/content/posts";
import { getPostContent } from "@/content/posts/content";
import { getPostMetadata } from "@/content/posts/metadata";
import { ja } from "@/i18n/dictionaries/ja";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return getPostRouteParams();
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;

  return getPostMetadata(slug, "ja");
}

/**
 * 日本語版のPosts詳細ページ
 *
 * @param PostPageProps props
 * @returns 日本語版のPosts詳細ページのJSX
 */
export default async function JapanesePostPage({ params }: PostPageProps) {
  const { slug } = await params;

  const [post, Content] = await Promise.all([
    getPostBySlug(slug),
    getPostContent(slug, "ja"),
  ]);

  if (!post || !Content) {
    notFound();
  }

  return (
    <PostDetail post={post} locale="ja" dictionary={ja.posts}>
      <Content />
    </PostDetail>
  );
}
