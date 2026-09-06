import type { RankedValue } from "@/lib/interests";
import { RankingList } from "./RankingList";

export function DirectorRanking({
  heading,
  values,
}: {
  heading: string;
  values: readonly RankedValue[];
}) {
  return <RankingList heading={heading} values={values} />;
}
