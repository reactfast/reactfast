import Footer1 from '@/components/footer_1'
import { Header } from '@/components/Header'
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
  ClipboardDocumentListIcon,
  PresentationChartLineIcon,
  StarIcon,
  DocumentTextIcon,
  TagIcon,
  MapPinIcon,
  ChartBarIcon,
  ArrowDownTrayIcon,
  QrCodeIcon,
  ShoppingBagIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline'

export const metadata = {
  title: 'Jot Enterprise | QR-Powered Business Tools',
  description:
    'Jot Enterprise is an agency-ready platform for delivering smart QR solutions — from scannable menus to digital RSVPs, review flows, and more.',
  keywords: [
    'QR code tools',
    'QR review funnels',
    'restaurant QR menus',
    'digital RSVP platform',
    'scan to pay',
    'scan to order',
    'enterprise QR platform',
    'event check-in QR',
    'agency tools for QR services',
  ],
  robots: 'index, follow',
  openGraph: {
    title: 'Jot Enterprise | QR Tools for Agencies & Businesses',
    description:
      'Jot Enterprise helps agencies and service providers offer smart QR experiences at scale — from scannable menus to trackable review campaigns.',
    url: 'https://www.jot.space/enterprise',
    siteName: 'Jot.Space',
    images: [
      {
        url: 'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/JotMetaImageInSpace.png',
        width: 1200,
        height: 630,
        alt: 'Jot Enterprise QR tools dashboard preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jot Enterprise | QR Tools for Modern Agencies',
    description:
      'Deliver QR-powered menus, RSVPs, reviews, and check-ins with one subscription. Built for marketing teams, dev shops, and event pros.',
    images: [
      'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/JotMetaImageInSpace.png',
    ],
    creator: '@jotcards',
  },
  alternates: {
    canonical: 'https://www.jot.space/enterprise',
  },
}

const features = [
  {
    name: 'QR Menus With Table Tracking',
    description:
      'Perfect for restaurants that want seamless ordering and table-specific scans.',
    icon: ClipboardDocumentListIcon,
  },
  {
    name: 'RSVP & Guest Check-in Tools',
    description:
      'Ideal for weddings, events, and conferences needing fast, scannable RSVP flows.',
    icon: PresentationChartLineIcon,
  },
  {
    name: 'Google/Yelp Review Conversions',
    description:
      'Boost local SEO with scannable links that guide happy customers to leave public reviews.',
    icon: StarIcon,
  },
  {
    name: 'Patient Intake via QR',
    description:
      'Make medical check-ins easier with scannable links to forms, portals, or instructions.',
    icon: DocumentTextIcon,
  },
  {
    name: 'Smart Tags for Retail & Packaging',
    description:
      'Attach QR codes to physical goods for post-sale experiences, reordering, or engagement.',
    icon: TagIcon,
  },
]

const features2 = [
  {
    name: 'Real-Time Scan Locations',
    description:
      'Track every QR interaction by time and place — great for restaurants, events, and clinics.',
    icon: MapPinIcon,
  },
  {
    name: 'Campaign Performance Metrics',
    description:
      'View engagement by QR code, device type, or campaign flow to understand what converts.',
    icon: ChartBarIcon,
  },
  {
    name: 'Exportable Reports & CRM Sync',
    description:
      'Export data or sync activity to tools your team already uses for reporting and follow-up.',
    icon: ArrowDownTrayIcon,
  },
]

const features3 = [
  {
    name: 'Works With Any QR or NFC Product',
    description:
      'Link your codes to Jot — whether they’re printed on cards, signs, stickers, menus, or merchandise.',
    icon: QrCodeIcon,
  },
  {
    name: 'Perfect for Print Shops & Agencies',
    description:
      'Add value to physical products by pairing them with live QR experiences — no app required.',
    icon: ShoppingBagIcon,
  },
  {
    name: 'Update Links Anytime Without Reprinting',
    description:
      'Edit destinations for any tag, anytime — without needing to replace physical media.',
    icon: PencilSquareIcon,
  },
]

export default function JotEnterpriseLandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <div className="bg-white">
        <div className="relative isolate">
          <div className="py-24 sm:py-32 lg:pb-40">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                  <span className="text-primary">Enterprise: </span>
                  <br /> QR Tools for Agencies, Restaurants, Clinics & More
                </h1>
                <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                  Menus, RSVPs, review flows, and smart scans — all in one
                  dashboard
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <a
                    href="/help/contact?subject=Enterprise%20Demo"
                    className="rounded-md bg-tertiary px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-tertiary/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary/80"
                  >
                    Schedule a Demo
                  </a>
                  <a
                    href="/help/contact?subject=Enterprise%20Partnership"
                    className="text-sm/6 font-semibold text-primary"
                  >
                    Become a Partner <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
              <div className="mt-16 flow-root sm:mt-24">
                <div
                  data-aos="fade-up"
                  className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4"
                >
                  <img
                    alt="App screenshot"
                    src="https://tailwindcss.com/plus-assets/img/component-images/project-app-screenshot.png"
                    width={2432}
                    height={1442}
                    className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                  />
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
                  Built for Service Pros & Agencies
                </h2>
                <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  Deliver QR Campaigns That Just Work
                </p>
                <p className="mt-6 text-lg/8 text-gray-600">
                  Offer clients real-world experiences powered by QR — from
                  scan-to-menu setups to digital RSVPs and review funnels. No
                  coding or custom infrastructure needed.
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                  {features.map((feature) => (
                    <div key={feature.name} className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900">
                        <feature.icon
                          className="absolute left-1 top-1 size-5 text-primary"
                          aria-hidden="true"
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
              alt="QR Campaign Tools Screenshot"
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
                  Real-Time QR Analytics
                </h2>
                <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  See what’s working — instantly
                </p>
                <p className="mt-6 text-lg/8 text-gray-600">
                  Whether you're managing QR menus, RSVP flows, review
                  campaigns, or medical forms — Jot Enterprise tracks every scan
                  with full visibility into when, where, and how people engage.
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
                src="https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics//AnalyticsScreenGrab.png"
                width={2432}
                height={1442}
                className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
              />
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
                  Hardware-Agnostic & Print-Ready
                </h2>
                <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  Bring QR to Anything You Print
                </p>
                <p className="mt-6 text-lg/8 text-gray-600">
                  Whether you’re producing cards, menus, signs, or swag — Jot
                  works with any QR or NFC-enabled surface. Add digital
                  functionality to physical materials with no app install or
                  reprint cycles required.
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                  {features3.map((feature) => (
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
              alt="Print product integrations"
              src="https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics//AnalyticsScreenGrab.png"
              width={2432}
              height={1442}
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              $300/month — Unlimited Power
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg/8 text-indigo-200">
              Launch your own card platform with unlimited users, cards, and
              analytics. One simple monthly price — no per-user billing.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/help/contact?subject=Enterprise%20Demo"
                className="rounded-lg bg-white px-6 py-3 font-semibold text-indigo-600 shadow-md hover:bg-gray-100"
              >
                Request a Demo
              </a>
              <a
                href="/account"
                className="rounded-md bg-tertiary px-3.5 py-2.5 text-sm font-semibold text-primary shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h3 className="text-3xl font-semibold">Who Is Jot Enterprise For?</h3>
          <div className="mt-12 grid gap-10 text-left sm:grid-cols-2 md:grid-cols-3">
            <div>
              <h4 className="text-xl font-bold">Agencies</h4>
              <p className="mt-2 text-gray-600">
                Bundle Jot profiles into client packages and create new revenue
                streams.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold">Sales Orgs</h4>
              <p className="mt-2 text-gray-600">
                Empower reps with trackable, branded digital cards at scale.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold">Print Vendors</h4>
              <p className="mt-2 text-gray-600">
                Add software subscriptions to your physical product offerings.
              </p>
            </div>
          </div>
        </div>
      </section>
      <QRCodeFeatureList />

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
                href="/help/contact?subject=Enterprise%20Demo"
                className="rounded-md bg-tertiary px-3.5 py-2.5 text-sm font-semibold text-primary shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Request a Demo
              </a>
              <a
                href="/account"
                className="rounded-md bg-tertiary px-3.5 py-2.5 text-sm font-semibold text-primary shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer1 />
    </div>
  )
}
