'use client'

import { useState } from 'react'
import {
  CheckIcon,
  UsersIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/solid'
import { Header } from '@/components/Header'
import Footer1 from '@/components/footer_1'

const TEAM_PRICING = {
  baseAnnual: 299,
  includedSeats: 3,
  seatMonthly: 10,
  basePriceIdAnnual: 'price_base_annual_id',
  seatPriceIdMonthly: 'price_seat_monthly_id',
}

export default function TeamsPricingPage() {
  const [seatCount, setSeatCount] = useState(3)

  const extraSeats = Math.max(seatCount - TEAM_PRICING.includedSeats, 0)
  const monthlyExtraSeatCost = extraSeats * TEAM_PRICING.seatMonthly
  const totalDisplay = {
    base: `$${TEAM_PRICING.baseAnnual}/year (includes ${TEAM_PRICING.includedSeats} seats)`,
    seats:
      extraSeats > 0
        ? `$${monthlyExtraSeatCost}/month for ${extraSeats} extra seat${extraSeats > 1 ? 's' : ''}`
        : 'No extra seats',
  }

  const handleSeatChange = (e) => {
    const value = Math.max(parseInt(e.target.value || 0, 10), 1)
    setSeatCount(value)
  }

  return (
    <>
      <div className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {/* Left Column: Details & Features */}
            <div className="lg:ml-auto lg:pl-4 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold text-indigo-600">
                  For Growing Teams
                </h2>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  Scale your impact
                </p>
                <p className="mt-6 text-lg text-gray-600">
                  Jot Teams gives your whole crew the tools to launch custom
                  pages, track engagement, and build better branded
                  connections—together.
                </p>
                <ul className="mt-10 space-y-4 text-sm text-gray-600">
                  <li className="flex items-center gap-x-3">
                    <UsersIcon className="h-6 w-6 text-primary" />
                    Unlimited Jot Pages per Team
                  </li>
                  <li className="flex items-center gap-x-3">
                    <BuildingOfficeIcon className="h-6 w-6 text-primary" />
                    Team Admin & Member Roles
                  </li>
                  <li className="flex items-center gap-x-3">
                    <CheckIcon className="h-6 w-5 text-primary" />
                    Shared Branding, Analytics, QR
                  </li>
                  <li className="flex items-center gap-x-3">
                    <CheckIcon className="h-6 w-5 text-primary" />
                    Consolidated Billing
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Pricing Card */}
            <div className="flex items-start justify-end">
              <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10">
                <h3 className="text-lg font-semibold text-primary">
                  Teams Plan
                </h3>

                <div className="mt-4 text-xl font-medium text-gray-900">
                  {totalDisplay.base}
                </div>

                <div className="mt-2 text-lg text-gray-700">
                  + ${TEAM_PRICING.seatMonthly}/month per extra seat
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="seats"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Total team size:
                  </label>
                  <div className="mt-1 flex items-center gap-x-2">
                    <input
                      id="seats"
                      type="number"
                      min="1"
                      value={seatCount}
                      onChange={handleSeatChange}
                      className="w-20 rounded-md border border-gray-300 p-2 text-sm"
                    />
                    <span className="text-sm text-gray-500">
                      ({TEAM_PRICING.includedSeats} included)
                    </span>
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-500">
                  {totalDisplay.seats}
                </div>

                {/* <SubscribeButton
                  userId={user?.id}
                  basePriceId={TEAM_PRICING.basePriceIdAnnual}
                  seatPriceId={TEAM_PRICING.seatPriceIdMonthly}
                  seats={seatCount}
                  includedSeats={TEAM_PRICING.includedSeats}
                /> */}

                <div className="mt-8">
                  <a
                    href="/teams/signup"
                    className="inline-block w-full rounded-lg bg-tertiary px-6 py-3 text-center text-sm font-semibold text-black hover:bg-tertiary/80"
                  >
                    Get Started with Teams
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
