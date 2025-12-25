'use client'
import React from 'react'

const devices = [
  {
    id: 1,
    kind: 'business_card',
    name: '',
    href: 'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/icons/DeviceCard.png',
  },
  {
    id: 2,
    kind: 'bracelet',
    name: '',
    href: 'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/icons/DeviceBracelet.png',
  },
  {
    id: 3,
    kind: 'pet_collar',
    name: '',
    href: 'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/icons/DeviceDogCollar.png',
  },
  {
    id: 4,
    kind: 'dog_tag',
    name: '',
    href: 'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/icons/DeviceDogTag.png',
  },
]

const iconMap = {
  business_card:
    'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/icons/DeviceCard.png',
  bracelet:
    'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/icons/DeviceBracelet.png',
  pet_collar:
    'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/icons/DeviceDogCollar.png',
  dog_tag:
    'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/icons/DeviceDogTag.png',
}

const DeviceIcon = ({ kind }) => {
  const src = iconMap[kind] || iconMap['business_card'] // fallback image
  return (
    <img
      src={src}
      alt={kind || 'Device'}
      className="h-20 w-20 object-contain"
    />
  )
}

const DeviceCard = ({ device }) => {
  const { id, status, redirectUrl, name, kind, img_ref } = device

  return (
    <div className="w-full max-w-md items-center gap-4 rounded-xl border bg-white p-4 shadow-md">
      <div className="flex w-full items-center gap-4">
        <div>
          <DeviceIcon kind={kind} />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold">
            {name || kind.replace('_', ' ') || 'Device'}
          </h2>

          <p className="text-sm">{id}</p>
          <p
            className={`text-sm font-semibold ${status === 'active' ? 'text-green-600' : 'text-red-600'}`}
          >
            Status: {status}
          </p>
          <a
            href={redirectUrl}
            className="break-words text-sm text-blue-500 underline"
          >
            {redirectUrl}
          </a>
        </div>
      </div>
    </div>
  )
}

export default DeviceCard
