'use client'

import { useState, useEffect } from 'react'

export default function Geolocation() {
  const [location, setLocation] = useState<{
    latitude: number
    longitude: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      },
      (err) => {
        setError(err.message)
      },
    )
  }, [])

  return (
    <div className="rounded-lg border bg-white p-4 shadow-md">
      <h2 className="text-lg font-bold">Your Location</h2>
      {location ? (
        <p>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  )
}
