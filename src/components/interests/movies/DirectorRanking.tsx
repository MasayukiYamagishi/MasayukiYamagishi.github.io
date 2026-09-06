import type { RankedValue } from "@/lib/interests";
import { RankingList } from "./RankingList";

/**
 * 映画の監督別ランキングを表示する
 *
 * @param props 監督別ランキングのプロパティ
 * @returns 監督別ランキングのJSX
 */
export function DirectorRanking({
  heading,
  values,
}: {
  heading: string;
  values: readonly RankedValue[];
}) {
  return <RankingList heading={heading} values={values} />;
}
