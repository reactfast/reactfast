import React from 'react'

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-3xl font-extrabold text-gray-900">
          Terms of Service
        </h1>

        {/* Introduction Section */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            Introduction
          </h2>
          <p className="text-gray-700">
            Welcome to dot.cards. By using our products and services, you agree
            to comply with and be bound by the following terms and conditions.
            Please review them carefully before using our platform.
          </p>
        </div>

        {/* Use of Service Section */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            Use of Service
          </h2>
          <p className="text-gray-700">
            Our products and services are intended for personal and professional
            networking purposes. You agree not to use our services for any
            illegal activities or in violation of any applicable laws.
          </p>
        </div>

        {/* Warranty Section */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            Warranty
          </h2>
          <p className="text-gray-700">
            Our warranty covers manufacturing defects and QR code functionality
            for as long as your subscription remains active. Please note that
            NFC functionality is dependent on the scanning device's condition
            and capabilities. Replacement of NFC cards due to scanning issues
            caused by external device problems is not covered.
          </p>
          <p className="mt-4 text-gray-700">
            QR codes issued with your dot.device are guaranteed to function as
            long as your subscription is active. After cancellation or past due
            payments, QR codes will remain reserved for 3 months, after which
            they may no longer be accessible.
          </p>
        </div>

        {/* Liability Section */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            Limitation of Liability
          </h2>
          <p className="text-gray-700">
            dot.cards is not liable for any indirect, incidental, or
            consequential damages arising from the use or inability to use our
            products or services. Our maximum liability is limited to the cost
            of the product purchased.
          </p>
        </div>

        {/* Changes to Terms Section */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            Changes to Terms
          </h2>
          <p className="text-gray-700">
            We reserve the right to update these Terms of Service at any time.
            Any changes will be posted on our website, and continued use of our
            services implies acceptance of the revised terms.
          </p>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            Contact Us
          </h2>
          <p className="text-gray-700">
            If you have any questions about these Terms of Service, please
            contact us at support@dot.cards.
          </p>
        </div>
      </div>
    </div>
  )
}

export default TermsOfService
