import Image from 'next/image'
import { CheckIcon } from '@heroicons/react/20/solid'

/**
 *
 * @param {*} param0
 * obj {
 * }
 * @returns jsx
 */

export default function ImgLeft_1({ obj, colors }) {
  const gradientStart = colors?.[0] || '#B91C1C' // Fallback color if `colors[0]` is not provided

  return (
    <div className="flex w-full flex-col bg-white/[.06] md:flex-row">
      {/* Left Section: Image with gradient background */}
      <div className={`relative h-96 w-full md:h-auto md:w-1/2`}>
        <div className="relative mx-auto my-8 h-full w-[500px]">
          <Image
            src={'https://placehold.co/600x400'}
            alt="Description of image"
            layout="fill"
            objectFit="cover"
            className=""
          />
        </div>
      </div>

      {/* Right Section: Text Information */}
      <div className="flex w-full flex-col justify-center p-8 md:w-1/2">
        <h2
          style={colors && { color: colors[0] }}
          className="mb-4 bg-gradient-to-r text-4xl font-extrabold"
        >
          The Support You Need to Transform Your Career
        </h2>
        <p className="text-base">
          Cybersecurity is one of the most in-demand global fields today. We’re
          committed to equipping you with the fundamental skills you need to
          make an impact while providing unparalleled support and resources
          before, during, and after your boot camp.
        </p>
        <ul className="list-none space-y-4 pl-0 pt-8">
          {[
            'Global Network: Gain access to a network of 250+ employers looking to hire.',
            'CompTIA Partnership: Get a head start on certification test prep.',
            'Student Success: Stay on track with personalized academic support.',
            'Career Support: Access free professional resources throughout your career.',
          ].map((text, index) => (
            <li key={index} className="flex items-start space-x-2">
              <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center text-red-600">
                <CheckIcon className="h-5 w-5" />
              </div>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
