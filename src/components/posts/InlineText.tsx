import { ReactNode } from "react";

type InlineTextProps = {
  tone: "info" | "warn" | "alert";
  children: ReactNode;
};

const toneClasses = {
  info: "text-info",
  warn: "text-warn",
  alert: "font-semibold text-alert",
} as const;

export function InlineText({ tone, children }: InlineTextProps) {
  return <span className={toneClasses[tone]}>{children}</span>;
}
