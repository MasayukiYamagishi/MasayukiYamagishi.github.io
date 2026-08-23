import { sectionIds } from "@/config/navigation";
import { socialLinks } from "@/config/site";

type HeroProps = {
  dictionary: {
    name: string;
    role: string;
    description: string;
  };
};

export function Hero({ dictionary }: HeroProps) {
  return (
    <section
      id={sectionIds.about}
      className="
        mx-auto
        w-full
        max-w-5xl
        scroll-mt-24
        px-6
        py-20
        sm:px-8
        sm:py-24
      "
    >
      <h1 className="mb-2 text-base font-bold leading-8 text-foreground sm:text-4xl">
        {dictionary.name}
      </h1>
      <p className="text-accent text-base sm:text-lg">{dictionary.role}</p>
      <p className="mt-6 mb-4 max-w-[68ch] text-base leading-7 text-muted sm:text-lg">
        {dictionary.description}
      </p>
      <div className="flex gap-2">
        {socialLinks.map((item) => (
          <a key={item.key} href={item.url}>
            {item.label}
          </a>
        ))}
      </div>
    </section>
  );
}
