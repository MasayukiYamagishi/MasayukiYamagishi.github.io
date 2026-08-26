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
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d={icon.path} />
    </svg>
  );
}
