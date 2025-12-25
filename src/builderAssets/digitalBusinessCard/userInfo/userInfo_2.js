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

export default function userInfo_2({ obj, colors, id }) {
  return (
    <>
      {/* Info Section */}
      <div id={id} className="mt-8 p-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold">{obj.name || 'John Doe'}</h1>
        </div>

        <div className="mt-2 flex items-center">
          <FaBirthdayCake className="mr-2 h-5 w-5" />
          <p className="break-all">{obj.birthday || '01/01/1990'}</p>
          <span className="ml-4">
            {obj.age ? `${obj.age} years old` : 'Age not specified'}
          </span>
          <span className="ml-4">{obj.astrologySign || 'Capricorn'}</span>
          <span className="ml-4">{obj.pronouns || 'They/Them'}</span>
        </div>

        <div className="mt-2 flex items-center"></div>

        <div className="flex justify-start space-x-4 text-gray-500">
          {obj.twitter && (
            <a href={obj.twitter} target="_blank" rel="noopener noreferrer">
              <FaTwitter className="h-8 w-8 transition hover:text-blue-600" />
            </a>
          )}
          {obj.linkedin && (
            <a href={obj.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="h-8 w-8 transition hover:text-blue-600" />
            </a>
          )}
          {obj.instagram && (
            <a href={obj.instagram} target="_blank" rel="noopener noreferrer">
              <FaInstagram className="h-8 w-8 transition hover:text-pink-600" />
            </a>
          )}
          {obj.threads && (
            <a href={obj.threads} target="_blank" rel="noopener noreferrer">
              <FaInstagramSquare className="h-8 w-8 transition hover:text-purple-600" />
            </a>
          )}
          {obj.facebook && (
            <a href={obj.facebook} target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="h-8 w-8 transition hover:text-blue-600" />
            </a>
          )}
          {obj.tiktok && (
            <a href={obj.tiktok} target="_blank" rel="noopener noreferrer">
              <FaTiktok className="h-8 w-8 transition hover:text-black" />
            </a>
          )}
          {obj.github && (
            <a href={obj.github} target="_blank" rel="noopener noreferrer">
              <FaGithub className="h-8 w-8 transition hover:text-gray-800" />
            </a>
          )}
          {obj.appleMusic && (
            <a href={obj.appleMusic} target="_blank" rel="noopener noreferrer">
              <FaApple className="h-8 w-8 transition hover:text-black" />
            </a>
          )}
          {obj.spotify && (
            <a href={obj.spotify} target="_blank" rel="noopener noreferrer">
              <FaSpotify className="h-8 w-8 transition hover:text-green-600" />
            </a>
          )}
        </div>

        <hr className="my-4 w-full border-t" />

        <p>
          {obj.bio ||
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
        </p>
      </div>
    </>
  )
}
