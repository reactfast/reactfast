'use client'

import { useEffect, useState } from 'react'
import { RadioGroup, Radio } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import { supabaseClient as supabase } from '@/config/supabase-client'
import { getUser } from '@/hooks/Auth'
import SubscribeButton from '@/components/subBtn'
import { getUserSubscription } from '@/helpers/subs'
import { Header } from '@/components/Header'
import Footer1 from '@/components/footer_1'

const frequencies = [
  { value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
  { value: 'annually', label: 'Annually', priceSuffix: '/year' },
]

const IndividualTiers = [
  {
    name: 'Free',
    description: 'Get started with the essentials.',
    priceMonthly: 0,
    priceAnnually: 0,
    priceIdMonthly: null,
    priceIdAnnual: null,
    highlights: [
      '1 Jot Page',
      'Basic Analytics',
      'Default Jot Branding',
      'Quick connect via QR',
      'Limited Metadata',
      'Email Support',
    ],
    disabledFeatures: [1, 4], // strike through 'Basic Analytics' and 'Limited Metadata' if you want
  },
  {
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

  return (
    <>
      <Header />
      <div className="isolate overflow-hidden bg-primary">
        <div className="mx-auto max-w-7xl pb-96 pt-12 text-center lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-base font-semibold text-tertiary">Pricing</h2>
            <p className="mt-2 text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              Choose the right plan for you
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 sm:text-xl">
              Choose an affordable plan packed with the best features for
              engaging your audience, creating customer loyalty, and driving
              sales.
            </p>
          </div>

          <div className="mt-1 flex justify-center">
            <RadioGroup
              value={frequency}
              onChange={setFrequency}
              className="grid grid-cols-2 gap-x-1 rounded-full bg-white p-1 text-xs font-semibold ring-1 ring-inset ring-gray-200"
            >
              {frequencies.map((option) => (
                <Radio
                  key={option.value}
                  value={option}
                  className="cursor-pointer rounded-full px-3 py-1 text-gray-600 data-[checked]:bg-tertiary data-[checked]:text-black"
                >
                  {option.label}
                </Radio>
              ))}
            </RadioGroup>
          </div>
        </div>

        <div className="-mt-80 flow-root bg-white pb-24 sm:pb-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 pt-24 lg:grid-cols-3">
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
                    {/* <SubscribeButton
                      userId={user?.id}
                      priceId={
                        frequency.value === 'monthly'
                          ? tier.priceIdMonthly
                          : tier.priceIdAnnual
                      }
                    /> */}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Need More?
              <br />
              <span className="text-tertiary">Try Teams or Enterprise </span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg/8 text-indigo-200">
              Empower your brand with Jot — the smarter way to share, scale, and
              succeed. Whether you’re a solo creator or a growing team, our
              tools help you connect more effectively with every impression.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/about/teams"
                className="rounded-lg bg-white px-6 py-3 font-semibold text-primary shadow-md hover:bg-gray-100"
              >
                Lean about Teams
              </a>
              <a
                href="/about/enterprise"
                className="rounded-md bg-tertiary px-3.5 py-2.5 text-sm font-semibold text-primary shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Learn about Enterprise
              </a>
              {/* <a href="#" className="text-sm/6 font-semibold text-white">
                Discover Features <span aria-hidden="true">→</span>
              </a> */}
            </div>
          </div>
        </div>
      </div>
      <Footer1 />
    </>
  )
}
