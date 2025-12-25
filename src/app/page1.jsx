import React from 'react'

const LandingPage = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-12 p-6">
      {/* Hero Section */}
      <section className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">
          Jot.Cards: The Smarter Way to Network and Grow Your Digital Presence
        </h1>
        <p className="text-lg text-gray-600">
          Eco-friendly materials. Real-time updates. Analytics-driven insights.
          Unlock your potential with reusable cards and customizable digital
          pages.
        </p>
        <div className="space-x-4">
          <a
            href="/shop"
            className="rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            Shop Materials Now
          </a>
          <a
            href="/jot-space"
            className="rounded border border-blue-600 px-6 py-3 text-blue-600 hover:bg-blue-100"
          >
            Explore Free Digital Pages
          </a>
        </div>
      </section>

      {/* Showcase Section */}
      <section>
        <h2 className="text-center text-3xl font-bold">
          Why Choose Jot.Cards?
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded border p-4 shadow-sm">
            <h3 className="font-semibold">Eco-Friendly and Smart</h3>
            <p className="text-gray-600">
              Reusable materials with NFC and QR-code tech for real-time
              updates.
            </p>
          </div>
          <div className="rounded border p-4 shadow-sm">
            <h3 className="font-semibold">Free Digital Pages</h3>
            <p className="text-gray-600">
              Create and manage your free landing page on Jot.Space—perfect for
              sharing and networking.
            </p>
          </div>
          <div className="rounded border p-4 shadow-sm">
            <h3 className="font-semibold">Advanced Analytics</h3>
            <p className="text-gray-600">
              Gain actionable insights with every scan: geolocation, timestamps,
              and more.
            </p>
          </div>
        </div>
        {/* Add Image Slider Here */}
        <div className="mt-6 text-center">
          <img
            src="/images/slider-placeholder.png"
            alt="Product showcase"
            className="mx-auto"
          />
        </div>
      </section>

      {/* E-commerce Section */}
      <section>
        <h2 className="text-center text-3xl font-bold">
          Shop Smarter Materials
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded border p-4 shadow-sm">
            <h3 className="font-semibold">Classic White NFC Card</h3>
            <p className="text-gray-600">Eco-friendly and versatile.</p>
          </div>
          <div className="rounded border p-4 shadow-sm">
            <h3 className="font-semibold">Customizable QR Labels</h3>
            <p className="text-gray-600">Perfect for your business needs.</p>
          </div>
          <div className="rounded border p-4 shadow-sm">
            <h3 className="font-semibold">Starter Kit</h3>
            <p className="text-gray-600">NFC Card + QR Sticker combo.</p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <a
            href="/shop"
            className="rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            Shop All Products
          </a>
        </div>
      </section>

      {/* Jot.Space Integration Section */}
      <section>
        <h2 className="text-center text-3xl font-bold">
          Your Free Jot.Space Page Is Included
        </h2>
        <p className="mt-4 text-center text-gray-600">
          Every material comes with a free companion landing page on Jot.Space.
          Share your details, track engagement, and connect smarter.
        </p>
        <div className="mt-6 text-center">
          <img
            src="/images/mobile-mockup.png"
            alt="Mobile mockup of Jot.Space page"
            className="mx-auto"
          />
        </div>
      </section>

      {/* Subscription Section */}
      <section>
        <h2 className="text-center text-3xl font-bold">
          Unlock More with Jot.Space Pro
        </h2>
        <p className="mt-4 text-center text-gray-600">
          Upgrade your free page for advanced customizability, e-commerce
          features, and full control over your online presence.
        </p>
        <ul className="mt-6 list-inside list-disc space-y-2">
          <li>Add a custom domain.</li>
          <li>
            Integrate payment options like Venmo, CashApp, Zelle, and Stripe.
          </li>
          <li>Use referral links to drive growth.</li>
        </ul>
        <div className="mt-6 text-center">
          <a
            href="/jot-space-pro"
            className="rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            Learn About Jot.Space Pro
          </a>
        </div>
      </section>

      {/* Social Proof Section */}
      <section>
        <h2 className="text-center text-3xl font-bold">
          Trusted by Professionals and Innovators
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded border p-4 shadow-sm">
            <p className="text-gray-600">
              “Jot.Cards transformed the way I connect with clients!”
            </p>
            <p className="mt-2 font-semibold">– Alex T., Business Consultant</p>
          </div>
          <div className="rounded border p-4 shadow-sm">
            <p className="text-gray-600">
              “The analytics features on Jot.Space are a game-changer.”
            </p>
            <p className="mt-2 font-semibold">– Sarah W., Entrepreneur</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="space-y-4 text-center">
        <h2 className="text-3xl font-bold">
          Your Networking Revolution Starts Here
        </h2>
        <div className="space-x-4">
          <a
            href="/shop"
            className="rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            Shop Jot.Cards Now
          </a>
          <a
            href="/jot-space"
            className="rounded border border-blue-600 px-6 py-3 text-blue-600 hover:bg-blue-100"
          >
            Get Started Free on Jot.Space
          </a>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
