import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignores ESLint issues during build
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during build
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
      console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
    }

    // Optimize chunk splitting to stay below Cloudflare's 25 MiB limit per file
    config.optimization.splitChunks = {
      chunks: 'all',
      maxSize: 10 * 1024 * 1024, // 10 MiB per chunk
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
          filename: 'static/chunks/vendor-[name].js',
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          filename: 'static/chunks/common-[name].js',
        },
      },
    };

    return config;
  },
  productionBrowserSourceMaps: false, // Disable source maps for smaller bundles
};

export default nextConfig;