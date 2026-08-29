import { sectionIds } from "@/config/navigation";
import { skillGroups, SkillsDictionary } from "@/content/skills";
import { SkillGroupCard } from "./skills/SkillGroupCard";

type SkillsProps = {
  heading: string;
  dictionary: SkillsDictionary;
};

/**
 * スキル一覧セクション
 *
 * @param SkillsProps props
 * @returns スキル一覧セクションのJSX
 */
export function Skills({ heading, dictionary }: SkillsProps) {
  const headingId = `${sectionIds.skills}-heading`;

  return (
    <section
      id={sectionIds.skills}
      aria-labelledby={headingId}
      className="py-10 sm:py-12"
    >
      <h2
        id={headingId}
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
