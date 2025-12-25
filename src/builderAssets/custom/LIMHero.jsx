import Link from 'next/link'

// components/QuoteSection.jsx
export default function QuoteSection({ obj, colors, id }) {
  return (
    <section id={id} className="relative mx-auto w-full max-w-7xl">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/images/5c1f5463-8b88-4805-b614-c05b0795b5db/1751381455340-IMG_8591%201.png")',
        }}
      />

      {/* Overlay for better readability */}
      <div className="absolute inset-0 z-10 bg-black/50" />

      {/* Content */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 py-8 text-center text-white">
        {/* Portrait image */}
        <div className="mb-4">
          <img
            src="https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/images/5c1f5463-8b88-4805-b614-c05b0795b5db/1751381769701-LeslieHeadshotflip.png"
            alt="Portrait"
            className="h-[300px] w-[200px] rounded-lg border-2 border-white object-cover shadow-lg"
          />
        </div>

        {/* Quote */}
        <blockquote className="mb-6 max-w-2xl text-xl font-medium italic md:text-2xl">
          Style isn't about spending more It's About... Well... STYLE! "
        </blockquote>

        {/* Call to action */}
        <Link
          target="_blank"
          href={
            'https://docs.google.com/forms/d/e/1FAIpQLSc67U7CiqG1uNp7ECpNl1aAstmm0JwAZ4isHOQlLg7wgTJPTA/viewform?usp=header'
          }
        >
          <button className="rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200">
            Get in Contact
          </button>
        </Link>
      </div>
    </section>
  )
}
