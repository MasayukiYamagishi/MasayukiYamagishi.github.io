import { sectionIds } from "@/config/navigation";

type SkillsProps = {
  dictionary: {};
};

export function Skills({ dictionary }: SkillsProps) {
  return (
    <section
      id={sectionIds.skills}
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
    >
      <div className="frontend"></div>
      <div className="backend"></div>
      <div className="Engineering"></div>
      <div className="ai"></div>
    </section>
  );
}
