import { ScrollToTopButton } from "@/components/layout/ScrollTopButton";
import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { Posts } from "@/components/sections/Posts";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { WorkExperience } from "@/components/sections/WorkExperience";
import { ja } from "@/i18n/dictionaries/ja";

/**
 * 日本語ホームページ
 *
 * @returns 日本語ホームページのJSX
 */
export default async function HomePage() {
  return (
    <>
      <main className="mx-auto w-full max-w-5xl px-6 sm:px-8">
        <Hero dictionary={ja.hero}></Hero>
        <About
          locale="ja"
          heading={ja.sections.about}
          dictionary={ja.about}
        ></About>
        <Posts
          locale="ja"
          heading={ja.sections.posts}
          dictionary={ja.posts}
        ></Posts>
        <Projects
          locale="ja"
          heading={ja.sections.projects}
          dictionary={ja.projects}
        ></Projects>
        <Skills heading={ja.sections.skills} dictionary={ja.skills}></Skills>
        <WorkExperience
          locale="ja"
          heading={ja.sections.experience}
          dictionary={ja.experience}
          skillsDictionary={ja.skills}
        ></WorkExperience>
      </main>

      <ScrollToTopButton label={ja.controls.backToTop} />
    </>
  );
}
