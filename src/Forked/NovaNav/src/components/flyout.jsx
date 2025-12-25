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
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function Flyout({ item }) {
  return (
    <Popover className="relative">
      <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900 dark:text-white">
        {item.title}
        <ChevronDownIcon
          aria-hidden="true"
          className="size-5 flex-none text-gray-400 dark:text-gray-500"
        />
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 overflow-hidden rounded-3xl bg-white shadow-lg outline outline-1 outline-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
      >
        <div className="p-4">
          {item.subMenu.map((subItem) => (
            <div
              key={subItem.title}
              className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50 dark:hover:bg-white/5"
            >
              <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white dark:bg-gray-700/50 dark:group-hover:bg-gray-700">
                {/* icon temporarily removed */}
              </div>
              <div className="flex-auto">
                <a
                  href={subItem.href}
                  className="block font-semibold text-gray-900 dark:text-white"
                >
                  {subItem.title}
                  <span className="absolute inset-0" />
                </a>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                  {subItem.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50 dark:divide-white/10 dark:bg-gray-700/50">
          {item.ctas &&
            item.ctas.map((cta) => (
              <a
                key={cta.title}
                href={cta.href}
                className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700/50"
              >
                {/* icon temporarily removed */}
                {cta.title}
              </a>
            ))}
        </div>
      </PopoverPanel>
    </Popover>
  )
} // <- This closes the function properly
