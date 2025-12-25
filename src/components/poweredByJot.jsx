import LogoSvg from './logoSvg'

export default function PoweredByJot({ page }) {
  return (
    <>
      <div
        style={{ color: page.font_color || '#020DF9' }}
        className="flex w-full items-center justify-center py-20"
      >
        <a
          href="https://jot.space"
          target="_blank"
          rel="noreferrer"
          className="mt-2 text-sm"
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="mb-2 h-auto w-32 items-center justify-center">
              <LogoSvg color={page.font_color} />
            </div>
            <p className="text-lg font-light uppercase tracking-widest">
              Powered by Jot.Space
            </p>
          </div>
        </a>
      </div>
    </>
  )
}
