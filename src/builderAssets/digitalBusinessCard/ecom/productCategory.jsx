'use client'

import { useEffect, useState } from 'react'
import { getProductCategory } from './getProduct'
import {
  getCart,
  saveCart,
  addToCart,
  removeFromCart,
  updateQuantity,
} from './vendorCartHelpers'

const exampleProducts = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  // More products...
]

export default function ProductCategory({ obj, colors, id }) {
  const [products, setProducts] = useState()

  useEffect(() => {
    async function _getProductCategory() {
      const productReturn = await getProductCategory(obj.productId)
      if (!productReturn) {
        console.error('Error fetching product:', error)
      } else {
        setProducts(productReturn)
      }
    }

    if (obj.productId) {
      _getProductCategory()
    } else {
      setProducts(exampleProducts)
    }
  }, [])
  return (
    <div id={id} className="">
      <div className="mx-auto max-w-2xl px-4 py-16">
        <h2 className="text-2xl font-bold tracking-tight">
          {obj.title || 'Product Category'}
        </h2>

        <div className="mt-6 grid grid-cols-3 gap-x-2">
          {products?.map((product) => (
            <div key={product.id} className="group relative">
              <img
                alt={product.imageAlt}
                src={product.imageSrc}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                </div>
                <p className="text-sm font-medium">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const def = [
  {
    name: 'categoryId',
    type: 'string',
    title: 'Category ID',
  },
]
