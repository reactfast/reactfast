'use client'

export default function ButtonMenu() {
  return (
    <div className="mx-auto max-w-md px-6 py-4">
      <div className="flex gap-3">
        <a
          href="#Medical"
          className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-3 text-center text-sm font-medium text-gray-700 transition-all duration-200 hover:border-red-500 hover:bg-red-50 hover:text-red-600 hover:shadow-sm"
        >
          Medical Info
        </a>
        <a
          href="#Behavioral"
          className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-3 text-center text-sm font-medium text-gray-700 transition-all duration-200 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 hover:shadow-sm"
        >
          Behavioral
        </a>
      </div>

      {/* Lesser navigation buttons with minimal design */}
      {/* <div className="mt-3 flex gap-3">
        <a
          href="#Profile"
          className="flex-1 rounded-lg bg-gray-50 px-4 py-3 text-center text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
        >
          Profile
        </a>
        <a
          href="#ChipID"
          className="flex-1 rounded-lg bg-gray-50 px-4 py-3 text-center text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
        >
          Chip ID
        </a>
      </div> */}
    </div>
  )
}
