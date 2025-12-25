'use client'

import {
  ShoppingBagIcon,
  PlusCircleIcon,
  CheckIcon,
  LinkIcon,
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

export default function AffiliateProduct({ obj, colors, id }) {
  const [isAdding, setIsAdding] = useState(false)

  function handleLinkClick() {
    window.open(obj?.url || '#', '_blank')
  }

  return (
    <div id={id} className="mt-2 px-2">
      <div
        style={{ backgroundColor: colors[5] }}
        className="mx-auto block w-full max-w-sm overflow-hidden rounded-2xl p-3 shadow-md transition hover:shadow-lg"
      >
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
            {obj?.images ? (
              <Image
                src={obj?.images || ExampleProduct.imageUrl}
                alt={obj?.name || ExampleProduct.name}
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
            <p className="truncate text-sm font-medium">
              {obj?.name || ExampleProduct.name}
            </p>
            <p className="text-xs">${obj?.price}</p>
            {obj?.badge && (
              <span className="mt-1 inline-block rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-blue-600">
                {obj?.badge}
              </span>
            )}
          </div>

          <div
            onClick={handleLinkClick}
            style={{ backgroundColor: colors[0] }}
            className={`h-16 w-16 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl ${
              isAdding ? 'pointer-events-none' : ''
            }`}
          >
            <div
              style={{ color: colors[5] }}
              className="flex h-full w-full items-center justify-center"
            >
              <LinkIcon className="h-8 w-8" />{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const def = [
  {
    name: 'name',
    type: 'text',
    title: 'Product Name',
  },
  {
    name: 'images',
    type: 'file',
    title: 'Product Image',
  },
  {
    name: 'price',
    type: 'string',
    title: 'Price',
  },
  {
    name: 'url',
    type: 'string',
    title: 'Product URL',
  },
  {
    name: 'badge',
    type: 'string',
    title: 'Badge',
  },
  {
    name: 'description',
    type: 'string',
    title: 'Description',
  },
]
