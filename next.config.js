/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    domains: ['utfs.io','storage.googleapis.com'],
    remotePatterns: [
      {
        hostname: 'utfs.io',
      },
      {
        hostname: 'storage.googleapis.com',
      },
    ],

  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.NEXT_PUBLIC_URL || "*",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
