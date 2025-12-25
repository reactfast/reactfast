# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14+ application for creating digital business cards, QR codes, and customizable landing pages. The app is marketed as "Jot Cards" and "Jot.Space" throughout the codebase. It uses Supabase for backend services, Stripe for payments, and features a comprehensive page builder with multi-tenancy support.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (port 3000)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint

# Generate sitemap (runs automatically after build)
npm run postbuild
```

## Architecture

### Tech Stack
- **Framework**: Next.js 14.0.4+ with App Router
- **Database/Auth**: Supabase (PostgreSQL with Row Level Security)
- **Payments**: Stripe (subscriptions and one-time payments)
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Headless UI v2.1, Heroicons v2, Lucide React
- **State Management**: React Context (Auth Provider)
- **Additional Libraries**: QR code generation, PDF generation, Chart.js

### Key Directories

- `/src/app/` - Next.js App Router pages and API routes
  - `/[slug]/` - Dynamic page routes for user-created pages
  - `/account/` - Protected user dashboard and management pages
  - `/api/` - API endpoints for Stripe, Supabase, and other services
  - `/sites/[siteName]/` - Multi-page site builder functionality
  - `/shop/` - E-commerce functionality
  - `/editor/` - Page editor interface

- `/src/builderAssets/` - Reusable section components for page builder
  - `/digitalBusinessCard/` - Business card specific components
  - `/food/` - Restaurant/menu components
  - `/tailwindUi/` - Pre-built UI sections
  - `/custom/` - Custom components including LIM branded sections

- `/src/components/` - Shared React components
- `/src/config/` - Configuration files (Supabase client setup)
- `/src/hooks/` - Custom React hooks (Auth context)
- `/src/helpers/` - Utility functions
- `/src/lib/` - External library configurations (Stripe)

### Authentication Flow

The app uses Supabase Auth with a custom AuthProvider (`/src/hooks/Auth.tsx`):
- `useAuth()` hook provides session and user data
- `getUser()` and `gracefulGetUser()` for server-side user fetching
- Protected routes check authentication status
- Session management with automatic refresh

### Database Schema

Key tables:
- `pages` - User-created pages with customization options (slug, theme, sections order)
- `secs` - Page sections with dynamic content (JSON-based flexible data)
- `products` - E-commerce products with Stripe integration
- `qr_codes` - Generated QR codes with tracking
- `subscriptions` - User subscription data linked to Stripe
- `profiles` - User profiles with Stripe customer IDs
- `user_vcards` - vCard contact information
- `sites` - Multi-page site configurations

### Multi-tenancy & Custom Domains

The middleware (`/src/middleware.js`) handles:
- Custom domain mapping (e.g., `lesismoredesigns.com` → internal routes)
- Redirects from old `jot.cards` domain to `jot.space`
- Site rewriting for multi-page sites
- Protected route enforcement

### Payment Integration

Stripe integration includes:
- Checkout sessions (`/src/app/api/checkout-session/`)
- Subscription management (`/src/app/api/subscription-session/`)
- Webhook handling (`/src/app/api/stripe-webhook/`)
- Customer portal (`/src/app/api/customer-portal/`)
- Product sync with database

### Environment Variables

Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE` - Supabase service role key (backend only)
- `STRIPE_SECRET_KEY` - Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook endpoint secret
- `NEXT_PUBLIC_BASE_URL` - Application base URL (default: https://jot.space)

### Page Builder System

The dynamic page builder allows users to:
1. Create pages with unique slugs
2. Add/reorder sections from pre-built components
3. Customize themes, colors, fonts, and backgrounds
4. Generate QR codes for sharing
5. Track analytics and visitor data
6. Create multi-page sites with navigation

Sections are loaded dynamically based on the page's `order` array (JSON), with each section having its own configuration stored in the `secs` table.

### Important Patterns

1. **Dynamic Imports**: Builder sections use dynamic imports for performance optimization
2. **Server/Client Components**: Strict separation between server and client components per Next.js 14 conventions
3. **RLS (Row Level Security)**: All database operations respect Supabase RLS policies
4. **Responsive Design**: Mobile-first approach with desktop enhancements
5. **QR Code Types**: vCard, WiFi, message, dynamic content, custom redirects
6. **File Uploads**: Supabase Storage for images and documents
7. **Mixed File Extensions**: Both .js/.jsx and .ts/.tsx files are used

### Common Development Tasks

When adding new features:
1. New section types go in `/src/builderAssets/` following existing component patterns
2. API routes follow Next.js 14 conventions in `/src/app/api/`
3. Use existing component patterns from `/src/components/`
4. Follow the established auth patterns using `useAuth()` hook
5. Respect Supabase RLS policies for all database operations
6. Use dynamic imports for heavy components

### Build Configuration

The project has ESLint and TypeScript errors disabled in production builds (see `next.config.js`):
- `eslint: { ignoreDuringBuilds: true }`
- `typescript: { ignoreBuildErrors: true }`

While this allows builds to complete, fixing these issues during development is recommended.

### Testing

No test framework is currently configured. Consider implementing tests for critical functionality.

### Custom Domain Examples

The application supports custom domains mapped to specific pages:
- `lesismoredesigns.com` → LIM (Les Is More) branded sections
- Custom domains can be configured via middleware for client pages