/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    webpack: (config, { webpack, isServer }) => {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        bufferutil: false,
        'utf-8-validate': false,
      };
      return config;
    },
  }
