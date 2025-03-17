/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    domains: ['utfs.io'],
    remotePatterns: [
      {
        hostname: 'utfs.io',
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
