'use client'
import { useState } from 'react'
import Image from 'next/image'
import { UserCircleIcon } from '@heroicons/react/24/solid'

export default function Header_1({ obj, colors = [], id }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div id={id} className="w-full px-2">
        <div className="relative h-36 w-full overflow-hidden sm:h-40">
          {/* Banner image */}
          {obj?.backgroundImage ? (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${obj.backgroundImage})`,
                backgroundPosition: `${obj.backgroundPositionX}px ${obj.backgroundPositionY}px`,
              }}
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(to right, ${colors[0] || '#4f46e5'}, ${colors[1] || '#6366f1'}, ${colors[2] || '#a78bfa'})`,
              }}
            />
          )}
        </div>

        {/* Profile & Info Section */}
        <div className="relative z-10 -mt-16 flex items-end gap-4 px-4">
          {/* Profile Image */}
          <div
            className="aspect-square h-32 w-32 cursor-pointer overflow-hidden rounded-full border-4 border-white bg-zinc-800 shadow-md"
            onClick={() => obj?.profilePhoto && setIsModalOpen(true)}
          >
            {obj?.profilePhoto ? (
              <Image
                src={obj.profilePhoto}
                alt="Profile"
                width={128}
                height={128}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <UserCircleIcon className="h-10 w-10 text-zinc-400" />
              </div>
            )}
          </div>

          {/* Info Block */}
          <div className="flex flex-col justify-end pb-2">
            <h2 className="text-xl font-bold text-zinc-900">
              {obj?.username || 'Your Name'}
            </h2>
            {(obj?.jobTitle || obj?.industry) && (
              <p className="text-sm text-zinc-600">
                {obj?.jobTitle} {obj?.jobTitle && obj?.industry && '—'}{' '}
                {obj?.industry}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Profile Image */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative max-h-full max-w-full">
            <Image
              src={obj.profilePhoto}
              alt="Enlarged Profile"
              width={512}
              height={512}
              className="rounded-lg shadow-2xl"
            />
            <button
              className="absolute right-2 top-2 text-2xl text-white"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  )
}
