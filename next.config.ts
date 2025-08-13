import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/flight-search-web-app',
  trailingSlash: true,
};

export default nextConfig;
