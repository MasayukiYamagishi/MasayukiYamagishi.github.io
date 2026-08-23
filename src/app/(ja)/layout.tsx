import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { geistMono, geistSans, notoSansJP } from "@/config/fonts";
import { siteMetadata } from "@/config/site";
import { ReactNode } from "react";
import "../globals.css";

export const metadata = siteMetadata;

type Props = {
  children: ReactNode;
};

export default async function LocaleLayout({ children }: Props) {
  return (
    <html
      lang="ja"
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        ${notoSansJP.variable}
        antialiased
      `}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <Header locale="ja" />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
