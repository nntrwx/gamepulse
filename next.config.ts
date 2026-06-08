/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/gamepulse',
  assetPrefix: '/gamepulse/',
};

module.exports = nextConfig;