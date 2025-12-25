import {
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from '@heroicons/react/24/solid'
import Image from 'next/image'
import {
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaGithub,
  FaSpotify,
} from 'react-icons/fa'

export default function businessCardV2() {
  const profileImageUrl = null // Replace this with actual image URL later

  return (
    <>
      <div className="min-h-screen bg-zinc-900 px-2 py-5 text-white">
        <div id="section1" className="mx-auto mb-5">
          <h1 className="text-3xl font-bold">Fascist.eth </h1>
          <p>Title of some sort</p>
        </div>
        <div id="section2">
          <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl bg-zinc-800 text-white shadow-lg">
            {/* Banner Gradient */}
            <div className="relative h-24 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
              {/* Profile image overlaps banner */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 transform">
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 border-zinc-900 bg-zinc-800">
                  {profileImageUrl ? (
                    <Image
                      src={profileImageUrl}
                      alt="Profile"
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  ) : (
                    <UserCircleIcon className="h-10 w-10 text-zinc-400" />
                  )}
                </div>
              </div>
            </div>

            {/* Username */}
            <div className="pb-6 pt-14">
              <h2 className="text-center text-xl/4 font-bold">John Doe</h2>
              <p className="text-center text-zinc-400">Title of some sort</p>
            </div>
          </div>
        </div>
        <div id="section3" className="mx-auto mt-2 max-w-sm text-center">
          <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl bg-zinc-800 text-white shadow-lg">
            <div className="p-6">
              <h3 className="mb-4 text-lg font-semibold">Contact</h3>

              {/* Email */}
              <div className="mb-3 flex items-center space-x-2 text-sm">
                <EnvelopeIcon className="h-5 w-5 text-zinc-400" />
                <a href="mailto:example@email.com" className="hover:underline">
                  example@email.com
                </a>
              </div>

              {/* Phone */}
              <div className="mb-3 flex items-center space-x-2 text-sm">
                <PhoneIcon className="h-5 w-5 text-zinc-400" />
                <a href="tel:+1234567890" className="hover:underline">
                  +1 (234) 567-890
                </a>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-2 text-sm">
                <MapPinIcon className="h-5 w-5 text-zinc-400" />
                <span>Los Angeles, CA</span>
              </div>
            </div>
          </div>
        </div>
        <div id="section4" className="mx-auto mt-2 max-w-sm text-center">
          <div className="mx-auto max-w-sm text-center">
            <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl bg-zinc-800 text-white shadow-lg">
              <div className="p-6">
                <h3 className="mb-4 text-lg font-semibold">Follow Me</h3>

                <div className="flex flex-wrap justify-center gap-4 text-xl text-zinc-300">
                  <a
                    href="https://twitter.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="https://linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href="https://instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="https://facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href="https://tiktok.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    <FaTiktok />
                  </a>
                  <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    <FaGithub />
                  </a>
                  <a
                    href="https://spotify.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    <FaSpotify />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="section4" className="mx-auto mt-2 max-w-sm text-center">
          <a href="#">
            <div className="mx-auto w-full max-w-sm rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-[2px] shadow-lg">
              <button className="w-full rounded-[calc(1rem-2px)] bg-zinc-800 py-4 text-xl font-bold text-white transition-colors hover:bg-zinc-700">
                BUTTON NOW
              </button>
            </div>
          </a>
        </div>
        <div id="section5" className="mx-auto mt-2 max-w-sm text-center">
          <a href="#">
            <button className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 py-4 text-xl font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-95">
              BUTTON NOW
            </button>
          </a>
        </div>
      </div>
    </>
  )
}
