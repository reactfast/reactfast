'use client'

import { useEffect, useState } from 'react'
import { supabaseClient as supabase } from '@/config/supabase-client'
import { getUser } from '@/hooks/Auth'
import Loading from '../loading'

export default function OrganizationSettingsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    postal: '',
    country: '',
    description: '',
  })
  const [orgId, setOrgId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchOrg = async () => {
      setLoading(true)
      try {
        const thisUser = await getUser()
        if (!thisUser) return

        const { data, error } = await supabase
          .from('organization')
          .select('*')
          .eq('user_id', thisUser.id)
          .single()

        if (error && error.code !== 'PGRST116') throw error
        if (data) {
          setOrgId(data.id)
          setFormData({
            name: data.name || '',
            email: data.primary_email || '',
            phone: data.primary_phone || '',
            website: data.website || '',
            address: data.address_1 || '',
            address2: data.address_2 || '',
            city: data.city || '',
            state: data.state || '',
            postal: data.zip || '',
            country: data.country || '',
            description: data.description || '',
          })
        }
      } catch (err) {
        console.error('Error loading org:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrg()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      const thisUser = await getUser()
      if (!thisUser) return

      if (orgId) {
        const { error } = await supabase
          .from('organization')
          .update({
            name: formData.name,
            primary_email: formData.email,
            primary_phone: formData.phone,
            website: formData.website,
            address_1: formData.address,
            address_2: formData.address2,
            city: formData.city,
            state: formData.state,
            zip: formData.postal,
            country: formData.country,
            description: formData.description,
          })
          .eq('id', orgId)
          .eq('user_id', thisUser.id)

        if (error) throw error
      } else {
        const { data, error } = await supabase
          .from('organization')
          .insert([
            {
              user_id: thisUser.id,
              name: formData.name,
              primary_email: formData.email,
              primary_phone: formData.phone,
              website: formData.website,
              address_1: formData.address,
              address_2: formData.address2,
              city: formData.city,
              state: formData.state,
              zip: formData.postal,
              country: formData.country,
              description: formData.description,
            },
          ])
          .select()
          .single()

        if (error) throw error
        setOrgId(data.id)
      }
      alert('Organization saved!')
    } catch (err) {
      console.error('Error saving org:', err)
      alert('Failed to save organization.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Loading />

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="border-b bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Organization Settings
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Manage your organization’s profile and public information.
        </p>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Basic Info */}
          <Section title="Basic Information">
            <InputField
              id="name"
              label="Organization Name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Acme Inc."
              required
            />
            <InputField
              id="email"
              label="Contact Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="organization@example.com"
              required
            />
            <InputField
              id="phone"
              label="Contact Phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(123) 456-7890"
            />
            <InputField
              id="website"
              label="Website"
              type="url"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://acme.com"
            />
          </Section>

          {/* Address */}
          <Section title="Address">
            <InputField
              id="address"
              label="Street Address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 Main St"
            />
            <InputField
              id="address2"
              label="Address Line 2"
              value={formData.address2}
              onChange={handleChange}
              placeholder="Suite 100"
            />
            <InputField
              id="city"
              label="City"
              value={formData.city}
              onChange={handleChange}
            />
            <InputField
              id="state"
              label="State"
              value={formData.state}
              onChange={handleChange}
            />
            <InputField
              id="postal"
              label="Postal Code"
              value={formData.postal}
              onChange={handleChange}
            />
            <InputField
              id="country"
              label="Country"
              value={formData.country}
              onChange={handleChange}
            />
          </Section>

          {/* Description */}
          <Section title="Description">
            <label
              htmlFor="description"
              className="block text-sm/6 font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Briefly describe your organization..."
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
              />
            </div>
          </Section>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() =>
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  website: '',
                  address: '',
                  address2: '',
                  city: '',
                  state: '',
                  postal: '',
                  country: '',
                  description: '',
                })
              }
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <section>
      <h2 className="text-base font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
        {children}
      </div>
    </section>
  )
}

function InputField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required,
}) {
  return (
    <div className="sm:col-span-1">
      <label
        htmlFor={id}
        className="block text-sm/6 font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
        />
      </div>
    </div>
  )
}
