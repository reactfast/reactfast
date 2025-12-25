'use client'

import React, { useEffect, useState } from 'react'
import { supabaseClient as supabase } from '@/config/supabase-client'
import { PhotoIcon } from '@heroicons/react/24/outline'

export default function UploadFileFormField({
  bucket,
  path,
  folder = 'root',
  onChange,
  value,
  id,
  name,
}) {
  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState(value || '') // Use value prop if provided
  const [dragActive, setDragActive] = useState(false)

  useEffect(() => {
    if (value) {
      setUploadedUrl(value)
    }
  }, [value])

  // Handle drag events
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

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      setImage(file)
      e.dataTransfer.clearData()
    }
  }

  const handleFileChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.error('No file selected')
      return
    }

    const file = e.target.files[0]
    setImage(file)
  }

  const handleUpload = async () => {
    if (!image) {
      alert('Please select an image to upload!')
      return
    }

    try {
      setUploading(true)

      const { data: user, error: userError } = await supabase.auth.getUser()

      if (userError || !user?.user) {
        console.error(userError || 'No user is logged in.')
        alert('Unable to upload: User not authenticated.')
        return
      }

      const userId = user.user.id
      const fileName = `${Date.now()}-${image.name}`
      const filePath = `${userId}/${fileName}`

      const { data, error } = await supabase.storage
        .from('images') // Bucket name
        .upload(filePath, image)

      if (error) {
        console.error(error)
        alert('Error uploading file')
        return
      }

      const { data: publicUrlData } = await supabase.storage
        .from('images')
        .getPublicUrl(filePath)

      setUploadedUrl(publicUrlData.publicUrl)

      // ✅ Send a fake event to `onChange` so parent `handleFormDataChange` works
      if (onChange) {
        onChange({
          target: {
            name, // Use the `name` prop for consistency
            value: publicUrlData.publicUrl, // Set the uploaded file URL
          },
        })
      }

      const folder_id = folder === 'root' ? null : folder

      async function addFileRef() {
        const { data, error } = await supabase.from('files').insert([
          {
            file_name: fileName,
            ref: publicUrlData.publicUrl,
            folder_id: folder_id,
          },
        ])
        if (error) console.error('error', error)
        else console.log('fileRefAdded added:', data)
      }

      addFileRef()
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="col-span-full">
      <div
        className={`mt-2 flex justify-center rounded-lg border ${
          dragActive ? 'border-indigo-600 bg-indigo-50' : 'border-gray-900/25'
        } border-dashed px-6 py-10`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <PhotoIcon
            aria-hidden="true"
            className="mx-auto h-12 w-12 text-gray-300"
          />
          <div className="mt-4 flex text-sm text-gray-600">
            <label
              htmlFor={name}
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>Upload a file</span>
              <input
                id={id}
                name={name}
                type="file"
                className="sr-only"
                onChange={handleFileChange}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-600">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
      {image && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">Selected file: {image.name}</p>
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="mt-2 rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Upload Image'}
          </button>
        </div>
      )}
      {uploadedUrl && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">Uploaded Image:</p>
          <img
            src={uploadedUrl}
            alt="Uploaded"
            className="mt-2 max-w-xs rounded-md"
          />
        </div>
      )}
    </div>
  )
}
