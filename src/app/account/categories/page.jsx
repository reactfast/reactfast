'use client'

import { useEffect, useState } from 'react'
import { getUser } from '@/hooks/Auth'
import { supabaseClient as supabase } from '@/config/supabase-client'
import Link from 'next/link'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

const columns = ['name', 'description', 'created_at']

export default function CategoriesPage() {
  const router = useRouter()
  const [categories, setCategories] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    async function _getUser() {
      const user = await getUser()
      if (user) setCurrentUser(user)
    }

    _getUser()
  }, [])

  useEffect(() => {
    async function getCategories() {
      const { data, error } = await supabase
        .from('vendor_categories')
        .select('*')

      if (error) console.error('Error fetching categories:', error)
      else setCategories(data)
    }

    if (currentUser) getCategories()
  }, [currentUser])

  const handleEditClick = (category) => {
    router.push(`/account/categories/${category.id}`)
  }

  const handleDelete = async (categoryId) => {
    const { error } = await supabase
      .from('vendor_categories')
      .delete()
      .eq('id', categoryId)

    if (error) {
      console.error('Error deleting category:', error)
    } else {
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== categoryId),
      )
      console.log('Category deleted successfully')
    }
  }

  return (
    <div className="container mx-auto min-h-screen p-4 px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-thin tracking-wide lg:text-5xl xl:tracking-widest">
            Categories
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your product categories
          </p>
        </div>
        <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-none">
          <Link href="/account/categories/new">
            <button className="inline-flex items-center justify-center gap-1 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-white shadow-sm hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <PlusCircleIcon className="h-5 w-5" />
              Add Category
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full px-1 py-2 align-middle">
            <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    {columns.map((column) => (
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
                  {categories.map((category) => (
                    <tr key={category.id}>
                      {columns.map((column) => (
                        <td
                          key={column}
                          className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6"
                        >
                          {column === 'created_at'
                            ? new Date(category[column]).toLocaleDateString()
                            : category[column]}
                        </td>
                      ))}
                      <td className="relative flex justify-end space-x-4 whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => handleEditClick(category)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Edit"
                        >
                          <PencilSquareIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <TrashIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {categories.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
                    <PlusCircleIcon className="h-8 w-8 text-secondary" />
                  </div>
                  <h2 className="mb-2 text-lg font-semibold text-gray-900">
                    No Categories Found
                  </h2>
                  <p className="mb-6 max-w-sm text-center text-sm text-gray-600">
                    You haven’t added any product categories yet. Click below to
                    add one.
                  </p>
                  <Link href="/account/categories/new">
                    <button className="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-white shadow-sm hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      Add Your First Category
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
