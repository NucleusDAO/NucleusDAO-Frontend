// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

// next.config.mjs
import { defineConfig } from 'next';

export default defineConfig({
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add ignore-loader for parsing binary files in node_modules
    config.module.rules.push({
      test: /\.node$/,
      loader: 'ignore-loader',
    });

    return config;
  },
});
