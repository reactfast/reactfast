'use client'

import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import html2canvas from 'html2canvas'
import QRCode from 'qrcode' // Import the QRCode library

const QRCodeCanvas = ({ url, bgColor = '#ffffff', qrColor = '#000000' }) => {
  const [qrUrl, setQrUrl] = useState('')

  useEffect(() => {
    if (!url) return

    const generatedUrl = `${url}/`
    setQrUrl(generatedUrl)

    if (typeof window !== 'undefined' && QRCode) {
      const canvas = document.getElementById('canvas')

      if (canvas) {
        const scale = 7 // Scaling factor
        const size = 500 * scale // Adjust size by scaling factor
        canvas.width = size
        canvas.height = size

        // Clear the canvas before generating the new QR code
        canvas.getContext('2d').clearRect(0, 0, size, size)

        QRCode.toCanvas(
          canvas,
          generatedUrl,
          {
            scale,
            color: {
              dark: qrColor, // QR code color
              light: bgColor, // Background color
            },
          },
          (error) => {
            if (error) {
              console.error(error)
            } else {
              console.log('QR code successfully generated!')
            }
          },
        )
      }
    }
  }, [url, bgColor, qrColor])

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
      <canvas className="w-full" id="canvas"></canvas>
      {/* <button onClick={downloadQrCode}>Download QR Code as JPG</button> */}
    </div>
  )
}

export default QRCodeCanvas
