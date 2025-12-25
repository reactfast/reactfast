export function CTASection() {
  return (
    <section className="bg-gradient-to-r from-purple-500 to-indigo-600 py-16 text-center text-white">
      <h2 className="text-3xl font-bold">
        Join Thousands of Professionals, Teams, and Businesses
      </h2>
      <p className="mt-4">Upgrade your networking game with Jot.Cards.</p>
      <div className="mt-6 space-x-4">
        <a
          href="/shop/category/all"
          className="rounded-lg bg-white px-6 py-3 font-semibold text-indigo-600 shadow-md hover:bg-gray-100"
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
          className="rounded-lg bg-purple-500 px-6 py-3 font-semibold text-white shadow-md hover:bg-purple-600"
        >
          Go Pro
        </a>
      </div>
    </section>
  )
}
