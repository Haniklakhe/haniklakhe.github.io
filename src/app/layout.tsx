import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { content, getSiteUrl } from "@/lib/content";
import { ThemeScript } from "@/components/layout/ThemeScript";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: content.site.title,
    template: `%s | ${content.person.name}`,
  },
  description: content.site.description,
  openGraph: {
    title: content.site.title,
    description: content.site.description,
    siteName: content.site.name,
    locale: content.site.locale,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: content.site.title,
    description: content.site.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${inter.variable}`}
    >
      <body className="min-h-screen font-sans antialiased">
        <ThemeScript />
        <a href="#main-content" className="sr-only-focusable">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
