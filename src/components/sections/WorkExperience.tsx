import { sectionIds } from "@/config/navigation";
import {
  WorkExperienceDictionary,
  workExperiences,
} from "@/content/workExperience";
import { Locale } from "@/i18n/config";
import { SimpleIconGraphic } from "../ui/icons/SimpleIconGraphic";
import { getTechnologyIcon } from "../ui/icons/TechnologyIcons";
import { WorkExperienceTimelineItem } from "./work-experience/WorkExperienceTimelineItem";

type WorkExperienceProps = {
  locale: Locale;
  heading: string;
  dictionary: WorkExperienceDictionary;
};

export function WorkExperience({
  locale,
  heading,
  dictionary,
}: WorkExperienceProps) {
  return (
    <section id={sectionIds.experience} className="scroll-mt-24 py-20 sm:py-24">
      <h2 className="mb-8 text-2xl font-semibold text-foreground">{heading}</h2>

      <ol className="m-0 list-none p-0">
        {workExperiences.map((experience) => (
          <WorkExperienceTimelineItem key={experience.id}>
            <header className="flex flex-col gap-1">
              <h3 className="text-xl font-semibold leading-snug text-foreground">
                {experience.company[locale]}
              </h3>

              <div className="flex flex-col gap-0">
                <p className="text-sm leading-5 text-muted">
                  {experience.role[locale]}
                </p>
                <p className="flex items-center gap-1.5 whitespace-nowrap text-sm leading-5 text-muted">
                  <time
                    dateTime={experience.period.start}
                    className="tabular-nums"
                  >
                    {experience.period.start}
                  </time>

                  <span aria-hidden="true" className="text-muted">
                    -
                  </span>

                  {experience.period.end ? (
                    <time
                      dateTime={experience.period.end}
                      className="tabular-nums"
                    >
                      {experience.period.end}
                    </time>
                  ) : (
                    <span>{dictionary.present}</span>
                  )}
                </p>
              </div>
            </header>

            <p className="mt-2 mb-4 text-base leading-snug text-foreground">
              {experience.summary[locale]}
            </p>

            <details className="experience-details group">
              <summary className="cursor-pointer text-sm leading-snug">
                <span className="group-open:hidden">
                  {dictionary.showProjects}
                </span>
                <span className="hidden group-open:inline">
                  {dictionary.hideProjects}
                </span>
              </summary>

              <ul className="mt-2">
                {experience.projects.map((project) => (
                  <li
                    key={project.id}
                    className="flex flex-col border border-border p-4 bg-background rounded-2xl"
                  >
                    <h4 className="text-lg leading-snug font-semibold text-foreground">
                      {project.title[locale]}
                    </h4>

                    <div className="mt-2 mb-2">
                      <p className="text-sm leading-5 text-muted">
                        {project.role[locale]}
                      </p>

                      <p className="flex items-center gap-1.5 whitespace-nowrap text-sm leading-5 text-muted">
                        <time
                          dateTime={project.period.start}
                          className="tabular-nums"
                        >
                          {project.period.start}
                        </time>

                        <span aria-hidden="true" className="text-muted">
                          -
                        </span>

                        {project.period.end ? (
                          <time
                            dateTime={experience.period.end}
                            className="tabular-nums"
                          >
                            {experience.period.end}
                          </time>
                        ) : (
                          <span>{dictionary.present}</span>
                        )}
                      </p>
                    </div>

                    <ul className="list-outside list-disc space-y-1 pl-5 marker:text-muted">
                      {/* Contribution */}
                      {project.contributions.map((contribute) => (
                        <li
                          key={contribute.ja}
                          className="text-sm leading-snug text-foreground"
                        >
                          {contribute[locale]}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-col gap-1.5">
                      <p className="text-xs font-medium leading-5 text-muted">
                        {dictionary.technologies}
                      </p>
                      <ul className="flex flex-wrap gap-1.5">
                        {/* Technologies */}
                        {project.technologies.map((tech) => {
                          const icon = getTechnologyIcon(tech.id);

                          return (
                            <li
                              key={tech.id}
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
                              <span>{tech.label[locale]}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            </details>
          </WorkExperienceTimelineItem>
        ))}
      </ol>
    </section>
  );
}
