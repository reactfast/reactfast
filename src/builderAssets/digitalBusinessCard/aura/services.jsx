export default function Services({ obj, colors }) {
  return (
    <>
      <div>
        <div className="mb-12 flex flex-col items-center justify-center px-4">
          <div className="mt-8 w-full max-w-md rounded-xl bg-white/30 p-6 shadow-lg backdrop-blur-sm lg:max-w-4xl">
            <h2 className="text-center text-2xl font-thin">
              {obj.title || 'Services'}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-300">
              {obj.tagLine}
            </p>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {obj.service1 && (
                <div className="rounded-lg border border-white/20 p-4">
                  <h3 className="text-lg font-bold text-blue-300">
                    {obj.service1}
                  </h3>
                  <p className="mt-1 text-sm text-gray-300">
                    {obj.service1Desc}
                  </p>
                </div>
              )}

              {obj.service2 && (
                <div className="rounded-lg border border-white/20 p-4">
                  <h3 className="text-lg font-bold text-blue-300">
                    {obj.service2}
                  </h3>
                  <p className="mt-1 text-sm text-gray-300">
                    {obj.service2Desc}
                  </p>
                </div>
              )}

              {obj.service3 && (
                <div className="rounded-lg border border-white/20 p-4">
                  <h3 className="text-lg font-bold text-blue-300">
                    {obj.service3}
                  </h3>
                  <p className="mt-1 text-sm text-gray-300">
                    {obj.service3Desc}
                  </p>
                </div>
              )}

              {obj.service4 && (
                <div className="rounded-lg border border-white/20 p-4">
                  <h3 className="text-lg font-bold text-blue-300">
                    {obj.service3}
                  </h3>
                  <p className="mt-1 text-sm text-gray-300">
                    {obj.service3Desc}
                  </p>
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
    name: 'title',
    type: 'string',
    title: 'Title',
  },
  {
    name: 'tagLine',
    type: 'string',
    title: 'Tag Line',
  },
  {
    name: 'service1',
    type: 'string',
    title: 'Service 1',
  },
  {
    name: 'service1Desc',
    type: 'string',
    title: 'Service 1 Description',
  },
  {
    name: 'service2',
    type: 'string',
    title: 'Service 2',
  },
  {
    name: 'service2Desc',
    type: 'string',
    title: 'Service 2 Description',
  },
  {
    name: 'service3',
    type: 'string',
    title: 'Service 3',
  },
  {
    name: 'service3Desc',
    type: 'string',
    title: 'Service 3 Description',
  },
  {
    name: 'service4',
    type: 'string',
    title: 'Service 4',
  },
  {
    name: 'service4Desc',
    type: 'string',
    title: 'Service 4 Description',
  },
]
