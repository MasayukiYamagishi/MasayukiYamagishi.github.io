import type { ReadingWarningKey } from "@/lib/interests";
import { BookOpen } from "lucide-react";
import { Icon } from "@/components/ui/icons/Icon";
import type { InterestsDictionary } from "../types";

type ReadingWarningsProps = {
  warnings: readonly ReadingWarningKey[];
  dictionary: InterestsDictionary["books"];
};

/**
 * 読書状況に応じた警告メッセージを表示する
 *
 * @param ReadingWarningsProps props
 * @returns 警告メッセージのJSX。警告がない場合はnull
 */
export function ReadingWarnings({
  warnings,
  dictionary,
}: ReadingWarningsProps) {
  if (warnings.length === 0) return null;

  return (
    <div className="mb-4 grid gap-3">
      {warnings.map((warning) => (
        <p
          key={warning}
          className="flex min-h-20 items-center gap-3 rounded-2xl border border-info/30 bg-info/10 p-4 text-sm font-semibold leading-6 text-info"
        >
          <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-info/10">
            <Icon icon={BookOpen} size={18} />
          </span>
          {dictionary.warnings[warning]}
        </p>
      ))}
    </div>
  );
}
