export default function ProfileImg2({ obj, colors, id }) {
  const isVideo = obj.profileImg?.match(/\.(mp4|webm|ogg|MOV)$/i)

  return (
    <div id={id} className="relative w-full">
      <div className="relative aspect-square w-full overflow-hidden">
        {/* Background Media */}
        {isVideo ? (
          <video
            src={obj.profileImg}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img
            src={obj.profileImg}
            alt="Header"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {/* Diagonal SVG Overlay: 30% left, 20% right */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{
            filter: 'drop-shadow(0 -4px 6px rgba(0, 0, 0, 0.25))',
          }}
        >
          <polygon points="0,70 100,80 100,100 0,100" fill={colors[4]} />
        </svg>

        {/* Optional Text Overlay */}
        <div className="absolute bottom-4 left-4 z-10">
          <h1 className="text-2xl font-bold">{obj.name}</h1>
          <p className="text-sm">{obj.line2}</p>
        </div>
      </div>
    </div>
  )
}
