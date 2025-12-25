import Footer1 from '@/components/footer_1'
import { Header } from '@/components/Header'

export const metadata = {
  title: 'Partner with Jot.Pets — Wholesale & Consignment',
  description:
    'Bring smarter pet safety to your customers. Jot.Pets partners with retailers, vets, groomers, and shelters to offer smart QR pet tags at wholesale or on consignment.',
  keywords: [
    'pet wholesale',
    'consignment pet products',
    'wholesale pet ID tags',
    'QR pet tags retail',
    'partner with Jot.Pets',
    'Jot.Pets wholesale',
  ],
  openGraph: {
    title: 'Partner with Jot.Pets — Wholesale & Consignment',
    description:
      'Retail-ready smart pet tags. High-margin, modern, and built to sell. Apply today for wholesale or consignment partnership.',
    url: 'https://www.jot.space/pets/partners',
    siteName: 'Jot.Pets',
    images: [
      {
        url: 'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/placeholders/JotPetsMetaImage.jpg',
        width: 1200,
        height: 630,
        alt: 'Jot.Pets Wholesale Partner Program',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function JotPetsPartnersPage() {
  return (
    <>
      <Header />

      {/* HERO */}
      <div className="bg-white">
        <div className="relative isolate">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mt-6 text-pretty text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                Partner with Jot.Pets
              </h1>
              <p className="mt-8 text-pretty text-lg font-medium text-gray-600 sm:text-xl/8">
                Stock smarter pet tags your customers will love. Our wholesale
                and consignment programs make it easy for pet boutiques, vets,
                shelters, and groomers to carry Jot.Pets in-store.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="#apply"
                  className="rounded-md bg-primary px-6 py-3 font-semibold text-white shadow-sm hover:bg-indigo-500"
                >
                  Apply Now
                </a>
                <a
                  href="#why"
                  className="text-sm/6 font-semibold text-gray-900"
                >
                  Why Partner With Us? →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VALUE PROPS */}
      <div id="why" className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold text-primary">
              Why Retailers Love Jot.Pets
            </h2>
            <p className="mt-2 text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              More Than a Tag. A Selling Point.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-12 lg:max-w-none lg:grid-cols-3">
            {[
              {
                title: 'Retail-Ready Packaging',
                desc: 'Compact, eye-catching designs built for shelves and displays.',
              },
              {
                title: 'High-Margin Product',
                desc: 'Competitive wholesale pricing ensures strong ROI per unit.',
              },
              {
                title: 'Customer Demand',
                desc: 'Pet parents want modern, tech-enabled safety — and this sells itself.',
              },
              {
                title: 'Eco-Friendly',
                desc: 'Reusable tags reduce waste compared to old engraved tags.',
              },
              {
                title: 'Simple Sell-Through',
                desc: 'No batteries. No apps. Customers scan once and understand instantly.',
              },
              {
                title: 'Support & Training',
                desc: 'Marketing materials, displays, and staff resources included.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PARTNER TYPES */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="text-base font-semibold text-primary">
            Who We Work With
          </h2>
          <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Perfect for Every Pet Business
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Our wholesale and consignment options are designed to fit businesses
            of all sizes.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              'Pet Boutiques & Salons',
              'Veterinary Clinics',
              'Pet Supply Stores',
              'Shelters & Rescues',
            ].map((partner) => (
              <div
                key={partner}
                className="rounded-xl border border-gray-200 bg-gray-50 p-6 font-medium text-gray-900"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODELS */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-base font-semibold text-primary">
              Partnership Models
            </h2>
            <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Flexible Programs That Work for You
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {[
              {
                name: 'Wholesale',
                desc: 'Buy in bulk at discounted rates. Stock Jot.Pets and sell directly to your customers.',
              },
              {
                name: 'Consignment',
                desc: 'No upfront costs. Pay only for what you sell. Perfect for testing demand.',
              },
              {
                name: 'Co-Branding',
                desc: 'Add your logo to custom tags for brand-aligned retail partnerships.',
              },
            ].map((model) => (
              <div
                key={model.name}
                className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-200"
              >
                <h3 className="text-xl font-semibold text-gray-900">
                  {model.name}
                </h3>
                <p className="mt-4 text-gray-600">{model.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA / FORM */}
      <div id="apply" className="bg-primary">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center text-white">
            <h2 className="text-4xl font-semibold sm:text-5xl">
              Let’s Grow Together
            </h2>
            <p className="mt-6 text-lg text-indigo-200">
              Ready to bring smarter pet safety to your customers? Apply today
              for wholesale or consignment partnership.
            </p>
            <div className="mt-10">
              <a
                href="mailto:sales@jot.space?subject=Wholesale%20Partnership%20Inquiry"
                className="rounded-lg bg-white px-6 py-3 font-semibold text-primary shadow-md hover:bg-gray-100"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer1 />
    </>
  )
}
