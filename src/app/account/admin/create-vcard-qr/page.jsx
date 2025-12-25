'use client'

import { useState } from 'react'
import QRCode from 'qrcode'

const VCardQRCode = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [website, setWebsite] = useState('')
  const [vCardUrl, setVCardUrl] = useState('')
  const [qrDataUrl, setQrDataUrl] = useState('')

  // Generate vCard file content
  const generateVCard = () => {
    if (!name || !phone || !email) {
      alert('Name, Phone, and Email are required')
      return
    }

    const vCardData = `
BEGIN:VCARD
VERSION:3.0
FN:${name}
ORG:${company}
TEL:${phone}
EMAIL:${email}
URL:${website}
END:VCARD
    `.trim()

    // Create a downloadable vCard file
    const blob = new Blob([vCardData], { type: 'text/vcard' })
    const vCardFileUrl = URL.createObjectURL(blob)
    setVCardUrl(vCardFileUrl)

    // Generate QR Code pointing to the vCard file
    QRCode.toDataURL(vCardData, { errorCorrectionLevel: 'H' })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('QR Code generation error:', err))
  }

  return (
    <div className="mx-auto max-w-md rounded-lg border p-4 shadow-lg">
      <h2 className="mb-4 text-xl font-semibold">Generate vCard QR Code</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Full Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border px-3 py-2"
          placeholder="Enter full name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Phone:</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded border px-3 py-2"
          placeholder="Enter phone number"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border px-3 py-2"
          placeholder="Enter email address"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Company (Optional):</label>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full rounded border px-3 py-2"
          placeholder="Enter company name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Website (Optional):</label>
        <input
          type="url"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="w-full rounded border px-3 py-2"
          placeholder="Enter website URL"
        />
      </div>

      <button
        onClick={generateVCard}
        className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
      >
        Generate vCard & QR Code
      </button>

      {vCardUrl && (
        <div className="mt-4 text-center">
          <h3 className="text-lg font-medium">Download Contact</h3>
          <a
            href={vCardUrl}
            download="contact.vcf"
            className="mt-2 inline-block rounded bg-green-600 px-4 py-2 text-white hover:bg-green-500"
          >
            Download vCard (.vcf)
          </a>
        </div>
      )}

      {qrDataUrl && (
        <div className="mt-4 text-center">
          <h3 className="text-lg font-medium">Scan to Save Contact</h3>
          <img
            src={qrDataUrl}
            alt="vCard QR Code"
            className="mx-auto mt-2 h-40 w-40"
          />
        </div>
      )}
    </div>
  )
}

export default VCardQRCode
