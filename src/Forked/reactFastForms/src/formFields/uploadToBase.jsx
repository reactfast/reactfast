'use client'

import React, { useState } from 'react'
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function ImageUploadBase64({
  value, // 👈 base64 string
  onChange,
  accept = ['.png', '.jpg', '.jpeg', '.gif'],
  maxSize = 10 * 1024 * 1024, // 10MB
}) {
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)

  const validateFile = (file) => {
    const fileExt = file.name.split('.').pop()?.toLowerCase()
    const allowedExts = accept.map((ext) => ext.replace('.', '').toLowerCase())

    if (!allowedExts.includes(fileExt)) {
      alert(`Invalid file type. Accepted types: ${accept.join(', ')}`)
      return false
    }

    if (file.size > maxSize) {
      alert(
        `File is too large. Maximum size is ${Math.round(maxSize / (1024 * 1024))}MB`,
      )
      return false
    }

    return true
  }

  const handleFile = (file) => {
    if (!file || !validateFile(file)) return

    const reader = new FileReader()
    reader.onloadstart = () => setUploading(true)
    reader.onloadend = () => setUploading(false)
    reader.onload = () => {
      const base64String = reader.result
      onChange?.(base64String)
    }
    reader.readAsDataURL(file)
  }

  const handleFileInput = (e) => {
    const file = e.target.files?.[0]
    handleFile(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragActive(false)
    const file = e.dataTransfer.files?.[0]
    handleFile(file)
  }

  return (
    <div
      className={`mt-2 flex flex-col items-center justify-center rounded-lg border ${
        dragActive ? 'border-indigo-600 bg-indigo-50' : 'border-gray-900/25'
      } relative border-dashed px-6 py-10`}
      onDragOver={(e) => {
        e.preventDefault()
        setDragActive(true)
      }}
      onDragLeave={(e) => {
        e.preventDefault()
        setDragActive(false)
      }}
      onDrop={handleDrop}
    >
      {value ? (
        <div className="relative">
          <img
            src={value}
            alt="Preview"
            className="max-h-48 rounded-md object-contain"
          />
          <button
            type="button"
            onClick={() => onChange?.(null)}
            className="absolute right-2 top-2 rounded-full bg-white/80 p-1 text-gray-700 shadow hover:bg-white"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <>
          <PhotoIcon className="h-12 w-12 text-gray-300" />
          <div className="mt-4 flex text-sm text-gray-600">
            <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500">
              <span>Select an image</span>
              <input
                type="file"
                className="sr-only"
                accept={accept.join(',')}
                onChange={handleFileInput}
              />
            </label>
            <span className="pl-1">or drag and drop</span>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </>
      )}

      {uploading && (
        <p className="mt-2 animate-pulse text-sm text-indigo-600">
          Converting...
        </p>
      )}
    </div>
  )
}
