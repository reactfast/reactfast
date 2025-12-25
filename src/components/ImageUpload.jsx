'use client'

import React, { useState } from 'react'
import { supabaseClient as supabase } from '@/config/supabase-client'
import { PhotoIcon } from '@heroicons/react/24/outline'

const ImageUpload = ({ bucket, path }) => {
  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState('')
  const [dragActive, setDragActive] = useState(false)

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

    // Get the dropped files
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      setImage(file)
      e.dataTransfer.clearData()
    }
  }

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setImage(file)
  }

  // Upload the image to Supabase
  const handleUpload = async () => {
    if (!image) {
      alert('Please select an image to upload!')
      return
    }

    try {
      setUploading(true)

      // Get the current user's ID
      const { data: user, error: userError } = await supabase.auth.getUser()

      if (userError || !user?.user) {
        console.error(userError || 'No user is logged in.')
        alert('Unable to upload: User not authenticated.')
        return
      }

      const userId = user.user.id

      // Generate the file path: userId/filename
      const filePath = `${userId}/${Date.now()}-${image.name}`

      // Upload the file to the user's folder
      const { data, error } = await supabase.storage
        .from('images') // Bucket name
        .upload(filePath, image)

      if (error) {
        console.error(error)
        alert('Error uploading file')
        return
      }

      // Generate the public URL for the file
      const { data: publicUrlData } = await supabase.storage
        .from('images')
        .getPublicUrl(filePath)

      setUploadedUrl(publicUrlData.publicUrl)
      alert('Upload successful!')
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="col-span-full">
      <label
        htmlFor="cover-photo"
        className="block text-sm font-medium text-gray-900"
      >
        Upload Image
      </label>
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
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>Upload a file</span>
              <input
                id="file-upload"
                name="file-upload"
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

export default ImageUpload
