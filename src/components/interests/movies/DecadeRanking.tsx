import type { RankedValue } from "@/lib/interests";
import { RankingList } from "./RankingList";

/**
 * 映画の公開年代別ランキングを表示する
 *
 * @param props 公開年代別ランキングのプロパティ
 * @returns 公開年代別ランキングのJSX
 */
export function DecadeRanking({
  heading,
  values,
}: {
  heading: string;
  values: readonly RankedValue[];
}) {
  return <RankingList heading={heading} values={values} />;
}
