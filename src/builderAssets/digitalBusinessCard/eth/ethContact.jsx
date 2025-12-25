import {
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from '@heroicons/react/24/solid'

export default function EthContact({ obj, colors, id }) {
  // Calculate opacity as a decimal (between 0 and 1)
  const opacity = (obj.opacity || 100) / 100
  // Calculate blur value
  const blur = obj.bgBlur ? `blur(${obj.bgBlur}px)` : 'none'

  return (
    <div id={id} className="px-2">
      <div className="mx-auto mt-2 text-center">
        <div
          style={{
            backgroundColor: `rgba(${parseInt(colors[5]?.slice(1, 3), 16)}, ${parseInt(colors[5]?.slice(3, 5), 16)}, ${parseInt(colors[5]?.slice(5, 7), 16)}, ${opacity})`,
            backdropFilter: blur,
          }}
          className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-zinc-800 shadow-lg"
        >
          <div className="p-6">
            <h3 className="mb-4 text-lg font-semibold">
              {obj.title || 'Contact'}
            </h3>

            {/* Email */}
            {obj.email && (
              <div className="mb-3 flex items-center space-x-2 text-sm">
                <EnvelopeIcon className="h-5 w-5" />
                <a href={`mailto:${obj.email}`} className="hover:underline">
                  {obj.email}
                </a>
              </div>
            )}

            {/* Phone */}
            {obj.phone && (
              <div className="mb-3 flex items-center space-x-2 text-sm">
                <PhoneIcon className="h-5 w-5" />
                <a href={`tel:${obj.phone}`} className="hover:underline">
                  {obj.phone}
                </a>
              </div>
            )}

            {/* Location */}
            {obj.location && (
              <div className="flex items-center space-x-2 text-sm">
                <MapPinIcon className="mr-1 h-5 w-5" />
                {' ' + obj.location}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
