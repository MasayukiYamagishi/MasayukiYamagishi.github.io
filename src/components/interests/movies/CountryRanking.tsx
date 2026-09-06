import type { RankedValue } from "@/lib/interests";
import { RankingList } from "./RankingList";

/**
 * 映画の製作国別ランキングを表示する
 *
 * @param props 製作国別ランキングのプロパティ
 * @returns 製作国別ランキングのJSX
 */
export function CountryRanking({
  heading,
  values,
}: {
  heading: string;
  values: readonly RankedValue[];
}) {
  return <RankingList heading={heading} values={values} />;
}
