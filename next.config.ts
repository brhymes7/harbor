import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  // Keep the dev badge off the bottom tab bar.
  devIndicators: { position: "top-right" },
};

export default nextConfig;
