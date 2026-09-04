import { sectionIds } from "@/config/navigation";
import { profileConfig } from "@/content/profile";
import type { Locale } from "@/i18n/config";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ExternalLinkCard } from "../ui/ExternalLinkCard";
import { Icon } from "../ui/icons/Icon";

type AboutProps = {
  locale: Locale;
  heading: string;
  profile: {
    name: string;
    birthplace: string;
    birthDate: string;
    introduction: string;
    hobbies: string[];
  };
  dictionary: {
    labels: {
      name: string;
      birthplace: string;
      birthDate: string;
      hobbies: string;
    };
    filmPortfolio: {
      heading: string;
      title: string;
      description: string;
      openLabel: string;
    };
    interests: {
      heading: string;
      description: string;
      linkLabel: string;
    };
  };
};

/**
 * 人物情報と映像作品への導線を表示するAboutセクション
 *
 * @param AboutProps props
 * @returns AboutセクションのJSX
 */
export function About({ locale, heading, profile, dictionary }: AboutProps) {
  const headingId = `${sectionIds.about}-heading`;

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

      <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(16rem,1fr)] md:gap-10">
        <div>
          <dl className="grid grid-cols-[max-content_minmax(0,1fr)] items-baseline gap-x-6 gap-y-3">
            <dt className="text-sm font-medium text-muted">
              {dictionary.labels.name}
            </dt>
            <dd className="text-base text-foreground">{profile.name}</dd>

            <dt className="text-sm font-medium text-muted">
              {dictionary.labels.birthDate}
            </dt>
            <dd className="text-base text-foreground">
              <time dateTime={profileConfig.birthDate} className="tabular-nums">
                {profile.birthDate}
              </time>
            </dd>

            <dt className="text-sm font-medium text-muted">
              {dictionary.labels.birthplace}
            </dt>
            <dd className="text-base text-foreground">{profile.birthplace}</dd>

            <dt className="text-sm font-medium text-muted">
              {dictionary.labels.hobbies}
            </dt>
            <dd className="min-w-0">
              <ul className="grid max-w-lg list-disc grid-cols-1 gap-x-8 gap-y-2 pl-5 text-sm leading-6 marker:text-muted sm:grid-cols-2">
                {profile.hobbies.map((hobby) => (
                  <li key={hobby}>{hobby}</li>
                ))}
              </ul>
            </dd>
          </dl>

          <p className="mt-8 max-w-[68ch] text-base leading-7 text-muted">
            {profile.introduction}
          </p>

          <div className="mt-8 max-w-[68ch] border-l-2 border-foreground pl-5">
            <h3 className="font-semibold text-foreground">
              {dictionary.interests.heading}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              {dictionary.interests.description}
            </p>
            <Link
              href={locale === "ja" ? "/interests" : "/en/interests"}
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-foreground underline-offset-4 hover:underline"
            >
              {dictionary.interests.linkLabel}
              <Icon icon={ArrowRight} size={16} />
            </Link>
          </div>
        </div>

        <div className="self-start">
          <h3 className="mb-2 font-semibold">
            {dictionary.filmPortfolio.heading}
          </h3>
          <ExternalLinkCard
            href={profileConfig.filmPortfolio.url}
            siteName={profileConfig.filmPortfolio.siteName}
            title={dictionary.filmPortfolio.title}
            description={dictionary.filmPortfolio.description}
            newTabLabel={dictionary.filmPortfolio.openLabel}
          />
        </div>
      </div>
    </section>
  );
}
