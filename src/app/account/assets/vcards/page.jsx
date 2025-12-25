'use client'

import { useEffect, useState } from 'react'
import { getUser } from '@/hooks/Auth'
import { supabaseClient as supabase } from '@/config/supabase-client'
import Link from 'next/link'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { convertIsoToReadableDate } from '@/helpers/dateConvert'
import Loading from '../../loading'
import Pagination from '@/components/pagination'
import {
  DocumentDuplicateIcon,
  ArrowDownTrayIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import AccountPageHeader from '@/components/accountPageHeader'
import ModelToolBar from '@/components/modelToolBar'

const columns = ['id', 'name', 'created_at']

export default function Page() {
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const [vcards, setVcards] = useState([])
  const [totalCount, setTotalCount] = useState(0)

  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedVcard, setSelectedVcard] = useState(null)
  const [updatedRedirectUrl, setUpdatedRedirectUrl] = useState('')

  const [copiedTooltipId, setCopiedTooltipId] = useState(null)

  //GET USER
  useEffect(() => {
    async function _getUser() {
      const user = await getUser()
      if (user) setCurrentUser(user)
    }

    _getUser()
  }, [])

  useEffect(() => {
    async function fetchVcards() {
      const from = (currentPage - 1) * itemsPerPage
      const to = from + itemsPerPage - 1

      const { data, error, count } = await supabase
        .from('user_vcards')
        .select('*', { count: 'exact' })
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: false }) // Ensure newest first
        .range(from, to)

      if (error) {
        console.error('Error fetching vcards:', error)
      } else {
        setVcards(data)
        setTotalCount(count)
        setLoading(false)
      }
    }

    if (currentUser) fetchVcards()
  }, [currentUser, currentPage])

  const handleCopyVcardPath = async (vcardId) => {
    const { data, error } = await supabase
      .from('user_vcards')
      .select('path')
      .eq('id', vcardId)
      .single()

    if (error) {
      console.error('Error copying vCard path:', error)
      return
    }

    try {
      await navigator.clipboard.writeText(data.path)
      setCopiedTooltipId(vcardId)

      setTimeout(() => {
        setCopiedTooltipId(null)
      }, 2000) // Tooltip disappears after 2 seconds
    } catch (err) {
      console.error('Clipboard write failed:', err)
    }
  }

  const handleDownloadVcard = async (vcardId) => {
    const { data, error } = await supabase
      .from('user_vcards')
      .select('path, file_name')
      .eq('id', vcardId)
      .single()

    if (error) {
      console.error('Error fetching vCard path:', error)
      return
    }

    try {
      const response = await fetch(data.path)

      if (!response.ok) throw new Error('Failed to fetch file.')

      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = blobUrl
      link.download = data.file_name || `vcard-${vcardId}.vcf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(blobUrl)
    } catch (err) {
      console.error('Error downloading vCard file:', err)
    }
  }

  const handleDeleteVcard = async (vcardId, filePath) => {
    if (!filePath) {
      console.error('No file path provided for deletion.')
      return
    }

    try {
      // 1. Extract the exact storage path relative to the bucket
      const storagePath = filePath.split('/vcards/')[1] // Assuming public URL contains /vcards/
      if (!storagePath) throw new Error('Invalid storage path.')

      // 2. Delete from Supabase Storage
      const { error: storageError } = await supabase.storage
        .from('vcards')
        .remove([storagePath])

      if (storageError) {
        console.error('Error deleting file from storage:', storageError)
        return
      }

      // 3. Delete from user_vcards table
      const { error: dbError } = await supabase
        .from('user_vcards')
        .delete()
        .eq('id', vcardId)

      if (dbError) {
        console.error('Error deleting vCard from database:', dbError)
        return
      }

      // 4. Update UI State
      setVcards((prevVcards) => prevVcards.filter((v) => v.id !== vcardId))
      setTotalCount((prevCount) => prevCount - 1)
      console.log('vCard deleted successfully!')
    } catch (err) {
      console.error('Error during vCard deletion:', err)
    }
  }

  if (loading) return <Loading />

  return (
    <>
      <ModelToolBar
        modelName="user_vcards"
        searchColumn={'name'}
        columns={['name', 'id']}
        onRowClick={(link) => {
          window.location.href = `/account/qr-codes/${link.id}`
        }}
      >
        <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-none">
          <Link href="/account/assets/vcards/new">
            <button className="inline-flex items-center gap-1 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-white shadow-sm hover:brightness-110">
              <PlusCircleIcon className="h-5 w-5" />
              Create New Contact Card
            </button>
          </Link>
        </div>
      </ModelToolBar>
      <AccountPageHeader
        kicker={'vCards'}
        title="Contact Cards"
        description={
          'A list of all your vCards. You can edit them or copy/download their paths for sharing. vCards (.vcf files) are compatible with most contact apps and platforms.'
        }
      />
      <div className="container mx-auto min-h-screen p-4 px-8">
        <div className="sm:flex sm:items-center"></div>

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
                    {vcards.map((vcard) => (
                      <tr key={vcard.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {vcard.id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {vcard.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {convertIsoToReadableDate(vcard.created_at)}
                        </td>
                        <td className="relative flex justify-end gap-3 whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <div className="relative">
                            <button
                              onClick={() => handleCopyVcardPath(vcard.id)}
                              className="text-indigo-600 hover:text-indigo-900"
                              title="Copy Path"
                            >
                              <DocumentDuplicateIcon className="h-5 w-5" />
                            </button>
                            {copiedTooltipId === vcard.id && (
                              <div className="absolute right-0 top-[-1.5rem] z-10 rounded bg-black px-2 py-1 text-xs text-white shadow">
                                Copied!
                              </div>
                            )}{' '}
                          </div>
                          <button
                            onClick={() => handleDownloadVcard(vcard.id)}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="Download"
                          >
                            <ArrowDownTrayIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteVcard(vcard.id, vcard.path)
                            }
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
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

                {vcards.length === 0 && (
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
                      No Contact Cards Found
                    </h2>
                    <p className="mb-6 max-w-sm text-center text-sm text-gray-600">
                      You haven’t created any vCards yet. Click the button below
                      to generate your first one.
                    </p>
                    <Link href="/account/contact-cards/new">
                      <button className="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-white shadow-sm hover:brightness-110">
                        Create Your First Contact Card
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal for editing vCard */}
        {isModalOpen && selectedVcard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-96 rounded-lg bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Edit Contact Card
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
                <h3 className="text-sm font-medium text-gray-700">Preview</h3>
                <img
                  src={selectedVcard.vcf_ref}
                  alt="vCard Preview"
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
    </>
  )
}
