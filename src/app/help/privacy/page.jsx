'use client'

import { ShieldCheckIcon } from '@heroicons/react/24/outline'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 md:px-12 lg:px-20">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-lg md:p-12">
        <div className="flex items-center space-x-3">
          <ShieldCheckIcon className="h-10 w-10 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
        </div>

        <p className="mt-4 text-gray-600">
          Effective Date: <strong>March 13, 2025</strong>
        </p>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900">
            1. Introduction
          </h2>
          <p className="mt-2 text-gray-600">
            Welcome to our Privacy Policy. Your privacy is critically important
            to us, and we are committed to protecting the personal information
            you share with us.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900">
            2. Information We Collect
          </h2>
          <p className="mt-2 text-gray-600">
            We collect various types of personal information, including but not
            limited to:
          </p>
          <ul className="mt-2 list-inside list-disc text-gray-600">
            <li>Personal identifiers (name, email address, phone number).</li>
            <li>Usage data (pages visited, interactions, IP address).</li>
            <li>Any other information you voluntarily provide.</li>
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900">
            3. How We Use Your Information
          </h2>
          <p className="mt-2 text-gray-600">
            We use the collected data for various purposes, including:
          </p>
          <ul className="mt-2 list-inside list-disc text-gray-600">
            <li>Providing and maintaining our service.</li>
            <li>Improving user experience and website functionality.</li>
            <li>Sending updates, security alerts, or promotional materials.</li>
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900">
            4. Data Sharing and Security
          </h2>
          <p className="mt-2 text-gray-600">
            We do not sell your personal information. However, we may share data
            with third-party services to enhance functionality. Your data is
            stored securely, and we take appropriate measures to protect it.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900">
            5. Your Rights and Choices
          </h2>
          <p className="mt-2 text-gray-600">
            You have the right to access, update, or delete your data. You can
            also opt out of communications at any time.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900">6. Contact Us</h2>
          <p className="mt-2 text-gray-600">
            If you have any questions about this Privacy Policy, please contact
            us at:
          </p>
          <p className="mt-2 text-blue-600">support@yourcompany.com</p>
        </section>

        <p className="mt-10 text-sm text-gray-500">
          Last updated: <strong>March 13, 2025</strong>
        </p>
      </div>
    </div>
  )
}
