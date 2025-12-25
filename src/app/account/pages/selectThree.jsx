'use client'

import Modal from '@/components/modal'
import Link from 'next/link'

export default function PageSelectionModal({ open, setOpen, blankPageModal }) {
  const options = [
    {
      title: 'Quick Page',
      description: 'Generate a page with basic layout and styles in seconds.',
      imageSrc:
        'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics//Frame%2032.png',
      imageAlt: 'Placeholder image for quick page',
      href: '/site-create',
    },
    {
      title: 'Start with Template',
      description: 'Use one of our ready-to-go templates for faster setup.',
      imageSrc:
        'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics//Frame%2033.png',
      imageAlt: 'Placeholder image for templates',
      href: '/account/pages/select-template',
    },
    {
      title: 'Blank Page',
      description: 'Start with a completely empty page to build from scratch.',
      imageSrc:
        'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics//Frame%2034.png',
      imageAlt: 'Placeholder image for blank page',
      onClick: () => {
        blankPageModal(true)
        setOpen(false)
      },
    },
  ]

  return (
    <Modal open={open} setOpen={setOpen} title="Create New Page" size="3xl">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((option, index) =>
          option.onClick ? (
            <button
              key={index}
              onClick={option.onClick}
              className="group block w-full rounded-lg border border-gray-200 p-4 text-left transition hover:border-indigo-500 hover:shadow-md"
            >
              <div className="mb-4 flex items-center justify-center rounded bg-gray-100 text-gray-400">
                <img
                  src={option.imageSrc}
                  alt={option.imageAlt}
                  className="h-auto w-full object-contain"
                />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
                {option.title}
              </h4>
              <p className="mt-2 text-sm text-gray-600">{option.description}</p>
            </button>
          ) : (
            <Link
              key={index}
              href={option.href}
              className="group block rounded-lg border border-gray-200 p-4 transition hover:border-indigo-500 hover:shadow-md"
            >
              <div className="mb-4 flex items-center justify-center rounded bg-gray-100 text-gray-400">
                <img
                  src={option.imageSrc}
                  alt={option.imageAlt}
                  className="h-auto w-full object-contain"
                />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
                {option.title}
              </h4>
              <p className="mt-2 text-sm text-gray-600">{option.description}</p>
            </Link>
          ),
        )}
      </div>
      <div className="mt-6 w-full text-center">
        <a href="/pets/form" className="text-indigo-600 hover:underline">
          Create Pet Space for booptag
        </a>
      </div>
    </Modal>
  )
}
