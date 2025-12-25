'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function FixedGridGallery({ obj, id }) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [images, setImages] = useState([])

  useEffect(() => {
    if (obj && Array.isArray(obj.photos) && obj.photos.length > 0) {
      setImages(obj.photos.slice(0, 6)) // only take first 6
    } else {
      setImages([]) // no fallback
    }
  }, [obj])

  if (images.length === 0) {
    return (
      <div id={id} className="mx-auto max-w-2xl px-6 py-12">
        <div className="rounded-xl bg-gray-50 p-8 text-center">
          <p className="text-sm text-gray-500">No photos available</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div
        id={id}
        className="mx-auto max-w-2xl px-6 py-12"
      >
        {/* Gallery Title */}
        <h2 className="mb-8 text-xl font-light text-gray-900">
          Photo Gallery
        </h2>
        
        {/* Gallery Grid with Generous Spacing */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(img)}
              className="group relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100 transition-all duration-300 hover:shadow-lg"
            >
              <Image
                src={img.src}
                alt={img.alt || `Photo ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              
              {/* Subtle Overlay on Hover */}
              <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
            </button>
          ))}
        </div>
      </div>

      {/* Refined Full-Screen Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-md"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative h-[90vh] w-full max-w-5xl p-6">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt || 'Expanded photo'}
              width={1400}
              height={1000}
              className="h-full w-full rounded-2xl object-contain"
            />
            
            {/* Elegant Close Button */}
            <button
              className="absolute right-8 top-8 flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-900 shadow-lg transition-all hover:scale-110 hover:shadow-xl"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(null)
              }}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}