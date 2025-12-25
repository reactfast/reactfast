import { PlusCircleIcon } from '@heroicons/react/24/outline'

export default function NoFields() {
  return (
    <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 py-12 text-center">
      <div className="mb-3 text-gray-400">
        <PlusCircleIcon className="mx-auto h-12 w-12" />
      </div>
      <p className="mb-1 font-medium text-gray-600">No fields yet</p>
      <p className="text-sm text-gray-500">Click "Add Field" to get started</p>
    </div>
  )
}
