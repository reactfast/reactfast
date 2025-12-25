import {
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaGithub,
  FaFacebookF,
  FaInstagramSquare,
  FaSpotify,
} from 'react-icons/fa'
import { FaBirthdayCake, FaMusic } from 'react-icons/fa'

export default function UserInfo_3({ title, content, id }) {
  return (
    <>
      {/* Info Section */}
      <div id={id} className="mt-8 p-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold">{title || 'Section'}</h1>
        </div>

        <div className="mt-2 flex items-center"></div>

        <p>
          {content ||
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
        </p>
      </div>
    </>
  )
}
