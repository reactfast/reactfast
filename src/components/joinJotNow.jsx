'use client'

import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'

const SWIPE_THRESHOLD = 150
const MAX_SWIPE = 500

export default function JoinJotNow() {
  const controls = useAnimation()
  const buttonControls = useAnimation()
  const [hasSwiped, setHasSwiped] = useState(false)
  const [timeoutId, setTimeoutId] = useState(null)

  const redirect = () => {
    window.location.href = '/register'
  }

  const handleClick = async () => {
    await buttonControls.start({
      x: MAX_SWIPE,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    })
    redirect()
  }

  const handleSwipeEnd = async (_, info) => {
    const distance = info.offset.x
    if (distance >= SWIPE_THRESHOLD) {
      await buttonControls.start({
        x: MAX_SWIPE,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      })
      redirect()
    } else {
      await buttonControls.start({
        x: [info.offset.x, -20, 0],
        transition: { type: 'spring', stiffness: 200, damping: 12 },
      })
    }
  }

  useEffect(() => {
    const hide = () => {
      controls.start({ y: 100, opacity: 0, transition: { duration: 0.4 } })
    }

    const show = () => {
      controls.start({ y: 0, opacity: 1, transition: { duration: 0.4 } })
    }

    const handleScroll = () => {
      hide()
      if (timeoutId) clearTimeout(timeoutId)
      const newTimeout = setTimeout(show, 2000)
      setTimeoutId(newTimeout)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [controls, timeoutId])

  return (
    <motion.div
      animate={controls}
      initial={{ y: 0, opacity: 1 }}
      className="pointer-events-none fixed bottom-0 left-0 z-50 flex w-full justify-center p-4"
    >
      <div className="pointer-events-auto w-full max-w-7xl">
        <div
          className="flex items-center justify-between overflow-hidden rounded-full bg-primary p-[2px]"
          style={{ boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.25)' }}
        >
          {/* Swipeable + Clickable */}
          <motion.div
            className="text-md flex cursor-pointer touch-pan-x items-center gap-2 rounded-full bg-white px-8 py-2 font-black font-medium text-black shadow-md"
            drag="x"
            dragConstraints={{ left: 0, right: MAX_SWIPE }}
            onClick={handleClick}
            onDragEnd={handleSwipeEnd}
            animate={buttonControls}
          >
            <span>Join for Free</span>
            <ArrowRightIcon className="h-5 w-5" />
          </motion.div>

          {/* Brand */}
          <div className="text-md p-2 px-8 font-black text-white">
            JOT.SPACE
          </div>
        </div>
      </div>
    </motion.div>
  )
}
