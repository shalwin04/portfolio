import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for production
  reactStrictMode: true,

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Enable transpilation for three.js packages
  transpilePackages: ["three"],

  // Empty turbopack config to use Turbopack (Next.js 16 default)
  turbopack: {},
};

export default nextConfig;
