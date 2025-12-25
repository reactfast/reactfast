import { CheckIcon } from "@heroicons/react/20/solid"; // Importing a specific icon from Heroicons library
import Link from "next/link"; // Importing the Link component from Next.js for client-side navigation

/**
 * Hero_1 component: A hero section component with a title, subtitle, content, buttons for navigation,
 * and a form for user input. It takes two props: obj and colors.
 *
 * @param {object} obj - Contains the dynamic content for the hero section, including title, subTitle, and content.
 * @param {string[]} colors - An array of colors used to style the title text dynamically.
 *
 * Example usage:
 * <Hero_1 obj={{ title: 'Welcome to Ednet', subTitle: 'Your Future Starts Here', content: 'Join now!' }} colors={['#ff0000']} />
 */

export default function Hero_1({ obj, colors }) {
  return (
    <>
      {/* Main container with gradient background */}
      <div className="text-white bg-gradient-to-r from-black to-[#AE090C] w-full grid grid-cols-12 p-16 ">
        <div className="col-span-12 md:col-span-7">
          {/* Title Section */}
          <h1
            style={colors && { color: colors[0] }} // Dynamically setting color if provided
            className="text-5xl lg:text-[80px] text-secondary font-black"
          >
            {obj?.title ? (
              obj.title
            ) : (
              <span>
                LEARN WITH <span className="text-white">Ednet</span>
              </span>
            )}
          </h1>
          {/* Subtitle Section */}
          {obj?.subTitle ? (
            <p className="text-3xl font-black">{obj.subTitle}</p>
          ) : (
            <p className="text-3xl font-black">
              100% ONLINE, ON DEMAND, And ON YOUR TIME
            </p>
          )}
          {/* Content Section */}
          <div>
            {obj?.content ? (
              <p className="text-xl font-black">{obj.content}</p>
            ) : (
              <p className="text-xl font-black">
                100% ONLINE, ON DEMAND, And ON YOUR TIME
              </p>
            )}
          </div>
          {/* Buttons for Navigation */}
          <div className="pt-8">
            <Link href="/micro-credentials">
              <button
                type="button"
                className="mr-8 rounded-md border border-white px-3.5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-white hover:text-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
        <div className="col-span-12 md:col-span-5 text-black m-auto">
          {/* Form Start */}
          <div className="bg-white p-4 max-w-[400px]">
            <h2 className="text-5xl font-bold text-center">Apply Now</h2>
            <p className="text-center">
              Answer 6 quick questions about yourself. It takes less than a
              minute!
            </p>
            {/* Form Fields */}
            <label
              htmlFor="firstName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              First Name
            </label>
            <div className="mt-2">
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First Name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Last Name
            </label>
            <div className="mt-2">
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last Name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <p id="email-description" className="mt-2 text-sm text-gray-500">
              We'll only use this for spam.
            </p>
            <div className="flex m-auto w-full justify-center">
              <button
                type="button"
                className="rounded-md bg-gradient-to-r from-[#AE090C] to-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-shadow duration-200"
              >
                Start Adventure Now
              </button>
            </div>
          </div>
          {/* Form End */}
        </div>
      </div>
    </>
  );
}
