/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  experimental: {
    turbopack: {
      root: ".",
    },
  },
};

export default nextConfig;
