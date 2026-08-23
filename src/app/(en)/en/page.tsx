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
    <main className="mx-auto w-full max-w-5xl px-6 sm:px-8">
      <Hero dictionary={en.hero}></Hero>
      <Skills dictionary={en.skills}></Skills>
      <Posts dictionary={en.posts}></Posts>
      <Projects dictionary={en.projects}></Projects>
      <WorkExperience dictionary={en.experience}></WorkExperience>
    </main>
  );
}
