/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js configuration options go here
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add ignore-loader for parsing binary files in node_modules
    config.module.rules.push({
      test: /\.node$/,
      loader: 'ignore-loader',
    });

    return config;
  },
};

module.exports = nextConfig;