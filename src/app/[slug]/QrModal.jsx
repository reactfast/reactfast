'use client'

import Modal from '@/components/modal'
import QRCodeCanvas from '@/components/qrv2.js'
import { GlobeAmericasIcon } from '@heroicons/react/24/solid'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function QRModal({
  showQR,
  setShowQR,
  page,
  currentURL,
  setCurrentURL,
}) {
  const [location, setLocation] = useState(null)
  const [locationState, setLocationState] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()

  // Initialize location state
  useEffect(() => {
    async function _GeoInit() {
      if (!navigator.permissions) return
      try {
        const permission = await navigator.permissions.query({
          name: 'geolocation',
        })
        setLocationState(permission.state)
      } catch (err) {
        console.error('Geolocation permission error:', err)
      }
    }
    _GeoInit()

    const lat = searchParams.get('lat')
    const lon = searchParams.get('lon')

    if (lat && lon) {
      setLocation({ latitude: parseFloat(lat), longitude: parseFloat(lon) })
      console.log('Location found in URL:', { latitude: lat, longitude: lon })
    } else {
      console.log('No location in URL')
    }
  }, [searchParams])

  // Function to request user location
  function getGeo() {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        setLocationState('granted')
      },
      (error) => {
        console.error('Error getting geolocation:', error)
        alert('Unable to retrieve your location')
      },
      { enableHighAccuracy: true },
    )
  }

  return (
    <Modal open={showQR} setOpen={setShowQR} title={'@' + page.name} size="lg">
      <div className="flex flex-col items-center justify-center">
        <div
          style={{ backgroundColor: page.foreground_color }}
          className="mx-8 mb-8 flex items-center justify-center rounded-lg p-8 shadow-lg"
        >
          <QRCodeCanvas
            key={
              currentURL +
              (location ? `${location.latitude}-${location.longitude}` : '')
            }
            bgColor={page.foreground_color}
            qrColor={page.qr_dot_color}
            logoImage={page.qr_img_url}
            dotType={page.qr_dot_type}
            url={
              currentURL +
              (location
                ? `?lat=${location.latitude}&lon=${location.longitude}`
                : '')
            }
          />
        </div>

        <button
          type="button"
          onClick={getGeo}
          className="mt-8 inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Enable GeoLocation
          <GlobeAmericasIcon aria-hidden="true" className="-mr-0.5 size-5" />
        </button>
      </div>
    </Modal>
  )
}
