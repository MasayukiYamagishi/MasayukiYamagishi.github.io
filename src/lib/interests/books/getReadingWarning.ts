export type ReadingWarningKey =
  | "backlogGrowing"
  | "stopBuying"
  | "criticalBacklog"
  | "parallelReading"
  | "oneAtATime";

export function getReadingWarnings(
  backlogCount: number,
  readingCount: number,
) {
  const warnings: ReadingWarningKey[] = [];

  if (backlogCount >= 20) warnings.push("criticalBacklog");
  else if (backlogCount >= 10) warnings.push("stopBuying");
  else if (backlogCount >= 5) warnings.push("backlogGrowing");

  if (readingCount >= 6) warnings.push("oneAtATime");
  else if (readingCount >= 4) warnings.push("parallelReading");

  return warnings;
}
