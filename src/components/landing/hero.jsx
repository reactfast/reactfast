export function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-indigo-600 py-20 text-center text-white">
      <h1 className="text-4xl font-bold">The Future of Networking is Here</h1>
      <p className="mt-4 text-lg">
        Smart Digital Business Cards & Custom Link Pages That Make Lasting
        Connections
      </p>
      <div className="mt-6 space-x-4">
        <a
          href="/shop/category/all"
          className="rounded-lg px-6 py-3 font-semibold text-white shadow-md ring-1 ring-inset ring-gray-300"
        >
          Get Your Card
        </a>
        <a
          href="/account"
          className="rounded-lg bg-green-500 px-6 py-3 font-semibold text-white shadow-md hover:bg-green-600"
        >
          Start for Free
        </a>
        <a
          href="/account"
          className="rounded-lg bg-secondary px-6 py-3 font-semibold text-white shadow-md"
        >
          Go Pro
        </a>
      </div>
    </section>
  )
}
