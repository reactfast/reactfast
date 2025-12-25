import Footer1 from '@/components/footer_1'
import { Header } from '@/components/Header'
import QRCodeCanvas from '@/components/qrv2'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from '@heroicons/react/20/solid'

import {
  PencilIcon,
  LinkIcon,
  DevicePhoneMobileIcon,
} from '@heroicons/react/24/outline'

export const metadata = {
  title: 'About | Jot.Space',
  description:
    'Learn more about Jot.Space — a smarter, faster way to create digital business cards and branded link pages with NFC and QR support.',
  keywords: [
    'Jot.Space',
    'digital business cards',
    'NFC cards',
    'QR code cards',
    'link in bio',
    'contactless networking',
    'no-code page builder',
    'about Jot',
    'smart networking',
  ],
  robots: 'index, follow',
  openGraph: {
    title: 'About | Jot.Space',
    description:
      'Jot.Space helps you build stunning mobile-first digital business cards and bio link pages with drag-and-drop simplicity.',
    url: 'https://www.jot.space/about',
    siteName: 'Jot.Space',
    images: [
      {
        url: 'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/JotMetaImageInSpace.png',
        width: 1200,
        height: 630,
        alt: 'Preview of Jot.Space smart business cards and builder UI',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Jot.Space',
    description:
      'Drag. Drop. Connect. Jot.Space makes it easy to launch your custom digital card in minutes — no code or app required.',
    images: [
      'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/JotMetaImageInSpace.png',
    ],
    creator: '@jotcards',
  },
  alternates: {
    canonical: 'https://www.jot.space/about',
  },
}

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

export default function JotSpaceLandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      {/* Hero Section */}
      <div className="bg-white">
        <div className="relative isolate pt-14">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
              <div className="flex">
                <div className="relative flex items-center gap-x-4 rounded-full bg-white px-4 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
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
                </div>
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
                  href="#"
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
                    style={{ backgroundColor: '#ffffff' }}
                    className="flex items-center justify-center rounded-lg bg-red-800 p-2 shadow-lg"
                  >
                    <QRCodeCanvas
                      bgColor={'#ffffff'}
                      qrColor={'#000000'}
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
      {/* CTA */}
      <div className="bg-indigo-700">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Ready to Build Connections?
              <span className="text-tertiary">Smarter. Faster. Free.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg/8 text-indigo-200">
              Ditch paper. Build a powerful digital presence in minutes with
              live analytics, deep customization, and one-click sharing — all
              without an app.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-tertiary px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get started
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
