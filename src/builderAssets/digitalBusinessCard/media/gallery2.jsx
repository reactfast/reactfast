'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const defaultImages = [
  {
    image:
      'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/images/5c1f5463-8b88-4805-b614-c05b0795b5db/1751380470644-1.jpg',
    alt: 'Kitchen interior with wooden cabinets',
  },
  {
    image:
      'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/images/5c1f5463-8b88-4805-b614-c05b0795b5db/1751380583882-2.jpg',
    alt: 'Modern bedroom with natural light',
  },
  {
    image:
      'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/images/5c1f5463-8b88-4805-b614-c05b0795b5db/1751380594195-3.jpg',
    alt: 'Bathroom with marble countertop',
  },
  {
    image:
      'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/images/5c1f5463-8b88-4805-b614-c05b0795b5db/1751380600081-4.jpg',
    alt: 'Cozy living room with large windows',
  },
  {
    image:
      'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/images/5c1f5463-8b88-4805-b614-c05b0795b5db/1751380606142-5.jpg',
    alt: 'Minimalist office space with desk',
  },
  {
    image:
      'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/images/5c1f5463-8b88-4805-b614-c05b0795b5db/1751380612814-6.jpg',
    alt: 'Elegant dining area with chandelier',
  },
  {
    image:
      'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/images/5c1f5463-8b88-4805-b614-c05b0795b5db/1751380620458-9.jpg',
    alt: 'Walk-in closet with organized shelves',
  },
  {
    image:
      'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/images/5c1f5463-8b88-4805-b614-c05b0795b5db/1751380629375-10.jpg',
    alt: 'Outdoor patio with garden view',
  },
]

export default function ImageGallery({ obj, id }) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [images, setImages] = useState(defaultImages)

  useEffect(() => {
    if (obj && Array.isArray(obj.images) && obj.images.length > 0) {
      setImages(obj.images)
    }
  }, [obj])

  return (
    <>
      <div
        id={id}
        className="mx-auto grid max-w-7xl grid-cols-2 gap-2 p-2 md:grid-cols-4"
      >
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className="group relative aspect-square w-full overflow-hidden"
          >
            <Image
              src={img.image}
              alt={img.alt || `Image ${index + 1}`}
              fill
              className="object-cover transition-transform duration-200 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 transition-colors duration-300 group-hover:bg-black/20" />
          </button>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative h-auto max-h-[90vh] w-auto max-w-4xl">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt || 'Expanded image'}
              width={1200}
              height={800}
              className="rounded object-contain shadow-lg"
            />
            <button
              className="absolute right-2 top-2 text-2xl font-bold text-white"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  )
}
