'use client'

import Link from 'next/link'
import {
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel,
} from '@headlessui/react'
import clsx from 'clsx'
import { Button } from '@/components/Button.jsx'
import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { NavLink } from '@/components/NavLink'
import { useEffect, useState } from 'react'
import { supabaseClient as supabase } from '@/config/supabase-client'
import { getUser } from '@/hooks/Auth'

const navigation = [
  {
    name: 'Space',
    href: '/',
  },
  {
    name: 'Teams',
    href: '/about/teams',
  },
  {
    name: 'Unlimited',
    href: '/about/enterprise',
  },
  {
    name: 'Pricing',
    href: '/pricing',
  },
  {
    name: 'Shop',
    href: '/shop/category/all',
  },
]

function MobileNavLink({ href, children }) {
  return (
    <PopoverButton as={Link} href={href} className="block w-full p-2">
      {children}
    </PopoverButton>
  )
}

function MobileNavIcon({ open }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          'origin-center transition',
          open && 'scale-90 opacity-0',
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          'origin-center transition',
          !open && 'scale-90 opacity-0',
        )}
      />
    </svg>
  )
}

function MobileNavigation() {
  return (
    <Popover>
      <PopoverButton
        className="relative z-10 flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </PopoverButton>
      <PopoverBackdrop
        transition
        className="fixed inset-0 bg-slate-300/50 duration-150 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <PopoverPanel
        transition
        className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5 data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-150 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in"
      >
        {navigation.map((item) => (
          <MobileNavLink key={item.name} href={item.href}>
            {item.name}
          </MobileNavLink>
        ))}
        <hr className="m-2 border-slate-300/40" />
        <MobileNavLink href="/login">Sign in</MobileNavLink>
      </PopoverPanel>
    </Popover>
  )
}

export function Header() {
  const [accountStatus, setAccountStatus] = useState(null)

  // Check if user is logged in and has pages
  useEffect(() => {
    async function _getUser() {
      try {
        // Check for the auth token key in local storage with a pattern
        const tokenPattern = /^sb-[a-z0-9]+-auth-token$/
        const authTokenKey = Object.keys(localStorage).find((key) =>
          tokenPattern.test(key),
        )

        if (!authTokenKey) {
          setAccountStatus(false) // No matching auth token, user not logged in
          return
        }

        const authToken = localStorage.getItem(authTokenKey)

        if (!authToken) {
          setAccountStatus(false) // Token exists but is null or undefined
          return
        }

        // Proceed to fetch user
        const user = await getUser()

        if (!user) {
          setAccountStatus(false) // User not logged in
          return
        }

        setAccountStatus(true)
      } catch (error) {
        setAccountStatus(false)
        console.error('Error in user authentication:', error)
      }
    }

    _getUser()
  }, [])

  return (
    <header className="bg-white py-16">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center justify-center gap-8">
            <Link href="/" aria-label="Home">
              <div className="h-auto w-32">
                <Logo />
              </div>
            </Link>
            <div className="hidden md:flex md:gap-x-6">
              {navigation.map((item) => (
                <NavLink href={item.href}>{item.name}</NavLink>
              ))}
            </div>
          </div>
          {accountStatus === true ? (
            <div className="flex items-center gap-x-5 md:gap-x-8">
              <Link href="/account">
                <button
                  type="button"
                  className="rounded bg-neutral-700 px-2 py-1 text-sm font-semibold uppercase tracking-wide text-white shadow-sm transition-all duration-700 ease-in-out hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Account
                </button>
              </Link>
              <div className="-mr-1 md:hidden">
                <MobileNavigation />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-x-5 md:gap-x-8">
              <div className="hidden md:block">
                <NavLink href="/login">Sign in</NavLink>
              </div>
              <Link href="/account">
                <button
                  type="button"
                  className="rounded bg-neutral-700 px-2 py-1 text-sm font-semibold uppercase tracking-wide text-white shadow-sm transition-all duration-700 ease-in-out hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get Started Today
                </button>
              </Link>
              <div className="-mr-1 md:hidden">
                <MobileNavigation />
              </div>
            </div>
          )}
        </nav>
      </Container>
    </header>
  )
}
