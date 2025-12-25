'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CancelCheckout() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h1 className="text-center text-2xl font-bold text-gray-800">
          Wait! Are you sure?
        </h1>
        <p className="mt-4 text-center text-gray-600">
          We’d hate to see you go. Continue with your checkout to get access to
          amazing benefits!
        </p>
        <button
          onClick={() => router.back()}
          className="mt-6 w-full rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          Continue Checkout
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Not ready yet? No problem.
        </p>
        <Link
          href="/account"
          className="mt-4 block w-full text-center text-blue-600 hover:underline"
        >
          Go Back to My Account
        </Link>
      </div>
    </div>
  )
}
