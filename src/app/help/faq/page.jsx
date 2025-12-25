import React from 'react'

const FAQPage = () => {
  const faqs = [
    {
      question: 'What is a dot?',
      answer:
        'A dot is a device designed for effortless networking and connectivity using NFC technology.',
    },
    {
      question: 'What are the differences between the dot.devices?',
      answer:
        'Each dot.device is tailored for specific use cases but provides the same NFC functionality. Options include the dot.card, dot.classic, dot.thin, dot.band, and dot.metal.',
    },
    {
      question: 'Where do I place my dot.device?',
      answer:
        'You can place it on your phone, under your phone case, or on any compatible surface.',
    },
    {
      question: 'Do I need to download an app?',
      answer: "No, you don't need to download an app to use your dot.device.",
    },
    {
      question: 'Are the dot.devices waterproof?',
      answer: 'Yes, all dot.devices are waterproof.',
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
