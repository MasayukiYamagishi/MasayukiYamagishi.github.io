import type { FilmReference } from "@/schemas/interests";

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
