'use client'

import { useState } from 'react'
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline'

export default function CopyButton({ textToCopy }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)

      // Hide the popover after 1 second
      setTimeout(() => {
        setCopied(false)
      }, 1000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  return (
    <div className="relative ml-4 inline-block">
      <button onClick={handleCopy}>
        <ClipboardDocumentListIcon className="h-5 w-5 text-gray-600" />
      </button>

      {copied && (
        <div className="absolute left-1/2 top-[-30px] -translate-x-1/2 transform rounded-md bg-black px-2 py-1 text-xs text-white shadow-lg">
          Copied!
        </div>
      )}
    </div>
  )
}
