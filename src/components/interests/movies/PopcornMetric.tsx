import { Popcorn } from "lucide-react";
import { Icon } from "@/components/ui/icons/Icon";
import type { InterestsDictionary } from "../types";

type PopcornMetricProps = {
  estimate: {
    count: number;
    weightKg: number;
    caloriesKcal?: number;
  };
  dictionary: InterestsDictionary["movies"]["popcorn"];
};

export function PopcornMetric({
  estimate,
  dictionary,
}: PopcornMetricProps) {
  return (
    <section className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div>
          <span className="inline-flex size-11 items-center justify-center rounded-full bg-background text-foreground">
            <Icon icon={Popcorn} size={22} aria-hidden="true" />
          </span>
          <h3 className="mt-5 text-xl font-semibold tracking-tight">
            {dictionary.heading}
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
            {dictionary.description}
          </p>
        </div>
        <dl className="flex flex-wrap gap-x-8 gap-y-4 md:justify-end">
          <div>
            <dt className="sr-only">Popcorn</dt>
            <dd className="text-4xl font-semibold tracking-tight tabular-nums">
              {estimate.count}{" "}
              <span className="text-sm font-normal text-muted">
                {dictionary.buckets}
              </span>
            </dd>
          </div>
          <div>
            <dt className="sr-only">Weight</dt>
            <dd className="text-lg font-semibold tabular-nums">
              {estimate.weightKg.toFixed(1)} kg
            </dd>
          </div>
          {estimate.caloriesKcal !== undefined && (
            <div>
              <dt className="sr-only">Calories</dt>
              <dd className="text-lg font-semibold tabular-nums">
                {estimate.caloriesKcal.toLocaleString()} kcal
              </dd>
            </div>
          )}
        </dl>
      </div>
      <p className="mt-6 border-t border-border pt-4 text-xs leading-5 text-muted">
        {dictionary.disclaimer}
      </p>
    </section>
  );
}
