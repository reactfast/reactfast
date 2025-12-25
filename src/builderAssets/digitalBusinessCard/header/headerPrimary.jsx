export default function HeaderPrimary() {
  return (
    <div className="flex w-full items-center justify-between bg-gray-800 px-4 py-2 text-white">
      <div className="text-lg font-bold">Digital Business Card</div>
      <nav className="space-x-4">
        <a href="#home" className="hover:underline">
          Home
        </a>
        <a href="#about" className="hover:underline">
          About
        </a>
        <a href="#contact" className="hover:underline">
          Contact
        </a>
      </nav>
    </div>
  )
}
