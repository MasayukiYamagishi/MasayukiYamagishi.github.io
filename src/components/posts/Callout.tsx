import { CircleAlert, Info, TriangleAlert } from "lucide-react";
import { ReactNode } from "react";
import { Icon } from "../ui/icons/Icon";

type CalloutTone = "info" | "warn" | "alert";

type CalloutProps = {
  tone: CalloutTone;
  title: string;
  children: ReactNode;
};

const toneConfig = {
  info: {
    icon: Info,
    border: "border-l-info",
    iconColor: "text-info",
  },
  warn: {
    icon: TriangleAlert,
    border: "border-l-warn",
    iconColor: "text-warn",
  },
  alert: {
    icon: CircleAlert,
    border: "border-l-alert",
    iconColor: "text-alert",
  },
} as const;

export function Callout({ tone, title, children }: CalloutProps) {
  const config = toneConfig[tone];

  return (
    <aside
      aria-label={title}
      className={`
        rounded-xl
        border
        border-l-4
        border-border
        bg-surface
        p-4
        ${config.border}
      `}
    >
      <div className="flex items-start gap-3">
        <Icon
          icon={config.icon}
          size={20}
          className={`mt-1 shrink-0 ${config.iconColor}`}
        />

        <div className="min-w-0">
          <p className="font-semibold text-foreground">{title}</p>
          <div className="mt-2 space-y-2 text-sm leading-7">{children}</div>
        </div>
      </div>
    </aside>
  );
}
