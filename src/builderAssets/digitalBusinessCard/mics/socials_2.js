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

export default function Socials_1({ socialLinks }) {
  return (
    <>
      {/* Social Section */}
      <div className="flex justify-center space-x-4 p-4 text-gray-500">
        {socialLinks.twitter && (
          <a
            href={socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="h-6 w-6 transition hover:text-blue-600" />
          </a>
        )}
        {socialLinks.linkedin && (
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="h-6 w-6 transition hover:text-blue-600" />
          </a>
        )}
        {socialLinks.instagram && (
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="h-6 w-6 transition hover:text-pink-600" />
          </a>
        )}
        {socialLinks.threads && (
          <a
            href={socialLinks.threads}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagramSquare className="h-6 w-6 transition hover:text-purple-600" />
          </a>
        )}
        {socialLinks.facebook && (
          <a
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF className="h-6 w-6 transition hover:text-blue-600" />
          </a>
        )}
        {socialLinks.tiktok && (
          <a
            href={socialLinks.tiktok}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTiktok className="h-6 w-6 transition hover:text-black" />
          </a>
        )}
        {socialLinks.github && (
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="h-6 w-6 transition hover:text-gray-800" />
          </a>
        )}
        {socialLinks.appleMusic && (
          <a
            href={socialLinks.appleMusic}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaApple className="h-6 w-6 transition hover:text-black" />
          </a>
        )}
        {socialLinks.spotify && (
          <a
            href={socialLinks.spotify}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaSpotify className="h-6 w-6 transition hover:text-green-600" />
          </a>
        )}
      </div>
    </>
  )
}
