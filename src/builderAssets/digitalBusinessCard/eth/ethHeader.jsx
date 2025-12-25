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

export default function EthHeader({ obj, colors, id }) {
  return (
    <div id={id} className="mx-6 mb-5">
      <h1 className="text-3xl font-bold">{obj.username}</h1>
      <p>
        {obj.title} at {obj.businessName}
      </p>
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
]
