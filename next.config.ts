import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  // Proxy /api requests to the FastAPI backend during development.
  async rewrites() {
    const backendUrl = process.env.DOCKER_ENV==='true'
    ? 'http://backend:8000'
    : 'http://localhost:8000';
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
