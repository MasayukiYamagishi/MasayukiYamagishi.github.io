import type { InterestsDictionary } from "../types";
import { MetricCard } from "../MetricCard";

type ReadingSummaryProps = {
  locale: "ja" | "en";
  summary: {
    completedCount: number;
    completedPages: number;
    completedWeightKg: number;
    readingCount: number;
    backlogCount: number;
  };
  destroyedShelfCount: number;
  dictionary: InterestsDictionary["books"];
};

export function ReadingSummary({
  locale,
  summary,
  destroyedShelfCount,
  dictionary,
}: ReadingSummaryProps) {
  const numberFormat = new Intl.NumberFormat(locale === "ja" ? "ja-JP" : "en-US");

  return (
    <section aria-labelledby="reading-summary-heading">
      <h3
        id="reading-summary-heading"
        className="mb-4 text-sm font-semibold text-foreground"
      >
        {dictionary.summaryHeading}
      </h3>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        <MetricCard
          label={dictionary.metrics.completed}
          value={numberFormat.format(summary.completedCount)}
          unit={dictionary.units.books}
          accent
        />
        <MetricCard
          label={dictionary.metrics.pages}
          value={numberFormat.format(summary.completedPages)}
          unit={dictionary.units.pages}
        />
        <MetricCard
          label={dictionary.metrics.weight}
          value={summary.completedWeightKg.toFixed(1)}
          unit={dictionary.units.kilograms}
        />
        <MetricCard
          label={dictionary.metrics.reading}
          value={numberFormat.format(summary.readingCount)}
          unit={dictionary.units.books}
        />
        <MetricCard
          label={dictionary.metrics.backlog}
          value={numberFormat.format(summary.backlogCount)}
          unit={dictionary.units.books}
        />
        <MetricCard
          label={dictionary.metrics.destroyed}
          value={numberFormat.format(destroyedShelfCount)}
          unit={dictionary.units.shelves}
        />
      </div>
    </section>
  );
}
