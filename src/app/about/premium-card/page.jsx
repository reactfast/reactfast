import React from 'react'
import { Header } from '@/components/Header'
import Footer1 from '@/components/footer_1'
import CustomMetalCards from '@/components/landing/customMetalCards'
import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
  ChevronRightIcon,
} from '@heroicons/react/20/solid'
import QRCodeCanvas from '@/components/qrv2'

export const metadata = {
  title: 'Smart NFC + QR Business Cards | Jot.Cards + Jot.Space',
  description:
    'Eco-friendly metal cards with built-in NFC and QR tech — plus a free Jot.Space page with every order. Track engagement, share contact info, and connect smarter.',
  keywords: [
    'Jot.Cards',
    'NFC business cards',
    'QR code business cards',
    'Jot.Space',
    'eco-friendly business cards',
    'metal NFC cards',
    'digital business card',
    'smart contact card',
    'free digital card landing page',
  ],
  robots: 'index, follow',
  openGraph: {
    title: 'Smart NFC + QR Business Cards | Jot.Cards + Jot.Space',
    description:
      'Buy once. Connect forever. Jot.Cards are sustainable NFC + QR business cards with a free landing page at Jot.Space.',
    url: 'https://www.jot.cards/',
    siteName: 'Jot.Cards',
    images: [
      {
        url: 'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics//CardMetaImage.png',
        width: 1200,
        height: 630,
        alt: 'Jot.Cards NFC card preview and Jot.Space digital profile',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jot.Cards — NFC + QR Cards with a Free Digital Page',
    description:
      'No subscriptions. Just smart networking. Get a reusable NFC + QR card and your free digital profile on Jot.Space.',
    images: [
      'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics//CardMetaImage.png',
    ],
    creator: '@jotcards',
  },
  alternates: {
    canonical: 'https://www.jot.cards/',
  },
}

const features = [
  {
    name: 'Eco-Friendly and Smart',
    description:
      'Reusable materials with NFC and QR-code tech for real-time updates.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Free Digital Pages',
    description:
      'Create and manage your landing page on Jot.Space — perfect for sharing.',
    icon: LockClosedIcon,
  },
  {
    name: 'Advanced Analytics',
    description:
      'Gain actionable insights with every scan: geolocation, timestamps, and more.',
    icon: ServerIcon,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CustomMetalCards />

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="mb-10 text-center text-3xl font-bold">
            Why Choose Jot.Cards?
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="rounded border p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-2">
                  <feature.icon className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-semibold">{feature.name}</h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <div className="bg-white">
        <div className="relative isolate">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
              <h1 className="mt-10 text-pretty text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                Your Free Jot.Space Page Is Included{' '}
              </h1>
              <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                Every material comes with a free companion landing page on
                Jot.Space. Share your details, track engagement, and connect
                smarter.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <a
                  href="/account"
                  className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get started
                </a>
                <a href="#" className="text-sm/6 font-semibold text-gray-900">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            <div className="mt-16 sm:mt-24 lg:mt-0 lg:shrink-0 lg:grow">
              <div className="relative mx-auto h-[600px] w-[300px] overflow-hidden rounded-3xl bg-gray-900 shadow-lg">
                {/* QR Code Overlay */}
                <div className="flex h-full flex-col items-center justify-center">
                  {' '}
                  <div
                    style={{ backgroundColor: '#fff' }}
                    className="flex items-center justify-center rounded-lg bg-red-800 p-2 shadow-lg"
                  >
                    <QRCodeCanvas
                      bgColor={'#fff'}
                      qrColor={'#020DF9'}
                      url={'https://jot.space/'}
                      logoImage="/_next/static/media/Logo.cfb6d066.svg"
                      size={230}
                      dotType="rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Your Networking Revolution Starts Here
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg/8 text-gray-200">
              Join hundreds of teams using Jot to network, convert, and grow —
              without wasting a dollar on throwaway print.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-tertiary px-3.5 py-2.5 text-sm font-semibold text-primary shadow-sm hover:bg-tertiary/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Shop Jot.Cards Now
              </a>
              <a
                href="#"
                className="rounded-md bg-tertiary px-3.5 py-2.5 text-sm font-semibold text-primary shadow-sm hover:bg-tertiary/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get Started Free on Jot.Space
              </a>
              <a href="#" className="text-sm/6 font-semibold text-white">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer1 />
    </div>
  )
}
