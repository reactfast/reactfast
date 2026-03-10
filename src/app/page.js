import Footer1 from '@/components/footer_1'
// import { Testimonials } from '@/components/Testimonials'
import './global.css'
import BusinessCard from '@/components/businessCardMoc'
import IPhoneHome from '@/components/iphoneHome'
import { Button } from '@/components/Button'
import { Header } from '@/components/Header'
import { Link } from '@/components/link'
import { HeroSection } from '@/components/landing/hero'
import { PricingSection } from '@/components/landing/pricing'
import { Testimonials } from '@/components/landing/testimonials'
import { CTASection } from '@/components/landing/callToAction'
import { ValueProposition } from '@/components/landing/valueProp'
import { DigitalCardSteps } from '@/components/landing/easyOneTwoThree'
import BusinessDescription from '@/components/landing/jotServices'
import CustomizationFeature from '@/components/landing/spaceDesc'
import SubCTA from '@/components/landing/subCta'
import SpinningCard from '@/components/landing/spinningCard'
import Features from '@/components/landing/features'
import QRCodeFeatureList from '@/components/landing/qrCodeFeatures'

import { FaGithub, FaBolt } from 'react-icons/fa'
import { HiOutlineSparkles } from 'react-icons/hi2'
import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
  ChevronRightIcon,
} from '@heroicons/react/20/solid'

import {
  PencilIcon,
  LinkIcon,
  DevicePhoneMobileIcon,
} from '@heroicons/react/24/outline'
import QRCodeCanvas from '@/components/qrv2'
import RotatingTemplatePreviewShell from '@/components/heroSlideShow'
import { InteractivePreviewCard } from '@/components/interactiveIphone'
import DynamicHeader from '@/components/headerNav2'

const features = [
  {
    name: 'Standard Link In Bio Features',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Qr Code and NFC Sharing',
    description:
      "Weather you're in person or online, share your Jot.Space with a tap or scan. No app needed.",
    icon: LockClosedIcon,
  },
  {
    name: 'Quick Connect',
    description:
      'Visitors can save your contact, share theirs, send you a message, or even book a meeting — all with one click.',
    icon: ServerIcon,
  },
]

const features2 = [
  {
    name: 'Drag-and-Drop Editing',
    description:
      'Easily add, rearrange, or remove blocks like text, images, links, and more — all with a few simple taps.',
    icon: PencilIcon,
  },
  {
    name: 'Add Links, Files, and Socials',
    description:
      'Embed all your essentials: calendar links, portfolios, PDFs, social media, contact buttons — all in one place.',
    icon: LinkIcon,
  },
  {
    name: 'Mobile-Optimized by Default',
    description:
      'Your digital card is built specifically for phones — fast, responsive, and stunning on every screen.',
    icon: DevicePhoneMobileIcon,
  },
]

const testimonials = [
  {
    body: 'Jot.Cards changed the way connect with customers. hey can easily find all of my socials, or scroll to the bottom of my page to check out with Venmo or CashApp at my shows. love how easy it is!',
    author: {
      name: 'Gretchen McClendon',
      handle: 'TresChicasJewel',
      imageUrl:
        'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics//gretchenMcClendon.png',
    },
  },
  {
    body: 'Jot helped me grow my clientele and made it super easy for clients to tip—even when they don’t have cash. I love how professional it makes my business look and how simple it is for new clients to book with me.',
    author: {
      name: 'Stephanie Contreras',
      handle: 'stephanie-contreras',
      imageUrl:
        'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics//stephanieContreras.webp',
    },
  },
  {
    body: 'With a large team of door-to-door sales reps, Jot helps us keep everything organized. We use its geolocation features to track canvassed neighborhoods and ensure the right sales rep gets credit and commission. It’s been a game-changer for our operations.',
    author: {
      name: 'Shannon',
      handle: 'nextgen-roofing',
      imageUrl:
        'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics//NEXGEN-Roofing-System-Footer_Logo.webp',
    },
  },
  {
    body: 'Jot.Space has streamlined the way I handle leads and payments. I can easily keep track of potential jobs, share my contact details, and collect payment from clients all in one place. It’s like having a digital business assistant in my pocket.',
    author: {
      name: 'John McClendon',
      handle: 'stephanie-contreras',
    },
  },
  {
    body: 'We use Jot as our all-in-one hub for fans to follow us on social media, watch our latest videos, and buy merch. The e-commerce tools make checking out fans at our booth quick and seamless. It’s a must-have for bands on the go.',
    author: {
      name: 'Damien Contreras',
      handle: 'stephanie-contreras',
      imageUrl:
        'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics//DamienOlidaze.jpeg',
    },
  },
  {
    body: 'I use my Jot.Space profile and Jot Card to quickly connect with vendors and clients. It’s the fastest way to share my info without fumbling for a business card. Everything they need is just a scan away.',
    author: {
      name: 'Zach Howell',
      handle: 'stephanie-contreras',
      imageUrl:
        'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics//zachHowell.webp',
    },
  },
  // More testimonials...
]

