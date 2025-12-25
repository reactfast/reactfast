'use client'

import { useState } from 'react'
import { Menu } from '@headlessui/react'
import {
  EllipsisVerticalIcon,
  QrCodeIcon,
  ShareIcon,
  ArrowDownOnSquareIcon,
  EnvelopeIcon,
  ChatBubbleLeftEllipsisIcon,
  PencilIcon,
} from '@heroicons/react/24/outline'
import ShareModal from './ShareModal' // this is the modal for "Share this page"

export default function ActionMenu({
  page,
  params,
  setShowQR,
  showQR,
  handleShare,
  pageOwner,
}) {
  const [open, setOpen] = useState(false) // for ShareModal

  const handleDownload = async () => {
    if (!page?.vcard) return
    const link = document.createElement('a')
    link.href = page.vcard
    link.setAttribute('download', 'contact.vcf')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    handleShare()
  }

  return (
    <>
      <div className="absolute right-4 top-4 z-20 flex gap-2 font-display">
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="rounded-full bg-white p-2 shadow hover:bg-gray-100 focus:outline-none">
            <EllipsisVerticalIcon className="h-5 w-5 text-black" />
          </Menu.Button>

          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {/* QR Code Toggle */}
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => setShowQR((prev) => !prev)}
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } group flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700`}
                >
                  <QrCodeIcon className="h-5 w-5" />{' '}
                  {showQR ? 'Hide QR Code' : 'Show QR Code'}
                </button>
              )}
            </Menu.Item>

            {/* Share This Page (Modal) */}
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => setOpen(true)}
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } group flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700`}
                >
                  <ShareIcon className="h-5 w-5" /> Share This Page
                </button>
              )}
            </Menu.Item>

            {/* Download vCard + Redirect */}
            {page?.vcard && (
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleDownload}
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } group flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700`}
                  >
                    <ArrowDownOnSquareIcon className="h-5 w-5" /> Download
                    Contact
                  </button>
                )}
              </Menu.Item>
            )}

            {/* Email */}
            {page?.email_address && (
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() =>
                      (window.location.href = `mailto:${page.email_address}?subject=Check%20this%20out&body=${encodeURIComponent(
                        page.email_content || '',
                      )}`)
                    }
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } group flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700`}
                  >
                    <EnvelopeIcon className="h-5 w-5" /> Send Email
                  </button>
                )}
              </Menu.Item>
            )}

            {/* SMS */}
            {page?.sms_number && (
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() =>
                      (window.location.href = `sms:${page.sms_number}?body=${encodeURIComponent(
                        page.sms_message || '',
                      )}`)
                    }
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } group flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700`}
                  >
                    <ChatBubbleLeftEllipsisIcon className="h-5 w-5" /> Send SMS
                  </button>
                )}
              </Menu.Item>
            )}

            {pageOwner && (
              <>
                <hr />
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() =>
                        (window.location.href = `https://jot.space/account/pages/${page.id}`)
                      }
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } group flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700`}
                    >
                      <PencilIcon className="h-5 w-5" /> Edit
                    </button>
                  )}
                </Menu.Item>
              </>
            )}
          </Menu.Items>
        </Menu>
      </div>

      {/* Modal for "Share This Page" */}
      <ShareModal open={open} setOpen={setOpen} site={page} />
    </>
  )
}
