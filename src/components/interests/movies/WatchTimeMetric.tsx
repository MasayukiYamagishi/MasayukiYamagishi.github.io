import type { InterestsDictionary } from "../types";

type WatchTimeMetricProps = {
  watchTime: {
    days: number;
    hours: number;
    minutes: number;
    totalMinutes: number;
  };
  film: {
    filmLengthM: number;
    reel2000FtEquivalent: number;
    earthLapEquivalent: number;
  };
  dictionary: InterestsDictionary["movies"];
};

export function WatchTimeMetric({
  watchTime,
  film,
  dictionary,
}: WatchTimeMetricProps) {
  const filmLength =
    film.filmLengthM >= 1000
      ? `${(film.filmLengthM / 1000).toFixed(1)} km`
      : `${Math.round(film.filmLengthM)} m`;

  return (
    <section className="grid gap-3 lg:grid-cols-2">
      <div className="rounded-3xl border border-border bg-foreground p-6 text-background sm:p-8">
        <p className="font-mono text-xs tracking-[0.14em] text-background/60 uppercase">
          {dictionary.watchTime.heading}
        </p>
        <p className="mt-8 text-sm text-background/70">
          {dictionary.watchTime.prefix}
        </p>
        <p className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-2 tabular-nums">
          <strong className="text-5xl font-semibold tracking-tight">
            {watchTime.days}
          </strong>
          <span>{dictionary.watchTime.days}</span>
          <strong className="text-3xl font-semibold">{watchTime.hours}</strong>
          <span>{dictionary.watchTime.hours}</span>
          <strong className="text-3xl font-semibold">{watchTime.minutes}</strong>
          <span>{dictionary.watchTime.minutes}</span>
        </p>
        <p className="mt-4 text-sm text-background/70">
          {dictionary.watchTime.suffix}
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
        <p className="font-mono text-xs tracking-[0.14em] text-muted uppercase">
          {dictionary.film.heading}
        </p>
        <p className="mt-3 text-sm leading-6 text-muted">
          {dictionary.film.description}
        </p>
        <dl className="mt-7 grid gap-5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          <div>
            <dt className="text-xs text-muted">{dictionary.film.length}</dt>
            <dd className="mt-1 text-xl font-semibold tabular-nums">
              {filmLength}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted">{dictionary.film.reels}</dt>
            <dd className="mt-1 text-xl font-semibold tabular-nums">
              {Math.round(film.reel2000FtEquivalent).toLocaleString()}{" "}
              <span className="text-xs font-normal text-muted">
                {dictionary.film.reelsUnit}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted">{dictionary.film.earth}</dt>
            <dd className="mt-1 text-xl font-semibold tabular-nums">
              {film.earthLapEquivalent.toFixed(3)}{" "}
              <span className="text-xs font-normal text-muted">
                {dictionary.film.earthUnit}
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
