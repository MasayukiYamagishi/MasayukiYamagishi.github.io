import { sectionIds } from "@/config/navigation";

type ProjectsProps = {
  dictionary: {
    updatedAt: string;
  };
};

export function Projects({ dictionary }: ProjectsProps) {
  return <section id={sectionIds.projects}></section>;
}
