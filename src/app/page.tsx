import { Hero } from "@/components/sections/Hero";
import { Posts } from "@/components/sections/Posts";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { WorkExperience } from "@/components/sections/WorkExperience";

/**
 * ホームページ
 *
 * @returns ホームページのJSX
 */
export default function Home() {
  return (
    <main>
      <Hero></Hero>
      <Skills></Skills>
      <Posts></Posts>
      <Projects></Projects>
      <WorkExperience></WorkExperience>
    </main>
  );
}
