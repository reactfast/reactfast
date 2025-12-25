'use client'

import {
  GlobeAltIcon,
  ShoppingCartIcon,
  SparklesIcon,
  DevicePhoneMobileIcon,
} from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

export default function SubCTA() {
  const router = useRouter()

  return (
    <div className="my-16 text-center">
      <SparklesIcon className="mx-auto h-12 w-12 text-purple-500" />
      <h3 className="mt-4 text-xl font-semibold">
        Unlock Powerful Customization
      </h3>
      <p className="mt-2 text-gray-600">
        Upgrade your Jot.Space profile with themes, analytics, and deeper
        integrations.
      </p>
      <button
        onClick={() => router.push('https://jot.space/pricing')}
        className="mt-4 rounded-lg bg-purple-600 px-6 py-2 font-medium text-white hover:bg-purple-700"
      >
        See Subscription Plans
      </button>
    </div>
  )
}
