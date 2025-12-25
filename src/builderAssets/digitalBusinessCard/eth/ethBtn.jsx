export default function EthBtn({ obj, colors, id }) {
  // Calculate opacity as a decimal (between 0 and 1)
  const opacity = (obj.opacity || 100) / 100
  // Calculate blur value
  const blur = obj.bgBlur ? `blur(${obj.bgBlur}px)` : 'none'

  return (
    <div id={id} className="w-full px-2">
      <div className="mx-auto mt-2 text-center">
        <a
          href={obj.href}
          target="_blank"
          rel="noopener noreferrer"
          {...(obj.download ? { download: true } : {})}
        >
          <div
            className="mx-auto w-full max-w-2xl rounded-2xl p-[2px] shadow-lg"
            style={{
              backgroundColor: `rgba(${parseInt(colors[5]?.slice(1, 3), 16)}, ${parseInt(colors[5]?.slice(3, 5), 16)}, ${parseInt(colors[5]?.slice(5, 7), 16)}, ${opacity})`,
              backdropFilter: blur,
              backgroundImage: `linear-gradient(to right, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
            }}
          >
            <button
              style={{
                backgroundColor: `rgba(${parseInt(colors[5]?.slice(1, 3), 16)}, ${parseInt(colors[5]?.slice(3, 5), 16)}, ${parseInt(colors[5]?.slice(5, 7), 16)}, ${opacity})`,
                backdropFilter: blur,
              }}
              className="w-full rounded-[calc(1rem-2px)] py-4 text-xl font-bold"
            >
              {obj.btnText || (obj.download ? 'Download' : 'Button')}
            </button>
          </div>
        </a>
      </div>
    </div>
  )
}

export const def = [
  {
    name: 'btnText',
    type: 'string',
    title: 'Button Text',
  },
  {
    name: 'href',
    type: 'string',
    title: 'Button Link',
    description: 'URL to redirect when the button is clicked',
  },
  { name: 'opacity', type: 'number', title: 'Opacity' },
  { name: 'bgBlur', type: 'number', title: 'Blur Effect %' },
]
