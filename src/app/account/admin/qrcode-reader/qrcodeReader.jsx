'use client'

import { useEffect, useRef } from 'react'
import { Html5Qrcode } from 'html5-qrcode'

const QrScanner = ({ onScan }) => {
  const qrRegionId = 'qr-scanner-region'
  const scannerRef = useRef(null)

  useEffect(() => {
    const html5QrCode = new Html5Qrcode(qrRegionId)
    scannerRef.current = html5QrCode

    Html5Qrcode.getCameras().then((devices) => {
      if (devices && devices.length) {
        // Try to find a rear camera
        const backCamera = devices.find((device) =>
          /back|rear/i.test(device.label),
        )
        const cameraId = backCamera?.id || devices[0].id

        html5QrCode.start(
          cameraId,
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            onScan(decodedText)
            html5QrCode.stop().then(() => html5QrCode.clear())
          },
          (errorMessage) => {
            // Scan errors can be ignored or logged
          },
        )
      }
    })

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().then(() => {
          scannerRef.current.clear()
        })
      }
    }
  }, [onScan])

  return <div id={qrRegionId} style={{ width: 300, height: 300 }} />
}

export default QrScanner
