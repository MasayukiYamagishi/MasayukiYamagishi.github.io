import Image from "next/image";
import type { ShelfStage } from "@/lib/interests";

type ShelfLoadIllustrationProps = {
  stage: ShelfStage;
  alt?: string;
};

const shelfImageByStage: Record<ShelfStage, string> = {
  1: "/interests/bookshelf-stage-1.webp",
  2: "/interests/bookshelf-stage-2.webp",
  3: "/interests/bookshelf-stage-3.webp",
  4: "/interests/bookshelf-stage-4.webp",
};

export function ShelfLoadIllustration({
  stage,
  alt = "",
}: ShelfLoadIllustrationProps) {
  return (
    <div
      data-stage={stage}
      className="relative aspect-[1618/918] min-h-64 overflow-hidden bg-[#101821] sm:min-h-80 lg:aspect-auto"
    >
      <Image
        src={shelfImageByStage[stage]}
        alt={alt}
        fill
        loading="eager"
        sizes="(max-width: 1023px) calc(100vw - 3rem), 600px"
        className="object-contain"
      />
    </div>
  );
}
