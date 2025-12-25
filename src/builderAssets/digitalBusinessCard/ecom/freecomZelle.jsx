'use client'

import { ClipboardIcon } from '@heroicons/react/24/outline'
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

export default function ZelleInstructionsBtn({ obj, id }) {
  const [copied, setCopied] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const handleClick = () => {
    const cart = readCart()
    if (!cart.length) {
      alert('Your cart is empty!')
      return
    }

    setShowDetails(true)

    const recipient = obj.zelleEmail || obj.zellePhone
    if (recipient) {
      navigator.clipboard.writeText(recipient).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    }
  }

  let totalAmount = 0
  const itemSummaries = []
  const cart = readCart()

  cart.forEach((item) => {
    const qty = item.quantity || 1
    const price = parseFloat(item.price) || 0
    totalAmount += qty * price
    itemSummaries.push(`${qty}×${item.name}`)
  })

  return (
    <div id={id} className="mx-2 my-1">
      <button
        onClick={handleClick}
        className="flex w-full items-center justify-center space-x-2 rounded-lg bg-yellow-500 px-6 py-3 text-white shadow-lg transition hover:bg-yellow-600"
      >
        <ClipboardIcon className="h-6 w-6" />
        <span className="text-lg font-semibold">Pay with Zelle</span>
      </button>

      {showDetails && (
        <div className="mt-4 rounded-md bg-white p-4 shadow">
          <p className="text-sm font-semibold">
            Send ${totalAmount.toFixed(2)} via Zelle
          </p>
          <p className="text-sm">
            Recipient: <strong>{obj.zelleEmail || obj.zellePhone}</strong>{' '}
            {copied && <span className="text-green-500">(copied!)</span>}
          </p>
          <p className="mt-1 text-xs text-gray-600">
            Note: {itemSummaries.join(', ') || 'Purchase'}
          </p>
        </div>
      )}
    </div>
  )
}
