'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function SocialHeader({ obj, colors }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="bg-white">
      {/* Minimal Header Background */}
      <div
        className="relative h-32 w-full bg-gradient-to-b from-gray-50 to-white"
        style={{ 
          backgroundColor: colors?.[0] ? `${colors[0]}10` : '#FAFAFA' // Very subtle tint
        }}
      />

      {/* Profile Section with Generous Spacing */}
      <div className="relative -mt-16 px-6 pb-8">
        {/* Profile Image Container */}
        <div className="mb-6">
          <div
            className="relative mx-auto h-32 w-32 cursor-pointer transition-transform duration-200 hover:scale-105"
            onClick={() => setIsModalOpen(true)}
          >
            <Image
              src={obj.image}
              alt="Pet Avatar"
              fill
              className="rounded-2xl border-4 border-white object-cover shadow-lg"
            />
            {/* Refined Lost Badge */}
            {obj.lost && (
              <span className="absolute -right-2 -top-2 flex items-center justify-center rounded-full bg-red-500 px-3 py-1 text-xs font-medium text-white shadow-md">
                I'm Lost
              </span>
            )}
          </div>
        </div>

        {/* Pet Information with Typography Hierarchy */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-3xl font-light tracking-tight text-gray-900">
            {obj?.name || 'Unnamed Pet'}
          </h1>
          
          <div className="mt-3 space-y-1">
            <p className="text-lg font-light text-gray-600">
              {obj?.breed || 'Unknown Breed'} • {obj?.type || 'Pet'}
            </p>
            
            <p className="text-sm text-gray-500">
              {obj.age && `${obj.age} years old`}
              {obj.age && obj.gender && ' • '}
              {obj.gender && `${obj.gender}`}
              {obj.color && ` • ${obj.color}`}
            </p>
          </div>

          {/* About Section if available */}
          {obj.about && (
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-gray-600">
              {obj.about}
            </p>
          )}
        </div>
      </div>

      {/* Elegant Modal for Full Image View */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative h-[85vh] w-full max-w-4xl p-4">
            <Image
              src={obj.image}
              alt="Pet Avatar Large"
              fill
              className="rounded-2xl object-contain"
            />
            <button
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900 shadow-md transition-all hover:scale-110"
              onClick={() => setIsModalOpen(false)}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}