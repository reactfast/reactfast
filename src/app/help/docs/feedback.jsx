'use client'

import { useState, useEffect } from 'react'
import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/outline'
import { supabaseClient as supabase } from '@/config/supabase-client'

export default function DocFeedback() {
  const [page, setPage] = useState('')
  const [feedbackVisible, setFeedbackVisible] = useState(false)
  const [form, setForm] = useState({
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPage(window.location.pathname.slice(1) || 'home')
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)

    const { error } = await supabase.from('contact_us').insert([
      {
        from_email: form.email,
        message: form.message,
        page,
        priority: 3,
        submission_type: 'docs feedback',
      },
    ])

    setLoading(false)

    if (error) {
      console.error(error)
      setError('Something went wrong. Please try again.')
    } else {
      setSubmitted(true)
    }
  }

  return (
    <div className="mt-16 border-t border-gray-200 pt-10">
      <p className="mb-4 text-lg font-medium text-gray-900">
        Did you find this document helpful?
      </p>
      <div className="mb-6 flex gap-4">
        <button
          className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
          onClick={() => setSubmitted(true)}
        >
          <HandThumbUpIcon className="h-5 w-5" />
          Yes
        </button>
        <button
          className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
          onClick={() => setFeedbackVisible(true)}
        >
          <HandThumbDownIcon className="h-5 w-5" />
          No
        </button>
      </div>

      {feedbackVisible && !submitted && (
        <div className="space-y-4">
          <textarea
            name="message"
            rows={4}
            placeholder="Tell us what could be improved..."
            value={form.message}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3.5 py-2 text-base outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            name="email"
            type="email"
            placeholder="Your email (optional)"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3.5 py-2 text-base outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              {loading ? 'Submitting...' : 'Submit feedback'}
            </button>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      )}

      {submitted && (
        <p className="mt-4 text-sm text-green-600">
          Thank you for your feedback!
        </p>
      )}
    </div>
  )
}
