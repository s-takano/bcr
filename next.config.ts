import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [],
  },
  distDir: '.next',
  useFileSystemPublicRoutes: true,
  experimental: {
    appDir: true,
  },
};

export default nextConfig;
