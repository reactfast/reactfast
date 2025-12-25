'use client'

import React, { useEffect, useState } from 'react'
import { supabaseClient as supabase } from '@/config/supabase-client'
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function AutoUploadFileField({
  bucket,
  path,
  folder = 'root',
  onChange,
  value,
  id,
  name,
  accept, // default
  maxSize = 10 * 1024 * 1024, // 10MB default
}) {
  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState(value || '')
  const [dragActive, setDragActive] = useState(false)

  useEffect(() => {
    if (image) {
      handleUpload(image)
    }
  }, [image])

  useEffect(() => {
    setUploadedUrl(value || '')
  }, [value])

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const validateFile = (file) => {
    if (accept && !accept.includes(file.type)) {
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

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      if (validateFile(file)) {
        setImage(file)
      }
      e.dataTransfer.clearData()
    }
  }

  const handleFileChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) return
    const file = e.target.files[0]
    if (validateFile(file)) {
      setImage(file)
    }
  }

  const handleUpload = async (file) => {
    if (!file) return
    try {
      setUploading(true)
      const { data: user, error: userError } = await supabase.auth.getUser()
      if (userError || !user?.user) {
        console.error(userError || 'No user.')
        alert('Not authenticated.')
        return
      }

      const userId = user.user.id
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

      const url = publicUrlData.publicUrl
      setUploadedUrl(url)

      if (onChange) {
        onChange({
          target: {
            name,
            value: url,
          },
        })
      }

      const folder_id = folder === 'root' ? null : folder

      await supabase.from('files').insert([
        {
          file_name: fileName,
          ref: url,
          folder_id: folder_id,
        },
      ])
    } catch (err) {
      console.error('Upload error:', err)
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setImage(null)
    setUploadedUrl('')
    if (onChange) {
      onChange({
        target: {
          name,
          value: '',
        },
      })
    }
  }

  return (
    <div className="col-span-full">
      <div
        className={`mt-2 flex flex-col items-center justify-center rounded-lg border ${
          dragActive ? 'border-indigo-600 bg-indigo-50' : 'border-gray-900/25'
        } relative border-dashed px-6 py-10`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {uploadedUrl ? (
          <div className="relative">
            {uploadedUrl.match(/\.(jpeg|jpg|png|gif)$/i) ? (
              <img
                src={uploadedUrl}
                alt="Preview"
                className="h-24 w-24 rounded-md object-cover"
              />
            ) : uploadedUrl.match(/\.(mp4|mov|webm|ogg)$/i) ? (
              <video
                src={uploadedUrl}
                className="h-24 w-24 rounded-md object-cover"
                controls
              />
            ) : (
              <a
                href={uploadedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block flex h-24 w-24 items-center justify-center rounded-md border bg-gray-100 text-sm text-gray-500"
              >
                View File
              </a>
            )}
            <button
              onClick={handleRemove}
              className="absolute right-0 top-0 -mr-2 -mt-2 rounded-full bg-white p-1 shadow hover:bg-red-100"
              title="Remove file"
              type="button"
            >
              <XMarkIcon className="h-4 w-4 text-red-600" />
            </button>
          </div>
        ) : (
          <>
            <PhotoIcon className="h-12 w-12 text-gray-300" />
            <div className="mt-4 flex text-sm text-gray-600">
              <label
                htmlFor={id}
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500"
              >
                <span>Select a file</span>
                <input
                  id={id}
                  name={name}
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                  accept={accept ? accept.join(',') : undefined}
                />
              </label>
              <span className="pl-1">or drag and drop</span>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </>
        )}
        {uploading && (
          <p className="mt-2 animate-pulse text-sm text-indigo-600">
            Uploading...
          </p>
        )}
      </div>
    </div>
  )
}
