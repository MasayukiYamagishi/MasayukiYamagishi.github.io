import { Project } from "@/content/projects";
import { Locale } from "@/i18n/config";
import { Link } from "lucide-react";
import { Icon } from "./icons/Icon";
import { SimpleIconGraphic } from "./icons/SimpleIconGraphic";
import { getTechnologyIcon } from "./icons/TechnologyIcons";

export type ProjectCardDictionary = {
  externalSite: string;
  technologies: string;
};

type ProjectCardProps = {
  project: Project;
  locale: Locale;
  dictionary: ProjectCardDictionary;
};

function getDestination(url: string) {
  return new URL(url).hostname.replace(/^www\./, "");
}

/**
 * Projectsセクションに掲載する外部リンクカード
 *
 * @param ProjectCardProps props
 * @returns 外部リンクカードのJSX
 */
export function ProjectCard({ project, locale, dictionary }: ProjectCardProps) {
  const title = project.title[locale];
  const destination = getDestination(project.url);

  return (
    <article className="w-full">
      <a
        href={project.url}
        aria-label={`${title} — ${destination} (${dictionary.externalSite})`}
        className="
                    group
                    relative
                    flex
                    min-h-40
                    w-full
                    flex-col
                    rounded-2xl
                    border
                    border-border
                    bg-surface
                    p-4
                    pr-16
                    transition
                    duration-200
                    hover:-translate-y-0.5
                    hover:bg-surface-hover
                    hover:shadow-lg
                    motion-reduce:transition-none
                    motion-reduce:hover:translate-y-0
                    sm:p-5
                    sm:pr-20
                "
      >
        <h3 className="text-base leading-snug font-semibold text-foreground">
          {title}
        </h3>

        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-muted sm:line-clamp-2">
          {project.description[locale]}
        </p>

        <ul
          aria-label={dictionary.technologies}
          className="mt-4 flex flex-wrap gap-2"
        >
          {project.tags.map((tag) => {
            const icon = getTechnologyIcon(tag.id);

            return (
              <li
                key={tag.id}
                className="
                    inline-flex
                    items-center
                    justify-center
                    gap-1.5
                    rounded-full
                    border
                    border-border
                    bg-background
                    px-2.5
                    py-1
                    text-xs
                    leading-none
                    text-foreground
                "
              >
                {icon && (
                  <SimpleIconGraphic
                    icon={icon}
                    size={14}
                    className="shrink-0 opacity-80"
                  />
                )}
                <span>{tag.label[locale]}</span>
              </li>
            );
          })}
        </ul>

        <p className="inline-flex gap-1.5 items-center mt-4 text-xs font-medium text-foreground">
          <span className="mt-1">
            <Icon icon={Link} size={14} strokeWidth={1.75} />
          </span>
          {destination}
        </p>
      </a>
    </article>
  );
}
