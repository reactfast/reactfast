'use client'

import Link from 'next/link'

export default function EditBoopButton({ petOwner }) {
  const href = petOwner ? '/account/boop-tag' : '/shop'
  const label = petOwner ? 'Edit' : 'Get Boop Tag'

  return (
    <div className="absolute right-4 top-4">
      <Link
        href={`https://jot.space${href}`}
        className="inline-flex items-center rounded-full border border-gray-400 px-4 py-1 text-sm font-semibold tracking-widest text-gray-300 shadow-sm transition hover:bg-gray-100"
      >
        {label}
      </Link>
    </div>
  )
}
