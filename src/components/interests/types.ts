import type { en } from "@/i18n/dictionaries/en";
import type { ja } from "@/i18n/dictionaries/ja";

export type InterestsDictionary =
  | (typeof ja)["interests"]
  | (typeof en)["interests"];
