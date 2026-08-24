import { socialLinks } from "@/config/site";
import { BrandIcon } from "./icons/BrandIcon";

const socialLinkStyles = {
  github: {
    size: 24,
    className: "",
  },
  linkedin: {
    size: 26,
    className: "ml-2 mt-1",
  },
  zenn: {
    size: 24,
    className: "mt-1.5",
  },
} as const;

/**
 * ソーシャルリンク
 *
 * @returns ソーシャルリンク一覧のJSX
 */
export function SocialLinks() {
  return (
    <div className="flex gap-4 text-foreground">
      {socialLinks.map((item) => {
        const style = socialLinkStyles[item.key];

        return (
          <a
            key={item.key}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            aria-label={item.label}
            className="inline-flex cursor-pointer items-center justify-center"
          >
            <BrandIcon
              brand={item.key}
              size={style.size}
              className={style.className}
            />
          </a>
        );
      })}
    </div>
  );
}
