import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Static export for GitHub Pages — no Node server available there.
  output: "export",
  // GitHub Pages serves `/about/index.html` for a `/about/` request, not `/about.html`.
  trailingSlash: true,
  images: {
    // The Next.js Image Optimization API needs a server; GitHub Pages can't run it.
    // Images are already pre-sized (see content.json _meta.imageOptimization), so
    // serving them unoptimized (as-is) is fine.
    unoptimized: true,
  },
};

export default nextConfig;
