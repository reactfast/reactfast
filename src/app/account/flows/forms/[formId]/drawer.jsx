export default function Drawer({ open, handle, children }) {
  return (
    <div
      className={`fixed inset-y-0 right-0 z-50 w-80 transform bg-white shadow-lg transition-transform duration-300 ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-end p-4">
        <button
          onClick={handle}
          className="text-gray-500 transition hover:text-gray-700"
        >
          Close ✕
        </button>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}
