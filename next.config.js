const withAnalyzer = require('@next/bundle-analyzer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // enableUndici: true,
    proxyTimeout: 60_000,
    urlImports: ['https://cdn.skypack.dev', 'https://ruucm.github.io'],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'https://api.revocalize.ai/:path*',
  //     },
  //   ]
  // },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/ai-voice-generator',
        permanent: true,
      },
    ];
  },
  images: {
    unoptimized: true
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: '**.revocalize.ai', 
    //   },
      // {
      //   protocol: 'https',
      //   hostname: '*.revocalize.ai', 
      // },
    // ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },
};

module.exports = withAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);
