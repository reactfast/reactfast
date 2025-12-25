import Image from 'next/image'

export default function Header_1({ obj, colors }) {
  return (
    <>
      <div className="z-0 h-40 w-full bg-red-300">
        <div className="relative h-full w-full">
          {obj?.backgroundImage ? (
            <div
              className="h-full w-full bg-center"
              style={{
                backgroundImage: `url(${obj?.backgroundImage})`,
                backgroundPosition: `${obj?.backgroundPositionX}px ${obj?.backgroundPositionY}px`,
                backgroundSize: 'cover',
              }}
            ></div>
          ) : (
            <div
              className="h-full w-full bg-gray-300"
              style={{
                backgroundColor: obj?.color,
              }}
            >
              {' '}
            </div>
          )}{' '}
          <div className="absolute inset-x-0 top-20 flex justify-end">
            <div className="mr-2 h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg">
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
    name: 'backgroundImage',
    type: 'string',
    title: 'Background Image', // the title of the input field
    description: 'requires full URL path including https://', // description will be visible on the dynamic form field
  },
  {
    name: 'profilePhoto',
    type: 'string',
    title: 'Profile Photo', // the title of the input field
    description: 'requires full URL path including https://', // description will be visible on the dynamic form field
  },
  {
    name: 'backgroundPositionX',
    type: 'number',
    title: 'Background Position X', // the title of the input field
    description: 'Enter a number for background position X', // description will be visible on the dynamic form field
  },
  {
    name: 'backgroundPositionY',
    type: 'number',
    title: 'Background Position Y', // the title of the input field
    description: 'Enter a number for background position Y', // description will be visible on the dynamic form field
  },
  {
    name: 'color',
    type: 'string',
    title: 'Color', // the title of the input field
    description:
      'Enter a color in hex format (e.g. #ff0000 for red) or a color name (e.g. red)', // description will be visible on the dynamic form field
  },
]
