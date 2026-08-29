import { en } from "./dictionaries/en";
import { ja } from "./dictionaries/ja";

import type { Locale } from "./config";

const dictionaries = {
  ja,
  en,
} as const satisfies Record<Locale, object>;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
