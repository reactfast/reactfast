'use client'

import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/solid'
// import SubscribeButton from '@/components/subBtn'

const tiers = [
  {
    name: 'Connect',
    description: 'Everything you need to get started.',
    priceMonthly: 5,
    priceAnnually: 55,
    priceIdMonthly: 'price_1Qd3EtClYMW24KPOCWOUkdx9',
    priceIdAnnual: 'price_1R0ul7ClYMW24KPOu4jCelOf',
    highlights: [
      { description: '2 customizable pages' },
      { description: 'Access to complete connect' },
      { description: 'Quick connect SMS & email' },
      { description: 'Quick connect email' },
      { description: 'Collect contact info' },
      { description: 'Basic analytics' },
    ],
  },
  {
    name: 'Pro',
    description: 'All the extras for your growing team.',
    priceMonthly: 10,
    priceAnnually: 100,
    priceIdMonthly: 'price_1Qd3GYClYMW24KPOIBKYr7SC',
    priceIdAnnual: 'price_1Qd3GYClYMW24KPOIBKYannual',
    highlights: [
      { description: '4 bespoke pages' },
      { description: '4 QR codes (with redirect)' },
      { description: 'Customizable Apple Wallet cards' },
      { description: 'E-commerce and referral widgets' },
      { description: 'Tap, scan, and click analytics' },
      { description: 'Track navigation' },
    ],
  },
  {
    name: 'Premium',
    description: 'Added flexibility at scale.',
    priceMonthly: 24,
    priceAnnually: 240,
    priceIdMonthly: 'price_1Qd3HiClYMW24KPOXbTbilHU',
    priceIdAnnual: 'price_1Qd3HiClYMW24KPOXbTbilAnnual',
    highlights: [
      { description: '20 bespoke pages' },
      { description: '20 QR codes (with redirect)' },
      { description: 'Advanced analytics' },
      { description: 'Tailored onboarding' },
      { description: 'Export analytics data' },
      { description: 'Lifetime insights & unlimited historical data' },
    ],
  },
]

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false)

  const togglePricing = () => setIsAnnual((prev) => !prev)

  return (
    <div className="bg-neutral-100 p-4 pt-6">
      <div className="mx-auto max-w-4xl px-6 text-center lg:max-w-7xl lg:px-8">
        <h1 className="text-5xl font-semibold tracking-tight text-gray-950 sm:text-6xl">
          Pricing that grows with your team size
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl">
          Choose an affordable plan packed with the best features for engaging
          your audience, creating customer loyalty, and driving sales.
        </p>

        <div className="mt-8 flex items-center justify-center space-x-4">
          <span className="text-gray-600">Monthly</span>
          <button
            onClick={togglePricing}
            className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-200 ${isAnnual ? 'bg-indigo-600' : 'bg-gray-300'}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${isAnnual ? 'translate-x-6' : 'translate-x-1'}`}
            />
          </button>
          <span className="text-gray-600">Annually</span>
        </div>
      </div>

      <div className="relative pt-16 sm:pt-24">
        <div className="relative mx-auto max-w-2xl lg:max-w-7xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md"
              >
                <h2 className="text-lg font-semibold text-indigo-600">
                  {tier.name}
                </h2>
                <p className="mt-2 text-sm text-gray-600">{tier.description}</p>
                <div className="mt-6 text-4xl font-bold text-gray-900">
                  ${isAnnual ? tier.priceAnnually : tier.priceMonthly}
                  <span className="text-sm font-medium text-gray-600">
                    {isAnnual ? '/year' : '/month'}
                  </span>
                </div>
                {/* <SubscribeButton
                  priceId={isAnnual ? tier.priceIdAnnual : tier.priceIdMonthly}
                  userId={null} // Since this is pre-login, no user ID
                /> */}
                <ul className="mt-6 space-y-2">
                  {tier.highlights.map((highlight) => (
                    <li
                      key={highlight.description}
                      className="flex items-center text-gray-700"
                    >
                      <PlusIcon
                        className="h-5 w-5 text-green-500"
                        aria-hidden="true"
                      />
                      <span className="ml-3">{highlight.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
