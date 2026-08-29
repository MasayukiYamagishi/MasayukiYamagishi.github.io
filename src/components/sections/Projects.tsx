import { sectionIds } from "@/config/navigation";
import { getProject } from "@/content/projects";
import { Locale } from "@/i18n/config";
import { ProjectCard, ProjectCardDictionary } from "../ui/ProjectCard";

type ProjectsDictionary = ProjectCardDictionary & {
  emptyMessage: string;
};

type ProjectsProps = {
  locale: Locale;
  heading: string;
  dictionary: ProjectsDictionary;
};

/**
 * プロジェクトセクション
 *
 * @param ProjectsProps props
 * @returns プロジェクトセクションのJSX
 */
export async function Projects({ locale, heading, dictionary }: ProjectsProps) {
  const projects = await getProject();
  const headingId = `${sectionIds.projects}-heading`;

  return (
    <section
      id={sectionIds.projects}
      aria-labelledby={headingId}
      className="py-10 sm:py-12"
    >
      <h2
        id={headingId}
        className="mb-8 text-2xl font-semibold text-foreground"
      >
        {heading}
      </h2>

      {projects.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border bg-surface px-6 py-10 text-center text-sm text-muted">
          {dictionary.emptyMessage}
        </p>
      ) : (
        <ul className="flex flex-col gap-5">
          {projects.map((project) => (
            <li key={project.slug} className="w-full">
              <ProjectCard
                project={project}
                locale={locale}
                dictionary={dictionary}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
