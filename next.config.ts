import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  // The dev badge covers the tab bar or the player's close button wherever it sits.
  devIndicators: false,
};

export default nextConfig;