export const metadata = {
  title: 'Jot.Space & Jot.Cards — NFC Business Cards + Custom Link Pages',
  description:
    'Create smart digital business cards and link-in-bio pages that connect, convert, and showcase your brand. NFC & QR-enabled, no apps needed.',
  keywords: [
    'digital business cards',
    'NFC business cards',
    'QR code business cards',
    'link in bio',
    'networking tools',
    'Jot.Space',
    'Jot.Cards',
    'custom link page',
    'business networking',
    'eco-friendly cards',
  ],
  twitter: {
    card: 'summary_large_image',
    title: 'Jot.Space & Jot.Cards — Smart Digital Business Cards',
    description:
      'Your hybrid SaaS + eComm solution for next-gen networking. NFC cards + customizable profiles in minutes.',
    images: [
      'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/JotMetaImageInSpace.png',
    ],
    creator: '@jotcards',
  },
  openGraph: {
    title: 'Jot.Space & Jot.Cards — Smart Networking Starts Here',
    description:
      'Shop NFC & QR-enabled cards and launch your customizable link-in-bio profile in minutes. Built for creators, pros, and teams.',
    url: 'https://www.jot.space',
    siteName: 'Jot.Space',
    images: [
      {
        url: 'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/JotMetaImageInSpace.png',
        width: 1200,
        height: 630,
        alt: 'Preview of Jot.Space and Jot.Cards digital business cards and link page',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: [
      { rel: 'icon', url: '/favicon.ico', sizes: 'any' },
      { rel: 'icon', url: '/favicon-16x16.png', sizes: '16x16' },
      { rel: 'icon', url: '/favicon-32x32.png', sizes: '32x32' },
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#ae090c' },
      { rel: 'icon', url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
      sizes: '180x180',
    },
  },
  manifest: '/site.webmanifest',
  other: {
    'msapplication-TileColor': '#2b5797',
    'msapplication-TileImage': '/mstile-144x144.png',
    'theme-color': '#ffffff',
  },
}

export default function Home() {
  return (
    <>
      <Hero />
      <Footer1 />
    </>
  )
}

export function Hero() {
  return (
    <header className="bg-gray-950 px-6 py-20 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        {/* Left: Messaging */}
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-sky-400">
            ReactFast UX Framework
          </p>

          <h1 className="bg-gradient-to-r from-indigo-400 via-sky-400 to-indigo-400 bg-clip-text text-5xl font-extrabold leading-tight text-transparent md:text-6xl">
            Ship React apps
            <br />
            in half the time
          </h1>

          <p className="mt-6 max-w-xl text-lg text-slate-300">
            ReactFast is a JSON-driven UI framework for React & Next.js. Build{' '}
            <strong>forms, navigation, tabs, views, and indexes</strong> from
            schemas — not boilerplate — with consistent styling and
            production-ready behavior out of the box.
          </p>

          <p className="mt-4 max-w-xl text-slate-400">
            Define your UX once. Render it everywhere. Scale from startup to
            enterprise without rewriting a single component.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="/docs"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-500 px-6 py-3 font-semibold text-white transition hover:bg-sky-400"
            >
              <FaBolt className="h-5 w-5" />
              Get Started
            </a>

            <a
              href="/enterprise"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-6 py-3 font-semibold text-slate-200 transition hover:border-sky-400 hover:text-white"
            >
              <HiOutlineSparkles className="h-5 w-5 text-sky-400" />
              Unlock Enterprise Builders
            </a>

            <a
              href="https://github.com/reactfast"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-800 px-6 py-3 font-medium text-white transition hover:bg-slate-700"
            >
              <FaGithub className="h-5 w-5" />
              Open Source
            </a>
          </div>
        </div>

        {/* Right: Value props / teaser */}
        <div className="relative rounded-2xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur">
          <div className="grid gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-sky-400">
                What you get
              </p>
              <h3 className="mt-2 text-2xl font-bold">
                A full UI system powered by JSON
              </h3>
            </div>

            <ul className="space-y-4 text-slate-300">
              <li>
                <strong className="text-white">Forms</strong> — Complex,
                validated forms from schemas with consistent styling
              </li>
              <li>
                <strong className="text-white">Nav</strong> — Responsive,
                searchable navigation from a single definition
              </li>
              <li>
                <strong className="text-white">Tabs</strong> — SPA navigation,
                defined declaratively
              </li>
              <li>
                <strong className="text-white">Views & Indexes</strong> — Render
                records and collections from any database
              </li>
              <li>
                <strong className="text-white">Edge Validation</strong> — Secure
                form pipelines powered by schema-generated functions
              </li>
            </ul>

            <div className="rounded-lg border border-slate-800 bg-slate-950 p-4 text-sm text-slate-400">
              <span className="text-sky-400">Enterprise:</span> Drag-and-drop
              builders that output production-ready schemas for every ReactFast
              library.
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
