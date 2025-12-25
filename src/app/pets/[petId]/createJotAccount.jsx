'use client'

import { ChevronDownIcon } from '@heroicons/react/24/outline'

export default function JotAccountPromptDrawer({ open, onClose }) {
  const handleGetCard = () => {
    console.log('Redirecting to signup or starting card flow...')
    // Replace with actual navigation or trigger
    window.location.href = '/register'
  }

  return (
    <>
      {/* Backdrop overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black bg-opacity-40 transition-opacity"
        />
      )}

      {/* Down arrow button */}
      {open && (
        <button
          onClick={onClose}
          className="fixed bottom-[calc(100%+0.5rem)] left-1/2 z-40 -translate-x-1/2 transform rounded-full border bg-white p-2 shadow-lg"
        >
          <ChevronDownIcon className="h-6 w-6 text-red-500" />
        </button>
      )}

      {/* Bottom drawer */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 rounded-t-2xl bg-white shadow-xl transition-transform duration-300 ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="px-6 pb-8 pt-4">
          <h2 className="mb-4 mt-12 text-center text-xl font-semibold text-black">
            Create your free Jot account
          </h2>
          <div className="mb-10 text-center text-3xl text-blue-600">
            And claim your free business card
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleGetCard}
              className="rounded bg-blue-600 px-4 py-2 text-white shadow"
            >
              Get My Free Business Card
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
