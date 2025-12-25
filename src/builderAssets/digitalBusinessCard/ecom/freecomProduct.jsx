'use client'

import {
  ShoppingBagIcon,
  PlusCircleIcon,
  MinusCircleIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function FreeCommerceProductCard({ obj, colors, site, id }) {
  const [product, setProduct] = useState()
  const [quantity, setQuantity] = useState(0)

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
      console.error('Failed to read cart from localStorage:', err)
      return []
    }
  }

  function writeCart(cart) {
    try {
      localStorage.setItem(cartKey, JSON.stringify(cart))
    } catch (err) {
      console.error('Failed to write cart to localStorage:', err)
    }
  }

  function findItem(cart, productName) {
    return cart.find((item) => item.name === productName)
  }

  useEffect(() => {
    const defaultProduct = {
      id: 'abc123',
      name: 'Wireless Headphones',
      imageUrl: '/images/headphones.jpg',
      price: '59.99',
      href: 'https://yourstore.com/products/headphones',
      badge: 'Best Seller',
    }

    const product = {
      name: obj.name || defaultProduct.name,
      desc: obj.description || null,
      image: obj.image || null,
      price: obj.price || defaultProduct.price,
      badge: obj.badge || defaultProduct.badge,
    }

    setProduct(product)
  }, [])

  useEffect(() => {
    if (!product) return

    console.log('Product loaded:', product)

    const cart = readCart()
    const item = findItem(cart, product?.name)

    if (item) {
      setQuantity(item.quantity)
    } else {
      console.warn('Item not found in cart:', product.name)

      setQuantity(0)
    }
  }, [product])

  const handleAdd = () => {
    if (!product) return
    const newQty = quantity + 1
    const cart = readCart()
    const item = findItem(cart, product.name)

    if (item) {
      item.quantity = newQty
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: newQty,
        imageSrc: product.imageUrl,
      })
    }

    writeCart(cart)
    setQuantity(newQty)
  }

  const handleSubtract = () => {
    if (!product) return
    const newQty = quantity - 1
    let cart = readCart()

    if (newQty <= 0) {
      cart = cart.filter((item) => item.name !== product.name)
    } else {
      const item = findItem(cart, product.name)
      if (item) item.quantity = newQty
    }

    writeCart(cart)
    setQuantity(Math.max(0, newQty))
  }

  return (
    <div id={id} className="mt-2 px-2">
      <div
        style={{ backgroundColor: colors[5] }}
        className="mx-auto block w-full max-w-sm overflow-hidden rounded-2xl p-3 shadow-md transition hover:shadow-lg"
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
            style={{ backgroundColor: colors[0], color: colors[5] }}
          >
            {quantity === 0 ? (
              <button onClick={handleAdd}>
                <PlusCircleIcon className="h-8 w-8" />
              </button>
            ) : (
              <div className="flex items-center space-x-1">
                <button onClick={handleSubtract}>
                  <MinusCircleIcon className="h-6 w-6" />
                </button>
                <span className="text-sm font-bold">{quantity}</span>
                <button onClick={handleAdd}>
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
