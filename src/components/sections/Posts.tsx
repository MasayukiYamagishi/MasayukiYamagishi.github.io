import { sectionIds } from "@/config/navigation";
import { getPosts } from "@/content/posts";
import { Locale } from "@/i18n/config";
import { ArticleCard } from "../ui/ArticleCard";

type PostsProps = {
  locale: Locale;
  heading: string;
  dictionary: {
    publishedAt: string;
    updatedAt: string;
    emptyMessage: string;
  };
};

/**
 * Postsセクション
 *
 * @param PostsProps props
 * @returns PostsセクションのJSX
 */
export async function Posts({ locale, heading, dictionary }: PostsProps) {
  const headingId = `${sectionIds.posts}-heading`;
  const posts = await getPosts();

  return (
    <section
      id={sectionIds.posts}
      aria-labelledby={headingId}
      className="scroll-mt-24 py-10 sm:py-12"
    >
      <h2
        id={headingId}
        className="mb-8 text-2xl font-semibold text-foreground"
      >
        {heading}
      </h2>
      {posts.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border bg-surface px-6 py-10 text-center text-sm text-muted">
          {dictionary.emptyMessage}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <ArticleCard
              key={post.slug}
              post={post}
              locale={locale}
              dictionary={dictionary}
            />
          ))}
        </div>
      )}
    </section>
  );
}
