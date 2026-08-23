import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { siteMetadata } from "@/config/site";
import { ReactNode } from "react";
import "../globals.css";

export const metadata = siteMetadata;

type Props = {
  children: ReactNode;
};

export default async function LocaleLayout({ children }: Props) {
  return (
    <html lang="ja" suppressHydrationWarning>
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
