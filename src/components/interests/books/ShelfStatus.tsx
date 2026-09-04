import type { ShelfStage } from "@/lib/interests";
import type { Shelf } from "@/schemas/interests";
import type { InterestsDictionary } from "../types";
import { ShelfLoadIllustration } from "./ShelfLoadIllustration";

type ShelfStatusProps = {
  shelf: Shelf;
  load: {
    completedWeightKg: number;
    destroyedShelfCount: number;
    damagePercentage: number;
    stage: ShelfStage;
  };
  dictionary: InterestsDictionary["books"]["shelf"];
};

export function ShelfStatus({
  shelf,
  load,
  dictionary,
}: ShelfStatusProps) {
  const shelfLabel = dictionary.currentShelf.replace(
    "{count}",
    String(load.destroyedShelfCount + 1),
  );
  const percentage = Math.round(load.damagePercentage);

  return (
    <section
      aria-labelledby="shelf-status-heading"
      className="overflow-hidden rounded-3xl border border-border bg-surface"
    >
      <div className="grid lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.8fr)]">
        <ShelfLoadIllustration stage={load.stage} alt="" />
        <div className="flex flex-col justify-between p-6 sm:p-8">
          <div>
            <p className="font-mono text-xs tracking-[0.14em] text-muted uppercase">
              {dictionary.heading} · Stage {load.stage}
            </p>
            <h3
              id="shelf-status-heading"
              className="mt-3 text-2xl font-semibold tracking-tight text-foreground"
            >
              {shelfLabel}
            </h3>
            <p className="mt-6 text-sm text-muted">
              {dictionary.damage}
            </p>
            <p className="mt-1 text-5xl font-semibold tracking-tight tabular-nums text-foreground">
              {percentage}%
            </p>
            <div
              role="meter"
              aria-label={dictionary.damage}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={percentage}
              className="mt-4 h-2 overflow-hidden rounded-full bg-border"
            >
              <span
                className="block h-full rounded-full bg-foreground"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="mt-3 text-sm font-semibold text-foreground">
              {dictionary.stageMessages[load.stage]}
            </p>
          </div>

          <dl className="mt-8 grid gap-5 border-t border-border pt-5 text-sm sm:grid-cols-2">
            <div>
              <dt className="break-keep text-muted">
                {dictionary.completedWeight.map((line) => (
                  <span key={line} className="block whitespace-nowrap">
                    {line}
                  </span>
                ))}
              </dt>
              <dd className="mt-1 font-semibold tabular-nums">
                {load.completedWeightKg.toFixed(1)} kg
              </dd>
            </div>
            <div>
              <dt className="break-keep text-muted">
                {dictionary.destroyedCount.map((line) => (
                  <span key={line} className="block whitespace-nowrap">
                    {line}
                  </span>
                ))}
              </dt>
              <dd className="mt-1 font-semibold tabular-nums">
                {dictionary.destroyedValue.replace(
                  "{count}",
                  String(load.destroyedShelfCount),
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="border-t border-border px-6 py-4 text-xs leading-5 text-muted sm:px-8">
        <p>
          {dictionary.referenceCapacity.replace(
            "{capacity}",
            shelf.referenceCapacityKg.toFixed(0),
          )}
        </p>
      </div>
    </section>
  );
}
