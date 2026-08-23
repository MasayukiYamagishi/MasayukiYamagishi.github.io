import { sectionIds } from "@/config/navigation";

type SkillsProps = {
  dictionary: {};
};

export function Skills({ dictionary }: SkillsProps) {
  return (
    <section id={sectionIds.skills}>
      <div className="frontend"></div>
      <div className="backend"></div>
      <div className="Engineering"></div>
      <div className="ai"></div>
    </section>
  );
}
