export default function CustomCode({ obj, colors, id }) {
  return <div id={id} dangerouslySetInnerHTML={{ __html: obj.code }}></div>
}

export const def = [
  {
    name: 'code',
    type: 'text',
    title: 'Custom HTML',
    description:
      'Enter your custom HTML code here. Ensure it is valid and safe to use.',
  },
]
