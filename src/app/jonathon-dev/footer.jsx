'use client'

import { EnvelopeIcon } from '@heroicons/react/20/solid'
import {
  FaGithub,
  FaInstagram,
  FaXTwitter,
  FaMedium,
  FaThreads,
  FaLinkedin,
} from 'react-icons/fa6'
import { dev } from './assets/Developer'

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-[#0E1215] pt-12 text-gray-300">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-y-8 px-6 md:grid-cols-3 md:gap-8 md:gap-y-0">
        {/* Left Section */}
        <div className="col-span-3 rounded-xl bg-[#191E24] p-6 shadow">
          <h2 className="text-6xl font-light text-white">
            Jonathon
            <br /> Scott
          </h2>
          <p className="mt-2 text-gray-400">
            Software Engineer, Product Designer, and Avid Gamer.
          </p>

          {/* Social icons */}
          <div className="mt-4 flex items-center gap-4">
            <a
              href={dev.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors hover:text-[#FF3908]"
            >
              <FaGithub className="h-6 w-6" />
            </a>
            <a
              href={dev.medium}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors hover:text-[#FF3908]"
            >
              <FaMedium className="h-6 w-6" />
            </a>
            <a
              href={dev.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors hover:text-[#FF3908]"
            >
              <FaInstagram className="h-6 w-6" />
            </a>
            <a
              href={dev.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors hover:text-[#FF3908]"
            >
              <FaXTwitter className="h-6 w-6" />
            </a>
            <a
              href={dev.threads}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors hover:text-[#FF3908]"
            >
              <FaThreads className="h-6 w-6" />
            </a>
            <a
              href={dev.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors hover:text-[#FF3908]"
            >
              <FaLinkedin className="h-6 w-6" />
            </a>
          </div>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            {/* Contact button */}
            <a
              href="mailto:jonathonscott688@gmail.com"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FF3908] px-6 py-3 text-lg font-semibold leading-tight text-white shadow-md transition-colors duration-200 hover:bg-[#e63900] sm:w-auto"
            >
              Contact
            </a>
            <a
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#FF3908] bg-transparent px-6 py-3 text-lg font-semibold leading-tight text-[#FF3908] transition-colors duration-200 hover:bg-[#FF3908] hover:text-white sm:w-auto"
              href="/resume.pdf" // path relative to the root
              download="Jonathon_McClendon_Resume.pdf"
            >
              Download CV
            </a>
          </div>
        </div>

        {/* Right Section */}
        {/* <div
          style={{
            border: '3px dashed white',
            borderRadius: '0.75rem',
          }}
          className="col-span-1 w-full rounded-xl bg-[#191E24] p-6 text-center"
        >
          <EnvelopeIcon className="mx-auto mb-2 h-8 w-8 text-gray-400" />
          <h3 className="text-lg font-semibold text-white">Stay Up to Date</h3>
          <p className="mt-2 text-sm text-gray-400">
            Subscribe to updates, releases, or announcements.
          </p>
          <button className="mt-4 rounded-full bg-[#2D3640] px-4 py-2 text-sm font-medium text-gray-200 transition-colors duration-200 hover:bg-[#FF3908] hover:text-black">
            Join Mailing List
          </button>
        </div> */}
      </div>

      <div className="mt-10 border-t border-gray-800 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Jonathon Scott. All rights reserved.
      </div>
    </footer>
  )
}
