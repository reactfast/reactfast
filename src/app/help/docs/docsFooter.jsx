export default function DocsFooter({ nextUrl, BtnText }) {
  return (
    <div className="bg-primary/50 text-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
        <h2 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Ready to dive in? <br />
          Start your free trial today.
        </h2>
        <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:shrink-0">
          <a
            href={nextUrl}
            className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {BtnText || 'Get Started'} <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  )
}
