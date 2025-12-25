'use client'

import { useEffect, useState } from 'react'
import { supabaseClient as supabase } from '@/config/supabase-client'
import Link from 'next/link'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { convertIsoToReadableDate } from '@/helpers/dateConvert'
import Loading from '../../loading'
import Pagination from '@/components/pagination'

const columns = [
  'id',
  'name',
  'time_increment',
  'max_days_in_advance',
  'created_at',
]

export default function BookingFlowsPage() {
  const itemsPerPage = 25
  const [currentPage, setCurrentPage] = useState(1)
  const [bookingFlows, setBookingFlows] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBookingFlows() {
      const from = (currentPage - 1) * itemsPerPage
      const to = from + itemsPerPage - 1

      const { data, error, count } = await supabase
        .from('booking_flows')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to)

      if (error) {
        console.error('Error fetching booking flows:', error)
      } else {
        setBookingFlows(data)
        setTotalCount(count)
        setLoading(false)
      }
    }

    fetchBookingFlows()
  }, [currentPage])

  if (loading) return <Loading />

  return (
    <div className="container mx-auto min-h-screen p-4 px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-thin tracking-wide lg:text-5xl xl:tracking-widest">
            Booking Flows
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your booking flows. Create, view, and organize availability
            settings for appointments or rentals.
          </p>
        </div>
        <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-none">
          <Link href="/account/booking/new">
            <button className="inline-flex items-center gap-1 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-white shadow-sm hover:brightness-110">
              <PlusCircleIcon className="h-5 w-5" />
              Create New Booking Flow
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
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        {column.replace(/_/g, ' ')}
                      </th>
                    ))}
                    <th className="py-3.5 pl-4 pr-3 sm:pl-6"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {bookingFlows.map((flow) => (
                    <tr key={flow.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {flow.id}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {flow.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {flow.time_increment} mins
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {flow.max_days_in_advance} days
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {convertIsoToReadableDate(flow.created_at)}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link href={`/account/booking/${flow.id}`}>
                          <span className="mr-4 cursor-pointer text-indigo-600 hover:text-indigo-900">
                            Edit
                          </span>
                        </Link>
                        <Link href={`/booking-flows/${flow.id}`}>
                          <span className="cursor-pointer text-indigo-600 hover:text-indigo-900">
                            View
                          </span>
                        </Link>
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
              {bookingFlows.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-secondary"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3H6a1 1 0 100 2h3v3a1 1 0 102 0v-3h3a1 1 0 100-2h-3V7z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h2 className="mb-2 text-lg font-semibold text-gray-900">
                    No Booking Flows Found
                  </h2>
                  <p className="mb-6 max-w-sm text-center text-sm text-gray-600">
                    You haven’t created any booking flows yet. Click the button
                    below to create your first one.
                  </p>
                  <Link href="/booking-flows/new">
                    <button className="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-white shadow-sm hover:brightness-110">
                      Create Your First Booking Flow
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
