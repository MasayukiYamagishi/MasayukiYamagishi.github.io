import { pageTopIds } from "@/config/navigation";
import { SocialLinks } from "../ui/SocialLinks";

type HeroProps = {
  dictionary: {
    name: string;
    role: string;
    description: string;
  };
};

/**
 * プロフィールの概要を表示するヒーローセクション
 *
 * @param HeroProps props
 * @returns ヒーローセクションのJSX
 */
export function Hero({ dictionary }: HeroProps) {
  return (
    <section
      id={pageTopIds.section}
      aria-labelledby={pageTopIds.heading}
      className="
        pt-20
        pb-10
        sm:pt-24
        sm:pb-12
      "
    >
      <h1
        id={pageTopIds.heading}
        tabIndex={-1}
        className="mb-2 text-base font-bold leading-8 text-foreground sm:text-4xl"
      >
        {dictionary.name}
      </h1>
      <p className="text-accent text-base sm:text-lg">{dictionary.role}</p>
      <p className="mt-6 mb-4 max-w-[68ch] text-base leading-7 text-muted sm:text-lg">
        {dictionary.description}
      </p>

      <SocialLinks />
    </section>
  );
}
