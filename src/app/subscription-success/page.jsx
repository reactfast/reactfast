import Link from 'next/link'

export default function SubscriptionSuccess() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="rounded-lg bg-white p-8 text-center shadow-lg">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-8 w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="mb-2 text-2xl font-semibold text-gray-800">
          Subscription Successful!
        </h1>
        <p className="mb-6 text-gray-600">
          Thank you for subscribing! Your subscription is now active, and you
          can enjoy all the benefits of our service.
        </p>
        <Link href="/account">
          <button className="rounded-lg bg-blue-600 px-6 py-2 text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Go to Dashboard
          </button>
        </Link>
      </div>
    </div>
  )
}
