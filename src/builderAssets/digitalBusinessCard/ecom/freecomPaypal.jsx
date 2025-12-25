'use client'

import { BanknotesIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

const CART_KEY = 'free-com'

function readCart() {
  try {
    const data = localStorage.getItem(CART_KEY)
    return data ? JSON.parse(data) : []
  } catch (err) {
    console.error('Failed to read cart:', err)
    return []
  }
}

export default function PayPalBtn_CartBased({ obj, id }) {
  const [isProcessing, setIsProcessing] = useState(false)

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
      const qty = item.quantity || 1
      const price = parseFloat(item.price) || 0
      totalAmount += qty * price
      itemSummaries.push(`${qty}×${item.name}`)
    })

    const note = itemSummaries.join(', ') || 'Purchase'
    const business = encodeURIComponent(obj.paypalEmail)
    const amount = totalAmount.toFixed(2)
    const itemName = encodeURIComponent(note)

    const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${business}&amount=${amount}&item_name=${itemName}&currency_code=USD`

    setTimeout(() => {
      window.location.href = paypalUrl
    }, 300)
  }

  return (
    <div id={id} className="mx-2 my-1">
      <button
        onClick={handleClick}
        disabled={isProcessing}
        className={`flex w-full items-center justify-center space-x-2 rounded-lg bg-yellow-500 px-6 py-3 text-white shadow-lg transition duration-300 ${
          isProcessing ? 'bg-gray-400' : 'bg-yellow-500 hover:bg-yellow-600'
        }`}
      >
        <BanknotesIcon className="h-6 w-6" />
        <span className="text-lg font-semibold">
          {isProcessing ? 'Processing...' : 'Pay with PayPal'}
        </span>
      </button>
    </div>
  )
}
