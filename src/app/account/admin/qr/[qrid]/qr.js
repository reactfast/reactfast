'use client'

import { useEffect, useState } from 'react'
import html2canvas from 'html2canvas'
import QRCode from 'qrcode' // Import the QRCode library

const QRCodeCanvasOld = ({ url, uuidfor }) => {
  const [uuid, setUuid] = useState(null)
  const [qrUrl, setQrUrl] = useState('')

  useEffect(() => {
    // Generate UUID and append it to the URL
    setUuid(uuidfor)

    const generatedUrl = `${url}`
    setQrUrl(generatedUrl)

    // Ensure QR code is generated only after the component mounts
    if (typeof window !== 'undefined' && QRCode) {
      const canvas = document.getElementById('canvas')
      // Clear the canvas before generating the new QR code
      canvas?.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height)

      QRCode.toCanvas(canvas, generatedUrl, function (error) {
        if (error) {
          console.error(error)
        } else {
          console.log('QR code successfully generated!')
        }
      })
    }
  }, [url, uuidfor])

  const downloadQrCode = () => {
    const canvas = document.getElementById('canvas')
    if (canvas) {
      html2canvas(canvas).then((canvas) => {
        const img = canvas.toDataURL('image/jpeg')
        const link = document.createElement('a')
        link.href = img
        link.download = `qr-code-${uuid}.jpg`
        link.click()
      })
    } else {
      console.error('Canvas not found for download.')
    }
  }

  return (
    <div>
      <p>Generated UUID: {uuid}</p>
      <p>QR Code URL: {qrUrl}</p>
      <canvas id="canvas"></canvas>
      <button onClick={downloadQrCode}>Download QR Code as JPG</button>
    </div>
  )
}

export default QRCodeCanvasOld
