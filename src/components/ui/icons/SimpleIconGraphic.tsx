import type { SimpleIcon } from "simple-icons";

type SimpleIconGraphicProps = {
  icon: SimpleIcon;
  size?: number;
  className?: string;
};

export function SimpleIconGraphic({
  icon,
  size = 14,
  className,
}: SimpleIconGraphicProps) {
  const hex = icon.hex.toUpperCase();
  const color =
    hex === "000000" || hex === "FFFFFF" ? "currentColor" : `#${icon.hex}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d={icon.path} />
    </svg>
  );
}
