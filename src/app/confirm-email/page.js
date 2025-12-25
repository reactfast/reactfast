import { SlimLayout } from '@/components/SlimLayout'
import Link from 'next/link'

function ConfirmEmail() {
  return (
    <SlimLayout>
      <h2 className="text-lg font-semibold text-gray-900">
        Email Confirmation Required
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        Thank you for signing up! Before you can login, you'll need to confirm
        your email address. We've sent a confirmation email to the address you
        provided.
      </p>
      <p className="mt-4 text-sm text-gray-700">
        Didn't receive the email?{' '}
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:underline"
        >
          Return to login
        </Link>
      </p>
    </SlimLayout>
  )
}

export default ConfirmEmail
