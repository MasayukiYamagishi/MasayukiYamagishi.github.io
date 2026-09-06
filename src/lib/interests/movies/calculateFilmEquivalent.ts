import type { FilmReference } from "@/schemas/interests";

/**
 * 合計上映時間をフィルムの長さと比較指標へ換算する
 *
 * @param totalRuntimeMinutes 合計上映時間（分）
 * @param reference フィルムの換算基準
 * @returns フィルム長・リール本数・地球周回相当値
 */
export function calculateFilmEquivalent(
  totalRuntimeMinutes: number,
  reference: FilmReference,
) {
  const filmLengthM = totalRuntimeMinutes * reference.metersPerMinute;

  return {
    filmLengthM,
    reel2000FtEquivalent: filmLengthM / reference.reel2000FtMeters,
    earthCircumferenceKm: reference.earthEquatorialCircumferenceM / 1000,
    earthLapEquivalent:
      filmLengthM / reference.earthEquatorialCircumferenceM,
  };
}
