import type { ShelfStage } from "@/lib/interests";
import type { Shelf } from "@/schemas/interests";
import type { InterestsDictionary } from "../types";
import { ShelfLoadIllustration } from "./ShelfLoadIllustration";

type ShelfStatusProps = {
  locale: "ja" | "en";
  shelf: Shelf;
  destroyedShelfCount: number;
  load: {
    currentWeightKg: number;
    loadPercentage: number;
    stage: ShelfStage;
    exceeded: boolean;
  };
  dictionary: InterestsDictionary["books"]["shelf"];
};

export function ShelfStatus({
  locale,
  shelf,
  destroyedShelfCount,
  load,
  dictionary,
}: ShelfStatusProps) {
  const shelfNumber = shelf.id.match(/\d+$/)?.[0];
  const shelfLabel =
    locale === "en" && shelfNumber ? `Shelf #${shelfNumber}` : shelf.label;
  const percentage = Math.round(load.loadPercentage);

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
              aria-valuenow={Math.min(percentage, 100)}
              className="mt-4 h-2 overflow-hidden rounded-full bg-border"
            >
              <span
                className="block h-full rounded-full bg-foreground"
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
            <p className="mt-3 text-sm font-semibold text-foreground">
              {load.exceeded
                ? dictionary.exceeded
                : load.stage === 4
                  ? dictionary.nearLimit
                  : dictionary.stageMessages[load.stage]}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              {load.stage >= 4 && !load.exceeded
                ? dictionary.stageMessages[load.stage]
                : null}
            </p>
          </div>

          <dl className="mt-8 border-t border-border pt-5 text-sm">
            <div>
              <dt className="text-muted">{dictionary.currentWeight}</dt>
              <dd className="mt-1 font-semibold tabular-nums">
                {load.currentWeightKg.toFixed(1)} kg
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="grid gap-2 border-t border-border px-6 py-4 text-xs leading-5 text-muted sm:px-8 lg:grid-cols-2">
        <p className="font-medium text-foreground">
          {dictionary.destroyedCopy.replace(
            "{count}",
            String(destroyedShelfCount),
          )}
        </p>
        <p className="lg:text-right">
          {shelf.capacitySource === "manufacturer"
            ? dictionary.sourceManufacturer
            : dictionary.sourceAssumption.replace(
                "{capacity}",
                shelf.referenceCapacityKg.toFixed(0),
              )}
          {" · "}
          {dictionary.disclaimer}
        </p>
      </div>
    </section>
  );
}
