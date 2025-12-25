'use client'

import {
  ShareIcon,
  PencilIcon,
  TrashIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'
import { useRef, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'

export const Card = ({
  link,
  title,
  description,
  id,
  order = [],
  metaDesc,
  metaImg,
  active,
  handleOpenDeleteModal,
  shareHandle,
}) => {
  const [showPopover, setShowPopover] = useState(false)
  const [lightPos, setLightPos] = useState({ x: 100, y: 100, opacity: 0 })

  const containerRef = useRef(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const hasEntered = useRef(false)
  const LIGHT_DIRECTION = { x: 1, y: -1 }

  const handleMouseEnter = () => {
    hasEntered.current = true
    requestAnimationFrame(() => {
      hasEntered.current = false
    })
  }

  const handleMouseMove = (e) => {
    if (hasEntered.current) return
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

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    setLightPos({ x: 100, y: 100, opacity: 0 })
  }

  const handleCopyLink = () => {
    const siteLink = `https://my.jot.space/${title.replace(/\s+/g, '-').toLowerCase()}`
    navigator.clipboard.writeText(siteLink)
    setShowPopover(true)
    setTimeout(() => setShowPopover(false), 2000)
  }

  const handleEdit = () => {
    window.location.href = link
  }

  const handleSettings = () => {
    window.location.href = `${link}/settings`
  }

  return (
    <div
      ref={containerRef}
      className="col-span-12 md:col-span-6 xl:col-span-3"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div style={{ perspective: '1000px' }} className="h-full w-full">
        <motion.div
          className="relative h-full w-full overflow-hidden rounded-xl border border-neutral-300 bg-white shadow-xl"
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Visual header */}
          <div className="relative z-10 flex h-40 flex-col justify-between overflow-hidden p-4">
            {/* Blue Sheen */}
            <div
              className="pointer-events-none absolute inset-0 z-20 transition-all duration-100"
              style={{
                background: `radial-gradient(circle at ${lightPos.x}% ${lightPos.y}%, rgba(2,13,249,${lightPos.opacity}), rgba(2,13,249,0.15) 30%, transparent 40%)`,
                mixBlendMode: 'screen',
                opacity: 1,
              }}
            />
            <div
              className="absolute inset-0 scale-105 bg-cover bg-center blur-sm"
              style={{ backgroundImage: `url(${metaImg})` }}
            />
            <div className="absolute inset-0 bg-white bg-opacity-70" />

            <div className="relative z-10">
              <h5 className="text-xl font-bold text-black">{title}</h5>
              <p className="line-clamp-2 text-sm font-medium text-black">
                {metaDesc}
              </p>
            </div>

            <div className="relative z-10 mt-3 flex items-center justify-between text-sm text-gray-800">
              {active ? (
                <span className="inline-flex items-center rounded-md bg-tertiary px-2 py-1 text-xs font-medium text-black ring-1 ring-inset ring-primary/10">
                  LIVE
                </span>
              ) : (
                <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                  NOT LIVE
                </span>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex w-full border-t">
            <button
              className="relative w-full p-2 text-orange-700 transition-all duration-200 hover:bg-orange-200"
              onClick={(e) => {
                e.preventDefault()
                shareHandle({ title, id })
                handleCopyLink()
              }}
            >
              <ShareIcon className="m-auto h-5 w-5" />
              {showPopover && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 rounded-md bg-black px-2 py-1 text-sm text-white">
                  Copied!
                </div>
              )}
            </button>
            <button
              onClick={handleEdit}
              className="w-full p-2 text-primary transition-all duration-200 hover:bg-blue-200"
            >
              <PencilIcon className="m-auto h-5 w-5" />
            </button>
            <button
              onClick={handleSettings}
              className="w-full p-2 text-neutral-700 transition-all duration-200 hover:bg-neutral-200"
            >
              <Cog6ToothIcon className="m-auto h-5 w-5" />
            </button>
            <button
              onClick={() => handleOpenDeleteModal({ title, id })}
              className="w-full p-2 text-red-700 transition-all duration-200 hover:bg-red-200"
            >
              <TrashIcon className="m-auto h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
