'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation' // <--- import this
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/20/solid'
import './styles.css'
import Footer from './footer'

const navigation = [
  { name: 'Home', href: '/jonathon-dev/' },
  { name: 'Projects', href: '/jonathon-dev/projects' },
  // { name: 'Stories', href: '/jonathon-dev/stories' },
  // { name: 'Uses', href: '/jonathon-dev/uses' },
  // { name: 'Courses (coming soon)', href: '/jonathon-dev/class-room' },
]

const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example({ children }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <main>
      <nav className="relative bg-[#191E24] dark:bg-gray-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            {/* Left side */}
            <div className="flex items-center">
              {/* Mobile button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline focus:outline-2 focus:outline-indigo-500 md:hidden"
              >
                {mobileOpen ? (
                  <XMarkIcon className="size-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="size-6" aria-hidden="true" />
                )}
              </button>

              {/* Logo */}
              <div className="ml-2 flex-shrink-0 md:ml-0">
                <h1 className="leading-wide text-3xl text-white">
                  Jonathon Scott
                </h1>
              </div>

              {/* Desktop nav */}
              <div className="hidden md:ml-6 md:flex md:space-x-4">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={classNames(
                        isActive
                          ? 'bg-[#2D3640] text-white dark:bg-gray-950/50'
                          : 'text-gray-300 hover:bg-white/5 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium',
                      )}
                    >
                      {item.name}
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center">
              {/* Contact button */}
              <a href="mailto:jonathonscott688@gmail.com">
                <button className="relative inline-flex items-center gap-x-1.5 rounded-full bg-[#FF3908] px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500 dark:shadow-none">
                  Contact
                </button>
              </a>

              {/* Profile + notifications */}
              {/* <div className="hidden md:ml-4 md:flex md:items-center">
                <div className="relative ml-3">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="relative flex rounded-full focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
                  >
                    <img
                      alt=""
                      src={user.imageUrl}
                      className="size-8 rounded-full bg-gray-800 outline outline-1 -outline-offset-1 outline-white/10"
                    />
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-1 outline-black/5 dark:bg-gray-800">
                      {userNavigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      isActive
                        ? 'bg-gray-900 text-white dark:bg-gray-950/50'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium',
                    )}
                  >
                    {item.name}
                  </a>
                )
              })}
            </div>

            {/* <div className="border-t border-white/10 pb-3 pt-4">
              <div className="flex items-center px-5 sm:px-6">
                <img
                  alt=""
                  src={user.imageUrl}
                  className="size-10 rounded-full bg-gray-800 outline outline-1 -outline-offset-1 outline-white/10"
                />
                <div className="ml-3">
                  <div className="text-base font-medium text-white">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    {user.email}
                  </div>
                </div>
                <button className="ml-auto shrink-0 rounded-full p-1 text-gray-400 hover:text-white focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500">
                  <BellIcon className="size-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2 sm:px-3">
                {userNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-white/5 hover:text-white"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div> */}
          </div>
        )}
      </nav>

      {/* Page content */}
      <div className="bg-[#0E1215] text-white">{children}</div>
      <Footer />
    </main>
  )
}
