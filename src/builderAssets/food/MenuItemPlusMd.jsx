'use client'

import {
  ShoppingBagIcon,
  PlusCircleIcon,
  MinusCircleIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const defaultItem = {
  name: 'Bacon Cheeseburger',
  price: '9.99',
  image: '/images/placeholder-food.jpg',
  badge: '',
}

export default function MediumMenuItemCard({ obj = {}, colors = [], site }) {
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
      image: obj.image || defaultItem.image,
      badge: obj.badge || defaultItem.badge,
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
          imageSrc: product.image,
        })
    }

    localStorage.setItem(cartKey, JSON.stringify(cart))
    setQuantity(newQty)
  }

  return (
    <div className="mt-2 px-2">
      <div
        className="mx-auto block w-full max-w-5xl overflow-hidden rounded-2xl p-3 shadow-md transition hover:shadow-lg"
        style={{ backgroundColor: colors[5] || '#fff' }}
      >
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
            {product?.image ? (
              <Image
                src={product.image}
                alt={product.name}
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-400">
                <ShoppingBagIcon className="h-6 w-6" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{product?.name}</p>
            <p className="text-xs">${product?.price}</p>
            {product?.badge && (
              <span className="mt-1 inline-block rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-blue-600">
                {product.badge}
              </span>
            )}
          </div>

          <div
            className="flex h-16 w-20 flex-shrink-0 items-center justify-center rounded-xl bg-white"
            style={{
              backgroundColor: colors[0] || '#000',
              color: colors[5] || '#000',
            }}
          >
            {quantity === 0 ? (
              <button onClick={() => updateCart(1)}>
                <PlusCircleIcon className="h-8 w-8" />
              </button>
            ) : (
              <div className="flex items-center space-x-1">
                <button onClick={() => updateCart(quantity - 1)}>
                  <MinusCircleIcon className="h-6 w-6" />
                </button>
                <span className="text-sm font-bold">{quantity}</span>
                <button onClick={() => updateCart(quantity + 1)}>
                  <PlusCircleIcon className="h-6 w-6" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
