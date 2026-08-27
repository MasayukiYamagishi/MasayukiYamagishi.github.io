import { sectionIds } from "@/config/navigation";
import { skillGroups, SkillsDictionary } from "@/content/skills";
import { SkillGroupCard } from "./skills/SkillGroupCard";

type SkillsProps = {
  heading: string;
  dictionary: SkillsDictionary;
};

export function Skills({ heading, dictionary }: SkillsProps) {
  return (
    <section
      id={sectionIds.skills}
      aria-labelledby={`${sectionIds.skills}-heading`}
      className="scroll-mt-24 py-10 sm:py-12"
    >
      <h2
        id={`${sectionIds.skills}-heading`}
        className="mb-8 text-2xl font-semibold text-foreground"
      >
        {heading}
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {skillGroups.map((group) => (
          <SkillGroupCard
            key={group.id}
            title={dictionary.categories[group.id]}
            skillIds={group.skills}
            dictionary={dictionary}
            wide={"wide" in group && group.wide}
          />
        ))}
      </div>
    </section>
  );
}
