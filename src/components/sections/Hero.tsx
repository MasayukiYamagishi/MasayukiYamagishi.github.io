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
    <section id={sectionIds.about}>
      <h1>{dictionary.name}</h1>
      <p>{dictionary.role}</p>
      <p>{dictionary.description}</p>
      <div className="social-links">
        {socialLinks.map((item) => (
          <a key={item.key} href={item.url}>
            {item.label}
          </a>
        ))}
      </div>
    </section>
  );
}
