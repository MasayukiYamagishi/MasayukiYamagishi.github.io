import { en } from "./dictionaries/en";
import { ja } from "./dictionaries/ja";

import type { Locale } from "./config";

const dictionaries = {
  ja,
  en,
} as const satisfies Record<Locale, object>;

/**
 * 指定した言語の辞書を取得する
 *
 * @param locale 表示言語
 * @returns 指定した言語の辞書
 */
export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
