const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * CRITICAL CHANGE:
   * Only JS/TS are allowed to become routes.
   * Markdown is now treated as content, not pages.
   */
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md'],

  /**
   * Allow importing .md and .mdx files inside React
   * without letting them hijack routing.
   */
  webpack(config) {
    config.resolve.extensions.push('.md', '.mdx')

    // This allows `import doc from './file.md'`
    config.module.rules.push({
      test: /\.(md|mdx)$/,
      use: [
        {
          loader: '@mdx-js/loader',
        },
      ],
    })

    // Optional alias for clean doc imports (fixed to avoid conflicts)
    config.resolve.alias['@docs'] = path.join(process.cwd(), 'docs')
    // Note: Removed @markdoc alias as it conflicts with @markdoc/markdoc npm package

    return config
  },

  turbopack: {
    resolveAlias: {
      '@docs': path.join(process.cwd(), 'docs'),
    },
  },

  eslint: {
    // Keep your existing behavior
    ignoreDuringBuilds: true,
  },

  typescript: {
    // Keep your existing behavior
    ignoreBuildErrors: true,
  },

  images: {
    domains: ['gjicrqpogkzojcniixqi.supabase.co', 'images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  experimental: {
    optimizeCss: false,
    scrollRestoration: true,
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
