export default function IPhoneHome({ children }) {
  return (
    <div className="flex items-center justify-center">
      <div className="relative aspect-[9/19.5] h-[30rem] rounded-[2.5rem] border-[2.5px] border-black bg-white shadow-2xl outline-double outline-[4.5px] outline-amber-500/50 ring-4 ring-[#997C6A]">
        {/* Notch */}
        <div className="absolute left-1/2 top-3 h-6 w-[4.8rem] -translate-x-1/2 transform rounded-full bg-black"></div>

        {/* Speaker and Camera */}
        <div className="absolute left-1/2 top-5 flex -translate-x-1/2 transform items-center gap-3 space-x-1">
          <div className="h-1 w-7 rounded bg-gray-900"></div>
          <div className="inset-shadow-xs flex h-2 w-2 items-center justify-center rounded-full bg-gray-800">
            <div className="h-1 w-1 rounded-full bg-gradient-to-tr from-blue-900 to-slate-700"></div>
          </div>
        </div>

        {/* Screen */}
        <div className="absolute left-0 top-8 h-[calc(100%-4rem)] w-full overflow-hidden">
          {children}
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 h-[.2rem] w-24 -translate-x-1/2 transform rounded-full bg-gray-200"></div>
      </div>
    </div>
  )
}
