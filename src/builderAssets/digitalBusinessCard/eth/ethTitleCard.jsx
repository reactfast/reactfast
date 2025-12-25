export default function EthTitleCard({ obj, colors, id }) {
  // Calculate opacity as a decimal (between 0 and 1)
  const opacity = (obj.opacity || 100) / 100
  // Calculate blur value
  const blur = obj.bgBlur ? `blur(${obj.bgBlur}px)` : 'none'

  return (
    <div id={id} className="px-2">
      <div className="mx-auto">
        <div
          style={{
            backgroundColor: `rgba(${parseInt(colors[5]?.slice(1, 3), 16)}, ${parseInt(colors[5]?.slice(3, 5), 16)}, ${parseInt(colors[5]?.slice(5, 7), 16)}, ${opacity})`,
            backdropFilter: blur,
          }}
          className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl shadow-lg"
        >
          <div className="p-4">
            <div>
              <h1 className="text-3xl font-bold">{obj.username}</h1>
              <p>
                {obj.title} at {obj.businessName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
