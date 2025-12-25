'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useAnimation } from 'framer-motion'
import PetSlideShow from '@/components/PetSlideShow'

export const InteractivePreviewCard = () => {
  const containerRef = useRef(null)
  const rotateX = useMotionValue(5)
  const rotateY = useMotionValue(-5)
  const controls = useAnimation()
  const [timeoutId, setTimeoutId] = useState(null)
  const idleFrame = useRef(null)

  const [lightPos, setLightPos] = useState({
    x: 125,
    y: 75,
    opacity: 0.25,
  })

  const LIGHT_DIRECTION = { x: 1, y: -1 }

  const updateSheenFromRotation = () => {
    const xAngle = rotateX.get()
    const yAngle = rotateY.get()

    const deltaX = yAngle / 10
    const deltaY = -xAngle / 10

    const dotProduct = deltaX * LIGHT_DIRECTION.x + deltaY * LIGHT_DIRECTION.y
    const sheenStrength = Math.max(dotProduct, 0)

    setLightPos({
      x: 100 - deltaX * 50,
      y: 100 - deltaY * 50,
      opacity: sheenStrength,
    })
  }

  const startSheenTracking = () => {
    const loop = () => {
      updateSheenFromRotation()
      idleFrame.current = requestAnimationFrame(loop)
    }
    loop()
  }

  const stopSheenTracking = () => {
    if (idleFrame.current) {
      cancelAnimationFrame(idleFrame.current)
      idleFrame.current = null
    }
  }

  const startIdleAnimation = () => {
    startSheenTracking()
    controls.start({
      rotateX: [5, 3, 5],
      rotateY: [-5, -7, -5],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    })
  }

  const stopIdleAnimation = () => {
    stopSheenTracking()
    controls.stop()
    rotateX.set(0)
    rotateY.set(0)
  }

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
    controls.stop()
    stopSheenTracking()
  }

  const handleMouseMove = (e) => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const deltaX = (x - centerX) / centerX
    const deltaY = (y - centerY) / centerY

    rotateY.set(deltaX * 10)
    rotateX.set(-deltaY * 10)

    const dotProduct = deltaX * LIGHT_DIRECTION.x + deltaY * LIGHT_DIRECTION.y
    const sheenStrength = Math.max(dotProduct, 0)

    setLightPos({
      x: 100 - deltaX * 50,
      y: 100 - deltaY * 50,
      opacity: sheenStrength,
    })
  }

  const rotateToCenterAndIdle = async () => {
    await controls.start({
      rotateX: 5,
      rotateY: -5,
      transition: { duration: 0.8, ease: 'easeOut' },
    })
    startIdleAnimation()
  }

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      rotateToCenterAndIdle()
    }, 1000)
    setTimeoutId(id)
  }

  useEffect(() => {
    startIdleAnimation()
    return () => {
      controls.stop()
      stopSheenTracking()
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div className="mt-16 sm:mt-24 lg:mt-0 lg:shrink-0 lg:grow">
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: '1000px' }}
        className="relative mx-auto h-[600px] w-[300px]"
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          initial={{
            rotateX: 5,
            rotateY: -5,
          }}
          animate={controls}
          className="relative h-full w-full overflow-hidden rounded-3xl bg-gray-900 shadow-lg"
        >
          {/* Sheen */}
          <div
            className="pointer-events-none absolute inset-0 z-20 rounded-3xl transition-all duration-100"
            style={{
              background: `radial-gradient(circle at ${lightPos.x}% ${lightPos.y}%, rgba(2,13,249,${lightPos.opacity}), rgba(2,13,249,0.15) 30%, transparent 40%)`,
              mixBlendMode: 'screen',
              opacity: 1,
            }}
          />

          {/* QR Display */}
          <div className="flex h-full flex-col items-center justify-center">
            <div
              style={{ backgroundColor: '#000' }}
              className="flex items-center justify-center rounded-lg border-[2px] border-red-500 shadow-lg"
            >
              <PetSlideShow />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
