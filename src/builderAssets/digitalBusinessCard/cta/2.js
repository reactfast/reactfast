'use client'

export default function CTA_2({ obj, colors, id }) {
  // Default fallback values
  const defaultTitle = 'Join Our Community'
  const defaultMessage =
    'Sign up now to stay updated with our latest news and offers!'
  const defaultButtonText = 'Sign Up'
  const defaultColor = '#3490dc' // Example fallback color

  const buttonText = obj.buttonText || defaultButtonText
  const userColor = colors[0] || defaultColor

  const buttonGradient = `linear-gradient(to right, ${userColor}, ${colors[1]})`

  return (
    <div
      id={id}
      className="mt-8 p-8 text-center"
      style={{
        backgroundColor: '#333333',
        backgroundImage: `linear-gradient(to bottom, ${userColor}, #333333)`,
        color: 'white',
      }}
    >
      <h3 className="text-3xl font-bold">{obj?.title}</h3>
      <p className="mt-4 text-lg">{obj?.content}</p>
      <button
        className="mt-6 rounded-full px-6 py-3 text-lg font-semibold shadow-lg"
        style={{
          backgroundImage: buttonGradient,
          color: 'white',
          transition: 'transform 0.3s ease-in-out',
          boxShadow: `0 0 20px ${userColor}`,
        }}
        onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
        onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
      >
        {obj?.buttonText}
      </button>
    </div>
  )
}

export const def = [
  {
    name: 'title',
    type: 'string',
    title: 'Call To Action Title',
  },
  {
    name: 'content',
    type: 'string',
    title: 'Tag Line',
  },
  {
    name: 'url',
    type: 'string',
    title: 'Button Link',
    description: 'requires full URL path including https://',
  },
  {
    name: 'buttonText',
    type: 'string',
    title: 'Button Text',
  },
]
