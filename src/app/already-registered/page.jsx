// app/device-error/page.jsx
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

export default function DeviceErrorPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        {/* Icon + Heading */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
          <h1 className="mb-2 text-2xl font-semibold text-gray-900">
            Device Already Registered
          </h1>
          <p className="text-sm text-gray-600">
            The device you’re trying to register has already been linked to an
            account. Please check your devices or contact support for help.
          </p>
        </div>

        {/* Quick Links */}
        <div className="mt-8 space-y-3">
          <Link
            href="/account/my-devices"
            className="block w-full rounded-xl bg-gray-900 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-gray-800"
          >
            View My Devices
          </Link>
          <Link
            href="/contact"
            className="block w-full rounded-xl border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Contact Help
          </Link>
          <Link
            href="/"
            className="block w-full rounded-xl border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
