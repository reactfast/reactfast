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

export default function EthProfile({ obj, colors, id }) {
  return (
    <div id={id} className="px-2">
      <div
        style={{ backgroundColor: colors[5] || '#27272a' }}
        className="mx-auto mt-2 w-full max-w-2xl overflow-hidden rounded-2xl shadow-lg"
      >
        {/* Banner Gradient */}
        <div
          className="relative h-24"
          style={{
            backgroundImage: `linear-gradient(to right, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
          }}
        >
          {/* Profile image overlaps banner */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 transform">
            <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-zinc-900 bg-zinc-800">
              {obj?.profileImageUrl ? (
                <Image
                  src={obj?.profileImageUrl}
                  alt="Profile"
                  width={200}
                  height={200}
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
          <h2 className="text-center text-xl/4 font-bold">{obj.username}</h2>
          <p className="text-center text-zinc-400">
            {obj.title} at {obj.businessName}
          </p>
        </div>
      </div>
    </div>
  )
}

export const def = [
  {
    name: 'username',
    type: 'string',
    title: 'Username',
  },
  {
    name: 'title',
    type: 'string',
    title: 'Title',
  },
  {
    name: 'businessName',
    type: 'string',
    title: 'Business Name',
  },
  {
    name: 'profileImageUrl',
    type: 'image',
    title: 'Profile Image URL',
    description: 'URL of the profile image to display',
  },
  {
    name: 'bannerImageUrl',
    type: 'image',
    title: 'Banner Image URL',
    description: 'URL of the banner image to display',
  },
  {
    name: 'profileImageAltText',
    type: 'string',
    title: 'Profile Image Alt Text',
    description: 'Alt text for the profile image',
  },
  {
    name: 'bannerImageAltText',
    type: 'string',
    title: 'Banner Image Alt Text',
    description: 'Alt text for the banner image',
  },
]
