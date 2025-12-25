/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://jot.space', // Replace with your real domain
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateIndexSitemap: false,

  // ❌ Exclude pages you don't want crawled or indexed
  exclude: [
    '/admin*',
    '/private*',
    '/account*',
    '/login',
    '/register',
    '/reset-password',
    '/profile*',
    '/printed',
    '/shop/cart',
    '/site-create',
    '/subscription-success',
    '/register-qr*',
    '/discussions*', // Exclude discussion pages — will add back later
    '/confirm-email',
    '/cancel-sub-checkout',
  ],

  // 🧠 Sync disallow list with excluded paths
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/private',
          '/account',
          '/login',
          '/register',
          '/reset-password',
          '/profile',
          '/printed',
          '/shop/cart',
          '/site-create',
          '/subscription-success',
          '/register-qr',
          '/discussions',
          '/confirm-email',
          '/cancel-sub-checkout',
        ],
      },
    ],
  },
}
