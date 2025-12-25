import {
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaGithub,
  FaSpotify,
} from 'react-icons/fa'

const iconMap = {
  twitter: FaTwitter,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
  facebook: FaFacebookF,
  tiktok: FaTiktok,
  github: FaGithub,
  spotify: FaSpotify,
}

export default function EthSocials({ obj, colors, id }) {
  const opacity = (obj.opacity || 100) / 100
  const blur = obj.bgBlur ? `blur(${obj.bgBlur}px)` : 'none'

  return (
    <div id={id} className="px-2">
      <div className="mx-auto mt-2 text-center">
        <div className="mx-auto text-center">
          <div
            style={{
              backgroundColor: `rgba(${parseInt(colors[5]?.slice(1, 3), 16)}, ${parseInt(colors[5]?.slice(3, 5), 16)}, ${parseInt(colors[5]?.slice(5, 7), 16)}, ${opacity})`,
              backdropFilter: blur,
            }}
            className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl shadow-lg"
          >
            <div className="p-6">
              <h3 className="mb-4 text-lg font-semibold">
                {obj.title || 'Follow Me'}
              </h3>

              <div className="flex flex-wrap justify-center gap-4 text-xl">
                {(obj.socials || []).map(({ platform, url }, index) => {
                  const Icon = iconMap[platform]
                  if (!Icon || !url) return null

                  return (
                    <a
                      key={index}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-indigo-500"
                    >
                      <Icon />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
