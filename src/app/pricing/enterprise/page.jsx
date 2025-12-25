'use client'

import {
  CheckIcon,
  ShieldCheckIcon,
  BuildingStorefrontIcon,
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from '@heroicons/react/24/solid'
import { Header } from '@/components/Header'
import Footer1 from '@/components/footer_1'

const ENTERPRISE_PRICING = {
  priceAnnual: 3600, // 300 x 12
  priceIdAnnual: 'price_enterprise_annual_id',
}

const features = [
  {
    name: 'White-label access',
    description:
      'Fully brand the platform to match your client identity across all team workspaces.',
    icon: BuildingStorefrontIcon,
  },
  {
    name: 'Enterprise API',
    description:
      'Programmatically manage teams, QR codes, analytics, and more at scale.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Dedicated support',
    description:
      'Priority support and service-level agreements to meet enterprise expectations.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Data compliance',
    description:
      'SOC2-ready architecture, encrypted storage, and audit logs ensure full compliance.',
    icon: LockClosedIcon,
  },
  {
    name: 'Auto backups',
    description: 'Daily encrypted database backups for total data integrity.',
    icon: ServerIcon,
  },
]

export default function EnterprisePricingPage() {
  return (
    <>
      <Header />
      <div className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {/* Left Column: Features */}
            <div className="lg:ml-auto lg:pl-4 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold text-indigo-600">
                  For Agencies & Enterprises
                </h2>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  All the control you need
                </p>
                <p className="mt-6 text-lg text-gray-600">
                  Built for brands that scale, and teams that run the show. With
                  full white-label control, unlimited team size, and premium
                  support, Jot Enterprise is your partner in digital
                  transformation.
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base text-gray-600 lg:max-w-none">
                  {features.map((feature) => (
                    <div key={feature.name} className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900">
                        <feature.icon
                          aria-hidden="true"
                          className="absolute left-1 top-1 size-5 text-indigo-600"
                        />
                        {feature.name}
                      </dt>{' '}
                      <dd className="inline">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Right Column: Pricing Card */}
            <div className="flex items-start justify-end">
              <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10">
                <h3 className="text-lg font-semibold text-primary">
                  Enterprise Unlimited
                </h3>

                <div className="mt-4 text-4xl font-semibold text-gray-900">
                  $300<span className="text-base text-gray-600">/month</span>
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  Billed annually –{' '}
                  <strong>${ENTERPRISE_PRICING.priceAnnual}/year</strong>
                </div>

                <p className="mt-4 text-sm text-gray-500">
                  Includes unlimited seats, usage, and advanced tools under a
                  single license.
                </p>

                <ul className="mt-6 space-y-4 text-sm text-gray-600">
                  <li className="flex items-center gap-x-3">
                    <CheckIcon className="h-5 w-5 text-primary" />
                    Unlimited users & clients
                  </li>
                  <li className="flex items-center gap-x-3">
                    <CheckIcon className="h-5 w-5 text-primary" />
                    Custom domain & branding
                  </li>
                  <li className="flex items-center gap-x-3">
                    <CheckIcon className="h-5 w-5 text-primary" />
                    Consolidated billing
                  </li>
                  <li className="flex items-center gap-x-3">
                    <CheckIcon className="h-5 w-5 text-primary" />
                    Priority support access
                  </li>
                </ul>

                {/* Optional: SubscribeButton or CTA */}
                {/* 
                <SubscribeButton
                  userId={user?.id}
                  priceId={ENTERPRISE_PRICING.priceIdAnnual}
                />
                */}
                <div className="mt-8">
                  <a
                    href="/enterprise/onboarding"
                    className="inline-block w-full rounded-lg bg-tertiary px-6 py-3 text-center text-sm font-semibold text-white hover:bg-indigo-600"
                  >
                    Request Enterprise Access
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer1 />
    </>
  )
}
