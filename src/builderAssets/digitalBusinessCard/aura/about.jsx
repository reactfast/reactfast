export default function About({ obj, colors }) {
  return (
    <>
      <div>
        <div className="mb-12 flex flex-col items-center justify-center px-4">
          <div className="w-full max-w-md rounded-xl bg-white/30 p-6 shadow-lg backdrop-blur-sm">
            <h1 className="text-2xl font-thin">{obj.title}</h1>
            <p className="mt-2 text-sm text-gray-300">{obj.paragraph}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export const def = [
  {
    name: 'title',
    type: 'string',
    title: 'Title',
  },
  {
    name: 'paragraph',
    type: 'string',
    title: 'Paragraph',
  },
]
