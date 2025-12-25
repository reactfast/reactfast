import BusinessCard from '@/components/businessCardMoc'
import IPhoneHome from '@/components/iphoneHome'

export default function SpinningCard() {
  return (
    <div className="-mt-10 grid bg-neutral-100 p-[1px]">
      {/* <div className="container mx-auto grid place-content-center pb-20 before:container before:absolute before:mx-auto before:h-72 before:rotate-180 before:rounded-xl before:border-2 before:border-primary before:bg-neutral-100 before:bg-cover before:bg-bottom md:grid-cols-2 before:md:mt-40"> */}
      <div className="container mx-auto grid place-content-center pb-20 before:container before:absolute before:mx-auto before:h-72 before:rotate-180 before:rounded-lg before:bg-[url('https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/jot-bgs/abstracts_svg_simple_background_gucci_ink_orange_bla_fa78c376-ba43-4b70-b8b3-fc689368998a.webp')] before:bg-cover before:bg-bottom md:grid-cols-2 before:md:mt-40">
        <div className="z-40 flex w-full grid-cols-1 flex-col md:mt-40">
          <h1 className="max-w-4xl p-4 font-display text-3xl font-black leading-none tracking-tight text-white drop-shadow-xl md:text-6xl lg:-mt-5 lg:text-[6rem]">
            Connect. <br />
            Showcase. <br />
            Sell.
          </h1>
        </div>
        <div className="-mt-44 flex h-full w-1/3 grid-cols-1 md:mt-0">
          <div className="absolute z-20 m-16 -ml-16 mt-44 flex flex-grow items-center justify-center md:mt-28">
            <BusinessCard qrCodePath="https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/Untitled.png" />
          </div>
          <div className="m-auto flex justify-center pl-52">
            <IPhoneHome />
          </div>
        </div>
      </div>
    </div>
  )
}
