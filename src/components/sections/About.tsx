import { sectionIds } from "@/config/navigation";
import { profileConfig } from "@/content/profile";
import { ExternalLinkCard } from "../ui/ExternalLinkCard";

type AboutProps = {
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
  };
};

/**
 * 人物情報と映像作品への導線を表示するAboutセクション
 *
 * @param AboutProps props
 * @returns AboutセクションのJSX
 */
export function About({ heading, profile, dictionary }: AboutProps) {
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
