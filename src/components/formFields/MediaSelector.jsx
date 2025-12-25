'use client'

import { useEffect, useState } from 'react'
import { supabaseClient as supabase } from '@/config/supabase-client'
import { getUser } from '@/hooks/Auth'
import Image from 'next/image'
import MediaUploadAndSelectField from './mediaUploadAndSelectField'

export default function MediaSelector({ value, onChange }) {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUserAndFiles() {
      const user = await getUser()

      if (user) {
        const { data, error } = await supabase
          .from('files')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }) // ORDER BY DESC

        if (error) {
          console.error('Error fetching files:', error)
        } else {
          setFiles(data)
        }
      }

      setLoading(false)
    }

    fetchUserAndFiles()
  }, [])

  const handleSelect = (file) => {
    onChange?.(file.ref) // ✅ returns usable public URL
  }

  if (loading) return <div>Loading media...</div>

  if (!files.length) return <div>No uploaded media found.</div>

  const handleUploadedFile = async (uploadedFile) => {
    if (!uploadedFile?.ref || !uploadedFile?.user_id) return

    setLoading(true)

    try {
      const { data, error } = await supabase
        .from('files')
        .select('*')
        .eq('user_id', uploadedFile.user_id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error refetching files:', error)
      } else {
        setFiles(data)
        onChange?.(uploadedFile.ref) // ✅ Auto-select new image via URL
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <MediaUploadAndSelectField folder="root" onChange={handleUploadedFile} />
      <br />
      <div className="mt-4 w-full space-y-2">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {files.map((file) => {
            const isSelected = value === file.ref
            const fileExt = file.file_name.split('.').pop()?.toLowerCase()

            const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(
              fileExt,
            )
            const isVideo = ['mp4', 'mov', 'webm', 'ogg'].includes(fileExt)

            return (
              <button
                key={file.id}
                onClick={() => handleSelect(file)}
                className={`overflow-hidden rounded-md border shadow-sm transition ${
                  isSelected
                    ? 'border-indigo-500 ring-2 ring-indigo-300'
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                {isImage ? (
                  <Image
                    src={file.ref}
                    alt={file.file_name}
                    height={50}
                    width={50}
                    className="h-24 w-full object-cover"
                  />
                ) : isVideo ? (
                  <video
                    src={file.ref}
                    className="h-24 w-full object-cover"
                    controls
                  />
                ) : (
                  <div className="flex h-24 w-full items-center justify-center bg-gray-100 text-sm text-gray-500">
                    File
                  </div>
                )}

                <div className="truncate p-2 text-center text-xs">
                  {file.file_name}
                </div>
              </button>
            )
          })}
        </div>

        {value && <p className="text-sm text-gray-600">Selected: {value}</p>}
      </div>
    </>
  )
}
