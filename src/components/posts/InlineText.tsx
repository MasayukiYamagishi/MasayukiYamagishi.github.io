import type { ReactNode } from "react";

type InlineTextProps = {
  tone: "info" | "warn" | "alert";
  children: ReactNode;
};

const toneClasses = {
  info: "text-info",
  warn: "text-warn",
  alert: "font-semibold text-alert",
} as const;

/**
 * 記事本文で意味に応じた色を付けるインラインテキストコンポーネント
 *
 * @param InlineTextProps props
 * @returns 色付きインラインテキストのJSX
 */
export function InlineText({ tone, children }: InlineTextProps) {
  return <span className={toneClasses[tone]}>{children}</span>;
}
