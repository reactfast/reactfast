import { useState } from 'react'
import Image from 'next/image'

export default function SimpleGallery({
  obj,
  colors = ['#ffffff', '#000000'],
  id,
}) {
  const images = obj.images || []
  const [currentIndex, setCurrentIndex] = useState(null)

  if (!images.length) return <p className="text-center">No images available</p>

  return (
    <div id={id}>
      <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3">
        {images.map((src, index) => (
          <div
            key={index}
            className="relative flex h-40 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg"
            style={{ backgroundColor: colors[index % colors.length] }}
            onClick={() => setCurrentIndex(index)}
          >
            <Image
              src={src}
              alt={`Gallery image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        ))}
      </div>

      {currentIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={() => setCurrentIndex(null)}
        >
          <div className="relative h-3/4 w-3/4">
            <Image
              src={images[currentIndex]}
              alt={`Expanded image ${currentIndex + 1}`}
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  )
}
