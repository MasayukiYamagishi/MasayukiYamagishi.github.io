import type { ReactNode } from "react";

type MetricCardProps = {
  label: string;
  value: string;
  unit?: string;
  detail?: ReactNode;
  accent?: boolean;
};

export function MetricCard({
  label,
  value,
  unit,
  detail,
  accent = false,
}: MetricCardProps) {
  return (
    <div
      className={[
        "min-w-0 rounded-2xl border p-4 sm:p-5",
        accent
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-surface text-foreground",
      ].join(" ")}
    >
      <p
        className={[
          "text-xs font-medium tracking-[0.08em] uppercase",
          accent ? "text-background/70" : "text-muted",
        ].join(" ")}
      >
        {label}
      </p>
      <p className="mt-3 flex flex-wrap items-baseline gap-x-2 tabular-nums">
        <span className="text-3xl leading-none font-semibold tracking-tight sm:text-4xl">
          {value}
        </span>
        {unit && <span className="text-sm font-medium opacity-70">{unit}</span>}
      </p>
      {detail && <div className="mt-3 text-xs leading-5 opacity-70">{detail}</div>}
    </div>
  );
}
