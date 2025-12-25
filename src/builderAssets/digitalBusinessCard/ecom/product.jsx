'use client'

import { useEffect, useState } from 'react'
import { StarIcon, CheckIcon } from '@heroicons/react/20/solid'
import { getProduct } from './getProduct'
import {
  getCart,
  saveCart,
  addToCart,
  removeFromCart,
  updateQuantity,
} from './vendorCartHelpers'

const exampleProduct = {
  name: 'Everyday Ruck Snack',
  price: '$220',
  rating: 3.9,
  href: '#',
  imageSrc:
    'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-quick-preview-03-detail.jpg',
  imageAlt:
    'Interior of light green canvas bag with padded laptop sleeve and internal organization pouch.',
  sizes: [
    { name: '18L', description: 'Perfect for a reasonable amount of snacks.' },
    { name: '20L', description: 'Enough room for a serious amount of snacks.' },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Product({ obj, colors, id }) {
  const [selectedSize, setSelectedSize] = useState(exampleProduct.sizes[0])
  const [product, setProduct] = useState()

  useEffect(() => {
    async function _getProduct() {
      const productReturn = await getProduct(obj.productId)
      if (!productReturn) {
        console.error('Error fetching product:', error)
      } else {
        setProduct(productReturn)
      }
    }

    if (obj.productId) {
      _getProduct()
    } else {
      setProduct(exampleProduct)
    }
  }, [])

  return (
    <div id={id} className="w-full px-2 pb-8 pt-4">
      <div className="mx-auto grid w-full grid-cols-1 items-start">
        <div className="sm:col-span-4 lg:col-span-5">
          <img
            alt={product?.imageAlt}
            src={product?.imageSrc}
            className="aspect-square w-full rounded-lg bg-gray-100 object-cover"
          />
        </div>
        <div className="sm:col-span-8 lg:col-span-7">
          <h2 className="text-2xl font-bold sm:pr-12">{product?.name}</h2>

          <section aria-labelledby="information-heading" className="mt-4">
            <h3 id="information-heading" className="sr-only">
              Product information
            </h3>

            <div className="flex items-center">
              <p className="text-xl">{product?.price}</p>

              <div className="ml-4 border-l border-gray-300 pl-4">
                <h4 className="sr-only">Reviews</h4>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        aria-hidden="true"
                        className={classNames(
                          product?.rating > rating
                            ? 'text-yellow-400'
                            : 'text-gray-300',
                          'size-5 shrink-0',
                        )}
                      />
                    ))}
                  </div>
                  <p className="sr-only">{product?.rating} out of 5 stars</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center">
              <CheckIcon
                aria-hidden="true"
                className="size-5 shrink-0 text-green-500"
              />
              <p className="ml-2 font-medium text-gray-500">
                In stock and ready to ship
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
