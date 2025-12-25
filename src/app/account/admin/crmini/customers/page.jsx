'use client'

import { useEffect, useState } from 'react'
import { getUser } from '@/hooks/Auth'
import { supabaseClient as supabase } from '@/config/supabase-client'
import Link from 'next/link'
import {
  PlusCircleIcon,
  DocumentDuplicateIcon,
  TrashIcon,
  EyeIcon,
} from '@heroicons/react/24/outline'
import Loading from '../../../loading'
import Pagination from '@/components/pagination'
import AccountPageHeader from '@/components/accountPageHeader'
import ModelToolBar from '@/components/modelToolBar'

const columns = [
  'business_name',
  'type',
  'phone',
  'email',
  'last_contacted',
  'created_at',
]

export default function Page() {
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const [customers, setCustomers] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)
  const [copiedTooltipId, setCopiedTooltipId] = useState(null)

  const handleCreateCustomer = async () => {
    try {
      const newUuid = crypto.randomUUID()
      const { data, error } = await supabase
        .from('customers')
        .insert([{ id: newUuid }])
        .select('id')
        .single()

      if (error) throw error

      window.location.href = `/account/admin/crmini/customers/${data.id}`
    } catch (err) {
      console.error('Error creating new customer:', err)
      alert('Failed to create new customer')
    }
  }

  useEffect(() => {
    async function _getUser() {
      const user = await getUser()
      if (user) setCurrentUser(user)
    }
    _getUser()
  }, [])

  useEffect(() => {
    async function fetchCustomers() {
      const from = (currentPage - 1) * itemsPerPage
      const to = from + itemsPerPage - 1

      const { data, error, count } = await supabase
        .from('customers')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to)

      if (error) {
        console.error('Error fetching customers:', error)
      } else {
        setCustomers(data)
        setTotalCount(count)
        setLoading(false)
      }
    }

    if (currentUser) fetchCustomers()
  }, [currentUser, currentPage])

  const handleCopy = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedTooltipId(id)
      setTimeout(() => setCopiedTooltipId(null), 2000)
    } catch (err) {
      console.error('Clipboard write failed:', err)
    }
  }

  const handleDeleteCustomer = async (id) => {
    try {
      const { error } = await supabase.from('customers').delete().eq('id', id)
      if (error) throw error
      setCustomers((prev) => prev.filter((c) => c.id !== id))
      setTotalCount((prev) => prev - 1)
    } catch (err) {
      console.error('Error deleting customer:', err)
    }
  }

  if (loading) return <Loading />

  return (
    <>
      <ModelToolBar
        modelName="customers"
        searchColumn="business_name"
        columns={['business_name', 'email', 'phone']}
        onRowClick={(customer) => {
          window.location.href = `/account/customers/${customer.id}`
        }}
      >
        <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-none">
          <button
            onClick={handleCreateCustomer}
            className="inline-flex items-center gap-1 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-white shadow-sm hover:brightness-110"
          >
            <PlusCircleIcon className="h-5 w-5" />
            Create New Customer
          </button>
        </div>
      </ModelToolBar>

      <AccountPageHeader
        kicker="Customers"
        title="Customers"
        description="Manage all customers. Copy info or delete records as needed."
      />

      <div className="container mx-auto min-h-screen p-4 px-8">
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
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          {column}
                        </th>
                      ))}
                      <th className="py-3.5 pl-4 pr-3 sm:pl-6"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {customers.map((c) => (
                      <tr key={c.id}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {c.business_name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {c.type}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {c.phone}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {c.email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {c.last_contacted
                            ? new Date(c.last_contacted).toLocaleDateString()
                            : '-'}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {new Date(c.created_at).toLocaleDateString()}
                        </td>
                        <td className="relative flex justify-end gap-3 whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          {/* View Customer */}
                          <button
                            onClick={() =>
                              (window.location.href = `/account/admin/crmini/customers/${c.id}`)
                            }
                            className="text-indigo-600 hover:text-indigo-900"
                            title="View Customer"
                          >
                            <EyeIcon className="h-5 w-5" />
                          </button>

                          {/* Delete Customer */}
                          <button
                            onClick={() => handleDeleteCustomer(c.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete Customer"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Pagination
                  currentPage={currentPage}
                  totalItems={totalCount}
                  itemsPerPage={itemsPerPage}
                  onPageChange={(page) => {
                    setLoading(true)
                    setCurrentPage(page)
                  }}
                />

                {customers.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
                      <PlusCircleIcon className="h-8 w-8 text-secondary" />
                    </div>
                    <h2 className="mb-2 text-lg font-semibold text-gray-900">
                      No Customers Found
                    </h2>
                    <p className="mb-6 max-w-sm text-center text-sm text-gray-600">
                      You haven’t added any customers yet. Click the button
                      below to add your first one.
                    </p>
                    <button
                      onClick={handleCreateCustomer}
                      className="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-white shadow-sm hover:brightness-110"
                    >
                      Create Your First Customer
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
