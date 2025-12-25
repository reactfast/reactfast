'use client'

import { useState } from 'react'
import QRCode from 'qrcode'
import html2canvas from 'html2canvas'

const WiFiQRCode = () => {
  const [ssid, setSsid] = useState('')
  const [password, setPassword] = useState('')
  const [encryption, setEncryption] = useState('WPA') // WPA/WPA2 recommended
  const [qrDataUrl, setQrDataUrl] = useState('')

  const generateWiFiQRCode = async () => {
    if (!ssid) {
      alert('Please enter a WiFi name (SSID)')
      return
    }

    const wifiString = `WIFI:T:${encryption};S:${ssid};P:${password};;`

    try {
      const url = await QRCode.toDataURL(wifiString, {
        errorCorrectionLevel: 'H',
      })
      setQrDataUrl(url)
    } catch (error) {
      console.error('Error generating QR code:', error)
    }
  }

  const downloadQRCode = () => {
    if (!qrDataUrl) return
    const link = document.createElement('a')
    link.href = qrDataUrl
    link.download = `wifi-qr-${ssid}.png`
    link.click()
  }

  return (
    <div className="mx-auto max-w-md rounded-lg border p-4 shadow-lg">
      <h2 className="mb-4 text-xl font-semibold">Generate WiFi QR Code</h2>
      <div className="mb-4">
        <label className="block text-gray-700">WiFi Name (SSID):</label>
        <input
          type="text"
          value={ssid}
          onChange={(e) => setSsid(e.target.value)}
          className="w-full rounded border px-3 py-2"
          placeholder="Enter WiFi name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border px-3 py-2"
          placeholder="Enter WiFi password"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Encryption Type:</label>
        <select
          value={encryption}
          onChange={(e) => setEncryption(e.target.value)}
          className="w-full rounded border px-3 py-2"
        >
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">Open Network</option>
        </select>
      </div>
      <button
        onClick={generateWiFiQRCode}
        className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
      >
        Generate QR Code
      </button>

      {qrDataUrl && (
        <div className="mt-4 text-center">
          <h3 className="text-lg font-medium">Scan to Connect</h3>
          <img
            src={qrDataUrl}
            alt="WiFi QR Code"
            className="mx-auto mt-2 h-40 w-40"
          />
          <button
            onClick={downloadQRCode}
            className="mt-2 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-500"
          >
            Download QR Code
          </button>
        </div>
      )}
    </div>
  )
}

export default WiFiQRCode
