'use client'

import { Dialog } from '@headlessui/react'
import {
  XMarkIcon,
  FlagIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'
import {
  FaTwitter,
  FaLinkedin,
  FaFacebookF,
  FaWhatsapp,
  FaSnapchatGhost,
  FaEnvelope,
  FaLink,
  FaFacebookMessenger,
} from 'react-icons/fa'

export default function ShareModal({
  open,
  setOpen,
  site,
  shareUrl = 'https://jot.space/' + site.name,
}) {
  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedText = encodeURIComponent(
    'Check out my digital card on Jot.Space!',
  )

  const platforms = [
    {
      label: 'Copy Space',
      color: '#E0E2D9',
      icon: FaLink,
      onClick: () => {
        navigator.clipboard.writeText(shareUrl)
        alert('Link copied to clipboard!')
      },
    },
    {
      label: 'X',
      color: '#000000',
      icon: FaTwitter,
      onClick: () =>
        window.open(
          `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
          '_blank',
        ),
    },
    {
      label: 'Facebook',
      color: '#1877F2',
      icon: FaFacebookF,
      onClick: () =>
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
          '_blank',
        ),
    },
    {
      label: 'WhatsApp',
      color: '#25D366',
      icon: FaWhatsapp,
      onClick: () =>
        window.open(
          `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
          '_blank',
        ),
    },
    {
      label: 'LinkedIn',
      color: '#0A66C2',
      icon: FaLinkedin,
      onClick: () =>
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
          '_blank',
        ),
    },
    {
      label: 'Messenger',
      color: '#0078FF',
      icon: FaFacebookMessenger,
      onClick: () =>
        window.open(
          `https://www.facebook.com/dialog/send?link=${encodedUrl}&app_id=123456789&redirect_uri=${encodedUrl}`,
          '_blank',
        ),
    },
    {
      label: 'Snapchat',
      color: '#FFFC00',
      icon: FaSnapchatGhost,
      onClick: () =>
        alert(
          'Snapchat doesn’t support direct sharing. Copy the link instead.',
        ),
    },
    {
      label: 'Email',
      color: '#60696C',
      icon: FaEnvelope,
      onClick: () =>
        (window.location.href = `mailto:?subject=Check this out!&body=${encodedText}%0A${shareUrl}`),
    },
  ]

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-md bg-white shadow-xl">
          {/* Header */}
          <div className="relative flex items-center justify-between border-b px-4 py-3">
            <Dialog.Title className="w-full text-center text-base font-semibold text-black">
              Share Jot.Space
            </Dialog.Title>
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 rounded p-1 hover:bg-gray-100"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            <div className="relative">
              {/* Preview */}
              <div className="mb-6 rounded-md border border-gray-200 bg-gray-50 p-4 shadow-sm">
                <div className="flex gap-4">
                  {site.meta_img && (
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                      <img
                        src={site.meta_img}
                        alt={site.meta_title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-col justify-between text-left">
                    <h3 className="text-sm font-semibold text-black">
                      {site.meta_title}
                    </h3>
                    {site.meta_description && (
                      <p className="mt-1 line-clamp-3 text-xs text-gray-600">
                        {site.meta_description}
                      </p>
                    )}
                    <span className="mt-2 text-[11px] text-gray-500">
                      {shareUrl}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="scrollbar-hide flex gap-4 overflow-x-auto px-2 py-1">
                {platforms.map(({ label, color, icon: Icon, onClick }) => (
                  <button
                    key={label}
                    onClick={onClick}
                    className="flex min-w-[60px] flex-col items-center gap-2 text-xs text-gray-700 hover:text-black focus:outline-none"
                  >
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: color }}
                    >
                      <Icon className="text-xl text-white" />
                    </div>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t px-6 py-4 text-center">
            <p className="mb-4 text-sm text-gray-600">
              Get your own free Jot.Space. Trusted by creators, professionals,
              and teams.
            </p>
            <div className="mb-4 flex justify-center gap-2">
              <a
                href="https://jot.space/register"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-900"
              >
                Sign up free
              </a>
              <a
                href="https://jot.space"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold hover:bg-gray-100"
              >
                Find out more
              </a>
            </div>

            <div className="flex justify-between border-t pt-4 text-xs text-gray-500">
              <a
                href="https://jot.space/report"
                target="_blank"
                className="flex items-center gap-1 hover:text-black"
              >
                <FlagIcon className="h-4 w-4" /> Report this space
              </a>
              <a
                href="https://jot.space/privacy"
                target="_blank"
                className="flex items-center gap-1 hover:text-black"
              >
                <InformationCircleIcon className="h-4 w-4" /> Privacy notice
              </a>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
