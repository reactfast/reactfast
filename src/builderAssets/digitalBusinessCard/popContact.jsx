import {
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from '@heroicons/react/24/solid'

export default function PopContact({ obj, colors, id }) {
  return (
    <div id={id} className="w-full px-2">
      <div className="mx-auto mb-4 mt-2 text-center">
        <div
          className="mx-auto w-full max-w-2xl rounded-xl p-[2px]"
          style={{
            boxShadow: `10px 10px 0 ${obj.shadowColor || 'black'}`,
          }}
        >
          <div
            className="w-full rounded-xl px-4 py-4 text-xl font-bold transition-colors"
            style={{
              backgroundColor: obj.cardColor,
              color: obj.fontColor,
            }}
          >
            <h3 className="mb-4 text-lg font-semibold">
              {obj?.title || 'Contact'}
            </h3>

            {/* Email */}
            {obj?.email && (
              <div className="mb-3 flex items-center space-x-2 text-sm">
                <EnvelopeIcon className="h-5 w-5" />
                <a href={`mailto:${obj?.email}`} className="hover:underline">
                  {obj?.email}
                </a>
              </div>
            )}

            {/* Phone */}
            {obj?.phone && (
              <div className="mb-3 flex items-center space-x-2 text-sm">
                <PhoneIcon className="h-5 w-5" />
                <a href={`tel:${obj?.phone}`} className="hover:underline">
                  {obj?.phone}
                </a>
              </div>
            )}

            {/* Location */}
            {obj?.location && (
              <div className="flex items-center space-x-2 text-sm">
                <MapPinIcon className="mr-1 h-5 w-5" />
                {' ' + obj?.location}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
