'use client'

import { useEffect, useState } from 'react'
import { RadioGroup, Radio } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import { supabaseClient as supabase } from '@/config/supabase-client'
import { getUser } from '@/hooks/Auth'
import SubscribeButton from '@/components/subBtn'
import { getUserSubscription } from '@/helpers/subs'

const frequencies = [
  { value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
  { value: 'annually', label: 'Annually', priceSuffix: '/year' },
]

const IndividualTiers = [
  {
    id: 2,
    name: 'Expand',
    description: 'Everything you need to get started.',
    priceMonthly: 4.99,
    priceAnnually: 49.95,
    priceIdMonthly: 'price_1RL5i4ClYMW24KPODvkj8jCj',
    priceIdAnnual: 'price_1RMVQZClYMW24KPObAriISsv',
    highlights: [
      '5 Jot Pages',
      'Brand-able Metadata',
      'Remove Jot Branding',
      'Quick connect sms & email',
      'Improved Analytics',
      'Booth Ecom Sections (Beta)',
    ],
    disabledFeatures: [5],
  },
  {
    id: 3,
    name: 'Scale',
    description: 'Everything from Connect Plus',
    priceMonthly: 9.99,
    priceAnnually: 99.95,
    priceIdMonthly: 'price_1RL5k1ClYMW24KPO2EvbfNrP',
    priceIdAnnual: 'price_1RL5kZClYMW24KPOmF8xzzaX',
    highlights: [
      '10 ultra-customizable pages',
      'Generate Static QR codes',
      'Advanced analytics',
      'Export Analytics reports',
      'true E-commerce with Stripe',
      'Apple + Google Wallet Business Cards',
    ],
    disabledFeatures: [4, 5],
  },
]

export default function PricingPage() {
  const [frequency, setFrequency] = useState(frequencies[0]) // default: monthly
  const [user, setUser] = useState(null)
  const [currentSubscription, setCurrentSubscription] = useState(null)

  useEffect(() => {
    getUser().then(setUser)
  }, [])

  useEffect(() => {
    if (user?.id) {
      getUserSubscription(user.id).then(setCurrentSubscription)
    }
  }, [user])

  return (
    <div className="isolate overflow-hidden bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 pb-96 pt-24 text-center sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-base font-semibold text-primary">Pricing</h2>
          <p className="mt-2 text-5xl font-semibold tracking-tight text-white sm:text-6xl">
            Choose the right plan for you
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 sm:text-xl">
            Choose an affordable plan packed with the best features for engaging
            your audience, creating customer loyalty, and driving sales.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <RadioGroup
            value={frequency}
            onChange={setFrequency}
            className="grid grid-cols-2 gap-x-1 rounded-full bg-white p-1 text-xs font-semibold ring-1 ring-inset ring-gray-200"
          >
            {frequencies.map((option) => (
              <Radio
                key={option.value}
                value={option}
                className="cursor-pointer rounded-full px-3 py-1 text-gray-600 data-[checked]:bg-primary data-[checked]:text-white"
              >
                {option.label}
              </Radio>
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className="-mt-80 flow-root bg-gray-900 pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
            {IndividualTiers.map((tier) => {
              const isCurrent =
                currentSubscription?.price_id ===
                (frequency.value === 'monthly'
                  ? tier.priceIdMonthly
                  : tier.priceIdAnnual)

              if (isCurrent) return null

              return (
                <div
                  key={tier.name}
                  className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10"
                >
                  <div>
                    <h3 className="text-base font-semibold text-primary">
                      {tier.name}
                    </h3>
                    <div className="mt-4 flex items-baseline gap-x-2">
                      <span className="text-5xl font-semibold tracking-tight text-gray-900">
                        $
                        {frequency.value === 'monthly'
                          ? tier.priceMonthly
                          : tier.priceAnnually}
                      </span>
                      <span className="text-base font-semibold text-gray-600">
                        {frequency.priceSuffix}
                      </span>
                    </div>
                    <p className="mt-6 text-base text-gray-600">
                      {tier.description}
                    </p>
                    <ul className="mt-10 space-y-4 text-sm text-gray-600">
                      {tier.highlights.map((feature, index) => (
                        <li
                          key={feature}
                          className={`flex gap-x-3 ${
                            tier.disabledFeatures.includes(index)
                              ? 'text-gray-400 line-through'
                              : ''
                          }`}
                        >
                          <CheckIcon
                            className="h-6 w-5 flex-none text-primary"
                            aria-hidden="true"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <SubscribeButton
                    userId={user?.id}
                    priceId={
                      frequency.value === 'monthly'
                        ? tier.priceIdMonthly
                        : tier.priceIdAnnual
                    }
                    subTypeID={tier.id}
                  />
                </div>
              )
            })}
          </div>

          {/* Current Subscription Info */}
          {/* <div className="mx-auto mt-16 max-w-2xl rounded-xl bg-gray-50 p-6 shadow ring-1 ring-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Your Current Subscription
            </h2>
            {currentSubscription ? (
              <div className="mt-4 space-y-1 text-gray-700">
                <p>
                  <span className="font-semibold">Plan ID:</span>{' '}
                  {currentSubscription.price_id}
                </p>
                <p className="text-sm text-green-600">
                  You are currently subscribed.
                </p>
              </div>
            ) : (
              <p className="mt-4 text-gray-600">
                You are not subscribed to any plan yet.
              </p>
            )}
          </div> */}
          <div className="mt-16 text-center">
            <p className="text-gray-300">
              Don’t see a plan that fits your needs?
            </p>
            <a
              href="/account/upgrade/teams"
              className="mt-4 inline-block rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow hover:bg-primary/90"
            >
              Explore Teams Plans
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
