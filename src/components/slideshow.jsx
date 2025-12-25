'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const slides = [
  {
    alt: 'Dashboard view',
    src: 'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/images/product/metalcard2.png',
  },
  {
    alt: 'Analytics view',
    src: 'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/images/product/dogtag1.png',
  },
]

export default function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative isolate overflow-hidden bg-indigo-50 p-4 sm:rounded-2xl sm:p-8">
      <div className="mx-auto max-w-lg">
        <Image
          key={slides[currentSlide].src}
          alt={slides[currentSlide].alt}
          src={slides[currentSlide].src}
          width={400}
          height={400}
          className="w-full rounded-xl bg-gray-100 shadow ring-1 ring-white/20 transition-all duration-1000 ease-in-out"
        />
      </div>
      <div className="mt-4 flex justify-center space-x-2">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 w-2 rounded-full ${currentSlide === idx ? 'bg-indigo-600' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  )
}
