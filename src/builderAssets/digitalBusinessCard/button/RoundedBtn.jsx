export default function RoundedBtn({ obj, colors, id }) {
  return (
    <div id={id} className="w-full px-2">
      <div className="mx-auto mt-2 text-center">
        <a
          href={obj?.url}
          target="_blank"
          rel="noopener noreferrer"
          {...(obj.download ? { download: true } : {})}
        >
          <div className="mx-auto w-full max-w-2xl rounded-full p-[2px] shadow-lg">
            <button
              className="w-full rounded-full py-4 text-xl font-bold transition-colors"
              style={{ backgroundColor: obj.btnColor, color: obj.fontColor }}
            >
              {obj?.title || 'Button'}
            </button>
          </div>
        </a>
      </div>
    </div>
  )
}
