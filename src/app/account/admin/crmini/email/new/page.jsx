'use client'

import { useState } from 'react'

export default function CreateEmailPage() {
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    setError('')

    try {
      const res = await fetch('/api/resend-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (data.success) {
        setSuccess(true)
        setFormData({ to: '', subject: '', message: '' })
      } else {
        setError(data.error || 'Failed to send email')
      }
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-xl space-y-6 p-8">
      <h1 className="text-2xl font-bold">Send Email</h1>

      {success && <p className="text-green-600">Email sent successfully!</p>}
      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block font-medium">To</label>
          <input
            type="email"
            name="to"
            value={formData.to}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2"
            rows={6}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send Email'}
        </button>
      </form>
    </div>
  )
}
