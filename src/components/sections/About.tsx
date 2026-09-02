import { sectionIds } from "@/config/navigation";
import { profile } from "@/content/profile";
import type { Locale } from "@/i18n/config";
import { ExternalLink } from "lucide-react";

type AboutProps = {
  locale: Locale;
  heading: string;
  dictionary: {
    name: string;
    birthplace: string;
    birthDate: string;
    introduction: string;
    filmPortfolio: string;
    openFilmPortfolio: string;
  };
};

/**
 * 人物情報と映像作品への導線を表示するAboutセクション
 *
 * @param AboutProps props
 * @returns AboutセクションのJSX
 */
export function About({ locale, heading, dictionary }: AboutProps) {
  const headingId = `${sectionIds.about}-heading`;
  const localizedProfile = profile[locale];

  return (
    <section
      id={sectionIds.about}
      aria-labelledby={headingId}
      className="py-10 sm:py-12"
    >
      <h2
        id={headingId}
        className="mb-8 text-2xl font-semibold text-foreground"
      >
        {heading}
      </h2>

      <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(16rem,1fr)] md:gap-12">
        <div>
          <dl className="grid gap-4 sm:grid-cols-3">
            <div>
              <dt className="text-sm font-medium text-muted">
                {dictionary.name}
              </dt>
              <dd className="mt-1 text-base text-foreground">
                {localizedProfile.name}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-muted">
                {dictionary.birthplace}
              </dt>
              <dd className="mt-1 text-base text-foreground">
                {localizedProfile.birthplace}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-muted">
                {dictionary.birthDate}
              </dt>
              <dd className="mt-1 text-base text-foreground">
                <time dateTime={profile.birthDate} className="tabular-nums">
                  {localizedProfile.birthDate}
                </time>
              </dd>
            </div>
          </dl>

          <p className="mt-8 max-w-[68ch] text-base leading-7 text-muted">
            {dictionary.introduction}
          </p>
        </div>

        <a
          href={profile.links.filmPortfolio}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={dictionary.openFilmPortfolio}
          className="group flex min-h-32 flex-col justify-between rounded-2xl border border-border bg-surface p-5 transition duration-200 hover:-translate-y-0.5 hover:bg-surface-hover hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          <span className="text-base font-semibold leading-snug text-foreground">
            {dictionary.filmPortfolio}
          </span>

          <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted group-hover:text-foreground">
            mido-works.com
            <ExternalLink aria-hidden="true" className="size-4 shrink-0" />
          </span>
        </a>
      </div>
    </section>
  );
}
