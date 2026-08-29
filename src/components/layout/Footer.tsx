import { SocialLinks } from "../ui/SocialLinks";

const COPYRIGHT_START_YEAR = 2026;

/**
 * サイト共通フッター
 *
 * @returns サイト共通フッターのJSX
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  const copyrightYears =
    currentYear === COPYRIGHT_START_YEAR
      ? `${COPYRIGHT_START_YEAR}`
      : `${COPYRIGHT_START_YEAR} - ${currentYear}`;

  return (
    <footer>
      <div
        className="
          mx-auto
          flex
          w-full
          max-w-5xl
          flex-col
          gap-3
          px-6
          py-8
          sm:px-8
        "
      >
        <SocialLinks />
        <p className="text-sm text-muted">
          © {copyrightYears} Masayuki Yamagishi
        </p>
      </div>
    </footer>
  );
}
