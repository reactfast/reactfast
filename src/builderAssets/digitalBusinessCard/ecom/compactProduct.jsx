'use client'

import {
  ShoppingBagIcon,
  PlusCircleIcon,
  CheckIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getProduct } from './getProduct'
import { getCart, addToCart, initializeCart } from './vendorCartHelpers'

const ExampleProduct = {
  id: 'abc123',
  name: 'Wireless Headphones',
  imageUrl: '/images/headphones.jpg',
  price: '59.99',
  href: 'https://yourstore.com/products/headphones',
  badge: 'Best Seller',
}

export default function CompactProductCard({ obj, colors, id }) {
  const [product, setProduct] = useState()
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    async function _getProduct() {
      try {
        const productReturn = await getProduct(obj.productId)
        setProduct(productReturn || ExampleProduct)
      } catch (error) {
        console.error('Error fetching product:', error)
        setProduct(ExampleProduct)
      }
    }

    if (obj.productId) {
      _getProduct()
    } else {
      setProduct(ExampleProduct)
    }

    initializeCart()
  }, [])

  function addToCartHandler() {
    if (isAdding) return

    const cart = getCart()

    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageSrc: product.imageUrl,
    }

    addToCart(item)
    setIsAdding(true)

    // Reset the button after a timeout (2 seconds)
    setTimeout(() => setIsAdding(false), 2000)
  }

  return (
    <div id={id} className="mt-2 px-2">
      <div
        style={{ backgroundColor: colors[5] }}
        className="mx-auto block w-full max-w-sm overflow-hidden rounded-2xl p-3 shadow-md transition hover:shadow-lg"
      >
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
            {product?.images ? (
              <Image
                src={product?.images}
                alt={product?.name}
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
                {product?.badge}
              </span>
            )}
          </div>

          <div
            onClick={addToCartHandler}
            style={{ backgroundColor: colors[0] }}
            className={`h-16 w-16 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl ${
              isAdding ? 'pointer-events-none' : ''
            }`}
          >
            <div
              style={{ color: colors[5] }}
              className="flex h-full w-full items-center justify-center"
            >
              {isAdding ? (
                <CheckIcon className="h-8 w-8" />
              ) : (
                <PlusCircleIcon className="h-8 w-8" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
