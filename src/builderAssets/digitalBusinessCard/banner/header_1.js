import Image from 'next/image'

export default function Header_1({ obj, colors, id }) {
  return (
    <>
      <div id={id} className="z-0 h-40 w-full px-2">
        <div className="relative flex h-full w-full">
          <div className="m-auto">
            <div className="mr-2 h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-lg">
              {obj?.profilePhoto ? (
                <div className="flex h-full w-full items-center justify-center bg-gray-300">
                  <Image
                    src={obj?.profilePhoto}
                    alt="Profile Photo"
                    width={128}
                    height={128}
                  />
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-300">
                  <span className="text-gray-700">No Image</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const def = [
  {
    name: 'profilePhoto',
    type: 'string',
    title: 'Profile Photo', // the title of the input field
    description: 'requires full URL path including https://', // description will be visible on the dynamic form field
  },

  {
    name: 'backgroundImage',
    type: 'string',
    title: 'Background Image', // the title of the input field
    description: 'requires full URL path including https://', // description will be visible on the dynamic form field
  },
  {
    name: 'backgroundPositionX',
    type: 'number',
    title: 'Background Position X', // the title of the input field
    description: 'Enter a number for X position', // description will be visible on the dynamic form field
  },
  {
    name: 'backgroundPositionY',
    type: 'number',
    title: 'Background Position Y', // the title of the input field
    description: 'Enter a number for Y position', // description will be visible on the dynamic form field
  },
]
