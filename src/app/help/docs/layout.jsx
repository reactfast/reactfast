'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Logo } from '@/components/Logo'
import Link from 'next/link'

const docsNav = [
  {
    section: '',
    links: [
      { title: 'Introduction', href: '/help/docs/introduction' },
      { title: 'Quick Start Guide', href: '/help/docs/quick-start' },
      { title: 'Device Setup', href: '/help/docs/device-setup' },
    ],
  },
  {
    section: 'Jot Builder',
    links: [
      { title: 'Using the Jot Builder', href: '/help/docs/builder-basics' },
      {
        title: 'Working with Sections',
        href: '/help/docs/working-with-sections',
      },
      { title: 'Edit Section', href: '/help/docs/edit-section' },
      { title: 'Theme Settings', href: '/help/docs/theme-settings' },
      { title: 'Page Settings', href: '/help/docs/page-settings' },
      { title: 'MetaData', href: '/help/docs/page-metadata' },
      { title: 'Quick Connect', href: '/help/docs/quick-connect' },
      { title: 'Qr Settings', href: '/help/docs/qr-settings' },
      { title: 'vCard', href: '/help/docs/vcard' },
    ],
  },
  {
    section: 'vCards',
    links: [{ title: 'About vCards', href: '/help/docs/about-vcards' }],
  },
  {
    section: 'Qr Codes',
    links: [
      { title: 'About Qr Codes', href: '/help/docs/about-qr-codes' },
      { title: 'Redirecting', href: '/help/docs/redirect' },
    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DocsLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
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
                  <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                </button>
              </div>
            </TransitionChild>

            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2 ring-1 ring-white/10">
              <Link href="/" aria-label="Home">
                <div className="h-auto w-40">
                  <Logo />
                </div>
              </Link>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  {docsNav.map((group) => (
                    <li key={group.section}>
                      <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                        {group.section}
                      </h2>
                      <ul className="space-y-1">
                        {group.links.map((link) => (
                          <li key={link.title}>
                            <a
                              href={link.href}
                              className={classNames(
                                pathname === link.href
                                  ? 'bg-blue-600 text-white'
                                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                                'block rounded-md px-3 py-2 text-sm font-medium',
                              )}
                            >
                              {link.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 py-6">
          <Link href="/" aria-label="Home">
            <div className="h-auto w-40">
              <Logo />
            </div>
          </Link>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              {docsNav.map((group) => (
                <li key={group.section}>
                  <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {group.section}
                  </h2>
                  <ul className="space-y-1">
                    {group.links.map((link) => (
                      <li key={link.title}>
                        <a
                          href={link.href}
                          className={classNames(
                            pathname === link.href
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                            'block rounded-md px-3 py-2 text-sm font-medium',
                          )}
                        >
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile topbar */}
      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm lg:hidden">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="-m-2.5 p-2.5 text-gray-700"
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon aria-hidden="true" className="size-6" />
        </button>
        <div className="flex-1 text-sm font-semibold text-gray-900">
          Help Center
        </div>
      </div>

      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  )
}
