import { ScrollToTopButton } from "@/components/layout/ScrollTopButton";
import { Hero } from "@/components/sections/Hero";
import { Posts } from "@/components/sections/Posts";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { WorkExperience } from "@/components/sections/WorkExperience";
import { en } from "@/i18n/dictionaries/en";

/**
 * 英語版のホームページ
 *
 * @returns 英語版ホームページのJSX
 */
export default async function EnglishHomePage() {
  return (
    <>
      <main className="mx-auto w-full max-w-5xl px-6 sm:px-8">
        <Hero dictionary={en.hero}></Hero>
        <Posts
          locale="en"
          heading={en.sections.posts}
          dictionary={en.posts}
        ></Posts>
        <Projects
          locale="en"
          heading={en.sections.projects}
          dictionary={en.projects}
        ></Projects>
        <Skills heading={en.sections.skills} dictionary={en.skills}></Skills>
        <WorkExperience
          locale="en"
          heading={en.sections.experience}
          dictionary={en.experience}
          skillsDictionary={en.skills}
        ></WorkExperience>
      </main>

      <ScrollToTopButton label={en.controls.backToTop} />
    </>
  );
}
