import { InterestsPage } from "@/components/interests/InterestsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interests | Masayuki Yamagishi",
  description: "A record of books, films, and a few strange metrics.",
};

/**
 * 英語版の趣味ページ
 *
 * @returns 英語版趣味ページのJSX
 */
export default function EnglishInterestsPage() {
  return <InterestsPage locale="en" />;
}
