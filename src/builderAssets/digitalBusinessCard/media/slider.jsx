import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function SimpleSlider({ obj, delay = 3000, id }) {
  const images = obj.images || [
    'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/images/black_and_white_Valley_minimalistic_44c494ca-7d55-49a2-9424-d15e43ba6f47.webp',
  ]
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    console.log('images', images)

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, delay)

    return () => clearInterval(interval)
  }, [images.length, delay])

  return (
    <div id={id} className="relative w-full px-2">
      <div className="relative h-40 w-full overflow-hidden rounded-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={images[currentIndex]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 h-full w-full"
          >
            <Image
              src={images[currentIndex]}
              alt="Banner"
              layout="fill"
              objectFit="cover"
              className="rounded-b-lg"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
