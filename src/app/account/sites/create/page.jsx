'use client'

import { useState } from 'react'
import { supabaseClient as supabase } from '@/config/supabase-client'
import AutoUploadFileField from '@/components/formFields/singleFileUploadNullable'

const DEFAULT_LOGO_URL =
  'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/images/jot/DotNextNukeLogo.png'

export default function CreateSitePage() {
  const [formData, setFormData] = useState({
    name: '',
    primary: '#000000',
    secondary: '#000000',
    tertiary: '#000000',
    quaternary: '#000000',
    meta_title: '',
    meta_description: '',
    bg_color: '#ffffff',
    font_color: '#000000',
    meta_img: '', // Initially empty
    logo: DEFAULT_LOGO_URL, // Pre-set default logo
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const { data, error } = await supabase.from('sites').insert([formData])

    if (error) {
      setMessage({ type: 'error', text: error.message })
    } else {
      setMessage({ type: 'success', text: `Site "${formData.name}" created!` })
    }

    setLoading(false)
  }

  return (
    <div className="mx-auto mt-10 max-w-xl rounded bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Create New Site</h2>
      {message && (
        <div
          className={`mb-4 rounded p-2 ${
            message.type === 'error'
              ? 'bg-red-100 text-red-700'
              : 'bg-green-100 text-green-700'
          }`}
        >
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Site Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded border p-2"
        />
        <div>
          <label className="mb-1 block text-sm">Logo</label>
          <AutoUploadFileField
            bucket="images"
            path="logos"
            name="logo"
            id="logo"
            value={formData.logo}
            onChange={handleChange}
          />
        </div>
        <h2>Theme Info</h2>
        <div className="grid grid-cols-2 gap-4">
          {['primary', 'secondary', 'tertiary', 'quaternary'].map((color) => (
            <div key={color}>
              <label className="block text-sm capitalize">{color} Color</label>
              <input
                type="color"
                name={color}
                value={formData[color]}
                onChange={handleChange}
                className="h-10 w-full rounded border p-1"
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm">Background Color</label>
            <input
              type="color"
              name="bg_color"
              value={formData.bg_color}
              onChange={handleChange}
              className="h-10 w-full rounded border p-1"
            />
          </div>
          <div>
            <label className="block text-sm">Font Color</label>
            <input
              type="color"
              name="font_color"
              value={formData.font_color}
              onChange={handleChange}
              className="h-10 w-full rounded border p-1"
            />
          </div>
        </div>
        <h2>Meta Data</h2>

        <input
          type="text"
          name="meta_title"
          placeholder="Meta Title"
          value={formData.meta_title}
          onChange={handleChange}
          className="w-full rounded border p-2"
        />
        <textarea
          name="meta_description"
          placeholder="Meta Description"
          value={formData.meta_description}
          onChange={handleChange}
          className="w-full rounded border p-2"
        />

        <div>
          <label className="mb-1 block text-sm">Meta Image</label>
          <AutoUploadFileField
            bucket="images"
            path="meta-images"
            name="meta_img"
            id="meta_img"
            value={formData.meta_img}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
        >
          {loading ? 'Creating...' : 'Create Site'}
        </button>
      </form>
    </div>
  )
}
