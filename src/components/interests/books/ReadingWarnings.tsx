import type { ReadingWarningKey } from "@/lib/interests";
import { AlertTriangle, BookOpen } from "lucide-react";
import { Icon } from "@/components/ui/icons/Icon";
import type { InterestsDictionary } from "../types";

type ReadingWarningsProps = {
  warnings: readonly ReadingWarningKey[];
  dictionary: InterestsDictionary["books"];
};

export function ReadingWarnings({
  warnings,
  dictionary,
}: ReadingWarningsProps) {
  if (warnings.length === 0) return null;

  return (
    <section aria-labelledby="reading-warnings-heading">
      <h3
        id="reading-warnings-heading"
        className="mb-4 text-sm font-semibold text-foreground"
      >
        {dictionary.warningsHeading}
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {warnings.map((warning) => {
          const isBacklogWarning = [
            "backlogGrowing",
            "stopBuying",
            "criticalBacklog",
          ].includes(warning);
          const tone =
            warning === "criticalBacklog"
              ? "border-alert/30 bg-alert/10 text-alert"
              : warning === "parallelReading"
                ? "border-info/30 bg-info/10 text-info"
                : "border-warn/30 bg-warn/10 text-warn";
          const iconTone =
            warning === "criticalBacklog"
              ? "bg-alert/10"
              : warning === "parallelReading"
                ? "bg-info/10"
                : "bg-warn/10";

          return (
            <p
              key={warning}
              className={`flex min-h-20 items-center gap-3 rounded-2xl border p-4 text-sm font-semibold leading-6 ${tone}`}
            >
              <span
                className={`inline-flex size-9 shrink-0 items-center justify-center rounded-full ${iconTone}`}
              >
                <Icon
                  icon={isBacklogWarning ? AlertTriangle : BookOpen}
                  size={18}
                />
              </span>
              {dictionary.warnings[warning]}
            </p>
          );
        })}
      </div>
    </section>
  );
}
