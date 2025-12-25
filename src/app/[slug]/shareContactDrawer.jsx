'use client'

import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { supabaseClient as supabase } from '@/config/supabase-client'

export default function MobileDrawerForm({
  open,
  onClose,
  recipient = 'John Doe',
}) {
  const [form, setForm] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formattedContact = {
      page: recipient || '',
      name: `${form.fname} ${form.lname}`.trim() || null,
      emails: form.email ? [form.email] : [],
      numbers: form.phone ? [form.phone] : [],
      addresses: [], // Could be filled later if needed
      industry: null,
      company: null,
      role: null,
      website: null,
      instagram: null,
      facebook: null,
      linkedin: null,
    }

    const { data, error } = await supabase
      .from('contacts')
      .insert([formattedContact])

    onClose()
  }

  return (
    <>
      {/* Backdrop overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black bg-opacity-40 transition-opacity"
        />
      )}

      {/* Down arrow button */}
      {open && (
        <button
          onClick={onClose}
          className="fixed bottom-[calc(100%+0.5rem)] left-1/2 z-40 -translate-x-1/2 transform rounded-full border bg-white p-2 shadow-lg"
        >
          <ChevronDownIcon className="h-6 w-6 text-red-500" />
        </button>
      )}

      {/* Bottom drawer */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 rounded-t-2xl bg-white shadow-xl transition-transform duration-300 ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="px-6 pb-8 pt-4">
          <h2 className="mb-2 mt-12 text-center text-xl font-semibold text-black">
            Share your contact with
          </h2>
          <div className="mb-12 text-center text-3xl text-blue-600">
            @{recipient}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-black">
            <input
              name="fname"
              placeholder="First Name"
              value={form.fname}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
              required
            />
            <input
              name="lname"
              placeholder="Last Name"
              value={form.lname}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
              required
            />
            <input
              name="phone"
              type="tel"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
            />

            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={onClose}
                className="text-gray-500 underline"
              >
                Later
              </button>
              <button
                type="submit"
                className="rounded bg-blue-600 px-4 py-2 text-white shadow"
              >
                Share
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
