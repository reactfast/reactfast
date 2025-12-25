import Image from 'next/image'
import { CheckIcon } from '@heroicons/react/20/solid'

export default function ImgRight_1({ obj, colors }) {
  return (
    <div className="flex w-full flex-col bg-white/[.03] md:flex-row">
      {/* Right Section: Text Information */}
      <div className="flex w-full flex-col justify-center p-8 md:w-1/2">
        <h2 className="mb-4 bg-clip-text text-4xl font-extrabold text-red-600">
          The Support You Need to Transform Your Career
        </h2>
        <p className="text-base">
          Cybersecurity is one of the most in-demand global fields today. We’re
          committed to equipping you with the fundamental skills you need to
          make an impact while providing unparalleled support and resources
          before, during, and after your boot camp.
        </p>
        <ul className="list-none space-y-4 pl-0 pt-8">
          <li className="flex items-start space-x-2">
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center text-red-600">
              <CheckIcon className="h-5 w-5" />
            </div>
            <span>
              Global Network: Gain access to a network of 250+ employers looking
              to hire.
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center text-red-600">
              <CheckIcon className="h-5 w-5" />
            </div>
            <span>
              CompTIA Partnership: Get a head start on certification test prep.
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center text-red-600">
              <CheckIcon className="h-5 w-5" />
            </div>
            <span>
              Student Success: Stay on track with personalized academic support.
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center text-red-600">
              <CheckIcon className="h-5 w-5" />
            </div>
            <span>
              Career Support: Access free professional resources throughout your
              career.
            </span>
          </li>
        </ul>
      </div>

      {/* Left Section: Image with gradient background */}
      <div className="relative h-[500px] w-full overflow-hidden bg-gradient-to-r from-red-600 to-black sm:h-full md:h-auto md:w-1/2">
        <Image
          src={'https://placehold.co/600x400'}
          alt="Description of image"
          layout="fill"
          objectFit="cover"
          className="h-full transform opacity-70 transition duration-500 hover:scale-110"
        />
      </div>
    </div>
  )
}
