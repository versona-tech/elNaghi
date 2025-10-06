/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Support for Arabic RTL
  i18n: {
    locales: ['ar'],
    defaultLocale: 'ar',
  },
}

module.exports = nextConfig
