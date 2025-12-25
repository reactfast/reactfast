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
import Loading from '../loading'
import Pagination from '@/components/pagination'
import Link from 'next/link'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { getUserSubscription } from '@/helpers/subs'
import Modal from '@/components/modal'
import AccountPageHeader from '@/components/accountPageHeader'
import ModelToolBar from '@/components/modelToolBar'
import DeviceCard from './deviceCard'

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
    console.log('Editing QR code:', qr)
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
        <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-none">
          <Link href={'/help/docs//device-setup'} target="_blank">
            <button className="inline-flex items-center gap-1 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-white shadow-sm hover:brightness-110">
              <PlusCircleIcon className="h-5 w-5" />
              Register New Device
            </button>
          </Link>
        </div>{' '}
      </ModelToolBar>

      <AccountPageHeader
        kicker={'Jot.Space QR Code and NFC Devices'}
        title="My Devices"
        description={
          'Manage your QR codes and NFC devices. Create, edit, and download your QR codes for various purposes.'
        }
      />

      <div className="container mx-auto p-4">
        <div className="grid max-h-[92vh] w-full grid-cols-12 gap-4 p-4">
          {paginatedQRCodes.map((qr) => (
            <div
              onClick={() => handleEditClick(qr)}
              className="col-span-12 cursor-pointer select-none md:col-span-6 lg:col-span-4"
              key={qr.id}
            >
              <DeviceCard device={qr} key={qr.id} />
            </div>
          ))}

          {paginatedQRCodes.length === 0 && (
            <>
              <div className="col-span-12 text-center">
                <p className="text-3xl text-gray-500">No devices found.</p>
              </div>
            </>
          )}
        </div>
      </div>

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

      <div className="fixed bottom-0 left-0 right-0 z-30 border-t bg-white shadow-md lg:left-72">
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  )
}
