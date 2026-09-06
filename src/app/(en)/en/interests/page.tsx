import { InterestsPage } from "@/components/interests/InterestsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interests | Masayuki Yamagishi",
  description: "A record of books, films, and a few strange metrics.",
};

export default function EnglishInterestsPage() {
  return <InterestsPage locale="en" />;
}
