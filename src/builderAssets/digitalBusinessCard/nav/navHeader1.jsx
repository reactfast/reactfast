'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

const defaultMenuItems = {
  login: false,
  loginHref: '/login',
  logo: '/logo.png',
  logoAlt: 'University Logo',
  ctaBtn: 'Apply Now',
  ctaBtnHref: '#',
  menueItems: [
    { title: 'home', href: '#' },
    { title: 'FAQ', href: '#' },
    { title: 'articles', href: '#' },
    {
      title: 'programs',
      href: '#',
      subMenu: [
        { title: 'Undergraduate Programs', href: '#' },
        { title: 'Graduate Programs', href: '#' },
        { title: 'PhD Programs', href: '#' },
        { title: 'Online Programs', href: '#' },
        { title: 'Professional Development', href: '#' },
      ],
    },
  ],
}

export default function NavHeader1({ obj, colors }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [menuItems, setMenuItems] = useState(null)

  useEffect(() => {
    console.log('NavHeader1 useEffect')
    if (obj?.navigation) {
      setMenuItems(JSON.parse(obj.navigation))
    } else {
      setMenuItems(defaultMenuItems.menueItems)
    }
  }, [])

  const renderMenu = (menuItems) => {
    return menuItems?.map((item) => {
      if (item.subMenu) {
        return (
          <Popover key={item.title} className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
              {item.title}
              <ChevronDownIcon
                aria-hidden="true"
                className="size-5 flex-none text-gray-400"
              />
            </PopoverButton>
            <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
              <div className="p-4">
                {item.subMenu.map((subItem) => (
                  <div
                    key={subItem.title}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                  >
                    <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      {/* Optional icon can be added here */}
                    </div>
                    <div className="flex-auto">
                      <a
                        href={subItem.href}
                        className="block font-semibold text-gray-900"
                      >
                        {subItem.title}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverPanel>
          </Popover>
        )
      }

      return (
        <a
          key={item.title}
          href={item.href}
          className="text-sm/6 font-semibold text-gray-900"
        >
          {item.title}
        </a>
      )
    })
  }

  return (
    <header className="relative z-[10000] bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          {obj?.logo ? (
            <a href={obj?.logoHref} className="-m-1.5 p-1.5">
              <span className="sr-only">{obj?.logoAlt}</span>
              <img alt="" src={obj.logo} className="h-16 w-auto md:h-20" />
            </a>
          ) : (
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src={
                  'https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600'
                }
                className="h-8 w-auto"
              />
            </a>
          )}
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          {renderMenu(menuItems)}
        </PopoverGroup>
        <div className="hidden gap-4 lg:flex lg:flex-1 lg:justify-end">
          {obj?.ctaBtn && (
            <button
              onClick={() => {
                window.location.href = obj?.ctaBtnHref || '#'
              }}
              type="button"
              style={{ backgroundColor: colors[0] }}
              className="rounded-md px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {obj?.ctaBtn || 'Apply Now'}
            </button>
          )}
          {obj?.login == 'true' && (
            <a
              href={obj.loginHref}
              className="px-2.5 py-1.5 text-sm/6 font-semibold text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          )}
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {menuItems?.map((item) => (
                  <>
                    {item.subMenu ? (
                      <Disclosure as="div" className="-mx-3">
                        <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                          {item.title}
                          <ChevronDownIcon
                            aria-hidden="true"
                            className="size-5 flex-none group-data-[open]:rotate-180"
                          />
                        </DisclosureButton>
                        <DisclosurePanel className="mt-2 space-y-2">
                          {item.subMenu?.map((subItem) => (
                            <DisclosureButton
                              key={subItem.title}
                              as="a"
                              href={subItem.href}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                            >
                              {subItem.title}
                            </DisclosureButton>
                          ))}
                        </DisclosurePanel>
                      </Disclosure>
                    ) : (
                      <a
                        href="#"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {item.title}
                      </a>
                    )}
                  </>
                ))}
                {obj?.login && (
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                )}
                {obj?.ctaBtn && (
                  <button
                    onClick={() => {
                      window.location.href = obj?.ctaBtnHref || '#'
                    }}
                    type="button"
                    className="w-full rounded-md bg-indigo-600 px-3 py-2 text-base/7 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {obj?.ctaBtn || 'Apply Now'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
