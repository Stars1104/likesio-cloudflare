import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
        ignoreDuringBuilds: true, // ⛔ Ignores all ESLint issues during build
    },
    typescript: {
        ignoreBuildErrors: true
    },
    // Add environment variables configuration
    publicRuntimeConfig: {
        // Will be available on both server and client
        apiUrl: process.env.NEXT_PUBLIC_API_URL,
    },
    env: {
        // Make sure environment variables are consistently available
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    },
    // Optional: Add custom webpack configuration if needed
    webpack: (config, { isServer }) => {
        // Log environment variables during build (only on server)
        if (isServer) {
            console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
            console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
        }
        config.optimization.splitChunks = {
            chunks: 'all',
            maxSize: 24000000, // 24 MiB
        };
        return config;
    },
};

export default nextConfig;