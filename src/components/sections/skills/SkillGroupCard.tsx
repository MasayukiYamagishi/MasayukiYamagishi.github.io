import { SimpleIconGraphic } from "@/components/ui/icons/SimpleIconGraphic";
import {
  getTechnologyIcon,
  getThemedTechnologyIcon,
} from "@/components/ui/icons/TechnologyIcons";
import { ThemedImageGraphic } from "@/components/ui/icons/ThemedImageGraphic";
import { SkillId, SkillsDictionary } from "@/content/skills";

type SkillGroupCardProps = {
  title: string;
  skillIds: readonly SkillId[];
  dictionary: SkillsDictionary;
  wide?: boolean;
};

/**
 * スキルのグループのカードコンポーネント
 *
 * @param SkillGroupCardProps props
 * @returns スキルのグループのカードのJSX
 */
export function SkillGroupCard({
  title,
  skillIds,
  dictionary,
  wide = false,
}: SkillGroupCardProps) {
  return (
    <article
      className={[
        "rounded-2xl border border-border bg-surface p-5 sm:p-6",
        wide ? "md:col-span-2" : "",
      ].join(" ")}
    >
      <h3 className="text-base font-semibold text-foreground">{title}</h3>

      <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {skillIds.map((skillId) => {
          const simpleIcon = getTechnologyIcon(skillId);
          const themedIcon = getThemedTechnologyIcon(skillId);

          return (
            <li
              key={skillId}
              className="flex min-h-12 items-center gap-3 rounded-xl border border-border bg-background px-3 py-2.5"
            >
              <span
                aria-hidden="true"
                className="flex size-5 shrink-0 items-center justify-center"
              >
                {simpleIcon ? (
                  <SimpleIconGraphic
                    icon={simpleIcon}
                    size={18}
                    className="opacity-80"
                  />
                ) : themedIcon ? (
                  <ThemedImageGraphic icon={themedIcon} size={18} />
                ) : undefined}
              </span>

              <span className="text-sm font-medium text-foreground">
                {dictionary[skillId]}
              </span>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
