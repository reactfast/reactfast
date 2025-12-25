'use client'

import {
  PlusCircleIcon,
  MinusCircleIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const defaultItem = {
  name: 'Deluxe Steak Dinner',
  price: '24.99',
  image: '/images/placeholder-featured.jpg',
  badge: 'Chef Special',
  description:
    'Premium grilled ribeye served with garlic mashed potatoes, sautéed vegetables, and house steak sauce.',
}

export default function LargeMenuItemCard({ obj = {}, colors = [], site }) {
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
          imageSrc: product.image,
        })
    }

    localStorage.setItem(cartKey, JSON.stringify(cart))
    setQuantity(newQty)
  }

  return (
    <div className="mx-auto mt-4 w-full max-w-5xl px-2">
      <div
        className="mx-auto mt-4 w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-lg transition hover:shadow-xl"
        style={{ backgroundColor: colors[5] || '#fff' }}
      >
        <div className="relative h-64 w-full">
          {product?.image ? (
            <Image
              src={product.image}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="rounded-t-3xl"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
              <ShoppingBagIcon className="h-12 w-12" />
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between p-6">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="truncate text-xl font-bold text-gray-800">
                {product?.name}
              </h2>
              <span className="text-lg font-semibold text-gray-900">
                ${product?.price}
              </span>
            </div>

            <p className="mt-2 text-sm text-gray-600">{product?.description}</p>

            {product?.badge && (
              <span className="mt-3 inline-block rounded-full bg-yellow-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-yellow-700">
                {product.badge}
              </span>
            )}
          </div>

          <div
            className="mt-4 flex items-center gap-2 self-start rounded-xl px-3 py-2 text-white"
            style={{
              backgroundColor: colors[0] || '#1D4ED8',
              color: colors[5] || '#FFF',
            }}
          >
            {quantity === 0 ? (
              <button onClick={() => updateCart(1)}>
                <PlusCircleIcon className="h-7 w-7" />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={() => updateCart(quantity - 1)}>
                  <MinusCircleIcon className="h-5 w-5" />
                </button>
                <span className="text-sm font-bold">{quantity}</span>
                <button onClick={() => updateCart(quantity + 1)}>
                  <PlusCircleIcon className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
