// components/ProtectPetsCTA.jsx
'use client'

import { useRouter } from 'next/navigation'

export default function ProtectPetsCTA() {
  const router = useRouter()

  return (
    <div className="mb-8 rounded-b-full rounded-t-none bg-blue-600 p-6 text-center text-white shadow-inner">
      <h2 className="mb-2 text-xl font-bold">Protect all your pets today!</h2>
      <p className="mb-4 text-sm">
        Ensure your pets are safe and easily found with Boop Tags.
      </p>
      <button
        onClick={() =>
          router.push('/shop/category/969435f8-ba8a-48fc-ace0-075fb1d374d2')
        }
        className="rounded-md bg-white px-4 py-2 font-medium text-blue-600 shadow hover:bg-gray-100"
      >
        Shop Boop Tags
      </button>
    </div>
  )
}
