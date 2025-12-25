import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from '@heroicons/react/20/solid'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Header } from '@/components/Header'
import Footer_1 from '@/builderAssets/digitalBusinessCard/mics/footer_1'
import { Footer } from '@/components/Footer'
import Footer1 from '@/components/footer_1'
import {
  CheckCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/20/solid'
import TeamsPricingPage from './teamsPricing'

const features = [
  {
    name: 'Centralized Team Management',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Bulk Edits Across All Cards',
    description:
      'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
    icon: LockClosedIcon,
  },
  {
    name: 'Unlimited Updates, Instantly Applied',
    description:
      'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: ServerIcon,
  },
]

const features2 = [
  {
    name: 'See Where Cards Were Scanned',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Track Event-Specific Engagement',
    description:
      'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
    icon: LockClosedIcon,
  },
  {
    name: 'Actionable Insights for Smart Campaigns',
    description:
      'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: ServerIcon,
  },
]

export const metadata = {
  title: 'Jot.Teams | Jot.Space',
  description:
    'Equip your team with smart, trackable digital business cards. Jot.Teams offers centralized management, powerful analytics, and scalable plans.',
  keywords: [
    'Jot.Teams',
    'Jot.Space',
    'team business cards',
    'digital business cards',
    'NFC business cards',
    'QR code cards',
    'trackable business cards',
    'business card platform',
    'field sales tools',
    'team networking',
    'sales enablement',
  ],
  robots: 'index, follow',
  openGraph: {
    title: 'Jot.Teams | Jot.Space',
    description:
      'Ditch printed business cards. Jot.Teams lets you manage, update, and track digital cards across your entire sales org or agency.',
    url: 'https://www.jot.space/teams',
    siteName: 'Jot.Space',
    images: [
      {
        url: 'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/JotMetaImageInSpace.png',
        width: 1200,
        height: 630,
        alt: 'Preview of Jot.Teams digital card dashboard and features',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jot.Teams | Smart Digital Business Cards for Your Team',
    description:
      'Manage your team’s digital business cards in one place. Built-in analytics, geolocation tracking, and instant updates — no print required.',
    images: [
      'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/JotMetaImageInSpace.png',
    ],
    creator: '@jotcards',
  },
  alternates: {
    canonical: 'https://www.jot.space/teams',
  },
}

export default function JotTeamsLandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-white">
        <div className="relative isolate pt-14">
          <div className="py-24 sm:py-32 lg:pb-40">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                  <span className="text-primary">Jot.Teams:</span> The
                  Powerhouse of the Sale
                </h1>
                <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                  qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
                  occaecat.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <a
                    href={`/register?redirect=${encodeURIComponent('/account/upgrade/teams')}`}
                    className="rounded-md bg-tertiary px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-tertiary/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary/80"
                  >
                    Get started
                  </a>
                  <a
                    href="/pricing/teams"
                    className="text-sm/6 font-semibold text-primary"
                  >
                    Learn more <span aria-hidden="true">→</span>
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

      <div className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base/7 font-semibold text-primary">
                  One Dashboard
                </h2>
                <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  Many Profiles
                </p>
                <p className="mt-6 text-lg/8 text-gray-600">
                  Build, manage, and update every member's digital business card
                  from a single intuitive dashboard. No more reprints, no more
                  waste.
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
              src="https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/ManyPagesScreenshot.png"
              width={2432}
              height={1442}
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            />
          </div>
        </div>
      </div>

      <div className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:ml-auto lg:pl-4 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base/7 font-semibold text-primary">
                  Track Every Interaction
                </h2>
                <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  A better workflow
                </p>
                <p className="mt-6 text-lg/8 text-gray-600">
                  Gain geolocation analytics and behavioral data to understand
                  who your team met, when, and where. Perfect for measuring ROI
                  on in-person events.
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
                src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png"
                width={2432}
                height={1442}
                className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Ready to Build Smarter Connections?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg/8 text-gray-200">
              Join hundreds of teams using Jot to network, convert, and grow —
              without wasting a dollar on throwaway print.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href={`/register?redirect=${encodeURIComponent('/account/upgrade/teams')}`}
                className="rounded-md bg-tertiary px-3.5 py-2.5 text-sm font-semibold text-primary shadow-sm hover:bg-tertiary/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get started
              </a>
              <a
                href="/pricing/teams"
                className="text-sm/6 font-semibold text-white"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-white">
        <div className="mx-auto max-w-7xl lg:flex lg:justify-between lg:px-8 xl:justify-end">
          <div className="lg:flex lg:w-1/2 lg:shrink lg:grow-0 xl:absolute xl:inset-y-0 xl:right-1/2 xl:w-1/2">
            <div className="relative h-80 lg:-ml-8 lg:h-auto lg:w-full lg:grow xl:ml-0">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=2560&h=3413&&q=80"
                className="absolute inset-0 size-full bg-gray-50 object-cover"
              />
            </div>
          </div>
          <div className="px-6 lg:contents">
            <div className="mx-auto max-w-2xl pb-24 pt-16 sm:pb-32 sm:pt-20 lg:ml-8 lg:mr-0 lg:w-full lg:max-w-lg lg:flex-none lg:pt-32 xl:w-1/2">
              <p className="text-base/7 font-semibold text-primary">
                Deploy faster
              </p>
              <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                Your Team’s Smartest Business Card Platform
              </h1>
              <p className="mt-6 text-xl/8 text-gray-700">
                Jot.Teams centralizes your company’s digital business cards into
                one intuitive dashboard. From real-time updates and bulk edits
                to geolocation insights and team-wide engagement tracking, every
                feature is designed to drive real-world results. Perfect for
                sales orgs, field teams, and fast-moving agencies.
              </p>
              <div className="mt-10 max-w-xl text-base/7 text-gray-700 lg:max-w-none">
                <p>
                  Easily connect your digital cards to popular CRMs like
                  HubSpot, Roofr, and others for seamless lead capture and
                  follow-up. Whether you're networking at an event or leading a
                  national campaign, Jot ensures your team is prepared,
                  trackable, and always up to date.
                </p>
                <ul role="list" className="mt-8 space-y-8 text-gray-600">
                  <li className="flex gap-x-3">
                    <CloudArrowUpIcon
                      aria-hidden="true"
                      className="mt-1 size-5 flex-none text-primary"
                    />
                    <span>
                      <strong className="font-semibold text-gray-900">
                        Centralized card control.
                      </strong>{' '}
                      Instantly create, edit, or deactivate any team member’s
                      card from a single dashboard — no printing, no waiting.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <LockClosedIcon
                      aria-hidden="true"
                      className="mt-1 size-5 flex-none text-primary"
                    />
                    <span>
                      <strong className="font-semibold text-gray-900">
                        Track every scan.
                      </strong>{' '}
                      Get real-time data on where and when cards are scanned,
                      and tie scans to specific events or campaigns.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <ServerIcon
                      aria-hidden="true"
                      className="mt-1 size-5 flex-none text-primary"
                    />
                    <span>
                      <strong className="font-semibold text-gray-900">
                        CRM integrations built in.
                      </strong>{' '}
                      Automatically sync contact data to platforms like HubSpot,
                      Roofr, and other major CRMs for seamless lead follow-up.
                    </span>
                  </li>
                </ul>

                <p className="mt-8">
                  Whether you're equipping a field sales team, onboarding new
                  agents, or scaling your brand at live events, Jot.Teams helps
                  you move faster, stay organized, and capture every opportunity
                  — all without printing a single card.
                </p>
                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
                  Simple setup. Serious results.
                </h2>
                <p className="mt-6">
                  Get started in minutes and watch your team’s networking,
                  tracking, and conversion efforts come to life. Smart,
                  scalable, and surprisingly easy — Jot.Teams is how modern orgs
                  do business cards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TeamsPricingPage />
      <Footer1 />
    </div>
  )
}
