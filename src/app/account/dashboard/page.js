'use client'

import { supabaseClient as supabase } from '@/config/supabase-client'
import { useEffect, useRef, useState } from 'react'
import { getUser } from '@/hooks/Auth'
import DoughnutChart from '@/components/charts/chartDoughnut'
import LineChart from '@/components/charts/chartLine'
import Loading from '../loading'
import { getUserSubscription } from '@/helpers/subs'
import AccountPageHeader from '@/components/accountPageHeader'
import Link from 'next/link'
import { CheckIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [categoryProducts, setCategoryProducts] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const CATEGORY_ID = '30fc1676-e912-49eb-b874-260e07fd097c' // Replace with actual category ID

    async function loadCategoryProducts() {
      const products = await getProductsByCategory(CATEGORY_ID)
      setCategoryProducts(products)
    }

    loadCategoryProducts()
  }, [])

  async function getProductsByCategory(categoryId) {
    const { data, error } = await supabase
      .from('category_products')
      .select('product_id, products(*)')
      .eq('category_id', categoryId)

    if (error) {
      console.error('Error fetching category products:', error)
      return []
    }

    // Flatten to just product data
    return data.map((item) => item.products)
  }

  const nextProduct = () => {
    setActiveIndex((prev) =>
      prev < categoryProducts.length - 1 ? prev + 1 : 0,
    )
  }

  const prevProduct = () => {
    setActiveIndex((prev) =>
      prev > 0 ? prev - 1 : categoryProducts.length - 1,
    )
  }

  if (loading) return <Loading />

  return (
    <>
      <div className="container mx-auto px-8">
        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-6 lg:grid-rows-2">
          {/* //! If no Pages created Yet Show get started promo */}
          {/* //! if sites created then show updates and news */}
          <div className="relative hover:brightness-125 lg:col-span-3">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
              {categoryProducts.length > 0 ? (
                <>
                  <img
                    alt={categoryProducts[activeIndex].name}
                    src={
                      categoryProducts[activeIndex].default_image ||
                      '/placeholder.jpg'
                    }
                    className="h-80 object-cover object-center"
                  />
                  <Link
                    href={
                      'http://localhost:3000/shop/category/undefined/' +
                      categoryProducts[activeIndex].id
                    }
                  >
                    <div className="p-10 pt-4">
                      <h3 className="text-sm/4 font-semibold text-primary">
                        {categoryProducts[activeIndex].name}
                      </h3>
                      <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                        ${categoryProducts[activeIndex].price?.toFixed(2)}
                      </p>
                      <p className="mt-2 line-clamp-3 max-w-lg text-sm/6 text-gray-600">
                        {categoryProducts[activeIndex].short_description ||
                          categoryProducts[activeIndex].description}
                      </p>
                    </div>
                  </Link>
                  <div className="mt-auto flex items-center justify-between px-10 pb-4">
                    <button
                      onClick={prevProduct}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      ← Previous
                    </button>
                    <button
                      onClick={nextProduct}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Next →
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center p-10 text-gray-500">
                  Fetching Products
                </div>
              )}
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
          </div>

          {/* //! If no Pages created Yet Show get started promo */}
          {/* //! if sites created then show updates and news */}
          <div className="relative lg:col-span-3">
            <div className="absolute inset-px rounded-lg bg-white lg:rounded-tr-[2rem]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]">
              <img
                alt=""
                src="https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/placeholders/Frame%2023.png"
                className="h-80 object-cover object-center"
              />
              <div className="flex flex-1 flex-col justify-between p-10 pt-4">
                <div>
                  <h3 className="text-sm/4 font-semibold text-primary">
                    Getting Started
                  </h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                    Quick Start Guide
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                    Curabitur auctor, ex quis auctor venenatis, eros arcu
                    rhoncus massa, laoreet dapibus ex elit vitae odio.
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    target="_blank"
                    href="/help/docs/quick-start"
                    className="rounded-md bg-primary px-3.5 py-3 text-sm font-semibold text-white shadow-sm hover:brightness-125 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Get Started!
                  </Link>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-tr-[2rem]" />
          </div>

          {/* //! personalized news  */}
          <div className="relative lg:col-span-2">
            <div className="absolute inset-px rounded-lg bg-white ring-2 ring-primary lg:rounded-bl-[2rem]" />
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-bl-[calc(2rem+1px)]">
              <div className="flex flex-1 flex-col justify-between p-10 pt-6">
                <div>
                  <h3 className="text-sm font-semibold text-primary">
                    Expand Plan
                  </h3>
                  <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900">
                    Upgrade for powerful features
                  </p>
                  <p className="mt-3 max-w-md text-sm text-gray-600">
                    Unlock branding, analytics, e-commerce tools and more with
                    the Expand subscription.
                  </p>
                  <ul className="mt-6 space-y-3 text-sm text-gray-600">
                    <li className="flex items-start gap-x-2">
                      <CheckIcon className="h-5 w-5 text-primary" />5 Jot Pages
                    </li>
                    <li className="flex items-start gap-x-2">
                      <CheckIcon className="h-5 w-5 text-primary" />
                      Brand-able Metadata
                    </li>
                    <li className="flex items-start gap-x-2">
                      <CheckIcon className="h-5 w-5 text-primary" />
                      Remove Jot Branding
                    </li>
                    <li className="flex items-start gap-x-2">
                      <CheckIcon className="h-5 w-5 text-primary" />
                      Quick connect SMS & email
                    </li>
                    <li className="flex items-start gap-x-2">
                      <CheckIcon className="h-5 w-5 text-primary" />
                      Improved Analytics
                    </li>
                    <li className="flex items-start gap-x-2">
                      <CheckIcon className="h-5 w-5 text-primary" />
                      Booth Ecom Sections (Beta)
                    </li>
                  </ul>
                </div>
                <div className="mt-6">
                  <Link
                    href="/pricing"
                    className="inline-block rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    Upgrade Now
                  </Link>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-bl-[2rem]" />
          </div>

          <div className="relative lg:col-span-2">
            <Link href={'/pets'}>
              <div className="absolute inset-px rounded-lg bg-white" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/component-images/bento-01-integrations.png"
                  className="h-80 object-cover"
                />
                <div className="p-10 pt-4">
                  <h3 className="text-sm/4 font-semibold text-primary">
                    Powered Jot.Space
                  </h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                    BoopTag
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                    Your best friend deserves the best! BoopTag helps you keep
                    your pet safe and connected. With a BoopTag, you can easily
                    share your pet's information with anyone who finds them,
                    making it easier to reunite with your furry friend.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5" />
            </Link>
          </div>
          <div className="relative lg:col-span-2">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]">
              <img
                alt=""
                src="https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/placeholders/Frame%2022.png"
                className="h-80 object-cover"
              />
              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-primary">
                  Learn (Coming Soon)
                </h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                  Learn with JOT resources
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                  Access User documentation and helpful how-to videos
                </p>
                <div className="mt-6">
                  <Link
                    target="_blank"
                    href="/help/docs/quick-start"
                    className="inline-block rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    Start Learning
                  </Link>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
          </div>
        </div>
      </div>
    </>
  )
}
