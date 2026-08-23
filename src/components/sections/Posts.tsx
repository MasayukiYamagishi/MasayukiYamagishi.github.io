import { sectionIds } from "@/config/navigation";

type PostsProps = {
  dictionary: {
    date: string;
  };
};

export function Posts({ dictionary }: PostsProps) {
  return <section id={sectionIds.posts}></section>;
}
