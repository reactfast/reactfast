'use client'

import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

const defaultItem = {
  name: 'Espresso Shot',
  price: '1.50',
  badge: '',
  description: 'Extra bold espresso shot for your energy boost.',
}

export default function MinifiedMenuItemCard({ obj = {}, colors = [], site }) {
  const [product, setProduct] = useState()
  const [quantity, setQuantity] = useState(0)
  const [cartKey, setCartKey] = useState('')

  useEffect(() => {
    if (!site?.name) return
    setCartKey(site.name + '-free-com')
  }, [site])

  useEffect(() => {
    const prod = {
      name: obj.name || defaultItem.name,
      price: obj.price || defaultItem.price,
      badge: obj.badge || defaultItem.badge,
      description: obj.description || defaultItem.description,
    }
    setProduct(prod)
  }, [obj])

  useEffect(() => {
    if (!product || !cartKey) return
    const cart = JSON.parse(localStorage.getItem(cartKey) || '[]')
    const item = cart.find((i) => i.name === product.name)
    setQuantity(item ? item.quantity : 0)
  }, [product, cartKey])

  const updateCart = (newQty) => {
    if (!product) return
    let cart = JSON.parse(localStorage.getItem(cartKey) || '[]')

    if (newQty <= 0) {
      cart = cart.filter((i) => i.name !== product.name)
    } else {
      const item = cart.find((i) => i.name === product.name)
      if (item) item.quantity = newQty
      else
        cart.push({
          name: product.name,
          price: product.price,
          quantity: newQty,
        })
    }

    localStorage.setItem(cartKey, JSON.stringify(cart))
    setQuantity(newQty)
  }

  return (
    <div className="mx-auto flex max-w-5xl items-start justify-between border-b px-2 py-2 text-sm hover:bg-gray-50">
      <div className="flex-1 pr-4">
        <p className="truncate font-medium text-gray-900">{product?.name}</p>

        {product?.description && (
          <p className="line-clamp-1 text-xs text-gray-500">
            {product.description}
          </p>
        )}

        {product?.badge && (
          <span className="text-[10px] font-semibold uppercase text-blue-600">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex items-center gap-1">
        <span className="text-xs font-semibold">${product?.price}</span>
        {quantity === 0 ? (
          <button onClick={() => updateCart(1)} className="text-blue-600">
            <PlusCircleIcon className="h-5 w-5" />
          </button>
        ) : (
          <div className="flex items-center space-x-1">
            <button onClick={() => updateCart(quantity - 1)}>
              <MinusCircleIcon className="h-4 w-4" />
            </button>
            <span className="text-sm font-bold">{quantity}</span>
            <button onClick={() => updateCart(quantity + 1)}>
              <PlusCircleIcon className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
