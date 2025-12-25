'use client'

import { useRef, useEffect, useState } from 'react'

export default function VideoPlayerWithLoop({ src }) {
  const videoRef = useRef(null)
  const [loopCount, setLoopCount] = useState(0)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Start playback fresh when modal opens
    video.currentTime = 0
    video.play()
    setLoopCount(0)

    const handleEnded = () => {
      setLoopCount((prev) => {
        const next = prev + 1
        if (next < 3) {
          video.currentTime = 0
          video.play()
        }
        return next
      })
    }

    video.addEventListener('ended', handleEnded)
    return () => video.removeEventListener('ended', handleEnded)
  }, [src])

  const handleClick = () => {
    const video = videoRef.current
    if (!video) return

    setLoopCount(0)
    video.currentTime = 0
    video.play()
  }

  return (
    <video
      ref={videoRef}
      src={src}
      onClick={handleClick}
      className="mx-auto cursor-pointer rounded shadow"
      muted
      playsInline
    />
  )
}
