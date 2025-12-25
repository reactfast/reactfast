'use client'

import { useState } from 'react'
import { Tooltip } from '@headlessui/react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

const features = [
  {
    title: 'vCard',
    description:
      'Share your contact details instantly with a scannable digital business card.',
  },
  {
    title: 'Gallery',
    description:
      'Showcase your photos or portfolio with a QR code that links to your gallery.',
  },
  {
    title: 'Pay Me Link',
    description:
      'Easily receive payments via QR codes linking to your preferred payment methods.',
  },
  {
    title: 'Restaurant Menus',
    description:
      'Provide digital menus that customers can view by scanning a QR code.',
  },
  {
    title: 'Link in Bio',
    description:
      'Aggregate all your social media and important links into one QR-accessible page.',
  },
  {
    title: 'Collect & Coupon',
    description:
      'Use QR codes to collect customer data and distribute coupons.',
  },
  {
    title: 'Event Info',
    description:
      'Provide event details, schedules, and tickets through a single QR code.',
  },
  {
    title: 'Feedback & Reviews',
    description: 'Direct customers to a feedback or review page with a scan.',
  },
  {
    title: 'WiFi',
    description: 'Allow guests to connect to WiFi by scanning a QR code.',
  },
  {
    title: 'Email, SMS, WhatsApp',
    description: 'Start a conversation or send a message with a single scan.',
  },
  {
    title: 'Digital Business Card Landing Pages',
    description:
      'Share your professional information with a sleek landing page.',
  },
  {
    title: 'Menu + Order Online',
    description:
      'Display a menu and allow customers to place orders directly from their phones.',
  },
  {
    title: 'Click Funnel',
    description:
      'Guide users through a series of steps for lead generation or product discovery.',
  },
  {
    title: 'Vendor Products & Ecommerce',
    description: 'List and sell products with an e-commerce-friendly QR code.',
  },
]

export default function QRCodeFeatureList() {
  const [hoveredFeature, setHoveredFeature] = useState(null)

  return (
    <div className="rounded-lg bg-gray-50 p-4 shadow-md">
      <h2 className="mb-4 text-2xl font-semibold">QR Code Features</h2>
      <div className="grid grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="relative cursor-pointer rounded-lg bg-white p-2 shadow hover:bg-gray-100"
            onMouseEnter={() => setHoveredFeature(index)}
            onMouseLeave={() => setHoveredFeature(null)}
          >
            <div className="flex items-center gap-2">
              <InformationCircleIcon className="h-5 w-5 text-blue-500" />
              <span>{feature.title}</span>
            </div>
            {hoveredFeature === index && (
              <div className="absolute left-0 top-12 z-10 w-64 rounded-lg border bg-white p-4 shadow-lg">
                <p className="text-gray-800">{feature.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
