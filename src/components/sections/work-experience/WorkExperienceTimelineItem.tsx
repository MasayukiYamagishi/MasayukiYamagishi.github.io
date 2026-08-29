import { Icon } from "@/components/ui/icons/Icon";
import { BriefcaseBusiness } from "lucide-react";
import type { ReactNode } from "react";

type WorkExperienceTimelineItemProps = {
  children: ReactNode;
};

/**
 * 職歴のタイムライン項目
 *
 * @param WorkExperienceTimelineItemProps props
 * @returns 職歴のタイムライン項目のJSX
 */
export function WorkExperienceTimelineItem({
  children,
}: WorkExperienceTimelineItemProps) {
  return (
    <li
      className="
                relative
                grid
                grid-cols-[2.75rem_minmax(0,1fr)]
                gap-3
                pb-8
                last:pb-0
                sm:grid-cols-[3.5rem_minmax(0,1fr)]
                sm:gap-5
            "
    >
      <div aria-hidden="true" className="relative flex justify-center">
        <span
          className="
                        absolute
                        inset-y-0
                        left-1/2
                        w-px
                        -translate-x-1/2
                        bg-border
                    "
        />

        <span
          className="
                        relative
                        mt-5
                        inline-flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-border
                        bg-background
                        text-foreground
                        shadow-sm
                    "
        >
          <Icon icon={BriefcaseBusiness} size={19} strokeWidth={1.75} />
        </span>
      </div>

      <article
        className="
          relative
          min-w-0
          rounded-2xl
          border
          border-border
          bg-surface
          p-5
          before:pointer-events-none
          before:absolute
          before:top-8
          before:left-0
          before:size-4
          before:-translate-x-1/2
          before:rotate-45
          before:border-b
          before:border-l
          before:border-border
          before:bg-surface
          before:content['']
          sm:p-6
        "
      >
        {children}
      </article>
    </li>
  );
}
