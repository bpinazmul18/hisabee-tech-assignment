/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
      },
    ],
  },
  env: {
    API_URL: process.env.REACT_APP_API_URL,
  },
}

module.exports = nextConfig
