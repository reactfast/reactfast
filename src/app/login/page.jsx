'use client'
import Link from 'next/link'

import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'
import { useEffect, useState } from 'react'
import { supabaseClient } from '@/config/supabase-client'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [attemptingLogin, setAttemptingLogin] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [session, setSession] = useState()
  const [qrid, setQrid] = useState(null)
  const [redirect, setRedirect] = useState(null)

  const [error, setError] = useState(null)

  // Get the `qrid` parameter from the URL
  useEffect(() => {
    const paramQrid = new URLSearchParams(window.location.search).get('qrid')

    const redirectUrl = new URLSearchParams(window.location.search).get(
      'redirect',
    )

    if (redirectUrl) {
      setRedirect(redirectUrl)
    }

    if (paramQrid) {
      setQrid(paramQrid)
    }
  }, [])

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  const Logout = async () => {
    const { error } = await supabaseClient.auth.signOut()
    if (error) throw error
  }

  async function handleLogin(e) {
    setError(null)
    e.preventDefault()
    setLoading(true)
    setAttemptingLogin(true)

    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.warn(error)
      setError(error.message)
      setLoading(false)
      setAttemptingLogin(false)
    }
  }

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      },
    )

    // initial session fetch
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    return () => {
      authListener.subscription?.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (attemptingLogin && session) {
      setLoading(false)
      if (qrid) {
        window.location.href = `https://jot.space/register-qr/?qrid=${qrid}`
      } else if (redirect) {
        window.location.href = redirect
      } else {
        window.location.href = '/account'
      }
    }
  }, [attemptingLogin, session, qrid])

  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/" aria-label="Home">
          <div className="h-auto w-60">
            <Logo />
          </div>
        </Link>
      </div>
      <h2 className="mt-20 text-lg font-semibold text-gray-900">
        Sign in to your account
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        Don’t have an account?{' '}
        <Link
          href="/register"
          className="font-medium text-blue-600 hover:underline"
        >
          Sign up
        </Link>{' '}
        for a free trial.
      </p>
      <div className="mt-10 grid grid-cols-1 gap-y-8">
        <p className="text-red-800">{error}</p>
        <div className="col-span-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="col-span-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
          <div className="mt-2">
            <input
              id="pswd"
              name="pswd"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="*********"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <Button
            onClick={handleLogin}
            variant="solid"
            color="blue"
            className="flex w-full items-center justify-center gap-2"
            disabled={loading}
          >
            {loading && (
              <svg
                className="h-4 w-4 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            )}
            <span>
              {loading ? 'Signing in...' : 'Sign in'}{' '}
              <span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </div>
      </div>{' '}
      <p className="mt-2 text-sm text-gray-700">
        <Link
          href="/forgot-password"
          className="font-medium text-blue-600 hover:underline"
        >
          Forgot your password?
        </Link>
      </p>
    </SlimLayout>
  )
}
