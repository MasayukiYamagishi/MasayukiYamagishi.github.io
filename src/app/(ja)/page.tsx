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
    <main className="mx-auto w-full max-w-5xl px-6 sm:px-8">
      <Hero dictionary={ja.hero}></Hero>
      <Skills dictionary={ja.skills}></Skills>
      <Posts dictionary={ja.posts}></Posts>
      <Projects dictionary={ja.projects}></Projects>
      <WorkExperience dictionary={ja.experience}></WorkExperience>
    </main>
  );
}
