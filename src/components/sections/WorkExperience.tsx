import { sectionIds } from "@/config/navigation";

type WorkExperienceProps = {
  dictionary: {};
};

export function WorkExperience({ dictionary }: WorkExperienceProps) {
  return <section id={sectionIds.experience}></section>;
}
