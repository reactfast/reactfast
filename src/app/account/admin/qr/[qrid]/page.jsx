'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import QRCodeCanvas from './qrv2.js'
import QRCodeCanvasOld from './qr.js'

const STATUS_OPTIONS = [
  'not printed',
  'awaiting registration',
  'active',
  'disabled',
]

export default function QRCodePreview() {
  const params = useParams()
  const qrid = params?.qrid

  const [qrStatus, setQrStatus] = useState('')
  const [redirectUrl, setRedirectUrl] = useState('')
  const [activeTab, setActiveTab] = useState('v1')
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)

  // V2 styling / image preview options
  const [formData, setFormData] = useState({
    qrColor: '#ffffff',
    dotType: 'square',
    bgColor: '#000000',
    imageUrl: '',
  })

  useEffect(() => {
    if (!qrid) return

    async function fetchQR() {
      try {
        const { data, error } = await supabase
          .from('qr_codes')
          .select('id, status, redirect_url')
          .eq('id', qrid)
          .single()

        if (error) throw error
        if (data) {
          setQrStatus(data.status)
          setRedirectUrl(data.redirect_url)
        }
      } catch (err) {
        console.error('Error fetching QR record:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchQR()
  }, [qrid])

  const qrUrl = redirectUrl || `https://jot.space/redirect/${qrid}`

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(qrUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Clipboard error:', err)
    }
  }

  if (loading) return <p>Loading QR...</p>

  return (
    <div className="mx-auto my-8 grid max-w-6xl grid-cols-1 gap-8 rounded-xl bg-white p-6 shadow-md md:grid-cols-2">
      {/* Left panel: info + V2 controls */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">QR Info</h2>

        <div>
          <p className="text-sm text-gray-600">UUID</p>
          <p className="font-mono text-lg text-gray-900">{qrid}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Status</p>
          <select
            value={qrStatus}
            onChange={(e) => setQrStatus(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="text-sm text-gray-600">Redirect URL</p>
          <div className="mt-1 flex items-center gap-2">
            <input
              readOnly
              value={qrUrl}
              className="flex-1 rounded-md border-gray-300 bg-gray-100 px-3 py-2 font-mono text-sm text-gray-900"
            />
            <button
              onClick={handleCopyUrl}
              className="rounded bg-indigo-600 px-3 py-2 text-sm text-white hover:bg-indigo-500"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {activeTab === 'v2' && (
          <div className="mt-4 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Dot Color
              </label>
              <input
                type="text"
                value={formData.qrColor}
                onChange={(e) =>
                  setFormData({ ...formData, qrColor: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 bg-white px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">
                Dot Type
              </label>
              <select
                value={formData.dotType}
                onChange={(e) =>
                  setFormData({ ...formData, dotType: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 bg-white px-3 py-2 text-sm"
              >
                <option value="dots">dots</option>
                <option value="rounded">rounded</option>
                <option value="classy">classy</option>
                <option value="classy-rounded">classy-rounded</option>
                <option value="square">square</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">
                Background Color
              </label>
              <input
                type="text"
                value={formData.bgColor}
                onChange={(e) =>
                  setFormData({ ...formData, bgColor: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 bg-white px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">
                Image URL
              </label>
              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 bg-white px-3 py-2 text-sm"
              />
            </div>
          </div>
        )}
      </div>

      {/* Right panel: QR preview */}
      <div className="space-y-4">
        <div className="flex gap-2 border-b pb-2">
          <button
            onClick={() => setActiveTab('v1')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'v1'
                ? 'border-b-2 border-indigo-600'
                : 'text-gray-500'
            }`}
          >
            QR v1
          </button>
          <button
            onClick={() => setActiveTab('v2')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'v2'
                ? 'border-b-2 border-indigo-600'
                : 'text-gray-500'
            }`}
          >
            QR v2
          </button>
        </div>

        <div className="flex items-center justify-center rounded-md border p-6">
          {activeTab === 'v1' ? (
            <QRCodeCanvasOld uuidfor={qrid} url={qrUrl} />
          ) : (
            <QRCodeCanvas url={qrUrl} {...formData} />
          )}
        </div>
      </div>
    </div>
  )
}
