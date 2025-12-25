import { useEffect, useRef } from 'react'

export default function IPhoneLayout({
  children,
  bgColor,
  bgImage,
  fontColor,
}) {
  const containerRef = useRef()

  useEffect(() => {
    const el = containerRef.current?.querySelector('[data-recent="true"]')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    console.log(bgImage)
  }, [children])

  return (
    <div className="items-center justify-center">
      <div
        style={{
          backgroundColor: bgColor,
          color: fontColor,
          backgroundImage: bgImage ? `url(${bgImage})` : 'none',
          backgroundSize: 'auto 100%', // Ensures the image is fully visible without stretching
          backgroundPosition: 'top left', // Centers the image horizontally and vertically
          backgroundRepeat: 'repeat', // Prevents tiling
        }}
        className="relative h-[812px] w-[375px] rounded-[2.5rem] border-2 border-black shadow-2xl"
      >
        {/* Notch */}
        <div className="absolute left-1/2 top-0 h-6 w-32 -translate-x-1/2 transform rounded-b-3xl bg-black"></div>

        {/* Speaker and Camera */}
        <div className="absolute left-1/2 top-1 flex -translate-x-1/2 transform items-center space-x-1">
          <div className="h-1 w-16 rounded bg-gray-700"></div>
          <div className="h-2 w-2 rounded-full bg-gray-700"></div>
        </div>

        {/* Screen */}
        <div
          ref={containerRef}
          className="absolute left-0 top-8 h-[calc(100%-4rem)] w-full overflow-auto"
          style={{
            scrollbarWidth: 'none' /* Firefox */,
            msOverflowStyle: 'none' /* IE 10+ */,
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {children}
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 h-1.5 w-28 -translate-x-1/2 transform rounded-full bg-gray-900"></div>
      </div>
    </div>
  )
}
