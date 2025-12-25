import React from 'react'
export const metadata = {
  title: 'About | Jot.Space',
  description:
    'Learn more about Jot.Space — the smart, modern way to create digital business cards and branded link pages.',
  keywords: [
    'Jot.Space',
    'digital business cards',
    'link in bio',
    'NFC cards',
    'QR codes',
    'about jot',
    'smart networking',
  ],
  robots: 'index, follow',
  openGraph: {
    title: 'About | Jot.Space',
    description:
      'Learn more about Jot.Space — the smart, modern way to create digital business cards and branded link pages.',
    url: 'https://www.jot.space/about', // Update per page
    siteName: 'Jot.Space',
    images: [
      {
        url: 'https://www.jot.space/og-image.png', // Replace with your actual OG image
        width: 1200,
        height: 630,
        alt: 'Jot.Space preview image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Jot.Space',
    description:
      'Learn more about Jot.Space — the smart, modern way to create digital business cards and branded link pages.',
    images: ['https://www.jot.space/og-image.png'], // Same as Open Graph
    creator: '@jotcards',
  },
  alternates: {
    canonical: 'https://www.jot.space/about', // Match the full URL of this page
  },
}

const FAQPage = () => {
  const faqs = [
    {
      question: 'What is a JOT?',
      answer:
        'A JOT is a device designed for effortless networking and connectivity using NFC technology.',
    },
    {
      question: 'What are the differences between the JOT.devices?',
      answer:
        'Each JOT.device is tailored for specific use cases but provides the same NFC functionality. Options include the JOT.card, JOT.classic, JOT.thin, JOT.band, and JOT.metal.',
    },
    {
      question: 'Where do I place my JOT.device?',
      answer:
        'You can place it on your phone, under your phone case, or on any compatible surface.',
    },
    {
      question: 'Do I need to download an app?',
      answer: "No, you don't need to download an app to use your JOT.device.",
    },
    {
      question: 'Are the JOT.devices waterproof?',
      answer: 'Yes, all JOT.devices are waterproof.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-3xl font-extrabold text-gray-900">
          Frequently Asked Questions
        </h1>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-gray-900">
                {faq.question}
              </h2>
              <p className="mt-2 text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FAQPage
