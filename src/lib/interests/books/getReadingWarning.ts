export type ReadingWarningKey = "parallelReading";

/**
 * 読書中の冊数に応じた警告を取得する
 *
 * @param readingCount 読書中の冊数
 * @returns 表示する警告キー一覧
 */
export function getReadingWarnings(readingCount: number) {
  return readingCount >= 2
    ? (["parallelReading"] satisfies ReadingWarningKey[])
    : [];
}
