import { socialLinks } from "@/config/site";

export function Footer() {
  return (
    <footer className="p-4">
      <p className="text-base font-semibold">🄫 Masayuki Yamagishi 2026</p>
      <div className="flex gap-2">
        {socialLinks.map((item) => (
          <a key={item.key} href={item.url}>
            {item.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
