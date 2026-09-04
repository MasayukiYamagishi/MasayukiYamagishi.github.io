import type { RankedValue } from "@/lib/interests";

type RankingListProps = {
  heading: string;
  values: readonly RankedValue[];
  note?: string;
  limit?: number;
};

export function RankingList({
  heading,
  values,
  note,
  limit = 5,
}: RankingListProps) {
  const visibleValues = values.slice(0, limit);
  const maximum = visibleValues[0]?.count ?? 1;

  return (
    <section className="rounded-2xl border border-border bg-surface p-5">
      <h3 className="font-semibold text-foreground">{heading}</h3>
      {note && <p className="mt-1 text-xs leading-5 text-muted">{note}</p>}
      <ol className="mt-5 space-y-4">
        {visibleValues.map((value) => (
          <li key={value.label}>
            <div className="flex items-baseline gap-3 text-sm">
              <span className="w-5 shrink-0 font-mono text-xs text-muted">
                {value.rank}.
              </span>
              <span className="min-w-0 flex-1 truncate font-medium">
                {value.label}
              </span>
              <span className="font-mono text-xs tabular-nums text-muted">
                {value.count}
              </span>
            </div>
            <div className="mt-2 ml-8 h-1 overflow-hidden rounded-full bg-border">
              <span
                className="block h-full rounded-full bg-foreground"
                style={{ width: `${(value.count / maximum) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
