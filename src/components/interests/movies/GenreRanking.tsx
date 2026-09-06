import type { RankedValue } from "@/lib/interests";
import { RankingList } from "./RankingList";

/**
 * 映画のジャンル別ランキングを表示する
 *
 * @param props ジャンル別ランキングのプロパティ
 * @returns ジャンル別ランキングのJSX
 */
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
