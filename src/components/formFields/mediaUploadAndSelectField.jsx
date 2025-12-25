'use client'

import React, { useEffect, useState } from 'react'
import { supabaseClient as supabase } from '@/config/supabase-client'
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function MediaUploadAndSelectField({
  folder = 'root',
  onChange,
  accept = ['.png', '.jpg', '.jpeg', '.gif', '.mp4', '.mov'],
  maxSize = 10 * 1024 * 1024, // 10MB
}) {
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

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

  const handleUpload = async (file) => {
    if (!file) return
    try {
      setUploading(true)

      const { data: auth, error: authError } = await supabase.auth.getUser()
      if (authError || !auth?.user) {
        alert('Authentication required')
        return
      }

      const userId = auth.user.id
      const fileName = `${Date.now()}-${file.name}`
      const filePath = `${userId}/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file)

      if (uploadError) {
        console.error(uploadError)
        alert('Upload failed')
        return
      }

      const { data: publicUrlData } = await supabase.storage
        .from('images')
        .getPublicUrl(filePath)

      const ref = publicUrlData.publicUrl

      await supabase.from('files').insert([
        {
          file_name: fileName,
          ref,
          folder_id: folder === 'root' ? null : folder,
        },
      ])

      onChange?.({
        file_name: fileName,
        ref,
        user_id: userId,
      })
    } catch (err) {
      console.error('Upload error:', err)
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleFileInput = (e) => {
    const file = e.target.files?.[0]
    if (file && validateFile(file)) {
      handleUpload(file)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragActive(false)
    const file = e.dataTransfer.files?.[0]
    if (file && validateFile(file)) {
      handleUpload(file)
    }
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
      <PhotoIcon className="h-12 w-12 text-gray-300" />
      <div className="mt-4 flex text-sm text-gray-600">
        <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500">
          <span>Select a file</span>
          <input
            type="file"
            className="sr-only"
            accept={accept.join(',')}
            onChange={handleFileInput}
          />
        </label>
        <span className="pl-1">or drag and drop</span>
      </div>
      <p className="text-xs text-gray-500">PNG, JPG, GIF, MP4 up to 10MB</p>
      {uploading && (
        <p className="mt-2 animate-pulse text-sm text-indigo-600">
          Uploading...
        </p>
      )}
    </div>
  )
}
