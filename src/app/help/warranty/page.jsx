import React from 'react'

const WarrantyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-3xl font-extrabold text-gray-900">
          Warranty Information
        </h1>

        {/* General Warranty Section */}
        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            General Warranty
          </h2>
          <p className="text-gray-700">
            At dot.cards, we stand behind the quality of our products. Our
            warranty covers manufacturing defects and QR code functionality for
            as long as your subscription remains active. Please review the
            specific warranty details below.
          </p>
        </div>

        {/* NFC Warranty Section */}
        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            NFC Functionality
          </h2>
          <p className="text-gray-700">
            NFC functionality depends on the condition and capabilities of the
            scanning device. Issues related to scanning are most often due to
            the device itself and not the NFC card. As such, we are unable to
            replace NFC cards for scanning issues caused by external device
            problems. Please ensure that the device scanning your dot.device is
            NFC-compatible and functioning properly.
          </p>
        </div>

        {/* QR Code Warranty Section */}
        <div className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            QR Code Warranty
          </h2>
          <p className="text-gray-700">
            QR codes issued with your dot.device are covered for the lifetime of
            your subscription. Should any issues arise with your QR code while
            your subscription is active, we will ensure they are resolved
            promptly.
          </p>
          <p className="mt-4 text-gray-700">
            In the event your subscription is canceled or becomes past due, QR
            codes will remain reserved for a period of 3 months. After this
            grace period, the QR codes may no longer be accessible or linked to
            your account.
          </p>
        </div>
      </div>
    </div>
  )
}

export default WarrantyPage
