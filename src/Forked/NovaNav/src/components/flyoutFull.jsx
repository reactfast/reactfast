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

export default function FlyoutFull({ item }) {
  return (
    <Popover key={item.id}>
      <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
        {item.title}
        <ChevronDownIcon
          aria-hidden="true"
          className="size-5 flex-none text-gray-400"
        />
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute inset-x-0 top-0 -z-10 bg-white pt-14 shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:-translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-4 gap-x-4 px-6 py-10 lg:px-8 xl:gap-x-8">
          {item.subMenu.map((subItem) => (
            <div
              key={subItem.title}
              className="group relative rounded-lg p-6 text-sm/6 hover:bg-gray-50"
            >
              <div className="flex size-11 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                {/* <subItem.icon
                  aria-hidden="true"
                  className="size-6 text-gray-600 group-hover:text-indigo-600"
                /> */}
              </div>
              <a
                href={subItem.href}
                className="mt-6 block font-semibold text-gray-900"
              >
                {subItem.title}
                <span className="absolute inset-0" />
              </a>
              <p className="mt-1 text-gray-600">{subItem.description}</p>
            </div>
          ))}
        </div>
        <div className="bg-gray-50">
          {item.ctas && (
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="grid grid-cols-3 divide-x divide-gray-900/5 border-x border-gray-900/5">
                {item.ctas.map((cta) => (
                  <a
                    key={cta.title}
                    href={cta.href}
                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100"
                  >
                    {/* <cta.icon
                      aria-hidden="true"
                      className="size-5 flex-none text-gray-400"
                    /> */}
                    {cta.title}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </PopoverPanel>
    </Popover>
  )
}
