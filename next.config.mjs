// import createNextIntlPlugin from 'next-intl/plugin';
// const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**',
          },
        ],
      },
  // i18n: {
  //       locales: ['en', 'nl'], // Add more locales if needed
  //       defaultLocale: 'en',
  //     },
};

// module.exports = nextConfig;

export default nextConfig;
