/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Правильный формат — это просто слэш и название репо
  basePath: '/gamepulse',
  assetPrefix: '/gamepulse/',
};

module.exports = nextConfig;