import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
    ],
  },
  // Performance optimizations
  reactStrictMode: true,
  // Optimize for production
  productionBrowserSourceMaps: false,
};

export default nextConfig;


