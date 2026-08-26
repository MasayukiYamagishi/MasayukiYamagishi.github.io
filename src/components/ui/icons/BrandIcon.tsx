import Image from "next/image";
import { Brand, brandIcons } from "./brandIcons";

type BrandIconProps = {
  brand: Brand;
  size?: number;
  color?: string;
  className?: string;
};

/**
 * ブランドアイコン
 *
 * @param BrandIconProps props
 * @returns ブランドアイコンのJSX
 */
export function BrandIcon({
  brand,
  size = 24,
  color = "currentColor",
  className,
}: BrandIconProps) {
  const icon = brandIcons[brand];

  if (icon.type === "simple-icon") {
    return (
      <svg
        width={size}
        height={size}
        viewBox={icon.viewBox}
        fill={color}
        className={className}
        aria-hidden="true"
      >
        <path d={icon.path} />
      </svg>
    );
  }

  return (
    <span
      className={className}
      style={{
        width: size,
        height: size,
      }}
      aria-hidden="true"
    >
      <Image
        src={icon.light}
        alt=""
        width={size}
        height={size}
        className="theme-icon-light"
      />

      <Image
        src={icon.dark}
        alt=""
        width={size}
        height={size}
        className="theme-icon-dark"
      />
    </span>
  );
}
