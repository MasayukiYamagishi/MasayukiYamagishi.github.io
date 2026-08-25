import { sectionIds } from "@/config/navigation";
import { getPosts } from "@/content/posts";
import { Locale } from "@/i18n/config";
import { ArticleCard } from "../ui/ArticleCard";

type PostsProps = {
  locale: Locale;
  dictionary: {
    publishedAt: string;
    updatedAt: string;
  };
};

/**
 * Postsセクション
 *
 * @param PostsProps props
 * @returns PostsセクションのJSX
 */
export async function Posts({ locale, dictionary }: PostsProps) {
  const posts = await getPosts();

  return (
    <section
      id={sectionIds.posts}
      className="
        mx-auto
        w-full
        max-w-5xl
        scroll-mt-24
        px-6
        py-20
        sm:px-8
        sm:py-24
      "
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <ArticleCard
            key={post.slug}
            post={post}
            locale={locale}
            dictionary={dictionary}
          />
        ))}
      </div>
    </section>
  );
}
