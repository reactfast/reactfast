import Image from 'next/image'

import backgroundImage from '@/images/background-auth.jpg'

export function SlimLayout({ children }) {
  return (
    <>
      <div className="relative flex min-h-[100vh] shrink-0 justify-center md:px-12 lg:px-0">
        <div className="relative z-10 flex flex-1 flex-col bg-white px-4 py-10 shadow-2xl sm:justify-center md:px-28">
          <main className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
            {children}
          </main>
        </div>
        <div className="hidden sm:contents lg:relative lg:block lg:flex-1">
          <Image
            className="absolute inset-0 h-full w-full object-cover"
            src={
              'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/jot-bgs/abstracts_svg_simple_background_gucci_ink_orange_bla_fa78c376-ba43-4b70-b8b3-fc689368998a.webp'
            }
            alt=""
            width={100}
            height={100}
            unoptimized
          />
        </div>
      </div>
    </>
  )
}
