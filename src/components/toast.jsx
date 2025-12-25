'use client'

import { useEffect } from 'react'
import { Transition } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/20/solid'

export default function Toast({
  title,
  message,
  show,
  onClose,
  duration = 3000,
}) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose() // Call the onClose function after timeout
      }, duration)

      return () => clearTimeout(timer) // Cleanup timer on unmount
    }
  }, [show, onClose, duration])

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        <Transition
          show={show}
          enter="transition ease-out duration-300 transform"
          enterFrom="opacity-0 translate-y-2 sm:translate-y-0 sm:translate-x-2"
          enterTo="opacity-100 translate-y-0 sm:translate-x-0"
          leave="transition ease-in duration-100 transform"
          leaveFrom="opacity-100 translate-y-0 sm:translate-x-0"
          leaveTo="opacity-0 translate-y-2 sm:translate-y-0 sm:translate-x-2"
        >
          <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5">
            <div className="p-4">
              <div className="flex items-start">
                <div className="shrink-0">
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-green-400"
                  />
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900">{title}</p>
                  <p className="mt-1 text-sm text-gray-500">{message}</p>
                </div>
                <div className="ml-4 flex shrink-0">
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon aria-hidden="true" className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  )
}
