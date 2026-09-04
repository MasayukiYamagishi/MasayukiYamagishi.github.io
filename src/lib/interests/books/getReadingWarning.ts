export type ReadingWarningKey = "parallelReading";

export function getReadingWarnings(readingCount: number) {
  return readingCount >= 2
    ? (["parallelReading"] satisfies ReadingWarningKey[])
    : [];
}
