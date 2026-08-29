import type { LucideIcon as LucideIconType } from "lucide-react";

type IconProps = {
  icon: LucideIconType;
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
  "aria-label"?: string;
};

/**
 * lucide-reactを用いたアイコンコンポーネント
 *
 * @param IconProps props
 * @returns lucide-reactを用いたアイコンのJSX
 */
export function Icon({
  icon: IconComponent,
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
  className,
  "aria-label": ariaLabel,
}: IconProps) {
  return (
    <IconComponent
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}
    />
  );
}
