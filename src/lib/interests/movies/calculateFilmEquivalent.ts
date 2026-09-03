import type { FilmReference } from "@/schemas/interests";

export function calculateFilmEquivalent(
  totalRuntimeMinutes: number,
  reference: FilmReference,
) {
  const filmLengthM = totalRuntimeMinutes * reference.metersPerMinute;

  return {
    filmLengthM,
    reel2000FtEquivalent: filmLengthM / reference.reel2000FtMeters,
    earthLapEquivalent:
      filmLengthM / reference.earthEquatorialCircumferenceM,
  };
}
