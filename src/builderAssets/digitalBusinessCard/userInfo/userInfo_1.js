import {
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from '@heroicons/react/24/solid'

export default function objInfo_1({ obj, colors, id }) {
  return (
    <>
      <div id={id} className="my-2 px-2">
        <div className="items-center">
          <h1 className="text-xl font-semibold">{obj?.name}</h1>
          <h1 className="text-md">{obj?.title}</h1>
        </div>
        <div className="mt-2 items-center text-xs">
          {obj.email && (
            <div className="mb-3 flex items-center space-x-2 text-sm">
              <EnvelopeIcon className="h-5 w-5" />
              <a href={`mailto:${obj.email}`} className="hover:underline">
                {obj.email}
              </a>
            </div>
          )}

          {/* Phone */}
          {obj.phoneNumber && (
            <div className="mb-3 flex items-center space-x-2 text-sm">
              <PhoneIcon className="h-5 w-5" />
              <a href={`tel:${obj.phoneNumber}`} className="hover:underline">
                {obj.phoneNumber}
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
    </>
  )
}
