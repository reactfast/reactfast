'use client'

import { useEffect, useState } from 'react'
import {
  CheckIcon,
  UsersIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/solid'
import Footer1 from '@/components/footer_1'
import { getUser } from '@/hooks/Auth'
import getStripe from '@/lib/getStripe'

const TEAM_PRICING = {
  baseMonthly: 50,
  includedSeats: 5,
  seatMonthly: 15,
  basePriceIdMonthly: 'price_1Rzfw4ClYMW24KPOrYEsLmMG',
  seatPriceIdMonthly: 'price_1RX6EDClYMW24KPOWTD9Zuso',
}

export default function TeamsPricingPage() {
  const [seatCount, setSeatCount] = useState(5)
  const [user, setUser] = useState(null)

  const extraSeats = Math.max(seatCount - TEAM_PRICING.includedSeats, 0)
  const extraSeatCost = extraSeats * TEAM_PRICING.seatMonthly
  const totalDisplay = {
    base: `$${TEAM_PRICING.baseMonthly}/month (includes ${TEAM_PRICING.includedSeats} seats)`,
    seats:
      extraSeats > 0
        ? `$${extraSeatCost}/month for ${extraSeats} extra seat${extraSeats > 1 ? 's' : ''}`
        : 'No extra seats',
  }

  const handleSeatChange = (e) => {
    const value = Math.max(parseInt(e.target.value || '0', 10), 1)
    setSeatCount(value)
  }

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser()
      setUser(userData)
    }
    fetchUser()
  }, [])

  const handleCheckout = async () => {
    if (!user?.id) return

    const res = await fetch('/api/checkout-session/teams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.id,
        basePriceId: TEAM_PRICING.basePriceIdMonthly,
        seatPriceId: TEAM_PRICING.seatPriceIdMonthly,
        seatCount,
        includedSeats: TEAM_PRICING.includedSeats,
      }),
    })
    const data = await res.json()

    if (data.sessionId) {
      const stripe = await getStripe()
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        })
        if (error) console.error('Stripe Checkout redirect error:', error)
      } else {
        console.error('Stripe failed to load.')
      }
    } else {
      console.error('Failed to create Stripe Checkout session')
    }
  }

  return (
    <>
      <div className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {/* Left Column */}
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
                    <UsersIcon className="h-6 w-6 text-primary" /> Unlimited Jot
                    Pages per Team
                  </li>
                  <li className="flex items-center gap-x-3">
                    <BuildingOfficeIcon className="h-6 w-6 text-primary" /> Team
                    Admin & Member Roles
                  </li>
                  <li className="flex items-center gap-x-3">
                    <CheckIcon className="h-6 w-5 text-primary" /> Shared
                    Branding, Analytics, QR
                  </li>
                  <li className="flex items-center gap-x-3">
                    <CheckIcon className="h-6 w-5 text-primary" /> Consolidated
                    Billing
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column */}
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

                <button
                  onClick={handleCheckout}
                  className="mt-8 inline-block w-full rounded-lg bg-tertiary px-6 py-3 text-center text-sm font-semibold text-black hover:bg-tertiary/80"
                >
                  Get Started with Teams
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer1 />
    </>
  )
}
