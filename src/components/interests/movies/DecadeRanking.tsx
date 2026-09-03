import type { RankedValue } from "@/lib/interests";
import { RankingList } from "./RankingList";

export function DecadeRanking({
  heading,
  values,
}: {
  heading: string;
  values: readonly RankedValue[];
}) {
  return <RankingList heading={heading} values={values} />;
}
