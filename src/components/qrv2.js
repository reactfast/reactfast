'use client'

import { useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import QRCodeStyling from 'qr-code-styling'

const QRCodeCanvas = ({
  url,
  bgColor = '#ffffff',
  qrColor = '#000000',
  logoImage = '',
  dotType = 'classy', // Additional customization
  downloadLabel = 'Download QR Code',
  fileType = 'jpeg', // Options: 'jpeg', 'png', 'svg'
  size = 300, // Fixed size for canvas
}) => {
  const qrRef = useRef(null)
  const qrCode = useRef(null)

  useEffect(() => {
    if (!url) return

    const generatedUrl = `${url}/`

    qrCode.current = new QRCodeStyling({
      width: size,
      height: size,
      data: generatedUrl,
      image: logoImage || undefined,
      dotsOptions: {
        color: qrColor,
        type: dotType, // Dynamic dot type
      },
      backgroundOptions: {
        color: bgColor,
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 10,
      },
      qrOptions: {
        errorCorrectionLevel: 'H', // High error correction for dense data
      },
    })

    qrRef.current.innerHTML = '' // Clear any previous QR
    qrCode.current.append(qrRef.current)

    // Center the QR code within the canvas
    const canvas = qrRef.current.querySelector('canvas')
    if (canvas) {
      canvas.style.display = 'block'
      canvas.style.margin = 'auto'
      canvas.style.transform = 'translate(-50%, -50%)'
      canvas.style.position = 'relative'
      canvas.style.left = '50%'
      canvas.style.top = '50%'
    }
  }, [url, bgColor, qrColor, logoImage, dotType, size])

  const downloadQrCode = async () => {
    if (qrCode.current) {
      const blob = await qrCode.current.getRawData(fileType)
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `qr-code-${uuidv4()}.${fileType}`
      link.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="w-full">
      <div
        ref={qrRef}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
      {/* <button onClick={downloadQrCode}>{downloadLabel}</button> */}
    </div>
  )
}

export default QRCodeCanvas
