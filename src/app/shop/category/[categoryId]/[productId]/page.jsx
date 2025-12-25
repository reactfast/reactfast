'use client'

import { useEffect, useState } from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import {
  HeartIcon,
  MinusIcon,
  PlusIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import Footer1 from '@/components/footer_1'
import { getProductById } from '@/api/supabase/product'
import { images } from 'next.config'
import { getUser } from '@/hooks/Auth'
import { v4 as uuidv4 } from 'uuid'
import {
  getCart,
  saveCart,
  addToCart,
  removeFromCart,
  updateQuantity,
} from '@/helpers/cart'
import { ReturnFieldsV2 } from '@/components/formFields/returnFields'
import { supabaseClient as supabase } from '@/config/supabase-client'
import Link from 'next/link'
import Image from 'next/image'
import { createFormHandler } from '@/components/formFields/helpers/createFormHandler'
import { initializeFormData } from '@/components/formFields/helpers/initializeFormData'

const relatedProductsDefault = [
  {
    id: 1,
    name: 'Zip Tote Basket',
    color: 'White and black',
    href: '#',
    imageSrc:
      'https://tailwindui.com/plus/img/ecommerce-images/product-page-03-related-product-01.jpg',
    imageAlt:
      'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
    price: '$140',
  },
]

export default function ProductView({ params }) {
  const [open, setOpen] = useState(false)
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState(relatedProductsDefault)
  const [selectedColor, setSelectedColor] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [formData, setFormData] = useState({})

  const [handleChangeState, setHandleChangeState] = useState()

  // get main product
  useEffect(() => {
    async function get() {
      const prod = await getProductById(params.productId)
      setProduct({
        ...prod,
        details: JSON.parse(prod.details),
        images: JSON.parse(prod.images),
        fields: [
          ...prod.fields,
          {
            name: 'price',
            type: 'string',
            title: 'Price',
            default: prod.price,
            readOnly: true,
            hidden: true,
          },
        ],
      })
    }

    get()
  }, [])

  useEffect(() => {
    if (!product?.fields) return

    const initialData = initializeFormData(product.fields)
    setFormData(initialData)

    const handler = createFormHandler({
      fields: product.fields,
      setState: setFormData,
    })

    setHandleChangeState(() => handler)
  }, [product])

  // get related products
  useEffect(() => {
    if (!product) return

    async function get() {
      const prod = await getProductById(params.productId)

      const fullProduct = {
        ...prod,
        details: JSON.parse(prod.details),
        images: JSON.parse(prod.images),
      }

      // fetch related products if any
      let related = []
      if (fullProduct.related_products?.length) {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .in('id', fullProduct.related_products)

        if (!error && data) {
          related = data.map((p) => ({
            ...p,
            details: JSON.parse(p.details),
            images: JSON.parse(p.images),
          }))
        }
      }

      setRelatedProducts(
        related && related.length > 0 ? related : relatedProductsDefault,
      )
    }

    get()
  }, [product])

  function addToCartHandler() {
    const cart = getCart()
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      imageSrc: product.images[0],
      data: formData,
    }
    addToCart(item)
  }

  if (!product) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
        <div className="py-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center rounded-full bg-primary p-2 text-white hover:bg-primary/80"
          >
            <ArrowLeftIcon className="h-8 w-8" />
          </button>
        </div>
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {/* Product */}
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image gallery */}
            <TabGroup className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <TabList className="grid grid-cols-4 gap-6">
                  {product?.images.map((image) => (
                    <Tab
                      key={image.id}
                      className="group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-500/50 focus:ring-offset-4"
                    >
                      <span className="sr-only">{image.name}</span>
                      <span className="absolute inset-0 overflow-hidden rounded-md">
                        <Image
                          alt=""
                          src={image}
                          className="size-full object-cover"
                          width={100}
                          height={100}
                        />
                      </span>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-data-[selected]:ring-indigo-500"
                      />
                    </Tab>
                  ))}
                </TabList>
              </div>

              <TabPanels>
                {product?.images.map((image) => (
                  <TabPanel key={image}>
                    <Image
                      src={image}
                      className="aspect-square w-full object-cover sm:rounded-lg"
                      width={500}
                      height={500}
                    />
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {product.name}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  {formData.price}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div
                  dangerouslySetInnerHTML={{
                    __html: product.short_description,
                  }}
                  className="space-y-6 text-base text-gray-700"
                />
              </div>
              <div>
                {product.fields && product.fields.length > 0 && (
                  <>
                    {product.fields.map((field) => (
                      <ReturnFieldsV2
                        onChange={handleChangeState}
                        label={field.title}
                        field={field}
                        value={formData[field.name] || ''}
                        className="mt-6"
                      />
                    ))}
                  </>
                )}
              </div>

              <form className="mt-6">
                <div className="mt-10 flex gap-4">
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="w-20 rounded-md border border-gray-300 px-2 py-1 text-gray-900"
                  />
                  <button
                    onClick={addToCartHandler}
                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  >
                    Add to bag
                  </button>

                  <button
                    type="button"
                    className="flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  >
                    <HeartIcon aria-hidden="true" className="size-6 shrink-0" />
                    <span className="sr-only">Add to favorites</span>
                  </button>
                </div>
              </form>

              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>

                <div className="divide-y divide-gray-200 border-t">
                  {product.details?.map((detail) => (
                    <Disclosure key={detail.name} as="div">
                      <h3>
                        <DisclosureButton className="group relative flex w-full items-center justify-between py-6 text-left">
                          <span className="text-sm font-medium text-gray-900 group-data-[open]:text-indigo-600">
                            {detail.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon
                              aria-hidden="true"
                              className="block size-6 text-gray-400 group-hover:text-gray-500 group-data-[open]:hidden"
                            />
                            <MinusIcon
                              aria-hidden="true"
                              className="hidden size-6 text-indigo-400 group-hover:text-indigo-500 group-data-[open]:block"
                            />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pb-6">
                        <ul
                          role="list"
                          className="list-disc space-y-1 pl-5 text-sm/6 text-gray-700 marker:text-gray-300"
                        >
                          {detail.items.map((item) => (
                            <li key={item} className="pl-2">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <section
            aria-labelledby="related-heading"
            className="mt-10 border-t border-gray-200 px-4 py-16 sm:px-0"
          >
            <div
              dangerouslySetInnerHTML={{ __html: product.description }}
              className="space-y-6 text-base text-gray-700"
            />
          </section>

          <section
            aria-labelledby="related-heading"
            className="mt-10 border-t border-gray-200 px-4 py-16 sm:px-0"
          >
            <h2
              id="related-heading"
              className="text-xl font-bold text-gray-900"
            >
              Customers also bought
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              {relatedProducts.map((product) => (
                <Link
                  href={`/shop/category/${product.category || 'all'}/${product.id}`}
                  key={product.id}
                >
                  <div key={product.id}>
                    <div className="relative">
                      <div className="relative h-72 w-full overflow-hidden rounded-lg">
                        <img
                          alt={product.imageAlt}
                          src={product.default_image}
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="relative mt-4">
                        <h3 className="text-sm font-medium text-gray-900">
                          {product.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.color}
                        </p>
                      </div>
                      <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                        <div
                          aria-hidden="true"
                          className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                        />
                        <p className="relative text-lg font-semibold text-white">
                          {product.price}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <a
                        href={product.href}
                        className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                      >
                        Add to bag
                        <span className="sr-only">, {product.name}</span>
                      </a>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
