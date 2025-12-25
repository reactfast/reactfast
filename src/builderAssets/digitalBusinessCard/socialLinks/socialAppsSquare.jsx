import {
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaGithub,
  FaInstagramSquare,
  FaSpotify,
} from 'react-icons/fa'

const iconMap = {
  twitter: FaTwitter,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
  threads: FaInstagramSquare,
  facebook: FaFacebookF,
  tiktok: FaTiktok,
  github: FaGithub,
  spotify: FaSpotify,
}

export default function SocialAppsSquare({ obj, colors, id }) {
  const titles = obj.showTitles
  const titleColor = obj?.titleColor

  const iconClasses =
    'flex h-16 w-16 items-center justify-center rounded-xl shadow transition-all hover:scale-105 hover:shadow-md'

  return (
    <div
      id={id}
      className="mx-auto grid max-w-md grid-cols-3 gap-x-6 gap-y-8 p-6"
    >
      {(obj.socials || []).map(({ platform, url, download }, index) => {
        const Icon = iconMap[platform]
        if (!Icon || !url) return null

        return (
          <div className="flex flex-col items-center" key={index}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: obj?.iconBg || 'white' }}
              className={iconClasses}
              {...(download ? { download: true } : {})}
            >
              <Icon className="h-8 w-8" />
            </a>
            {titles && (
              <span style={{ color: titleColor }} className="mt-2 text-sm">
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
