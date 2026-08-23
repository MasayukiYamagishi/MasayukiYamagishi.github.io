import { sectionIds } from "@/config/navigation";

type PostsProps = {
  dictionary: {
    date: string;
  };
};

export function Posts({ dictionary }: PostsProps) {
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
    ></section>
  );
}
