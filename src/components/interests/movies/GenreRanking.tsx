import type { RankedValue } from "@/lib/interests";
import { RankingList } from "./RankingList";

export function GenreRanking({
  heading,
  note,
  values,
}: {
  heading: string;
  note: string;
  values: readonly RankedValue[];
}) {
  return <RankingList heading={heading} note={note} values={values} />;
}
