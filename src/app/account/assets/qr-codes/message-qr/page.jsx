'use client'

import { useState } from 'react'
import QRCode from 'qrcode'

const MessageQRCode = () => {
  const [mode, setMode] = useState('email') // 'email', 'sms', or 'whatsapp'
  const [recipient, setRecipient] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [qrDataUrl, setQrDataUrl] = useState('')

  const generateQRCode = async () => {
    if (!recipient) {
      alert('Please enter a recipient email, phone number, or WhatsApp number')
      return
    }

    let qrData = ''

    if (mode === 'email') {
      qrData = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
    } else if (mode === 'sms') {
      qrData = `sms:${recipient}?&body=${encodeURIComponent(message)}`
    } else if (mode === 'whatsapp') {
      qrData = `https://wa.me/${recipient}?text=${encodeURIComponent(message)}`
    }

    try {
      const url = await QRCode.toDataURL(qrData, { errorCorrectionLevel: 'H' })
      setQrDataUrl(url)
    } catch (error) {
      console.error('QR Code generation error:', error)
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-lg border p-4 shadow-lg">
      <h2 className="mb-4 text-xl font-semibold">Generate Message QR Code</h2>

      <div className="mb-4 flex space-x-2">
        {['email', 'sms', 'whatsapp'].map((option) => (
          <button
            key={option}
            className={`rounded px-4 py-2 ${mode === option ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setMode(option)}
          >
            {option.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">
          {mode === 'email' ? 'Recipient Email' : 'Phone Number'}:
        </label>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full rounded border px-3 py-2"
          placeholder={`Enter ${mode === 'email' ? 'email' : 'phone number'}`}
        />
      </div>

      {mode === 'email' && (
        <div className="mb-4">
          <label className="block text-gray-700">Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded border px-3 py-2"
            placeholder="Enter subject (optional)"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700">Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded border px-3 py-2"
          placeholder="Enter message"
        />
      </div>

      <button
        onClick={generateQRCode}
        className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
      >
        Generate QR Code
      </button>

      {qrDataUrl && (
        <div className="mt-4 text-center">
          <h3 className="text-lg font-medium">
            Scan to Send {mode.toUpperCase()}
          </h3>
          <img
            src={qrDataUrl}
            alt="Message QR Code"
            className="mx-auto mt-2 h-40 w-40"
          />
        </div>
      )}
    </div>
  )
}

export default MessageQRCode
