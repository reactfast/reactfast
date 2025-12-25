'use client'

import { BanknotesIcon } from '@heroicons/react/24/outline'
import { set } from 'date-fns'
import { useState, useEffect } from 'react'

export default function CashAppBtn_CartBased({ obj, colors, site }) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [cartKey, setCartKey] = useState('')

  useEffect(() => {
    if (!site || !site.name) {
      console.error('Site name is not defined')
      return
    }

    const CART_KEY = site.name + '-free-com'
    setCartKey(CART_KEY)
  }, [site])

  function readCart() {
    try {
      const data = localStorage.getItem(cartKey)
      return data ? JSON.parse(data) : []
    } catch (err) {
      console.error('Failed to read cart:', err)
      return []
    }
  }
  const handleClick = () => {
    if (isProcessing) return
    setIsProcessing(true)

    const cart = readCart()

    if (!cart.length) {
      alert('Your cart is empty!')
      setIsProcessing(false)
      return
    }

    let totalAmount = 0
    const itemSummaries = []

    cart.forEach((item) => {
      const itemQuantity = item.quantity || 1
      const itemPrice = parseFloat(item.price) || 0

      totalAmount += itemPrice * itemQuantity
      itemSummaries.push(`${itemQuantity}×${item.name}`)
    })

    const note = itemSummaries.join(', ') || 'Purchase'
    const cashTag = obj.cashTag?.replace(/^\$/, '') // Ensure no leading "$"
    const cashUrl = `https://cash.app/$${cashTag}/${totalAmount.toFixed(2)}?note=${encodeURIComponent(note)}`

    setTimeout(() => {
      window.location.href = cashUrl
    }, 300)
  }

  return (
    <div className="mx-2 my-1">
      <button
        onClick={handleClick}
        disabled={isProcessing}
        className={`flex w-full items-center justify-center space-x-2 rounded-lg bg-green-500 px-6 py-3 text-white shadow-lg transition duration-300 ${
          isProcessing ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
        }`}
      >
        <BanknotesIcon className="h-6 w-6" />
        <span className="text-lg font-semibold">
          {isProcessing ? 'Processing...' : 'Pay with Cash App'}
        </span>
      </button>
    </div>
  )
}
