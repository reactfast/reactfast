import { CheckIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

export default function Hero_2({ obj, colors }) {
  const hoverTextColor = colors?.[0] || 'indigo-600'

  return (
    <>
      <div
        className="relative h-[800px] w-full bg-cover bg-center"
        style={{ backgroundImage: `https://placehold.co/600x400` }}
      >
        <div className="grid grid-cols-12">
          <div className="col-span-12 px-8 md:col-span-6 lg:col-span-6">
            <div className="mt-28 rounded-lg border border-white border-opacity-20 bg-slate-950 bg-opacity-20 p-8 backdrop-blur-xl lg:mt-96">
              <h1 className="text-5xl font-black text-white lg:text-[80px]">
                <span style={colors && { color: colors[0] }}>
                  {obj?.title ? obj.title : 'LEARN WITH Ednet'}
                </span>
              </h1>
              {obj?.subTitle ? (
                <p className="text-3xl text-white">{obj.subTitle}</p>
              ) : (
                <p className="text-3xl text-white">
                  100% ONLINE, ON DEMAND, AND ON YOUR TIME
                </p>
              )}
              <p className="text-white">
                {obj?.content
                  ? obj.content
                  : 'Global Network: Gain access to a network of 250+ employers looking to hire.'}
              </p>
              <div className="pt-8">
                <Link href="/micro-credentials">
                  <button
                    type="button"
                    className="mr-8 rounded-md border border-white px-3.5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Browse Micro Credentials
                  </button>
                </Link>
                <Link href="/degree-programs">
                  <button
                    type="button"
                    className="rounded-md border border-white px-3.5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-white hover:text-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Explore Degree Programs
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-span-6"> </div>
        </div>
      </div>
    </>
  )
}
