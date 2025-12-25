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
      <Header />
      {/* <DynamicHeader /> */}

      {/* Hero Section */}
      <div className="bg-white">
        <div className="relative isolate">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
              <div className="flex">
                {/* <div className="relative flex items-center gap-x-4 rounded-full bg-white px-4 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  <span className="font-semibold text-primary">
                    We’re hiring
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-4 w-px bg-gray-900/10"
                  />
                  <a href="#" className="flex items-center gap-x-1">
                    <span aria-hidden="true" className="absolute inset-0" />
                    See open positions
                    <ChevronRightIcon
                      aria-hidden="true"
                      className="-mr-2 size-5 text-gray-400"
                    />
                  </a>
                </div> */}
              </div>
              <h1 className="mt-10 text-pretty text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                More than just a digital business card.
              </h1>
              <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                Create a powerful digital presence with Jot.Space. Share your
                contact details, social links, Files, Payable Links, and more —
                all in one place.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <a
                  href="/account"
                  className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Claim Your Free Digital Card
                </a>
                <a href="#" className="text-sm/6 font-semibold text-gray-900">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            <InteractivePreviewCard />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Stand out with a Link-in-bio that is as unique as you are
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg/8 text-indigo-200">
              Join hundreds of teams using Jot to network, convert, and grow —
              without wasting a dollar on throwaway print.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-x-6">
              <a
                href="/account"
                className="rounded-lg bg-white px-6 py-3 font-semibold text-primary shadow-md hover:bg-gray-100"
              >
                Get Started Free
              </a>
              <a
                href="/account"
                className="rounded-md bg-tertiary px-3.5 py-2.5 text-sm font-semibold text-primary shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Go Pro
              </a>
              <a href="#" className="text-sm font-semibold text-white">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base/7 font-semibold text-primary">
                  Powerful Mobile Only Digital Business Card Landing pages
                </h2>
                <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  Hub without the Hub-bub
                </p>
                <p className="mt-6 text-lg/8 text-gray-600">
                  Everything you need, nothing you don’t. A sleek set of tools
                  for connecting, sharing, and standing out—no clutter, no
                  noise.
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                  {features.map((feature) => (
                    <div key={feature.name} className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900">
                        <feature.icon
                          aria-hidden="true"
                          className="absolute left-1 top-1 size-5 text-primary"
                        />
                        {feature.name}
                      </dt>{' '}
                      <dd className="inline">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <img
              data-aos="fade-left"
              alt="Product screenshot"
              src="https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics//pagesJun022025.png"
              width={2432}
              height={1442}
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            />
          </div>
        </div>
      </div>

      {/* Builder feature Section */}
      <div className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:ml-auto lg:pl-4 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base/7 font-semibold text-primary">
                  Easy Intuitive Digital Business Card Page Builder
                </h2>
                <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  Bring back connection
                </p>
                <p className="mt-6 text-lg/8 text-gray-600">
                  Our no-code builder lets you create stunning digital business
                  cards in minutes. Customize your page with links, files,
                  social media, and more — all without writing a single line of
                  code.
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                  {features2.map((feature) => (
                    <div key={feature.name} className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900">
                        <feature.icon
                          aria-hidden="true"
                          className="absolute left-1 top-1 size-5 text-primary"
                        />
                        {feature.name}
                      </dt>{' '}
                      <dd className="inline">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div className="flex items-start justify-end lg:order-first">
              <img
                data-aos="fade-right"
                alt="Product screenshot"
                src="https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics//BuilderJun022025.png"
                width={2432}
                height={1442}
                className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
              />
            </div>
          </div>
        </div>
      </div>

      <CustomizationFeature />
      {/* Testimonials */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base/7 font-semibold text-primary">
              Testimonials
            </h2>
            <p className="mt-2 text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Loved by creatives and business professionals alike
            </p>
          </div>
          <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
            <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.author.handle}
                  className="pt-8 sm:inline-block sm:w-full sm:px-4"
                >
                  <figure className="rounded-2xl bg-gray-50 p-8 text-sm/6">
                    <blockquote className="text-gray-900">
                      <p>{`“${testimonial.body}”`}</p>
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-x-4">
                      <img
                        alt=""
                        src={testimonial.author.imageUrl}
                        className="size-10 rounded-full bg-gray-50"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">
                          {testimonial.author.name}
                        </div>
                        <div className="text-gray-600">{`@${testimonial.author.handle}`}</div>
                      </div>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Ready to Build Smarter Connections?
              <span className="text-tertiary">Smarter. Faster. Free.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg/8 text-indigo-200">
              Join hundreds of teams using Jot to network, convert, and grow —
              without wasting a dollar on throwaway print.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/account"
                className="rounded-lg bg-white px-6 py-3 font-semibold text-primary shadow-md hover:bg-gray-100"
              >
                Start for Free
              </a>
              <a
                href="/account/upgrade"
                className="rounded-md bg-tertiary px-3.5 py-2.5 text-sm font-semibold text-primary shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Go Pro
              </a>
              <a href="#" className="text-sm/6 font-semibold text-white">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer1 />
    </>
  )
}
