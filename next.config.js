/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    domains: ['utfs.io','img.clerk.com'],
    remotePatterns: [
      {
        hostname: 'utfs.io',
      },
      {
        hostname:'img.clerk.com'
      }
    ],

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
