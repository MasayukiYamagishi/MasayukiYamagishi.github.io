import Image from "next/image";
import type { ShelfStage } from "@/lib/interests";

type ShelfLoadIllustrationProps = {
  stage: ShelfStage;
  alt?: string;
};

export function ShelfLoadIllustration({
  stage,
  alt = "",
}: ShelfLoadIllustrationProps) {
  return (
    <div
      data-stage={stage}
      className="relative min-h-64 overflow-hidden bg-[#101821] sm:min-h-80"
    >
      <Image
        src="/interests/bookshelf-bend.png"
        alt={alt}
        fill
        sizes="(max-width: 1023px) calc(100vw - 3rem), 600px"
        className="object-cover object-[50%_58%]"
        priority
      />
    </div>
  );
}
