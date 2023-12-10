// in next.config.js
/** @type {import('next').NextConfig} */

const { CHATS_URL } = process.env;

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: `/:path*`,
      },
      {
        source: "/chats",
        destination: `${CHATS_URL}/chats`,
      },
      {
        source: "/docs/:path*",
        destination: `${CHATS_URL}/chats/:path*`,
      },
    ];
  },
  // webpack: (
  //   config,
  //   { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  // ) => {
  //   config.module.rules.push({
  //     test: /\.mjs$/,
  //     include: /node_modules/,
  //     type: "javascript/auto",
  //   });
  //   return config;
  // },
};

module.exports = nextConfig;
