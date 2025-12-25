import Image from 'next/image'
// import CertIcon from "@/assets/icons/CertIcon.png";
import { type } from 'os'

export default function CallToAction({ obj, colors }) {
  return (
    <div className="mb-12 w-full border bg-white py-12 text-center">
      <div className="relative mx-auto flex h-28 w-28 items-center justify-center">
        {/* <Image
          src={CertIcon.src}
          alt="Course Image"
          layout="fill"
          objectFit="cover"
          className="w-full h-auto relative mx-auto"
        /> */}
      </div>
      <h2 className="text-3xl">
        {obj.title
          ? obj.title
          : 'Hundreds of degree programs at your fingertips'}
      </h2>
      <p className="text-xl font-thin">
        {obj.subTitle ? obj.subTitle : 'Enrich your career today!'}
      </p>
      <div className="mt-4">
        <button
          style={colors && { backgroundColor: colors[0] }}
          className="rounded bg-red-600 px-4 py-2 text-white"
        >
          {obj.btnText ? obj.btnText : 'APPLY NOW'}
        </button>
        <button className="ml-4 rounded bg-gray-600 px-4 py-2 text-white">
          LEARN MORE
        </button>
      </div>
    </div>
  )
}
