export default function Loading() {
  return (
    <>
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-yellow-500">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-center">
            <h2 className="mb-2 text-4xl font-bold text-gray-800">
              Powered by
            </h2>
            <h1 className="mb-4 text-6xl font-extrabold tracking-wide text-black">
              Jot.Space
            </h1>
            <p className="text-lg text-gray-600">
              Transforming ideas into beautiful spaces.
            </p>
          </div>
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-t-4 border-solid border-blue-600">
            {' '}
            o
          </div>
          <div className="mt-16 flex w-full items-center justify-center py-8">
            <p className="text-xl font-semibold text-white">Loading...</p>
          </div>
        </div>
      </div>
    </>
  )
}
