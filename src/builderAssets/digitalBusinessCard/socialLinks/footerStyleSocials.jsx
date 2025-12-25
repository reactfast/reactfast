import {
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaGithub,
  FaSpotify,
} from 'react-icons/fa'

const ICONS = {
  twitter: FaTwitter,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
  facebook: FaFacebookF,
  tiktok: FaTiktok,
  github: FaGithub,
  spotify: FaSpotify,
}

export default function FooterSocials({ obj, colors, id }) {
  return (
    <div id={id} className="px-2">
      <div className="mx-auto mt-2 text-center">
        <div className="p-6">
          <div className="flex flex-wrap justify-center gap-4 text-xl">
            {(obj?.socials || []).map(({ platform, url }, idx) => {
              const Icon = ICONS[platform]
              if (!Icon || !url) return null
              return (
                <a
                  key={idx}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-blue-500"
                >
                  <Icon />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
