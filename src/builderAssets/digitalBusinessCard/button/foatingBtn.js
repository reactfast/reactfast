export default function FloatingBtn({ obj, colors, id }) {
  return (
    <>
      <a href={obj?.url} target="_blank">
        <button
          className={`fixed bottom-4 right-4 rounded-md border px-4 py-2 text-sm font-medium text-white transition`}
          style={{ backgroundColor: colors[0] }}
        >
          {obj?.title}
        </button>
      </a>
      <div className="h-24"> </div>
    </>
  )
}

const form = [
  {
    name: 'url',
    type: 'string',
    title: 'Link', // the title of the input field
    description:
      'Link to another page, site, or document. Requires full URL path including https://.', // description will be visible on the dynamic form field
  },
  {
    name: 'title',
    type: 'string',
    title: 'Button Text', // the title of the input field
  },
]
