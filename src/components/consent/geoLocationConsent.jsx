'use client'

import { useState, useEffect } from 'react'
import { setCookie, getCookie } from 'cookies-next'
import { MapPinIcon } from '@heroicons/react/24/outline'

const COOKIE_NAME = 'geoConsent'
const COOKIE_EXPIRATION_DAYS = 365

export default function GeoLocationConsent({
  open,
  setOpen,
  onDecision,
  petName,
}) {
  const [state, setState] = useState('idle')
  const [errorMsg, setErrorMsg] = useState(null)
  const [name, setName] = useState('')

  useEffect(() => {
    const existing = getCookie(COOKIE_NAME)
    if (!existing && open === undefined) {
      setOpen?.(true)
    }
  }, [open, setOpen])

  const persistDecline = () => {
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + COOKIE_EXPIRATION_DAYS)
    setCookie(COOKIE_NAME, 'declined', { expires: expirationDate })
    setOpen(false)
    onDecision?.('skip')
  }

  const persistAcceptance = (payload) => {
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + COOKIE_EXPIRATION_DAYS)
    setCookie(COOKIE_NAME, JSON.stringify(payload), { expires: expirationDate })
    setOpen(false)
    onDecision?.('agree', payload)
  }

  const requestLocation = () => {
    if (typeof window === 'undefined' || !('geolocation' in navigator)) {
      setErrorMsg('Geolocation is not supported on this device.')
      setState('error')
      return
    }

    if (!name.trim()) {
      setErrorMsg('Please enter your name before continuing.')
      return
    }

    setErrorMsg(null)
    setState('requesting')

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords
        persistAcceptance({
          name: name.trim(),
          lat: Number(latitude.toFixed(6)),
          lng: Number(longitude.toFixed(6)),
          accuracy,
          ts: Date.now(),
          type: 'gps',
        })
      },
      (err) => {
        let msg = 'Unable to get your location.'
        if (err.code === err.PERMISSION_DENIED) {
          msg = 'Permission to access location was denied.'
          setState('error')
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          msg = 'Location information is unavailable.'
          setState('error')
        } else if (err.code === err.TIMEOUT) {
          msg = 'Timed out trying to get your location.'
          setState('error')
        } else {
          setState('error')
        }
        setErrorMsg(msg)
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
    )
  }

  const isBusy = state === 'requesting'

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-30 bg-black bg-opacity-40 transition-opacity" />

      {/* Bottom drawer */}
      <div className="fixed inset-x-0 bottom-0 z-40 rounded-t-2xl bg-white shadow-xl">
        <div className="px-6 pb-8 pt-6">
          <div className="flex items-center justify-center">
            <MapPinIcon className="mr-2 h-6 w-6 text-gray-700" />
            <h2 className="text-lg font-semibold text-black">
              Help {petName}!
            </h2>
          </div>
          <p className="mt-2 text-center text-sm text-gray-600">
            {petName || 'Our furry friend'}'s owner is worried sick. Share your
            name and location now to let them know {petName || 'they are'} okay.
          </p>
          {errorMsg && (
            <p className="mt-2 text-center text-xs text-red-600">{errorMsg}</p>
          )}

          <div className="mt-6 flex flex-col gap-3">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
            />
            <button
              onClick={requestLocation}
              disabled={isBusy}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-70"
            >
              {isBusy ? 'Sending…' : 'Share Location'}
            </button>
            <button
              onClick={persistDecline}
              className="rounded-lg bg-gray-300 px-4 py-2 text-sm text-gray-800 hover:bg-gray-400"
            >
              Not Now
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
