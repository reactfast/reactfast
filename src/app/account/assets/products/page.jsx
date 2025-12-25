'use client'

import { useEffect, useState } from 'react'
import { getUser } from '@/hooks/Auth'
import { supabaseClient as supabase } from '@/config/supabase-client'
import Link from 'next/link'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import {
  PencilSquareIcon,
  TrashIcon,
  ClipboardIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import Loading from '@/components/loading'
import AccountPageHeader from '@/components/accountPageHeader'

const productColumns = ['default_image', 'name', 'price', 'stock', 'status']
const categoryColumns = ['name', 'description', 'created_at']

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('products')
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [updatedPrice, setUpdatedPrice] = useState('')
  const [loading, setLoading] = useState(true)
  const [copiedId, setCopiedId] = useState(null)

  useEffect(() => {
    async function _getUser() {
      const user = await getUser()
      if (user) setCurrentUser(user)
    }

    _getUser()
  }, [])

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        if (activeTab === 'products') {
          const { data, error } = await supabase
            .from('vendor_products')
            .select('*')
            .eq('user_id', currentUser.id)
          if (error) console.error('Error fetching products:', error)
          else setProducts(data)
        } else {
          const { data, error } = await supabase
            .from('vendor_categories')
            .select('*')
            .eq('user_id', currentUser.id)
          if (error) console.error('Error fetching categories:', error)
          else setCategories(data)
        }
      } finally {
        setLoading(false)
      }
    }

    if (currentUser) fetchData()
  }, [currentUser, activeTab])

  const handleEditClick = (item) => {
    if (activeTab === 'products') {
      router.push(`/account/products/${item.id}`)
    } else {
      router.push(`/account/categories/${item.id}`)
    }
  }

  const handleDelete = async (id) => {
    if (activeTab === 'products') {
      const { error } = await supabase
        .from('vendor_products')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting product:', error)
      } else {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id),
        )
      }
    } else {
      const { error } = await supabase
        .from('vendor_categories')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting category:', error)
      } else {
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category.id !== id),
        )
      }
    }
  }

  const handleUpdatePrice = async () => {
    if (selectedProduct) {
      const { error } = await supabase
        .from('products')
        .update({ price: updatedPrice })
        .eq('id', selectedProduct.id)

      if (error) {
        console.error('Error updating product:', error)
      } else {
        setIsModalOpen(false)
        setUpdatedPrice('')
        setSelectedProduct(null)
        setProducts((prev) =>
          prev.map((p) =>
            p.id === selectedProduct.id ? { ...p, price: updatedPrice } : p,
          ),
        )
      }
    }
  }

  const handleCopyId = async (id) => {
    try {
      await navigator.clipboard.writeText(id)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 1000) // Clear after 2 seconds
    } catch (err) {
      console.error('Failed to copy ID:', err)
    }
  }

  return (
    <>
      {' '}
      <AccountPageHeader
        kicker={'Manage your shop'}
        title="Shop"
        description={
          'All current users pages in an index view See previews & other useful information.'
        }
      />
      <div className="mx-auto min-h-screen bg-neutral-100 p-4 px-8">
        {/* shop tabs */}
        <div className="mt-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('products')}
              className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
                activeTab === 'products'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
                activeTab === 'categories'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              Categories
            </button>
          </nav>
        </div>

        {/* shop toolbar */}
        <div className="pt-8 sm:flex sm:items-center">
          <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-none">
            <Link
              href={
                activeTab === 'products'
                  ? '/account/products/new'
                  : '/account/categories/new'
              }
            >
              <button className="inline-flex items-center justify-center gap-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <PlusCircleIcon className="h-5 w-5" />
                Add {activeTab === 'products' ? 'Product' : 'Category'}
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-8 flow-root">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full px-1 py-2 align-middle">
              <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
                <div
                  className={`transition-opacity duration-300 ${loading ? 'opacity-100' : 'opacity-0'}`}
                >
                  {loading && (
                    <div className="flex h-96 items-center justify-center bg-white">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    </div>
                  )}
                </div>
                <div
                  className={`transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
                >
                  {!loading && (
                    <>
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            {(activeTab === 'products'
                              ? productColumns
                              : categoryColumns
                            ).map((column) => (
                              <th
                                key={column}
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                              >
                                {column}
                              </th>
                            ))}
                            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {(activeTab === 'products'
                            ? products
                            : categories
                          ).map((item) => (
                            <tr key={item.id}>
                              {(activeTab === 'products'
                                ? productColumns
                                : categoryColumns
                              ).map((column) => (
                                <td
                                  key={column}
                                  className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6"
                                >
                                  {column === 'created_at' ? (
                                    new Date(item[column]).toLocaleDateString()
                                  ) : column === 'price' ? (
                                    `$${parseFloat(item[column]).toFixed(2)}`
                                  ) : column === 'default_image' ? (
                                    item[column] ? (
                                      <img
                                        src={item[column]}
                                        alt={item.name}
                                        className="h-10 w-10 rounded-full object-cover"
                                      />
                                    ) : (
                                      <div className="h-10 w-10 rounded-full bg-gray-200" />
                                    )
                                  ) : (
                                    item[column]
                                  )}
                                </td>
                              ))}
                              <td className="relative flex justify-end space-x-4 whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <button
                                  onClick={() => handleCopyId(item.id)}
                                  className="relative text-gray-600 hover:text-gray-900"
                                  title="Copy ID"
                                >
                                  <ClipboardIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                  <span
                                    className={`absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white transition-opacity duration-200 ${
                                      copiedId === item.id
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                    }`}
                                  >
                                    Copied!
                                  </span>
                                </button>
                                <button
                                  onClick={() => handleEditClick(item)}
                                  className="text-indigo-600 hover:text-indigo-900"
                                  title="Edit"
                                >
                                  <PencilSquareIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </button>
                                <button
                                  onClick={() => handleDelete(item.id)}
                                  className="text-red-600 hover:text-red-900"
                                  title="Delete"
                                >
                                  <TrashIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      {(activeTab === 'products' ? products : categories)
                        .length === 0 && (
                        <div className="flex flex-col items-center justify-center bg-white py-16">
                          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                            <PlusCircleIcon className="h-8 w-8 text-primary" />
                          </div>
                          <h2 className="mb-2 text-lg font-semibold text-gray-900">
                            No{' '}
                            {activeTab === 'products'
                              ? 'Products'
                              : 'Categories'}{' '}
                            Found
                          </h2>
                          <p className="mb-6 max-w-sm text-center text-sm text-gray-600">
                            You haven't added any {activeTab} yet. Click below
                            to add one.
                          </p>
                          <Link
                            href={
                              activeTab === 'products'
                                ? '/account/products/new'
                                : '/account/categories/new'
                            }
                          >
                            <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                              Add Your First{' '}
                              {activeTab === 'products'
                                ? 'Product'
                                : 'Category'}
                            </button>
                          </Link>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {isModalOpen && selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-96 rounded-lg bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Edit Product Price
              </h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  value={updatedPrice}
                  onChange={(e) => setUpdatedPrice(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleUpdatePrice}
                  className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
