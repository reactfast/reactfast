'use client'

import { use, useEffect, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from '@headlessui/react'
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  QrCodeIcon,
  NewspaperIcon,
  BuildingStorefrontIcon,
  UserIcon,
  BanknotesIcon,
  BoltIcon,
  ArchiveBoxIcon,
  UserPlusIcon,
  CalendarDaysIcon,
  ComputerDesktopIcon,
  QueueListIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import { supabaseClient as supabase } from '@/config/supabase-client'
import {
  getCart,
  saveCart,
  addToCart,
  removeFromCart,
  updateQuantity,
} from '@/helpers/cart'
import { getUser } from '@/hooks/Auth'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import FeedbackLayout from '@/components/feedbackLayout'
import { ChartBarIcon } from '@heroicons/react/24/solid'
import NewsBanner from '@/components/banner'
import { getUserSubscription } from '@/helpers/subs'
import { LiaSpaceShuttleSolid } from 'react-icons/lia'
import { BuildingOffice2Icon } from '@heroicons/react/20/solid'
import { PawPrint } from 'lucide-react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example({ children }) {
  const [loading, setLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userData, setUserData] = useState(null)
  const [roles, setRoles] = useState([])
  const [stripeId, setStripeId] = useState(null)
  const pathname = usePathname()
  const isPagesWithNumbers =
    /pages\/\d+$/.test(pathname) || /flows\/forms\/[\w-]+$/.test(pathname)
  const [cart, setCart] = useState(null)
  const [subscription, setSubscription] = useState('loading') // user subscription
  const [firstTimeLogin, setFirstTimeLogin] = useState(false)

  const redirectToCustomerPortal = async () => {
    try {
      setLoading(true)

      const response = await fetch('/api/customer-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerId: stripeId }),
      })

      const data = await response.json()

      if (response.ok && data.url) {
        window.location.href = data.url // Redirect to Stripe portal
      } else {
        console.error('Failed to create portal session:', data.error)
      }
    } catch (err) {
      console.error('Request failed:', err)
    } finally {
      setLoading(false)
    }
  }

  const [dynamicNavigation, setDynamicNavigation] = useState([
    { name: 'Space', href: '/account/pages', icon: LiaSpaceShuttleSolid },
    { name: 'Dashboard', href: '/account/dashboard', icon: HomeIcon },
    { name: 'Analytics', href: '/account/analytics', icon: ChartBarIcon },
    { name: 'Devices', href: '/account/devices', icon: QrCodeIcon },
    { name: 'Assets', href: '/account/assets', icon: FolderIcon },
  ])

  const navigation = [
    { name: 'Space', href: '/account/pages', icon: LiaSpaceShuttleSolid },
    { name: 'Dashboard', href: '/account/dashboard', icon: HomeIcon },
    { name: 'Analytics', href: '/account/analytics', icon: ChartBarIcon },
    { name: 'Devices', href: '/account/devices', icon: QrCodeIcon },
    { name: 'Assets', href: '/account/assets', icon: FolderIcon },
  ]

  const TeamsNav = [
    { name: 'Organization', href: '/account/org', icon: BuildingOffice2Icon },
    { name: 'Team', href: '/account/team', icon: UsersIcon },
  ]

  const accountNavigation = [
    {
      name: 'Shop',
      href: '/shop/category/all',
      icon: BuildingStorefrontIcon,
      count: 0,
    },
    { name: 'Billing', href: '/account/billing', icon: BanknotesIcon },
  ]

  useEffect(() => {
    const cart = getCart()

    if (cart) {
      setCart(cart)
    }

    async function _getUser() {
      try {
        const user = await getUser()
        setUserData(user)
        console.log('user', user)
      } catch (error) {
        console.error('Error getting user:', error)
        window.location.href = '/login'
      }
    }

    _getUser()
  }, [])

  useEffect(() => {
    if (!userData) return

    console.log('cart', cart)

    async function _getUserRoles() {
      const { data, error } = await supabase
        .from('user_roles')
        .select('roles(*)')
        .eq('user', userData.id)

      const cleanedData = data?.map((item) => item.roles) || []

      if (error) {
        console.error('Error fetching user roles:', error)
        return
      }

      setRoles(cleanedData)
    }

    async function _getStripeID() {
      let { data: profiles, error } = await supabase
        .from('profiles')
        .select('stripe_customer_id')
        .eq('id', userData.id)
        .single()

      if (error) {
        console.error('Error fetching stripe ID:', error)
        return
      }

      setStripeId(profiles.stripe_customer_id)
    }

    async function getSubscription() {
      const sub = await getUserSubscription(userData.id)
      setSubscription(sub?.designation === 'free' ? null : sub)
    }

    async function checkFirstTimeLogin() {
      const { data, error } = await supabase
        .from('profiles')
        .select('created_at')
        .eq('id', userData.id)
        .single()

      if (error) {
        console.error('Error fetching user creation date:', error)
        return
      }

      const createdAt = new Date(data.created_at)
      const today = new Date()

      const isSameDay =
        createdAt.getFullYear() === today.getFullYear() &&
        createdAt.getMonth() === today.getMonth() &&
        createdAt.getDate() === today.getDate()

      if (isSameDay) {
        setFirstTimeLogin(true)
      }
      console.log('First time login:', isSameDay)
    }

    getSubscription()
    _getStripeID()
    _getUserRoles()
    checkFirstTimeLogin()
  }, [userData])

  useEffect(() => {
    console.log('sub', subscription)
  }, [subscription])

  useEffect(() => {
    if (!userData) return

    async function buildNavigation() {
      let newNavigation = [...navigation]

      // Roles logic
      if (roles.some((role) => role.name === 'Admin')) {
        newNavigation.push(
          { name: 'Flows', href: '/account/flows', icon: CalendarDaysIcon },
          { name: 'Admin', href: '/account/admin', icon: UserPlusIcon },
          { name: 'Sites', href: '/account/sites', icon: ComputerDesktopIcon },
        )
      }

      // Pets logic
      const { data: pets, error } = await supabase
        .from('pets')
        .select('*')
        .eq('user_id', userData.id)

      if (error) {
        console.error('Error checking pets:', error)
      } else if (pets && pets.length > 0) {
        newNavigation.push({
          name: 'Pets',
          href: '/account/boop-tag',
          icon: PawPrint,
        })
      }

      setDynamicNavigation(newNavigation)
    }

    buildNavigation()
  }, [roles, userData])

  const getCurrentTab = () => {
    return (
      dynamicNavigation.find((item) => pathname.startsWith(item.href))?.name ||
      'Dashboard'
    )
  }

  if (isPagesWithNumbers) {
    return (
      <>
        <div>{children}</div>
      </>
    )
  }

  if (pathname.includes('/admin/')) {
    return <>{children}</>
  }

  return (
    <>
      <div>
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-50 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r-2 border-primary bg-white px-6 pb-2">
                <div className="mt-2 flex h-16 shrink-0 items-center">
                  <Link href="/" className="flex items-center gap-x-4">
                    <svg
                      width="100"
                      height="auto"
                      viewBox="0 0 410 239"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M190.975 0.450052H265.935C269.761 0.450052 271.562 1.35046 271.562 3.37638C271.562 5.85252 269.311 6.75291 262.558 7.20313C234.87 8.77884 234.42 9.90436 234.645 25.8866V125.157C234.645 156.671 231.944 169.502 222.49 181.432C211.685 195.164 197.053 202.592 180.846 202.592C169.366 202.592 162.387 197.415 162.387 189.086C162.387 182.558 167.34 177.831 174.318 177.831C179.72 177.831 184.673 180.532 188.049 185.259C192.551 191.787 193.226 192.237 197.503 192.237C202.231 192.237 205.607 189.311 207.408 183.683C209.209 178.506 209.434 175.58 210.334 135.286V20.7093C210.559 10.1295 208.308 7.87844 196.828 7.20313C190.525 7.20313 187.374 6.07762 187.374 3.60148C187.374 2.02577 188.95 0.450052 190.975 0.450052Z"
                        fill="#020df9"
                      />
                      <path
                        d="M284.129 55.8365C310.015 55.8365 330.949 77.8965 330.949 105.134C330.949 132.821 309.79 154.431 282.553 154.431C268.146 154.431 257.792 149.929 247.437 138.674C239.108 129.895 234.606 118.19 234.606 105.809C234.606 77.4463 255.991 55.8365 284.129 55.8365ZM283.453 61.6892C276.7 61.6892 271.073 64.1653 266.571 68.6673C261.168 74.52 257.116 89.8269 257.116 104.008C257.116 122.467 259.367 132.371 264.995 140.25C269.047 145.652 276.25 149.254 283.453 149.254C300.336 149.254 309.114 133.497 309.114 103.783C309.114 76.3208 300.111 61.6892 283.453 61.6892Z"
                        fill="#020df9"
                      />
                      <path
                        d="M350.053 70.0504L349.827 128.802C349.827 139.382 354.104 145.685 361.758 145.685C364.684 145.685 370.087 144.559 375.714 142.758C376.84 142.533 377.965 142.308 378.866 142.308C380.441 142.308 380.892 143.209 380.892 145.91C380.892 147.486 380.666 147.711 379.091 148.386C378.415 148.611 377.29 149.061 376.164 149.512C366.26 153.563 362.433 154.464 355.23 154.464C340.373 154.464 330.469 145.235 330.694 131.503L331.144 70.2755L317.97 70.4091C315.494 70.4091 314.369 69.5088 314.369 67.4828C314.369 65.682 315.269 64.3314 318.42 62.0804C322.472 59.154 329.118 56.7694 343.525 43.2632C345.551 41.2373 346.901 40.3369 347.802 40.3369C349.377 40.3369 350.503 41.4624 350.503 43.0381L350.053 61.0463H376.615C380.892 61.0463 381.342 61.2714 381.342 62.8471C381.342 64.6479 380.441 68.4747 379.991 69.15C379.541 69.8253 378.415 70.0504 375.939 70.0504H350.053Z"
                        fill="#020df9"
                      />
                      <path
                        d="M3.41822 22.9603C3.41822 12.393 11.9847 3.82661 22.5519 3.82661H387.395C397.963 3.82661 406.529 12.3931 406.529 22.9603V215.738C406.529 226.305 397.963 234.872 387.395 234.872H22.5519C11.9847 234.872 3.41822 226.305 3.41822 215.738V22.9603Z"
                        stroke="#020df9"
                        stroke-width="6.75307"
                      />
                    </svg>
                  </Link>
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {dynamicNavigation.map((item) => (
                          <>
                            {item.name == 'Billing' ? (
                              <li key={item.name}>
                                <div
                                  onClick={redirectToCustomerPortal}
                                  className={
                                    'group flex cursor-pointer gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-primary transition-all duration-200 hover:bg-neutral-100'
                                  }
                                >
                                  <item.icon
                                    aria-hidden="true"
                                    className={classNames(
                                      pathname.startsWith(item.href)
                                        ? 'text-primary'
                                        : 'text-primary',
                                      'size-6 shrink-0',
                                    )}
                                  />
                                  {item.name + 'testing'}
                                </div>
                              </li>
                            ) : (
                              <li key={item.name}>
                                <Link
                                  onClick={() => setSidebarOpen(false)}
                                  href={item.href}
                                  className={classNames(
                                    pathname.startsWith(item.href)
                                      ? 'bg-neutral-200 text-primary'
                                      : 'text-primary transition-all duration-200 hover:bg-neutral-100',
                                    'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                  )}
                                >
                                  <item.icon
                                    aria-hidden="true"
                                    className={classNames(
                                      pathname.startsWith(item.href)
                                        ? 'text-primary'
                                        : 'text-primary',
                                      'size-6 shrink-0',
                                    )}
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            )}
                          </>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* desktop menu */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r-2 bg-neutral-100 px-6">
            <div className="mt-4 flex h-16 shrink-0 items-center">
              <Link href="/" className="flex items-center gap-x-4">
                <svg
                  width="100"
                  height="auto"
                  viewBox="0 0 410 239"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M190.975 0.450052H265.935C269.761 0.450052 271.562 1.35046 271.562 3.37638C271.562 5.85252 269.311 6.75291 262.558 7.20313C234.87 8.77884 234.42 9.90436 234.645 25.8866V125.157C234.645 156.671 231.944 169.502 222.49 181.432C211.685 195.164 197.053 202.592 180.846 202.592C169.366 202.592 162.387 197.415 162.387 189.086C162.387 182.558 167.34 177.831 174.318 177.831C179.72 177.831 184.673 180.532 188.049 185.259C192.551 191.787 193.226 192.237 197.503 192.237C202.231 192.237 205.607 189.311 207.408 183.683C209.209 178.506 209.434 175.58 210.334 135.286V20.7093C210.559 10.1295 208.308 7.87844 196.828 7.20313C190.525 7.20313 187.374 6.07762 187.374 3.60148C187.374 2.02577 188.95 0.450052 190.975 0.450052Z"
                    fill="#020df9"
                  />
                  <path
                    d="M284.129 55.8365C310.015 55.8365 330.949 77.8965 330.949 105.134C330.949 132.821 309.79 154.431 282.553 154.431C268.146 154.431 257.792 149.929 247.437 138.674C239.108 129.895 234.606 118.19 234.606 105.809C234.606 77.4463 255.991 55.8365 284.129 55.8365ZM283.453 61.6892C276.7 61.6892 271.073 64.1653 266.571 68.6673C261.168 74.52 257.116 89.8269 257.116 104.008C257.116 122.467 259.367 132.371 264.995 140.25C269.047 145.652 276.25 149.254 283.453 149.254C300.336 149.254 309.114 133.497 309.114 103.783C309.114 76.3208 300.111 61.6892 283.453 61.6892Z"
                    fill="#020df9"
                  />
                  <path
                    d="M350.053 70.0504L349.827 128.802C349.827 139.382 354.104 145.685 361.758 145.685C364.684 145.685 370.087 144.559 375.714 142.758C376.84 142.533 377.965 142.308 378.866 142.308C380.441 142.308 380.892 143.209 380.892 145.91C380.892 147.486 380.666 147.711 379.091 148.386C378.415 148.611 377.29 149.061 376.164 149.512C366.26 153.563 362.433 154.464 355.23 154.464C340.373 154.464 330.469 145.235 330.694 131.503L331.144 70.2755L317.97 70.4091C315.494 70.4091 314.369 69.5088 314.369 67.4828C314.369 65.682 315.269 64.3314 318.42 62.0804C322.472 59.154 329.118 56.7694 343.525 43.2632C345.551 41.2373 346.901 40.3369 347.802 40.3369C349.377 40.3369 350.503 41.4624 350.503 43.0381L350.053 61.0463H376.615C380.892 61.0463 381.342 61.2714 381.342 62.8471C381.342 64.6479 380.441 68.4747 379.991 69.15C379.541 69.8253 378.415 70.0504 375.939 70.0504H350.053Z"
                    fill="#020df9"
                  />
                  <path
                    d="M3.41822 22.9603C3.41822 12.393 11.9847 3.82661 22.5519 3.82661H387.395C397.963 3.82661 406.529 12.3931 406.529 22.9603V215.738C406.529 226.305 397.963 234.872 387.395 234.872H22.5519C11.9847 234.872 3.41822 226.305 3.41822 215.738V22.9603Z"
                    stroke="#020df9"
                    stroke-width="6.75307"
                  />
                </svg>
              </Link>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  {/* <div className="text-xs/6 font-semibold text-gray-400">
                    Your teams
                  </div> */}
                  <ul role="list" className="-mx-2 space-y-1">
                    {dynamicNavigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={classNames(
                            pathname.startsWith(item.href)
                              ? 'bg-neutral-200 text-primary'
                              : 'text-neutral-500 transition-all duration-200 hover:bg-neutral-100',
                            'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                          )}
                        >
                          <item.icon
                            aria-hidden="true"
                            className={classNames(
                              pathname.startsWith(item.href)
                                ? 'text-primary'
                                : 'text-neutral5200',
                              'size-6 shrink-0',
                            )}
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs/6 font-semibold text-gray-400">
                    Account
                  </div>
                  <ul role="list" className="-mx-2 space-y-1">
                    {accountNavigation.map((item) => (
                      <>
                        {item.name == 'Billing' ? (
                          <li key={item.name}>
                            <div
                              onClick={redirectToCustomerPortal}
                              className={classNames(
                                pathname.startsWith(item.href)
                                  ? 'bg-neutral-200 text-primary'
                                  : 'cursor-pointer text-neutral-500 transition-all duration-200 hover:bg-neutral-100',
                                'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                !stripeId && 'hidden',
                              )}
                            >
                              <item.icon
                                aria-hidden="true"
                                className={classNames(
                                  pathname.startsWith(item.href)
                                    ? 'text-primary'
                                    : 'text-neutral-500',
                                  'size-6 shrink-0',
                                )}
                              />
                              {item.name}
                            </div>
                          </li>
                        ) : (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              className={classNames(
                                pathname.startsWith(item.href)
                                  ? 'bg-neutral-200 text-primary'
                                  : 'text-neutral-500 transition-all duration-200 hover:bg-neutral-100',
                                'group flex gap-x-3 rounded p-2 text-sm/6 font-semibold',
                              )}
                            >
                              <item.icon
                                aria-hidden="true"
                                className={classNames(
                                  pathname.startsWith(item.href)
                                    ? 'text-primary'
                                    : 'text-neutral-500',
                                  'size-6 shrink-0',
                                )}
                              />
                              {item.name}

                              {item.name === 'Shop' &&
                                cart?.items.length > 0 && (
                                  <span
                                    aria-hidden="true"
                                    className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-gray-200 px-2.5 py-0.5 text-center text-xs/5 font-medium text-black ring-1 ring-inset ring-gray-400"
                                  >
                                    {cart.items.length}
                                  </span>
                                )}
                            </Link>
                          </li>
                        )}
                      </>
                    ))}
                  </ul>
                </li>
                {subscription?.designation === 'Teams' ||
                  (subscription?.designation === 'dev' && (
                    <li>
                      <div className="text-xs/6 font-semibold text-gray-400">
                        Teams
                      </div>
                      <ul role="list" className="-mx-2 space-y-1">
                        {TeamsNav.map((item) => (
                          <>
                            {item.name == 'Billing' ? (
                              <li key={item.name}>
                                <div
                                  onClick={redirectToCustomerPortal}
                                  className={classNames(
                                    pathname.startsWith(item.href)
                                      ? 'bg-neutral-200 text-primary'
                                      : 'cursor-pointer text-neutral-500 transition-all duration-200 hover:bg-neutral-100',
                                    'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                    !stripeId && 'hidden',
                                  )}
                                >
                                  <item.icon
                                    aria-hidden="true"
                                    className={classNames(
                                      pathname.startsWith(item.href)
                                        ? 'text-primary'
                                        : 'text-neutral-500',
                                      'size-6 shrink-0',
                                    )}
                                  />
                                  {item.name}
                                </div>
                              </li>
                            ) : (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  className={classNames(
                                    pathname.startsWith(item.href)
                                      ? 'bg-neutral-200 text-primary'
                                      : 'text-neutral-500 transition-all duration-200 hover:bg-neutral-100',
                                    'group flex gap-x-3 rounded p-2 text-sm/6 font-semibold',
                                  )}
                                >
                                  <item.icon
                                    aria-hidden="true"
                                    className={classNames(
                                      pathname.startsWith(item.href)
                                        ? 'text-primary'
                                        : 'text-neutral-500',
                                      'size-6 shrink-0',
                                    )}
                                  />
                                  {item.name}

                                  {item.name === 'Shop' &&
                                    cart?.items.length > 0 && (
                                      <span
                                        aria-hidden="true"
                                        className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-gray-200 px-2.5 py-0.5 text-center text-xs/5 font-medium text-black ring-1 ring-inset ring-gray-400"
                                      >
                                        {cart.items.length}
                                      </span>
                                    )}
                                </Link>
                              </li>
                            )}
                          </>
                        ))}
                      </ul>
                    </li>
                  ))}

                <li className="-mx-6 mt-auto">
                  {' '}
                  <div className="px-2 py-1 text-center">
                    <Link
                      href="/account/upgrade"
                      className={classNames(
                        'flex items-center justify-center gap-x-2 rounded-full bg-primary text-white transition-all duration-200 hover:bg-primary/50',
                        'p-2 text-sm font-semibold',
                      )}
                    >
                      <BoltIcon className="size-5" aria-hidden="true" />
                      <span>Upgrade</span>
                    </Link>
                  </div>
                  <Link
                    href="/account/preferences"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-primary transition-all duration-200 hover:bg-neutral-200"
                  >
                    <UserCircleIcon
                      className="size-8 text-primary"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">
                      {userData?.email.split('@')[0]}
                    </span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 border-b-2 border-primary bg-white px-4 py-4 text-primary shadow-sm sm:px-6 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-primary lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
          <div className="flex-1 text-center text-sm/6 font-semibold">
            {getCurrentTab()}
          </div>
          <Link href="/account/preferences">
            <span className="sr-only">Your profile</span>
            <UserCircleIcon
              className="size-8 text-primary"
              aria-hidden="true"
            />
          </Link>
        </div>

        <main className="lg:pl-72">
          {!subscription && !firstTimeLogin && <FeedbackLayout />}

          <NewsBanner />
          <div>{children}</div>
        </main>
      </div>
    </>
  )
}
