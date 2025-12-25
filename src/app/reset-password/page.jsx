'use client'

import { useState } from 'react'
import { supabaseClient } from '@/config/supabase-client'
import { useRouter } from 'next/navigation'
import { SlimLayout } from '@/components/SlimLayout'
import { Button } from '@/components/Button'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await supabaseClient.auth.updateUser({ password })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Password reset successfully! Redirecting...')
      setTimeout(() => router.push('/login'), 2000)
    }

    setLoading(false)
  }

  return (
    <SlimLayout>
      <h2 className="text-lg font-semibold text-gray-900">
        Reset Your Password
      </h2>
      <form className="mt-6" onSubmit={handleResetPassword}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <Button type="submit" color="blue" className="mt-4 w-full">
          {loading ? 'Resetting...' : 'Reset Password'}
        </Button>
      </form>

      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
    </SlimLayout>
  )
}
