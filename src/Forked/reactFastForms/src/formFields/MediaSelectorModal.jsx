'use client'

import { useState } from 'react'
import Modal from '@/components/modal'
import MediaSelector from './MediaSelector'
import { XMarkIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

/**
 * @typedef {import('index').NovaForms.MediaSelectorModalProps} MediaSelectorModalProps
 */

/**
 * @param {MediaSelectorModalProps} props
 *
 * @returns {JSX.Element}
 */
export default function MediaSelectorModal({
  onSelect,
  value,
  label = 'Select Media',
}) {
  const [open, setOpen] = useState(false)

  const getTruncatedName = (path = '') => {
    const parts = path.split('/')
    const fileName = parts[parts.length - 1]
    if (fileName.length <= 25) return fileName

    const extMatch = fileName.match(/\.[^\.]+$/)
    const ext = extMatch ? extMatch[0] : ''
    const base = fileName.replace(ext, '')

    return `${base.slice(0, 10)}...${base.slice(-10)}${ext}`
  }

  const renderPreview = (url = '') => {
    const ext = url.split('.').pop()?.toLowerCase()
    const isImage = ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext)
    const isVideo = ['mp4', 'mov', 'webm', 'ogg'].includes(ext)

    if (isImage) {
      return (
        <Image
          src={url}
          alt="Selected media"
          width={160}
          height={160}
          className="mx-auto h-32 w-32 rounded-md object-cover"
        />
      )
    }

    if (isVideo) {
      return (
        <video
          src={url}
          className="mx-auto h-32 w-32 rounded-md object-cover"
          controls
        />
      )
    }

    return (
      <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-md bg-gray-100 text-sm text-gray-500">
        File
      </div>
    )
  }

  return (
    <div className="w-full space-y-4">
      {value ? (
        <>
          {/* Thumbnail */}
          <div className="justify-between gap-4 rounded-md border bg-neutral-50 p-2">
            {renderPreview(value)}

            {/* Filename + Remove */}
            <div className="flex items-center justify-between gap-2 px-2">
              <p className="truncate text-sm text-gray-700">
                <code>{getTruncatedName(value)}</code>
              </p>
              <button
                onClick={() => onSelect(null)}
                className="rounded-full bg-red-100 p-1 hover:bg-red-200"
                title="Remove selected media"
              >
                <XMarkIcon className="h-4 w-4 text-red-600" />
              </button>
            </div>
          </div>

          {/* Full-width Replace Button */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/80"
          >
            Replace Media
          </button>
        </>
      ) : (
        // Select Media Button (no media yet)
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/80"
        >
          {label}
        </button>
      )}

      {/* Modal */}
      <Modal open={open} setOpen={setOpen} title="Select Media" size="4xl">
        <MediaSelector
          onChange={(url) => {
            onSelect(url)
            setOpen(false)
          }}
          value={value}
        />
      </Modal>
    </div>
  )
}
