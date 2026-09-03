import { InterestsPage } from "@/components/interests/InterestsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interests | Masayuki Yamagishi",
  description: "読書と映画鑑賞の記録、そして少し変わった集計指標。",
};

export default function JapaneseInterestsPage() {
  return <InterestsPage locale="ja" />;
}
