import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  serverExternalPackages: ['pino-pretty'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's2.coinmarketcap.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'metadata.nftscan.com',
        port: '',
      }
    ],
  },

};

export default nextConfig;
