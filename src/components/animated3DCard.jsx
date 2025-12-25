'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useAnimation } from 'framer-motion'

export const Animated3DCard = ({
  children,
  className = '',
  initialTilt = { x: 5, y: -5 },
  idleTiltCycle = {
    rotateX: [5, 3, 5],
    rotateY: [-5, -7, -5],
    duration: 6,
  },
  sheenColor = 'rgba(2,13,249,', // blue default
  height = '600px',
  width = '300px',
  borderRadius = '1.5rem',
}) => {
  const containerRef = useRef(null)
  const rotateX = useMotionValue(initialTilt.x)
  const rotateY = useMotionValue(initialTilt.y)
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
      rotateX: idleTiltCycle.rotateX,
      rotateY: idleTiltCycle.rotateY,
      transition: {
        duration: idleTiltCycle.duration || 6,
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
    const sheenInterval = setInterval(() => {
      updateSheenFromRotation()
    }, 16)

    await controls.start({
      rotateX: initialTilt.x,
      rotateY: initialTilt.y,
      transition: { duration: 0.8, ease: 'easeOut' },
    })

    clearInterval(sheenInterval)
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
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
        height,
        width,
      }}
      className={`relative mx-auto ${className}`}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          borderRadius,
          height: '100%',
          width: '100%',
        }}
        initial={{
          rotateX: initialTilt.x,
          rotateY: initialTilt.y,
        }}
        animate={controls}
        className="relative overflow-hidden bg-gray-900 shadow-lg"
      >
        <div
          className="pointer-events-none absolute inset-0 z-20 transition-all duration-100"
          style={{
            background: `radial-gradient(circle at ${lightPos.x}% ${lightPos.y}%, ${sheenColor}${lightPos.opacity}), ${sheenColor}0.15 30%, transparent 40%)`,
            mixBlendMode: 'screen',
            opacity: 1,
            borderRadius,
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex h-full w-full items-center justify-center">
          {children}
        </div>
      </motion.div>
    </div>
  )
}
