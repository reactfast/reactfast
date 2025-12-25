'use client'

import { useState } from 'react'

const featuresList = [
  {
    title: 'CREATE',
    desc: 'Stop handing out expensive paper cards and hoping for the best. Save a tree and really connect.',
    img: 'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/DigitalProductRenders/Create.png',
  },
  {
    title: 'CONNECT',
    desc: 'Make real connections instead of just handing out business cards that get lost.',
    img: 'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/DigitalProductRenders/Connect.png',
  },
  {
    title: 'COLLECT',
    desc: 'Countless ways to stay in contact with one card! Collect contacts for your network like a pro.',
    img: 'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/DigitalProductRenders/analytics.png',
  },
  // {
  //   title: 'REPORTING',
  //   desc: 'Track and export your data to an Excel spreadsheet for easy management and analysis.',
  //   img: 'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/DigitalProductRenders/analytics.png',
  // },
]

export default function Features() {
  const [selected, setSelected] = useState(featuresList[0])

  return (
    <div className="my-24 grid grid-cols-12 gap-6 px-6">
      {/* Feature Titles and Descriptions */}
      <div className="col-span-12 flex flex-col space-y-6 md:col-span-4">
        {featuresList.map((feature, index) => (
          <div
            key={index}
            onClick={() => setSelected(feature)}
            className={`cursor-pointer rounded-lg p-4 transition-all duration-300 ${
              selected.title === feature.title
                ? 'border-l-4 border-blue-600 bg-blue-100 font-bold text-blue-700'
                : 'text-gray-700'
            }`}
          >
            <h2 className="text-3xl tracking-wide">{feature.title}</h2>
            <p className="mt-2 text-lg font-light tracking-normal">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Image Display */}
      <div className="relative col-span-12 flex min-h-[300px] items-center justify-center rounded-lg bg-gray-100 p-4 shadow-md md:col-span-8">
        {selected && (
          <img
            src={selected.img}
            alt={selected.title}
            className="h-auto max-w-full object-contain"
          />
        )}
      </div>
    </div>
  )
}
