import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [],
  },
  distDir: '.next',
  useFileSystemPublicRoutes: true,
};

export default nextConfig;
