import Link from 'next/link'

export default function CustomMetalCards() {
  return (
    <div className="relative flex h-screen flex-col place-items-center justify-center bg-neutral-800 bg-[url('https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/images/7b590fcc-b64c-4367-b1c1-be4b173f8b4b/1738470737419-jotcluster2.png')] bg-cover bg-center p-4 text-white">
      {/* Primary color overlay */}
      <div className="absolute inset-0 z-0 bg-primary/60"></div>

      {/* Content above overlay */}
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <h1 className="text-pretty text-5xl font-semibold tracking-tight sm:text-7xl">
          <span className="text-tertiary">Jot.Cards:</span> The Smarter Way to
          Network and Grow Your Digital Presence
        </h1>
        <p className="mt-8 text-lg text-gray-200 sm:text-xl">
          Eco-friendly materials. Real-time updates. Analytics-driven insights.
          Unlock your potential with reusable cards and customizable digital
          pages.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#"
            className="rounded-md bg-tertiary px-3.5 py-2.5 text-sm font-semibold text-primary shadow-sm hover:bg-tertiary/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary/80"
          >
            Get started
          </a>
          <a href="#" className="text-sm/6 font-semibold text-tertiary">
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  )
}
