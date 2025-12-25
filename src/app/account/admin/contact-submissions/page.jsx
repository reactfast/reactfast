'use client'

import { useEffect, useState } from 'react'
import { getUser } from '@/hooks/Auth'
import { supabaseClient as supabase } from '@/config/supabase-client'
import { convertIsoToReadableDate } from '@/helpers/dateConvert'
import Loading from '../../loading'
import Pagination from '@/components/pagination'
import AccountPageHeader from '@/components/accountPageHeader'

const columns = ['id', 'email', 'page', 'created_at']

export default function ContactUsIndexPage() {
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const [entries, setEntries] = useState([])
  const [totalCount, setTotalCount] = useState(0)

  const [loading, setLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  // Load authenticated user
  useEffect(() => {
    async function _getUser() {
      const user = await getUser()
      if (user && user.role === 'admin') {
        setCurrentUser(user)
      }
    }

    _getUser()
  }, [])

  // Fetch paginated contact form entries
  useEffect(() => {
    async function fetchEntries() {
      const from = (currentPage - 1) * itemsPerPage
      const to = from + itemsPerPage - 1

      const { data, error, count } = await supabase
        .from('contact_us')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to)

      if (error) {
        console.error('Error fetching contact form entries:', error)
      } else {
        setEntries(data)
        setTotalCount(count)
        setLoading(false)
      }
    }

    if (currentUser) fetchEntries()
  }, [currentUser, currentPage])

  if (loading) return <Loading />

  return (
    <>
      <AccountPageHeader
        kicker="Submissions"
        title="Contact Form Feedback"
        description="All messages submitted via the public contact form and documentation feedback."
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
                      <th className="py-3.5 pl-4 pr-3 sm:pl-6">Message</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {entries.map((entry) => (
                      <tr key={entry.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {entry.id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                          {entry.from_email || '-'}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                          {entry.page}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {convertIsoToReadableDate(entry.created_at)}
                        </td>
                        <td className="whitespace-pre-wrap px-3 py-4 text-sm text-gray-900">
                          {entry.message}
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

                {entries.length === 0 && (
                  <div className="py-16 text-center text-sm text-gray-600">
                    No contact submissions found.
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
