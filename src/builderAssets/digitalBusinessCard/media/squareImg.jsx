export default function SquareImg({ obj, colors, id }) {
  return (
    <div id={id} className="flex items-center justify-center">
      <img
        src={obj.src}
        alt={obj.alt || 'Square Image'}
        className="h-32 w-32 rounded-full object-cover"
        style={{
          border: `2px solid ${colors[0] || '#000'}`,
        }}
      />
    </div>
  )
}

export const def = [
  {
    name: 'src',
    type: 'string',
    title: 'Image Source',
    description: 'Enter the full URL path of the image, including https://',
  },
]
