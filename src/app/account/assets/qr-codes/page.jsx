'use client'

import { useEffect, useState } from 'react'
import { getUser } from '@/hooks/Auth'
import { supabaseClient as supabase } from '@/config/supabase-client'
import {
  ArrowDownTrayIcon,
  PencilIcon,
  CheckIcon,
  QrCodeIcon,
} from '@heroicons/react/24/outline'
import { convertIsoToReadableDate } from '@/helpers/dateConvert'
import Loading from '../../loading'
import Pagination from '@/components/pagination'
import Link from 'next/link'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { getUserSubscription } from '@/helpers/subs'
import Modal from '@/components/modal'
import AccountPageHeader from '@/components/accountPageHeader'
import ModelToolBar from '@/components/modelToolBar'

const columns = [
  'id',
  'name',
  'status',
  'redirect_url',
  'created_at',
  'Edit/Download',
]

export default function Page() {
  const [loading, setLoading] = useState(true)
  const [qrCodes, setQrCodes] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedQR, setSelectedQR] = useState(null)
  const [updatedRedirectUrl, setUpdatedRedirectUrl] = useState('')
  const [updatedName, setUpdatedName] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [subscription, setSubscription] = useState(null)
  const itemsPerPage = 10
  const [open, setOpen] = useState(false)

  useEffect(() => {
    async function _getUser() {
      const user = await getUser()
      if (user) setCurrentUser(user)
    }

    _getUser()
  }, [])

  useEffect(() => {
    if (!currentUser) return

    async function getSubscription() {
      if (currentUser) {
        const sub = await getUserSubscription(currentUser.id)
        setSubscription(sub.designation == 'free' ? null : sub)
      }
    }
    getSubscription()
  }, [currentUser])

  useEffect(() => {
    async function getQR() {
      const { data, error } = await supabase
        .from('qr_codes')
        .select('*')
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: false }) // Order by newest first

      if (error) {
        console.error('error', error)
      } else {
        setQrCodes(data)
      }
    }

    if (currentUser) getQR()
  }, [currentUser])

  useEffect(() => {
    if (qrCodes) {
      setLoading(false)
    }
  }, [qrCodes])

  const handleEditClick = (qr) => {
    setSelectedQR(qr)
    setUpdatedRedirectUrl(qr.redirect_url)
    setUpdatedName(qr.name || '')
    setIsModalOpen(true)
  }

  const handleUpdateRedirectUrl = async () => {
    if (selectedQR) {
      const { data, error } = await supabase
        .from('qr_codes')
        .update({
          redirect_url: updatedRedirectUrl,
          name: updatedName || null,
        })
        .eq('id', selectedQR.id)

      if (error) {
        console.error('Error updating QR code:', error)
      } else {
        setIsModalOpen(false)
        setUpdatedRedirectUrl('')
        setUpdatedName('')
        setSelectedQR(null)
        setQrCodes((prev) =>
          prev.map((qr) =>
            qr.id === selectedQR.id
              ? { ...qr, redirect_url: updatedRedirectUrl, name: updatedName }
              : qr,
          ),
        )
      }
    }
  }

  const handleDownloadQRCode = async (qrId) => {
    const { data, error } = await supabase
      .from('qr_codes')
      .select('img_ref')
      .eq('id', qrId)
      .single()

    if (error) {
      console.error('Error fetching QR code image:', error)
      return
    }

    const imageUrl = data.img_ref
    const link = document.createElement('a')
    link.href = imageUrl
    link.download = `qrcode-${qrId}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) return <Loading />

  const totalItems = qrCodes.length
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedQRCodes = qrCodes.slice(startIndex, endIndex)

  return (
    <>
      <ModelToolBar
        modelName="qr_codes"
        searchColumn={'name'}
        columns={['name', 'id']}
        onRowClick={(link) => {
          window.location.href = `/account/qr-codes/${link.id}`
        }}
      >
        {' '}
        <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-none">
          {subscription?.designation == 'Enterprise' ||
          subscription?.designation == 'dev' ? (
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center gap-1 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-white shadow-sm hover:brightness-110"
            >
              <PlusCircleIcon className="h-5 w-5" />
              Create Qr Code
            </button>
          ) : (
            <button className="inline-flex items-center gap-1 rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:brightness-110">
              <PlusCircleIcon className="h-5 w-5" />
              Create Qr Code
            </button>
          )}
        </div>{' '}
      </ModelToolBar>
      <AccountPageHeader
        kicker={'QR Codes'}
        title="QR Codes"
        description={
          'Every site you create gets a non forward-able QR code that can be viewed form the builder or the landing page. To obtain more customizable QR codes you can buy them in the store.'
        }
      />

      <div className="container mx-auto min-h-screen p-4 px-8">
        <div className="sm:flex sm:items-center"></div>
        <div className="mt-8 flow-root">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full px-1 py-2 align-middle">
              <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
                <table className="w-full justify-center divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      {columns.map((column) => (
                        <th
                          key={column}
                          scope="col"
                          className="px-2 py-3 text-left text-sm font-semibold text-gray-900"
                        >
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {paginatedQRCodes.map((qr) => (
                      <tr key={qr.id}>
                        <td className="whitespace-nowrap px-2 py-4 text-sm font-medium text-gray-900">
                          {qr.id}
                        </td>
                        <td className="whitespace-nowrap px-2 py-4 text-sm font-medium text-gray-900">
                          {qr.name}
                        </td>
                        <td className="whitespace-nowrap px-2 py-4 text-sm text-gray-500">
                          {qr.status}
                        </td>
                        <td className="whitespace-nowrap px-2 py-4 text-sm text-gray-500">
                          {qr.redirect_url}
                        </td>
                        <td className="whitespace-nowrap px-2 py-4 text-sm text-gray-500">
                          {convertIsoToReadableDate(qr.created_at)}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium">
                          <button
                            onClick={() => handleEditClick(qr)}
                            className="rounded-md px-2 py-1 text-indigo-600 transition-colors duration-200 hover:bg-neutral-100 hover:text-indigo-900"
                          >
                            <PencilIcon className="h-5 w-5" />
                            <span className="sr-only">, {qr.id}</span>
                          </button>
                          <button
                            onClick={() => handleDownloadQRCode(qr.id)}
                            className="ml-4 rounded-md px-2 py-1 text-indigo-600 transition-colors duration-200 hover:bg-neutral-100 hover:text-indigo-900"
                          >
                            <ArrowDownTrayIcon className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination
                  currentPage={currentPage}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Modal for editing QR code */}
        {isModalOpen && selectedQR && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-96 rounded-lg bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Edit QR Code
              </h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  placeholder="Enter QR Code Name (optional)"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Redirect URL
                </label>
                <input
                  type="text"
                  value={updatedRedirectUrl}
                  onChange={(e) => setUpdatedRedirectUrl(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700">
                  QR Code Preview
                </h3>
                <img
                  src={selectedQR.img_ref}
                  alt="QR Code Preview"
                  className="mt-2 h-48 w-full object-contain"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleUpdateRedirectUrl}
                  className="rounded-md bg-primary px-4 py-2 text-white hover:bg-indigo-500"
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
        <Modal open={open} setOpen={setOpen} title="QR Code Type">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary">
            <QrCodeIcon className="size-6 text-white" />
          </div>
          <p className="mb-4 text-center text-sm text-gray-500">
            Dynamic QR codes can be tracked and updated after creation. They’re
            useful for marketing campaigns, events, and more.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Link
              className="col-span-2 w-full"
              href={`/account/qr-codes/dynamic-qr`}
            >
              <div className="rounded-md bg-primary px-4 py-2 text-center text-white hover:bg-indigo-500">
                Dynamic QR Code
              </div>
            </Link>
          </div>
          <div className="my-4 text-center text-sm text-gray-500">
            <h2>Static Qr code Types</h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Link href={`/account/qr-codes/vcard-qr`}>
              <button className="w-full rounded-md bg-primary px-4 py-2 text-white hover:bg-indigo-500">
                vCard
              </button>
            </Link>
            <Link href={`/account/qr-codes/message-qr`}>
              <button className="w-full rounded-md bg-primary px-4 py-2 text-white hover:bg-indigo-500">
                Quick Connect
              </button>
            </Link>
            <Link href={`/account/qr-codes/wifi-qr`}>
              <button className="w-full rounded-md bg-primary px-4 py-2 text-white hover:bg-indigo-500">
                WiFi Connection
              </button>
            </Link>
            <div>
              <button className="w-full rounded-md bg-gray-200 px-4 py-2 text-gray-400">
                Plain String
              </button>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="col-span-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </>
  )
}
