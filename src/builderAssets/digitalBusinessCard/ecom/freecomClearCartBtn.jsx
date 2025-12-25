'use client'

import { TrashIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const CART_KEY = 'free-com'

export default function ClearCartBtn() {
  const router = useRouter()
  const [isClearing, setIsClearing] = useState(false)

  const handleClearCart = () => {
    if (isClearing) return
    setIsClearing(true)

    try {
      const cart = localStorage.getItem(CART_KEY)
      if (cart) {
        localStorage.removeItem(CART_KEY)
      }
    } catch (err) {
      console.error('Failed to clear cart:', err)
    }

    // Give a small delay for UX and refresh
    setTimeout(() => {
      router.refresh()
    }, 300)
  }

  return (
    <div className="mx-2 my-1">
      <button
        onClick={handleClearCart}
        disabled={isClearing}
        className={`flex w-full items-center justify-center space-x-2 rounded-lg bg-red-500 px-6 py-3 text-white shadow-lg transition duration-300 ${
          isClearing ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'
        }`}
      >
        <TrashIcon className="h-6 w-6" />
        <span className="text-lg font-semibold">
          {isClearing ? 'Clearing...' : 'Clear Cart'}
        </span>
      </button>
    </div>
  )
}
