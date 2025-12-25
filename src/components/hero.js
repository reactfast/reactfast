export default function Hero() {
  return (
    <section className="relative bg-gray-100">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-4xl font-bold text-primary">
          One step closer to snazzy.
        </h1>
        <p className="mb-8 text-lg">Make a lasting impression.</p>
        <a
          href={'/shop/category/all'}
          className="rounded-lg bg-primary px-6 py-2 text-white hover:bg-red-700"
        >
          Shop Now
        </a>
      </div>
    </section>
  )
}
