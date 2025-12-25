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

export default function EthBtnAlt({ obj, colors, id }) {
  return (
    <div id={id} className="px-2">
      <div className="mx-auto mt-2 text-center">
        <a
          href={obj.href}
          target="_blank"
          {...(obj.download ? { download: true } : {})}
        >
          <button
            className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl py-4 text-xl font-bold shadow-lg transition-transform hover:scale-[1.02] active:scale-95"
            style={{
              backgroundImage: `linear-gradient(to right, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
            }}
          >
            {obj.btnText || 'Button'}
          </button>
        </a>
      </div>
    </div>
  )
}

export const def = [
  {
    name: 'btnText',
    type: 'string',
    title: 'Button Text',
  },
  {
    name: 'href',
    type: 'string',
    title: 'Button Link',
    description: 'URL to redirect when the button is clicked',
  },
  {
    name: 'download',
    type: 'boolean',
    title: 'Download Button',
    description: 'Enable to make the button a download link',
  },
]
