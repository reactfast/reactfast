export default function ProfileMedia({ obj, colors, id }) {
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

        {/* Dynamic Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to top, ${colors[4]} 0%, rgba(0,0,0,0) 30%)`,
          }}
        />

        {/* Optional Text Overlay */}
        <div className="absolute bottom-4 left-4 z-10">
          <h1 className="text-2xl font-bold">{obj.name}</h1>
          <p className="text-sm">{obj.line2}</p>
        </div>
      </div>
    </div>
  )
}
