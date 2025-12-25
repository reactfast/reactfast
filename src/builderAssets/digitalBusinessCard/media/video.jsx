export default function Video({ obj, colors, id }) {
  return (
    <div id={id} className="flex items-center justify-center">
      <video
        controls
        className="h-auto w-full rounded-lg object-cover"
        style={{
          border: `2px solid ${colors[0] || '#000'}`,
        }}
      >
        <source src={obj.src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export const def = [
  {
    name: 'src',
    type: 'string',
    title: 'Video Source',
    description: 'Enter the full URL path of the video, including https://',
  },
]
