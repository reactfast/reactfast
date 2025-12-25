export default function PopCardSquare({ obj, colors, id }) {
  return (
    <div id={id} className="w-full px-2">
      <div className="mx-auto mt-2 text-center">
        <a
          href={obj?.url}
          target="_blank"
          rel="noopener noreferrer"
          {...(obj?.download ? { download: true } : {})}
        >
          <div
            className="mx-auto w-full max-w-2xl p-[2px]"
            style={{
              boxShadow: `10px 10px 0 ${obj.shadowColor || 'black'}`,
            }}
          >
            <div
              className="w-full py-4 text-2xl font-bold transition-colors"
              style={{
                backgroundColor: obj.btnColor,
                color: obj.fontColor,
              }}
            >
              {obj?.title || 'Title'}
              <p className="text-lg font-semibold">{obj?.content}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}
