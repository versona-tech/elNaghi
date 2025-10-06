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
  // Environment variables
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://mohamedelnagy.netlify.app',
    NEXT_PUBLIC_SITE_NAME: 'محمد الناغي - مرشح مجلس النواب',
    NEXT_PUBLIC_SITE_DESCRIPTION: 'الموقع الرسمي للمرشح محمد الناغي - دائرة منية النصر والكردي وميت سلسيل والجمالية',
  },
  // Optimize for production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Performance optimizations
  swcMinify: true,
}

module.exports = nextConfig
