import Image from 'next/image'

export default function PopHero({ obj, colors, id }) {
  return (
    <>
      <div id={id} className="my-2 w-full px-2 py-2">
        <div className="mb-4 flex h-full w-full">
          <div className="m-auto">
            <div
              className="mr-2 h-32 w-32 overflow-hidden rounded-full border-2 border-white shadow-lg"
              style={{
                boxShadow: `10px 10px 0 ${obj.shadowColor || 'black'}`,
              }}
            >
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
        <h1
          style={{
            textShadow: `2px 2px 8px black`,
          }}
          className="text-center text-3xl font-thin"
        >
          {obj?.username}
        </h1>
      </div>
    </>
  )
}
