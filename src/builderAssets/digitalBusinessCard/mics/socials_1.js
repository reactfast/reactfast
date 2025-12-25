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

const PLATFORM_MAP = {
  twitter: { icon: FaTwitter, label: 'Twitter' },
  linkedin: { icon: FaLinkedin, label: 'LinkedIn' },
  instagram: { icon: FaInstagram, label: 'Instagram' },
  threads: { icon: FaInstagramSquare, label: 'Threads' },
  facebook: { icon: FaFacebookF, label: 'Facebook' },
  tiktok: { icon: FaTiktok, label: 'TikTok' },
  github: { icon: FaGithub, label: 'GitHub' },
  spotify: { icon: FaSpotify, label: 'Spotify' },
}

export default function Socials_1({ obj, colors, id }) {
  const socials = Array.isArray(obj.socials) ? obj.socials : []
  const titles = obj.showTitles
  const titleColor = obj.titleColor
  const iconBg = obj.iconBg || 'white'

  return (
    <div
      id={id}
      className="mx-auto grid max-w-md grid-cols-3 gap-x-6 gap-y-8 p-6"
    >
      {socials.map(({ platform, url }, i) => {
        const platformData = PLATFORM_MAP[platform]
        if (!platformData || !url) return null

        const Icon = platformData.icon

        return (
          <div key={i} className="flex flex-col items-center">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: iconBg }}
              className="flex h-16 w-16 items-center justify-center rounded-full shadow transition-all hover:scale-105 hover:shadow-md"
            >
              <Icon className="h-8 w-8" />
            </a>
            {titles && (
              <span style={{ color: titleColor }} className="mt-2 text-sm">
                {platformData.label}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
