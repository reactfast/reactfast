'use client'

import { useEffect, useState } from 'react'
import Modal from '@/components/modal'
import { CheckIcon } from '@heroicons/react/24/solid'

const FEEDBACK_KEY = 'feedback_prompt_last_shown'

export default function FeedbackLayout({ children }) {
  const [showModal, setShowModal] = useState(true)

  useEffect(() => {
    const now = Date.now()
    const lastShown = localStorage.getItem(FEEDBACK_KEY)

    if (!lastShown || now - parseInt(lastShown, 10) > 24 * 60 * 60 * 1000) {
      setShowModal(true)
      localStorage.setItem(FEEDBACK_KEY, String(now))
    }
  }, [])

  return (
    <>
      <Modal
        open={showModal}
        setOpen={setShowModal}
        title="Ready to grow with Expand?"
      >
        <div className="space-y-6 text-center">
          <p className="text-sm text-gray-700">
            Unlock powerful features that help you stand out and get more done.
          </p>

          <div className="mx-auto max-w-md rounded-3xl p-6 text-left ring-2 ring-indigo-600">
            <div className="flex items-center justify-between gap-x-4">
              <h3
                id="expand-plan"
                className="text-lg font-semibold text-indigo-600"
              >
                Expand Plan
              </h3>
              <p className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold text-indigo-600">
                Most popular
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Everything you need to get started.
            </p>
            <p className="mt-4 text-4xl font-semibold tracking-tight text-gray-900">
              $4.99
              <span className="ml-1 text-sm font-semibold text-gray-600">
                /month
              </span>
            </p>

            <a
              href="/account/upgrade"
              aria-describedby="expand-plan"
              className="mt-4 block rounded-md bg-indigo-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
            >
              Upgrade to Expand
            </a>

            <ul className="mt-6 space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-x-2">
                <CheckIcon className="h-5 w-5 text-indigo-600" />5 Jot Pages
              </li>
              <li className="flex items-start gap-x-2">
                <CheckIcon className="h-5 w-5 text-indigo-600" />
                Brand-able Metadata
              </li>
              <li className="flex items-start gap-x-2">
                <CheckIcon className="h-5 w-5 text-indigo-600" />
                Remove Jot Branding
              </li>
              <li className="flex items-start gap-x-2">
                <CheckIcon className="h-5 w-5 text-indigo-600" />
                Quick connect sms & email
              </li>
              <li className="flex items-start gap-x-2">
                <CheckIcon className="h-5 w-5 text-indigo-600" />
                Improved Analytics
              </li>
              <li className="flex items-start gap-x-2">
                <CheckIcon className="h-5 w-5 text-indigo-600" />
                Booth Ecom Sections (Beta)
              </li>
            </ul>
          </div>

          <button
            onClick={() => {
              setShowModal(false)
              window.location.href = '/account/dashboard'
            }}
            className="mt-2 text-sm font-semibold text-indigo-600 hover:underline"
          >
            Remind Me Later
          </button>
        </div>
      </Modal>
    </>
  )
}
