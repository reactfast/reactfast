import { useState } from 'react'
import {
  FolderIcon,
  EllipsisVerticalIcon,
  TrashIcon,
  ClipboardIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

function FolderCard({ name, folderId, onDelete, link }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleCopyPath = () => {
    navigator.clipboard.writeText(
      window.location.origin + `/account/files/${folderId}`,
    )
    alert('Folder path copied!')
  }

  return (
    <div className="relative rounded border border-gray-300 p-4 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="flex items-center justify-between">
        <Link href={link}>
          <div className="flex items-center space-x-2">
            <FolderIcon className="h-6 w-6 text-yellow-500" />
            <span className="font-medium text-gray-700">{name}</span>
          </div>
        </Link>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <EllipsisVerticalIcon className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {menuOpen && (
        <div className="absolute right-2 top-10 z-10 w-32 rounded border bg-white shadow-lg">
          <button
            onClick={() => onDelete(folderId)}
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
    </div>
  )
}

export default FolderCard
