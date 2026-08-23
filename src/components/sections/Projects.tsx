import { sectionIds } from "@/config/navigation";

type ProjectsProps = {
  dictionary: {
    updatedAt: string;
  };
};

export function Projects({ dictionary }: ProjectsProps) {
  return (
    <section
      id={sectionIds.projects}
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
