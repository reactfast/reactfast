'use client'
import {
  GlobeAltIcon,
  ShoppingCartIcon,
  SparklesIcon,
  DevicePhoneMobileIcon,
} from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

export default function BusinessDescription() {
  const router = useRouter()

  return (
    <section className="bg-gray-100 px-6 py-24 text-gray-900">
      <div className="mx-auto mt-24 max-w-5xl text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Jot.
          <span className="text-primary">Space</span> + Jot.
          <span className="text-secondary">Cards</span>
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Jot.Cards is your one-stop shop for QR & NFC-powered networking
          materials, while Jot.Space offers a free link-in-bio service that
          unlocks powerful customization options through subscription.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
        {/* Jot.Space - Linktree Competitor */}
        <div className="rounded-2xl bg-white/80 p-6 text-center shadow-2xl backdrop-blur-lg transition-all duration-300 hover:scale-105">
          <DevicePhoneMobileIcon className="mx-auto h-16 w-16 text-primary drop-shadow-md" />
          <h2 className="mt-4 text-2xl font-semibold">Jot.Space</h2>
          <p className="mt-2 text-gray-600">
            A <strong>free</strong> digital business card & link-in-bio platform
            for networking in person or online. Subscribe for advanced
            customization and analytics.
          </p>
          <button
            onClick={() => router.push('https://jot.space/account')}
            className="mt-4 rounded-lg bg-primary px-6 py-2 font-medium text-white shadow-lg hover:bg-blue-700"
          >
            Explore Jot.Space
          </button>
        </div>

        {/* Jot.Cards - E-commerce */}
        <div className="rounded-2xl bg-white/80 p-6 text-center shadow-2xl backdrop-blur-lg transition-all duration-300 hover:scale-105">
          <ShoppingCartIcon className="mx-auto h-16 w-16 text-secondary drop-shadow-md" />
          <h2 className="mt-4 text-2xl font-semibold">Jot.Cards</h2>
          <p className="mt-2 text-gray-600">
            An <strong>e-commerce store</strong> for QR & NFC-powered networking
            materials. Get physical cards, stickers, and more to share your
            Jot.Space profile.
          </p>
          <button
            onClick={() => router.push('/shop/category/all')}
            className="mt-4 rounded-lg bg-secondary px-6 py-2 font-medium text-white shadow-lg"
          >
            Shop Jot.Cards
          </button>
        </div>
      </div>
    </section>
  )
}
