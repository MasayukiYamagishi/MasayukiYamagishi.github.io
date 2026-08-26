import Image from "next/image";
import { ThemedTechnologyIcon } from "./TechnologyIcons";

type ThemedImageGraphicProps = {
  icon: ThemedTechnologyIcon;
  size?: number;
};

export function ThemedImageGraphic({
  icon,
  size = 14,
}: ThemedImageGraphicProps) {
  const imageSize = size * (icon.visualScale ?? 1);

  return (
    <span
      aria-hidden="true"
      className="inline-block shrink-0"
      style={{
        width: imageSize,
        height: imageSize,
      }}
    >
      <Image
        src={icon.light}
        alt=""
        width={imageSize}
        height={imageSize}
        unoptimized
        className="theme-icon-light size-full object-contain"
      />

      <Image
        src={icon.dark}
        alt=""
        width={imageSize}
        height={imageSize}
        unoptimized
        className="theme-icon-dark size-full object-contain"
      />
    </span>
  );
}
