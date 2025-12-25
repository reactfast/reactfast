import { useState } from 'react'
import {
  DocumentIcon,
  VideoCameraIcon,
  PhotoIcon,
  EllipsisVerticalIcon,
  TrashIcon,
  ClipboardIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'

function FileCard({ name, type, previewUrl, onDelete, fileId }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const getFileIcon = () => {
    const ext = name.split('.').pop().toLowerCase()

    const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'svg']
    const videoExtensions = ['mp4', 'avi', 'mov', 'mkv']
    const documentExtensions = ['pdf', 'doc', 'docx', 'txt']
    const googleDocs = ['gdoc', 'gsheet', 'gslides']

    if (imageExtensions.includes(ext)) {
      return <PhotoIcon className="h-6 w-6 text-blue-500" />
    } else if (videoExtensions.includes(ext)) {
      return <VideoCameraIcon className="h-6 w-6 text-red-500" />
    } else if (documentExtensions.includes(ext)) {
      return ext === 'pdf' ? (
        <DocumentIcon className="h-6 w-6 text-red-600" />
      ) : (
        <DocumentIcon className="h-6 w-6 text-blue-500" />
      )
    } else if (googleDocs.includes(ext)) {
      return <DocumentIcon className="h-6 w-6 text-green-500" />
    } else {
      return <DocumentIcon className="h-6 w-6 text-gray-400" />
    }
  }

  const handleCopyPath = () => {
    navigator.clipboard.writeText(previewUrl)
    alert('File path copied!')
  }

  return (
    <div className="relative rounded border border-gray-300 p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {getFileIcon()}
          <span className="truncate font-medium text-gray-700">{name}</span>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <EllipsisVerticalIcon className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {menuOpen && (
        <div className="absolute right-2 top-10 z-10 w-32 rounded border bg-white shadow-lg">
          <button
            onClick={() => onDelete(fileId)}
            className="flex w-full items-center space-x-2 px-4 py-2 text-red-600 hover:bg-gray-100"
          >
            <TrashIcon className="h-5 w-5" />
            <span>Delete</span>
          </button>
          <button
            onClick={handleCopyPath}
            className="flex w-full items-center space-x-2 px-4 py-2 hover:bg-gray-100"
          >
            <ClipboardIcon className="h-5 w-5" />
            <span>Copy Path</span>
          </button>
        </div>
      )}

      {previewUrl && (
        <div className="mt-2">
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            download={name}
          >
            {name.match(/\.(png|jpg|jpeg|gif|webp|svg)$/i) ? (
              <Image
                src={previewUrl}
                alt={name}
                width={320}
                height={80}
                className="h-20 w-full rounded object-cover"
                optimized
              />
            ) : name.match(/\.(mp4|avi|mov|mkv)$/i) ? (
              <video
                src={previewUrl}
                controls
                preload="metadata"
                className="h-20 w-full rounded object-cover"
              />
            ) : null}
          </a>
        </div>
      )}
    </div>
  )
}

export default FileCard
