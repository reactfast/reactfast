'use client'

import { useEffect, useState } from 'react'
import { getUser } from '@/hooks/Auth'
import { supabaseClient as supabase } from '@/config/supabase-client'
import Link from 'next/link'
import {
  PlusCircleIcon,
  DocumentDuplicateIcon,
  EyeIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { convertIsoToReadableDate } from '@/helpers/dateConvert'
import Loading from '../../loading'
import Pagination from '@/components/pagination'
import AccountPageHeader from '@/components/accountPageHeader'
import ModelToolBar from '@/components/modelToolBar'
import QRCodeCanvas from '@/components/qrv2'

const columns = ['id', 'redirect_url', 'status', 'created_at']

export default function Page() {
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const [qrs, setQrs] = useState([])
  const [totalCount, setTotalCount] = useState(0)

  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)

  const [copiedTooltipId, setCopiedTooltipId] = useState(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [previewQr, setPreviewQr] = useState(null)

  const [statusCounts, setStatusCounts] = useState({
    'awaiting registration': 0,
    active: 0,
    'not printed': 0,
  })

  const handleCreateQr = async () => {
    try {
      const newUuid = crypto.randomUUID() // modern way to generate UUID in browser
      const { data, error } = await supabase
        .from('qr_codes')
        .insert([
          {
            id: newUuid,
            status: 'new',
          },
        ])
        .select('id')
        .single()

      if (error) throw error

      // Option 1: Redirect to QR detail page
      window.location.href = `/account/admin/qr/${data.id}`
    } catch (err) {
      console.error('Error creating new QR:', err)
      alert('Failed to create new QR')
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
    async function fetchAllStatusCounts() {
      const { data, error } = await supabase.from('qr_codes').select('status')
      if (error) {
        console.error('Error fetching status counts:', error)
        return
      }

      const counts = data.reduce(
        (acc, qr) => {
          acc[qr.status] = (acc[qr.status] || 0) + 1
          return acc
        },
        { 'awaiting registration': 0, active: 0, 'not printed': 0 },
      )

      setStatusCounts(counts)
    }

    if (currentUser) fetchAllStatusCounts()
  }, [currentUser])

  useEffect(() => {
    async function fetchQrs() {
      const from = (currentPage - 1) * itemsPerPage
      const to = from + itemsPerPage - 1

      const { data, error, count } = await supabase
        .from('qr_codes')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to)

      if (error) {
        console.error('Error fetching qrs:', error)
      } else {
        setQrs(data)
        setTotalCount(count)
        setLoading(false)
      }
    }

    if (currentUser) fetchQrs()
  }, [currentUser, currentPage])

  function StatusBadge({ status }) {
    let colorClasses = ''

    switch (status) {
      case 'not printed':
        colorClasses = 'bg-gray-100 text-gray-800 ring-gray-300'
        break
      case 'awaiting registration':
        colorClasses = 'bg-yellow-100 text-yellow-800 ring-yellow-300'
        break
      case 'active':
        colorClasses = 'bg-green-100 text-green-800 ring-green-300'
        break
      case 'disabled':
        colorClasses = 'bg-red-100 text-red-800 ring-red-300'
        break
      default:
        colorClasses = 'bg-gray-100 text-gray-800 ring-gray-300'
    }

    return (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${colorClasses}`}
      >
        {status}
      </span>
    )
  }

  const handleCopyUrl = async (qr) => {
    try {
      const fullUrl = `https://jot.space/redirect/${qr.id}`
      await navigator.clipboard.writeText(fullUrl)
      setCopiedTooltipId(qr.id)
      setTimeout(() => setCopiedTooltipId(null), 2000)
    } catch (err) {
      console.error('Clipboard write failed:', err)
    }
  }

  const handleDeleteQr = async (qrId) => {
    try {
      const { error } = await supabase.from('qr_codes').delete().eq('id', qrId)
      if (error) throw error
      setQrs((prev) => prev.filter((q) => q.id !== qrId))
      setTotalCount((prev) => prev - 1)
    } catch (err) {
      console.error('Error deleting QR:', err)
    }
  }

  if (loading) return <Loading />

  return (
    <>
      <ModelToolBar
        modelName="qr_codes"
        searchColumn="id"
        columns={['id']}
        onRowClick={(link) => {
          window.location.href = `/account/qr-codes/${link.id}`
        }}
      >
        <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-none">
          <button
            onClick={handleCreateQr}
            className="inline-flex items-center gap-1 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-white shadow-sm hover:brightness-110"
          >
            <PlusCircleIcon className="h-5 w-5" />
            Create New QR
          </button>
        </div>
      </ModelToolBar>

      <AccountPageHeader
        kicker="QR Codes"
        title="QR Codes"
        description="Manage all QR codes created for products. Copy, preview, or delete them below."
      />

      <div className="container mx-auto min-h-screen p-4 px-8">
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatusCard
            title="Awaiting Registration"
            count={statusCounts['awaiting registration']}
            color="bg-yellow-500"
          />
          <StatusCard
            title="Active"
            count={statusCounts.active}
            color="bg-green-500"
          />
          <StatusCard
            title="Not Printed"
            count={statusCounts['not printed']}
            color="bg-gray-500"
          />
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
                          {column}
                        </th>
                      ))}
                      <th className="py-3.5 pl-4 pr-3 sm:pl-6"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {qrs.map((qr) => (
                      <tr key={qr.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {qr.id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {qr.redirect_url}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <StatusBadge status={qr.status} />
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {convertIsoToReadableDate(qr.created_at)}
                        </td>
                        <td className="relative flex justify-end gap-3 whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <div className="relative">
                            <button
                              onClick={() => handleCopyUrl(qr)}
                              className="text-indigo-600 hover:text-indigo-900"
                              title="Copy URL"
                            >
                              <DocumentDuplicateIcon className="h-5 w-5" />
                            </button>
                            {copiedTooltipId === qr.id && (
                              <div className="absolute right-0 top-[-1.5rem] z-10 rounded bg-black px-2 py-1 text-xs text-white shadow">
                                Copied!
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => {
                              setPreviewQr(qr)
                              setIsPreviewOpen(true)
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="Preview QR"
                          >
                            <EyeIcon className="h-5 w-5" />
                          </button>

                          {/* Only show delete button if status is new or not printed */}
                          {(qr.status === 'new' ||
                            qr.status === 'not printed') && (
                            <button
                              onClick={() => handleDeleteQr(qr.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          )}
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

                {qrs.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
                      <PlusCircleIcon className="h-8 w-8 text-secondary" />
                    </div>
                    <h2 className="mb-2 text-lg font-semibold text-gray-900">
                      No QR Codes Found
                    </h2>
                    <p className="mb-6 max-w-sm text-center text-sm text-gray-600">
                      You haven’t created any QR codes yet. Click the button
                      below to generate your first one.
                    </p>
                    <Link href="/account/qr-codes/new">
                      <button className="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-white shadow-sm hover:brightness-110">
                        Create Your First QR
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* QR Preview Modal */}
        {isPreviewOpen && previewQr && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-96 rounded-lg bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                QR Preview
              </h2>
              <QRCodeCanvas
                url={`https://jot.space/redirect/${previewQr.id}`}
              />
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

function StatusCard({ title, count, color }) {
  return (
    <div className={`rounded-lg p-4 shadow ${color}`}>
      <h3 className="text-sm font-medium text-gray-100">{title}</h3>
      <p className="mt-2 text-2xl font-semibold text-white">{count}</p>
    </div>
  )
}
