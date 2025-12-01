import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cubxbmyavmlsyaabsupa.supabase.co',
        pathname: '/storage/v1/object/sign/**',
      },
    ],
  },
  async headers() {
    const allowedOrigins = [
      process.env.NEXT_PUBLIC_AUTH_URL,
      process.env.NEXT_PUBLIC_ADMIN_URL,
      process.env.NEXT_PUBLIC_API_URL,
    ]
      .filter(Boolean)
      .join(',');
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: allowedOrigins || 'http://localhost:3010' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ];
  },
};

export default nextConfig;
