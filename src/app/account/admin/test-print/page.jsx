'use client'

import { useEffect, useState } from 'react'

const PrintLabel = () => {
  const [sdkLoaded, setSdkLoaded] = useState(false)

  // Dynamically load the DYMO SDK
  const loadDymoSdk = async () => {
    return new Promise((resolve, reject) => {
      if (typeof window.dymo !== 'undefined') {
        resolve(window.dymo) // SDK already loaded
        return
      }

      const script = document.createElement('script')
      script.src = '/js/dymo.connect.framework.js' // Ensure this path is correct
      script.async = true

      script.onload = () => {
        if (typeof window.dymo !== 'undefined') {
          resolve(window.dymo) // SDK successfully loaded
        } else {
          reject(new Error('DYMO SDK loaded but not initialized.'))
        }
      }

      script.onerror = () => reject(new Error('Failed to load DYMO SDK'))

      document.body.appendChild(script)
    })
  }

  // Load the SDK when the component mounts
  useEffect(() => {
    loadDymoSdk().catch((error) => {
      console.error('Error loading DYMO SDK:', error.message)
    })
  }, [])

  const handlePrint = async () => {
    try {
      if (!sdkLoaded) throw new Error('DYMO SDK is not loaded.')

      const response = await fetch('/api/print-label', { method: 'POST' })
      if (!response.ok) throw new Error('Failed to fetch label template')

      const labelXml = await response.text()

      // DYMO Connect SDK - Load and print the label
      const printers = window.dymo.label.framework.getPrinters()
      if (!printers || printers.length === 0) {
        alert('No DYMO printers connected.')
        return
      }

      const printerName = printers[0].name // Choose the first available printer

      // Print the label
      window.dymo.label.framework.printLabel(printerName, labelXml)
      alert('Label sent to printer!')
    } catch (error) {
      console.error('Error printing label:', error.message)
      alert('Failed to print label.')
    }
  }

  return (
    <div>
      <button
        onClick={handlePrint}
        className={`rounded px-4 py-2 text-white ${
          sdkLoaded ? 'bg-blue-500' : 'cursor-not-allowed bg-gray-400'
        }`}
        disabled={!sdkLoaded}
      >
        {sdkLoaded ? 'Print Label' : 'Loading SDK...'}
      </button>
    </div>
  )
}

export default PrintLabel
