import { sectionIds } from "@/config/navigation";

type WorkExperienceProps = {
  dictionary: {};
};

export function WorkExperience({ dictionary }: WorkExperienceProps) {
  return (
    <section
      id={sectionIds.experience}
      className="
        mx-auto
        w-full
        max-w-5xl
        scroll-mt-24
        px-6
        py-20
        sm:px-8
        sm:py-24
      "
    ></section>
  );
}
