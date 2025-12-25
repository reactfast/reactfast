'use client'

import Modal from '@/components/modal'

export default function ContactModal({ open, setOpen, contactInfo }) {
  const subject = encodeURIComponent('Regarding Your Lost Pet')
  const body = encodeURIComponent(
    'Hi, I saw your listing and wanted to reach out about your lost pet.',
  )
  const textMessage = encodeURIComponent(
    'Hi, I saw your lost pet listing and wanted to contact you.',
  )

  return (
    <Modal
      open={open}
      setOpen={() => setOpen(false)}
      title="Contact Info"
      size="4xl"
    >
      <div className="space-y-6">
        {contactInfo ? (
          <>
            <p className="text-xl">
              Name: {contactInfo.name || 'Prefer not to say'}
            </p>

            <div className="flex flex-col gap-3">
              {/* Call Button */}
              {contactInfo.phone && (
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="w-full rounded bg-blue-500 px-4 py-3 text-center text-white hover:bg-blue-600"
                >
                  Call
                </a>
              )}

              {/* Email Button */}
              {contactInfo.email && (
                <a
                  href={`mailto:${contactInfo.email}?subject=${subject}&body=${body}`}
                  className="w-full rounded bg-blue-500 px-4 py-3 text-center text-white hover:bg-blue-600"
                >
                  Email
                </a>
              )}

              {/* Text Owner Button */}
              {contactInfo.phone && (
                <a
                  href={`sms:${contactInfo.phone}?&body=${textMessage}`}
                  className="w-full rounded bg-blue-500 px-4 py-3 text-center text-white hover:bg-blue-600"
                >
                  Text Owner
                </a>
              )}
            </div>
          </>
        ) : (
          <p>This is where the user's contact info will appear.</p>
        )}

        <div className="flex justify-end pt-6">
          <button
            className="rounded bg-gray-400 px-4 py-2 text-white hover:bg-gray-500"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  )
}
