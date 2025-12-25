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

export default function EthImageCard({ obj, colors, id }) {
  // Calculate opacity as a decimal (between 0 and 1)
  const opacity = (obj.opacity || 100) / 100
  // Calculate blur value
  const blur = obj.bgBlur ? `blur(${obj.bgBlur}px)` : 'none'
  return (
    <div id={id} className="px-2">
      <div className="m-2 mx-auto text-center">
        <div
          style={{
            backgroundColor: `rgba(${parseInt(colors[5]?.slice(1, 3), 16)}, ${parseInt(colors[5]?.slice(3, 5), 16)}, ${parseInt(colors[5]?.slice(5, 7), 16)}, ${opacity})`,
            backdropFilter: blur,
          }}
          className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-zinc-800 shadow-lg"
        >
          <div className="p-6">
            <img
              src={obj?.img || '#'}
              alt={obj?.alt || 'Square Image'}
              className="w-full rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export const def = [
  {
    name: 'img',
    type: 'file',
    title: 'Image',
  },
]
