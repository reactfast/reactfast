'use client'

import { useEffect, useState } from 'react'

const DeviceInfoComponent = () => {
  const [deviceInfo, setDeviceInfo] = useState({})
  const [location, setLocation] = useState({})

  useEffect(() => {
    // Function to get device and browser information
    const getDeviceInfo = () => {
      const userAgent = navigator.userAgent
      const platform = navigator.platform
      const language = navigator.language

      return {
        userAgent,
        platform,
        language,
      }
    }

    // Function to get geolocation
    const getGeolocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            })
          },
          (error) => {
            console.error('Error getting geolocation:', error)
          },
        )
      } else {
        console.error('Geolocation is not supported by this browser.')
      }
    }

    // Set device info
    setDeviceInfo(getDeviceInfo())

    // Get geolocation
    getGeolocation()
  }, [])

  return (
    <div>
      <h1>Device and Browser Information</h1>
      <p>
        <strong>User Agent:</strong> {deviceInfo.userAgent}
      </p>
      <p>
        <strong>Platform:</strong> {deviceInfo.platform}
      </p>
      <p>
        <strong>Language:</strong> {deviceInfo.language}
      </p>

      <h2>Geolocation</h2>
      {location.latitude && location.longitude ? (
        <p>
          <strong>Latitude:</strong> {location.latitude}
          <br />
          <strong>Longitude:</strong> {location.longitude}
        </p>
      ) : (
        <p>Geolocation not available or permission denied.</p>
      )}
    </div>
  )
}

export default DeviceInfoComponent
