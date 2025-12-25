'use client'

import { useState } from 'react'
import { supabaseClient } from '@/config/supabase-client'
import { SlimLayout } from '@/components/SlimLayout'
import { Button } from '@/components/Button'
import Link from 'next/link'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePasswordReset = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) {
        // Generic error message
        setMessage(
          'Error: We were unable to send the reset password email. Please double-check your email and try again.',
        )
      } else {
        setMessage('Check your email for the reset link.')
      }
    } catch (err) {
      // Catch any unexpected errors
      setMessage(
        'Error: We were unable to send the reset password email. Please double-check your email and try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <SlimLayout>
      <h2 className="text-lg font-semibold text-gray-900">Forgot Password</h2>
      <p className="text-sm text-gray-700">
        Enter your email, and we’ll send you a link to reset your password.
      </p>

      <form className="mt-6" onSubmit={handlePasswordReset}>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <Button type="submit" color="blue" className="mt-4 w-full">
          {loading ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </form>

      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}

      <p className="mt-4 text-sm">
        <Link href="/login" className="text-blue-600 hover:underline">
          Back to Login
        </Link>
      </p>
    </SlimLayout>
  )
}
