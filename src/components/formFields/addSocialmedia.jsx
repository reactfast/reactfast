'use client'

import { useEffect, useState } from 'react'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid'

const SOCIAL_OPTIONS = [
  'Facebook',
  'Instagram',
  'Twitter',
  'LinkedIn',
  'YouTube',
  'TikTok',
  'GitHub',
]

export default function SocialMediaLinks({ value = {}, onChange }) {
  const [selected, setSelected] = useState(SOCIAL_OPTIONS[0])
  const [links, setLinks] = useState(value)

  useEffect(() => {
    setLinks(value)
  }, [value])

  const handleAdd = () => {
    if (links[selected.toLowerCase()]) return
    const updated = {
      ...links,
      [selected.toLowerCase()]: '',
    }
    setLinks(updated)
    onChange?.(updated)
  }

  const handleChange = (platform, url) => {
    const updated = {
      ...links,
      [platform]: url,
    }
    setLinks(updated)
    onChange?.(updated)
  }

  const handleRemove = (platform) => {
    const updated = { ...links }
    delete updated[platform]
    setLinks(updated)
    onChange?.(updated)
  }

  return (
    <div className="space-y-4">
      {/* Dropdown + Add */}
      <div className="flex items-center space-x-2">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="flex-1 rounded border p-2"
        >
          {SOCIAL_OPTIONS.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <PlusIcon className="mr-1 h-5 w-5" />
          Add
        </button>
      </div>

      {/* Render Added Links */}
      {Object.entries(links).map(([platform, url]) => (
        <div key={platform} className="flex items-center space-x-2">
          <label className="w-28 font-medium capitalize">{platform}</label>
          <input
            type="url"
            placeholder={`Enter ${platform} URL`}
            value={url}
            onChange={(e) => handleChange(platform, e.target.value)}
            className="flex-1 rounded border p-2"
          />
          <button
            type="button"
            onClick={() => handleRemove(platform)}
            className="text-red-500 hover:text-red-700"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      ))}
    </div>
  )
}
