'use client'

import { useEffect, useState } from 'react'
import { setCookie, getCookie } from 'cookies-next'
import { XMarkIcon } from '@heroicons/react/24/outline' // HeroIcons v2

const COOKIE_NAME = 'cookieConsent'
const COOKIE_EXPIRATION_DAYS = 365

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if the cookie exists
    if (!getCookie(COOKIE_NAME)) {
      setIsVisible(true)
    }
  }, [])

  const handleConsent = (consent: 'accepted' | 'declined') => {
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + COOKIE_EXPIRATION_DAYS)

    setCookie(COOKIE_NAME, consent, { expires: expirationDate })
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 flex flex-col items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-lg md:left-auto md:right-4 md:flex-row">
      <p className="text-sm text-gray-700">
        We use cookies to improve your experience. By continuing, you accept our
        cookie policy.
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => handleConsent('accepted')}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          Accept
        </button>
        <button
          onClick={() => handleConsent('declined')}
          className="rounded-lg bg-gray-300 px-4 py-2 text-sm text-gray-800 hover:bg-gray-400"
        >
          Decline
        </button>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="ml-auto text-gray-500 hover:text-gray-700"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  )
}
