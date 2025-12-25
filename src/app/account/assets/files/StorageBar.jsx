'use client'

import React from 'react'

export default function StorageBar({ currentKB, maxKB }) {
  const formatGB = (kb) => {
    const gb = kb / (1024 * 1024)
    return `${gb.toFixed(2)} GB`
  }

  const percent = (currentKB / maxKB) * 100
  const isOverLimit = percent > 100

  return (
    <div className="mx-auto w-full max-w-7xl rounded-xl border border-gray-200 bg-white p-4 shadow">
      <div
        className={`mb-1 flex justify-between text-sm font-medium ${isOverLimit ? 'text-red-600' : 'text-gray-700'}`}
      >
        <span>Storage Usage</span>
        <span>
          {formatGB(currentKB)} / {formatGB(maxKB)}
        </span>
      </div>
      <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full transition-all duration-300 ${
            isOverLimit ? 'bg-red-500' : 'bg-blue-500'
          }`}
          style={{ width: `${Math.min(percent, 100)}%` }}
        />
      </div>
    </div>
  )
}
