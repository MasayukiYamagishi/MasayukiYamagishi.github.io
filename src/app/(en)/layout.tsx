import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { geistMono, geistSans, notoSansJP } from "@/config/fonts";
import { siteMetadata } from "@/config/site";
import { themeInitializationScript } from "@/config/theme";
import Script from "next/script";
import { ReactNode } from "react";
import "../globals.css";

export const metadata = siteMetadata;

type Props = {
  children: ReactNode;
};

/**
 * 英語ページのルートレイアウト
 *
 * @param Props props
 * @returns 英語ページのルートレイアウトのJSX
 */
export default async function LocaleLayout({ children }: Props) {
  return (
    <html
      lang="en"
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        ${notoSansJP.variable}
        antialiased
      `}
      suppressHydrationWarning
    >
      <body>
        <Script id="theme-initializer" strategy="beforeInteractive">
          {themeInitializationScript}
        </Script>
        <ThemeProvider>
          <div className="isolate pt-16">
            <Header locale="en" />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
