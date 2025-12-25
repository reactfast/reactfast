'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabaseClient } from '@/config/supabase-client'
import { Session } from '@supabase/supabase-js'
import { isValidEmail } from '@/utils/validEmail'
import { Button } from '@/components/Button'
import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showRules, setShowRules] = useState(false)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  const passwordRules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  }

  const isPasswordValid =
    passwordRules.length &&
    passwordRules.uppercase &&
    passwordRules.number &&
    passwordRules.special

  const Signup = async () => {
    setLoading(true)
    setError(null)

    if (!isValidEmail(email)) {
      setError('Invalid email address')
      setLoading(false)
      return
    }

    if (!isPasswordValid) {
      setError('Password does not meet requirements')
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const qrid = new URLSearchParams(window.location.search).get('qrid')
      const redirect = new URLSearchParams(window.location.search).get(
        'redirect',
      )

      const signupPayload = {
        email,
        password,
        options: qrid
          ? {
              emailRedirectTo: `https://jot.space/login?qrid=${qrid}${
                redirect ? `&redirect=${encodeURIComponent(redirect)}` : ''
              }`,
            }
          : undefined,
      }

      const { error } = await supabaseClient.auth.signUp(signupPayload)
      if (error) throw error

      window.location.href = '/confirm-email'
    } catch (err) {
      console.error('Signup error:', err)
      setError('Something went wrong, please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/" aria-label="Home">
          <Logo className="h-10 w-auto" />
        </Link>
      </div>
      <h2 className="mt-20 text-lg font-semibold text-gray-900">
        Get started for free
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        Already registered?{' '}
        <Link
          href={'/login'}
          className="font-medium text-blue-600 hover:underline"
        >
          Sign in
        </Link>{' '}
        to your account.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
        {/* Email */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-900">
            Email
          </label>
          <div className="mt-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {/* Password */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-900">
            Password
          </label>
          <div className="relative mt-2">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setShowRules(true)}
              onBlur={() => {
                if (password.length === 0) setShowRules(false)
              }}
              placeholder="********"
              className="block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Password Rules (only show while focused, hide satisfied ones) */}
          {showRules && (
            <ul className="mt-2 space-y-1 text-sm">
              {!passwordRules.length && (
                <li className="text-gray-500">✔ At least 8 characters</li>
              )}
              {!passwordRules.uppercase && (
                <li className="text-gray-500">✔ One uppercase letter</li>
              )}
              {!passwordRules.number && (
                <li className="text-gray-500">✔ One number</li>
              )}
              {!passwordRules.special && (
                <li className="text-gray-500">✔ One special character</li>
              )}
            </ul>
          )}
        </div>

        {/* Confirm Password */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-900">
            Confirm Password
          </label>
          <div className="mt-2">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="col-span-2 text-sm text-red-600">{error}</div>
        )}

        {/* Submit */}
        <div className="col-span-full">
          <Button
            onClick={Signup}
            variant="solid"
            color="blue"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign up →'}
          </Button>
        </div>
      </div>
    </SlimLayout>
  )
}
