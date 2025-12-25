'use client'

import { Fragment, useEffect, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import {
  ChevronDownIcon,
  FunnelIcon,
  StarIcon,
  HomeIcon,
} from '@heroicons/react/20/solid'
import { supabaseClient as supabase } from '@/config/supabase-client'
import Image from 'next/image'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CategoryView({ params }) {
  const [open, setOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState({})
  const [categoryPath, setCategoryPath] = useState([])
  const [categoryProducts, setCategoryProducts] = useState([])
  const [products, setProducts] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [dataColumns, setDataColumns] = useState([])

  // Recursive function to build category path
  async function categoryTree(id, path = []) {
    let { data, error } = await supabase
      .from('categories')
      .select(`*`)
      .filter('id', 'eq', params.categoryId)

    if (!data?.parent_category) {
      return [category, ...path] // End of recursion, return the final path
    } else {
      return categoryTree(data.parent_category, [data, ...path]) // Keep building the path
    }
  }

  // 1. Fetch the current category based on params
  useEffect(() => {
    if (params.categoryId == 'all') return

    async function GetCurrentCategory() {
      let { data, error } = await supabase
        .from('categories')
        .select(`*`)
        .filter('id', 'eq', params.categoryId)
        .single()

      setCurrentCategory(data)
    }

    console.log('Get Current Category')
    GetCurrentCategory()
  }, [params.categoryId])

  // 2. When currentCategory changes, build the category path
  useEffect(() => {
    if (params.categoryId == 'all') return

    if (currentCategory?.parent_category) {
      async function GetCategoryPath() {
        const path = await categoryTree(currentCategory.parent_category)
        setCategoryPath(path) // Update the state with the full path
      }

      GetCategoryPath()
    }
    console.log('Category ' + currentCategory.name + ' has no parent category')
  }, [currentCategory])

  // 3. GET Join
  useEffect(() => {
    if (params.categoryId == 'all') return

    async function GetCategoryJoin() {
      let { data, error } = await supabase
        .from('category_products')
        .select(`*`)
        .filter('category_id', 'eq', params.categoryId)

      setCategoryProducts(data)
    }

    GetCategoryJoin()
  }, [currentCategory])

  // GET Products
  useEffect(() => {
    if (params.categoryId == 'all') {
      async function GetSubCategories() {
        let { data, error } = await supabase
          .from('products')
          .select(`*`)
          .eq('status', 'active')

        setProducts(data)
      }

      GetSubCategories()
    }

    console.log(categoryProducts)
    if (!categoryProducts) return

    async function GetCategoryCoursesJoin() {
      const ids = categoryProducts?.map((product) => product.product_id)

      console.log(ids)
      let { data, error } = await supabase
        .from('products')
        .select(`*`)
        .in('id', ids)

      if (data?.length > 0) {
        setProducts(data)
        console.log(data)
      }
    }

    GetCategoryCoursesJoin()
  }, [categoryProducts])

  useEffect(() => {
    console.log(products)
  }, [products])

  return (
    <div className="bg-white">
      <main className="pb-24">
        <nav
          aria-label="Breadcrumb"
          className="flex border-b border-gray-200 bg-white"
        >
          <ol
            role="list"
            className="mx-auto flex w-full max-w-screen-xl space-x-4 px-4 sm:px-6 lg:px-8"
          >
            <li className="flex">
              <div className="flex items-center">
                <a
                  href="/shop/category/all"
                  className="text-gray-400 hover:text-gray-500"
                >
                  <HomeIcon
                    aria-hidden="true"
                    className="h-5 w-5 flex-shrink-0"
                  />
                  <span className="sr-only">Home</span>
                </a>
              </div>
            </li>
            {categoryPath.map((category) => (
              <li key={category?.name} className="flex">
                <div className="flex items-center">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 24 44"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    className="h-full w-6 flex-shrink-0 text-gray-200"
                  >
                    <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                  </svg>
                  <a
                    href={'/category/' + category?.category_id}
                    aria-current={category ? 'page' : undefined}
                    className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    {category?.name || 'all'}
                  </a>
                </div>
              </li>
            ))}
            <li key={currentCategory?.name} className="flex">
              <div className="flex items-center">
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 44"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="h-full w-6 flex-shrink-0 text-gray-200"
                >
                  <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                </svg>
                <a
                  href={'/category/' + currentCategory?.category_id}
                  aria-current={currentCategory?.current ? 'page' : undefined}
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  {currentCategory?.name}
                </a>
              </div>
            </li>
          </ol>
        </nav>
        <div className="px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {currentCategory?.name || 'All Products'}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
            {currentCategory?.description || 'Devices Powered by Jot.Space'}
          </p>
        </div>
        {/* Product grid */}
        <section
          aria-labelledby="products-heading"
          className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8"
        >
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
            {products?.map((product) => (
              <div
                key={product.id}
                className="group relative border-b border-r border-gray-200 p-4 sm:p-6"
              >
                <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                  <Image
                    alt={product.name || 'alt text'}
                    src={product.default_image}
                    className="h-[250px] w-full object-cover object-center"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="pb-4 pt-10 text-center">
                  <h3 className="text-sm font-medium text-gray-900">
                    <a
                      href={
                        '/shop/category/' +
                        (currentCategory.id || 'all') +
                        '/' +
                        product.id
                      }
                    >
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  {/* <div className="mt-3 flex flex-col items-center">
                    <p className="sr-only">{product.rating} out of 5 stars</p>
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          aria-hidden="true"
                          className={classNames(
                            product.rating > rating
                              ? "text-yellow-400"
                              : "text-gray-200",
                            "h-5 w-5 flex-shrink-0"
                          )}
                        />
                      ))}
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.reviewCount} reviews
                    </p>
                  </div> */}
                  <p className="mt-4 text-base font-medium text-gray-900">
                    {'$'}
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
            {subCategories?.map((category) => (
              <div
                key={category.credential_id}
                className="group relative border-b border-r border-gray-200 p-4 sm:p-6"
              >
                <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                  <img
                    alt={category.name || 'alt text'}
                    src={category.default_image_url}
                    className="h-[250px] w-full object-cover object-center"
                  />
                </div>
                <div className="pb-4 pt-10 text-center">
                  <h3 className="text-sm font-medium text-gray-900">
                    <a href={'/category/' + category.category_id}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {category.name}
                    </a>
                  </h3>
                  {/* <div className="mt-3 flex flex-col items-center">
                    <p className="sr-only">{product.rating} out of 5 stars</p>
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          aria-hidden="true"
                          className={classNames(
                            product.rating > rating
                              ? "text-yellow-400"
                              : "text-gray-200",
                            "h-5 w-5 flex-shrink-0"
                          )}
                        />
                      ))}
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.reviewCount} reviews
                    </p>
                  </div> */}
                  <p className="mt-4 text-base font-medium text-gray-900">
                    {category.total_fee}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Pagination */}
      </main>
    </div>
  )
}
