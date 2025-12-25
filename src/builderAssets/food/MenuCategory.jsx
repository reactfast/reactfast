export default function MenuCategory({ obj }) {
  return (
    <div id={obj.id} className="mx-auto max-w-5xl p-2 py-6">
      <h2 className="mb-4 text-2xl font-bold">
        {obj.title || 'Specialty Items'}
      </h2>
    </div>
  )
}
