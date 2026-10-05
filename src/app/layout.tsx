import type { Metadata } from "next";
import "./globals.css";
import { content, getSiteUrl } from "@/lib/content";
import { ThemeScript } from "@/components/layout/ThemeScript";
import { SceneRail } from "@/components/layout/SceneRail";
import { SiteFooter } from "@/components/layout/SiteFooter";

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
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        {["instrument-sans-condensed", "source-serif-4-400", "source-serif-4-600"].map((f) => (
          <link key={f} rel="preload" href={`/fonts/${f}.woff2`} as="font" type="font/woff2" crossOrigin="anonymous" />
        ))}
      </head>
      <body className="min-h-screen antialiased">
        <ThemeScript />
        <a href="#main-content" className="sr-only-focusable">
          Skip to content
        </a>
        <SceneRail />
        <div className="lg:pl-60">
          <main id="main-content">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
