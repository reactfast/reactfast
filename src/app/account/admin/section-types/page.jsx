'use client'

import { useEffect, useState } from 'react'
import { getUser } from '@/hooks/Auth'
import { supabaseClient as supabase } from '@/config/supabase-client'
import {
  PlusCircleIcon,
  ExclamationTriangleIcon,
  ChevronUpDownIcon,
  CheckIcon,
} from '@heroicons/react/24/outline'
import { convertIsoToReadableDate } from '@/helpers/dateConvert'
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react'

const columns = ['id', 'folder_name', 'component_name', 'name', 'created_at']

export default function Page({ params }) {
  const [qrCodes, setQrCodes] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState({
    id: 'all',
    title: 'All Categories',
  })
  const [currentUser, setCurrentUser] = useState(null)

  // Fetch logged-in user
  useEffect(() => {
    async function _getUser() {
      const user = await getUser()
      if (user) setCurrentUser(user)
    }
    _getUser()
  }, [])

  // Fetch categories
  useEffect(() => {
    async function getCategories() {
      const { data, error } = await supabase.from('sec_categories').select('*')
      if (error) console.error('Error fetching categories:', error)
      else {
        const extended = [
          { id: 'all', title: 'All Categories' },
          { id: 'none', title: 'No Category' },
          ...data,
        ]
        setCategories(extended)
      }
    }

    getCategories()
  }, [])

  // Fetch section types
  useEffect(() => {
    async function getQR() {
      if (selectedCategory.id === 'all') {
        const { data: allTypes, error: allError } = await supabase.from(
          'sec_type',
        ).select(`
            *,
            sec_type_categories (category)
          `)

        if (allError) {
          console.error('Error fetching all section types:', allError)
        } else {
          setQrCodes(allTypes)
        }
      } else if (selectedCategory.id === 'none') {
        const { data: uncategorized, error: uncategorizedError } =
          await supabase
            .from('sec_type')
            .select('*, sec_type_categories(category)')
            .is('sec_type_categories', null)

        if (uncategorizedError) {
          console.error('Error fetching uncategorized:', uncategorizedError)
        } else {
          setQrCodes(uncategorized)
        }
      } else {
        const { data: joinedData, error: joinedError } = await supabase
          .from('sec_type_categories')
          .select(
            `
            id,
            category,
            sec_type (
              *,
              sec_type_categories(category)
            )
          `,
          )
          .eq('category', selectedCategory.id)

        if (joinedError) {
          console.error('Error fetching filtered section types:', joinedError)
        } else {
          const filtered = joinedData.map((item) => item.sec_type)
          setQrCodes(filtered)
        }
      }
    }

    if (currentUser) getQR()
  }, [currentUser, selectedCategory])

  const handleEditClick = (id) => {
    window.location.replace(`/account/admin/section-types/${id}`)
  }

  const handleCreateNew = () => {
    window.location.replace(`/account/admin/section-types/new`)
  }

  return (
    <div className="container mx-auto min-h-screen px-4">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="mt-4 text-3xl font-thin tracking-wide lg:text-5xl xl:tracking-widest">
            Section Types
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all registered section types for the JOT builder.
          </p>
        </div>
        <div className="mt-4 flex min-w-[250px] flex-col gap-4 sm:ml-4 sm:mt-0 sm:flex-none">
          <div>
            <Listbox value={selectedCategory} onChange={setSelectedCategory}>
              <Label className="block text-sm font-medium text-gray-900">
                Filter by Category
              </Label>
              <div className="relative mt-2">
                <ListboxButton className="w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm">
                  <span className="block truncate">
                    {selectedCategory.title}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                  </span>
                </ListboxButton>
                <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {categories.map((cat) => (
                    <ListboxOption
                      key={cat.id}
                      value={cat}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-3 pr-9 ${
                          active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                        }`
                      }
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}
                          >
                            {cat.title}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </div>
            </Listbox>
          </div>

          <button
            onClick={handleCreateNew}
            className="inline-flex items-center justify-center gap-1 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-white shadow-sm hover:brightness-110"
          >
            <PlusCircleIcon className="h-5 w-5" />
            Register New Section Type
          </button>
        </div>
      </div>

      <div className="mt-8 overflow-x-auto px-2">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  {column.replace('_', ' ')}
                </th>
              ))}
              <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {qrCodes.length > 0 ? (
              qrCodes.map((qr) => (
                <tr key={qr.id}>
                  {columns.map((column) => (
                    <td
                      key={column}
                      className="px-4 py-4 text-sm text-gray-500"
                    >
                      {column === 'created_at'
                        ? convertIsoToReadableDate(qr[column])
                        : qr[column] || 'N/A'}
                    </td>
                  ))}
                  <td className="flex items-center gap-2 px-4 py-4 text-sm font-medium">
                    <button
                      onClick={() => handleEditClick(qr.id)}
                      className="mr-2 text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    {(!qr.sec_type_categories ||
                      qr.sec_type_categories.length === 0) && (
                      <div title="Section is not in a category">
                        <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="py-6 text-center text-sm text-gray-500"
                >
                  No Section Types Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
