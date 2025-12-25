'use client'

import { useEffect, useState } from 'react'
import { getUser } from '@/hooks/Auth'
import { supabaseClient as supabase } from '@/config/supabase-client'
import Link from 'next/link'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { convertIsoToReadableDate } from '@/helpers/dateConvert'

const columns = ['id', 'page', 'name', 'created_at']

export default function Page() {
  const [qrCodes, setQrCodes] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedQR, setSelectedQR] = useState(null)
  const [updatedRedirectUrl, setUpdatedRedirectUrl] = useState('')

  useEffect(() => {
    async function _getUser() {
      const user = await getUser()
      if (user) setCurrentUser(user)
    }

    _getUser()
  }, [])

  useEffect(() => {
    async function getOrders() {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', currentUser.id)
      if (error) console.error('error', error)
      else setQrCodes(data)
    }

    if (currentUser) getOrders()
  }, [currentUser])

  const handleEditClick = (qr) => {
    setSelectedQR(qr)
    setUpdatedRedirectUrl(qr.redirect_url)
    setIsModalOpen(true)
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

    // Ensure we are downloading the image from the Supabase storage URL
    const link = document.createElement('a')
    link.href = imageUrl
    link.download = `qrcode-${qrId}.jpg` // Trigger the download and provide the filename
    document.body.appendChild(link) // Append to DOM
    link.click() // Programmatically click the link to trigger download
    document.body.removeChild(link) // Clean up by removing the link after download
  }

  const handleUpdateRedirectUrl = async () => {}

  return (
    <div className="container mx-auto min-h-screen px-4">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="mt-4 text-3xl font-thin tracking-wide lg:text-5xl xl:tracking-widest">
            Orders
          </h1>
          <p className="mt-2 text-sm text-gray-700">Manage your orders.</p>
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
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    ></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {qrCodes.map((qr) => (
                    <tr key={qr.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {qr.id}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {qr.page ? qr.page : 'N/A'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {qr.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {convertIsoToReadableDate(qr.created_at)}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => handleEditClick(qr)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit<span className="sr-only">, {qr.id}</span>
                        </button>
                        <button
                          onClick={() => handleDownloadQRCode(qr.id)}
                          className="ml-4 text-indigo-600 hover:text-indigo-900"
                        >
                          Copy Path
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {qrCodes.length === 0 && (
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
                    No Orders Yet
                  </h2>
                  <p className="mb-6 max-w-sm text-center text-sm text-gray-600">
                    You haven’t ordered any reusable and sustainable marketing
                    or networking materials yet.
                  </p>
                  <Link href="/shop/category/all">
                    <button className="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      Start Shopping
                    </button>
                  </Link>
                </div>
              )}
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
  )
}
