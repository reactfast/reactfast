'use client'

import Modal from '@/components/modal' // Update this path based on where your Modal component is
import QRCodeCanvas from '@/components/qrv2.js'
import { GlobeAmericasIcon } from '@heroicons/react/24/solid'

export default function QRModal({ showQR, setShowQR, page, currentURL }) {
  return (
    <Modal open={showQR} setOpen={setShowQR} title={'@' + page.name} size="lg">
      <div className="flex flex-col items-center justify-center">
        <div
          style={{ backgroundColor: page.foreground_color }}
          className="mx-8 mb-8 flex items-center justify-center rounded-lg p-8 shadow-lg"
        >
          <QRCodeCanvas
            bgColor={page.foreground_color}
            qrColor={page.qr_dot_color}
            logoImage={page.qr_img_url}
            dotType={page.qr_dot_type}
            url={currentURL}
          />
        </div>

        {/* Optional: Add Enable GeoLocation button if needed */}
        {/* {!location && (
          <button
            type="button"
            onClick={() => getGeo()}
            className="mt-8 inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Enable GeoLocation
            <GlobeAmericasIcon
              aria-hidden="true"
              className="-mr-0.5 size-5"
            />
          </button>
        )} */}
      </div>
    </Modal>
  )
}
