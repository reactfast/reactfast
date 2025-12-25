import Footer1 from '@/components/footer_1'
import { Header } from '@/components/Header'
import { InteractivePreviewCard } from '@/components/IphonePets'

export const metadata = {
  title: 'Jot.Pets — Smart Pet Tags with QR Profiles',
  description:
    'Modern pet tags that help bring your furry friend home faster. Each tag links to a dynamic digital profile with your pet’s info, photo, vet notes, and emergency contacts.',
  keywords: [
    'smart pet tags',
    'QR code pet ID',
    'digital pet profile',
    'lost pet recovery',
    'pet QR tag',
    'Jot.Pets',
    'Jot.Space for pets',
  ],
  twitter: {
    card: 'summary_large_image',
    title: 'Jot.Pets — Smart Pet Tags',
    description:
      'QR-powered pet ID tags that open digital profiles in seconds. Keep your pet safe and always one scan away from home.',
    images: [
      'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/placeholders/JotPetsMetaImage.jpg',
    ],
    creator: '@jotcards',
  },
  openGraph: {
    title: 'Jot.Pets — Smart Tags for Smarter Pets',
    description:
      'Custom NFC/QR-enabled tags for your pet with real-time editable info. Easy to update, scan, and share.',
    url: 'https://www.jot.space/pets',
    siteName: 'Jot.Pets',
    images: [
      {
        url: 'https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/placeholders/JotPetsMetaImage.jpg',
        width: 1200,
        height: 630,
        alt: 'Jot.Pets Smart Tag Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function JotPetsPage() {
  return (
    <>
      <Header />

      {/* HERO SECTION */}
      <div className="bg-white">
        <div className="relative isolate">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
              <h1 className="font-cherry-bomb mt-10 text-5xl font-semibold tracking-tight text-primary drop-shadow-[10px_-10px_0px_#ceff1f] sm:text-7xl">
                Smart Tags for Smarter Pets.
              </h1>

              <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                Jot.Pets are QR-enabled pet tags that link to a live, updatable
                digital profile. If your pet ever gets lost, a simple scan shows
                rescuers exactly how to help them home — fast.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <a
                  href="/shop/category/969435f8-ba8a-48fc-ace0-075fb1d374d2"
                  className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Purchase Your Tag
                </a>
                <a
                  href="#howItWorks"
                  className="text-sm/6 font-semibold text-gray-900"
                >
                  Learn how it works <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            <InteractivePreviewCard />
          </div>
        </div>
      </div>

      {/* Emotional CTA Section */}
      <div className="bg-primary">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Every tag tells a story. <br />
              Make sure yours has a happy ending.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg/8 text-indigo-200">
              A missing pet is every owner’s nightmare. Jot.Pets helps bridge
              the gap between lost and found with one simple scan.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-x-6">
              <a
                href="/shop/category/969435f8-ba8a-48fc-ace0-075fb1d374d2"
                className="rounded-lg bg-white px-6 py-3 font-semibold text-primary shadow-md hover:bg-gray-100"
              >
                Select Your Tag
              </a>
              <a
                href="/account/upgrade"
                className="rounded-md bg-tertiary px-3.5 py-2.5 text-sm font-semibold text-primary shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Upgrade for Alerts
              </a>
              <a href="#features" className="text-sm font-semibold text-white">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Grid Section */}
      <div id="features" className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold text-primary">
              What Makes It Smart?
            </h2>
            <p className="mt-2 text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Not Just a Tag — It’s a Digital Lifeline
            </p>
            <p className="mt-6 text-lg text-gray-600">
              Jot.Pets goes far beyond engraving a name and number. Each tag
              unlocks a real-time, editable profile with everything a rescuer
              needs to know — instantly.
            </p>
          </div>

          <div className="mx-auto mt-20 max-w-2xl lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-16 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: 'Live QR Profile',
                  description:
                    'Scan the tag to view a custom profile with your pet’s photo, name, age, and contact info.',
                  icon: '/icons/qr.svg',
                },
                {
                  name: 'Medical & Vet Info',
                  description:
                    'Add allergy warnings, medications, vet name, and health notes — so responders know what to do.',
                  icon: '/icons/vet.svg',
                },
                {
                  name: 'Instant Contact',
                  description:
                    'Phone numbers, email, emergency contacts — all available with one tap.',
                  icon: '/icons/contact.svg',
                },
                {
                  name: 'Editable Anytime',
                  description:
                    'Update your pet’s info any time without replacing the tag. Stay current as they grow.',
                  icon: '/icons/edit.svg',
                },
                {
                  name: 'Multi-Pet Dashboard',
                  description:
                    'Manage multiple pets from one account and toggle between their profiles with ease.',
                  icon: '/icons/paw.svg',
                },
                {
                  name: 'Scan Notifications (Pro)',
                  description:
                    'Get notified instantly when someone scans your pet’s tag (premium users only).',
                  icon: '/icons/alert.svg',
                },
              ].map((feature) => (
                <div key={feature.name} className="relative pl-12">
                  <img
                    src={feature.icon}
                    alt=""
                    className="absolute left-0 top-0 size-8 text-primary"
                  />
                  <h3 className="text-lg font-semibold leading-7 text-gray-900">
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="howItWorks" className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold text-primary">
              How It Works
            </h2>
            <p className="mt-2 text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Your Pet’s Digital Lifeline — in 4 Easy Steps
            </p>
            <p className="mt-6 text-lg text-gray-600">
              From unboxing to scanning, Jot.Pets makes safety effortless.
              Here’s how it works from day one.
            </p>
          </div>

          <ol className="relative mx-auto mt-20 max-w-3xl border-l border-gray-300 pl-6">
            {[
              {
                title: '1. Register Your Tag',
                desc: 'Scan your Jot.Pets tag and create a free digital profile for your pet. Add their name, photo, and key info in minutes.',
              },
              {
                title: '2. Add Emergency Details',
                desc: 'List medications, allergy warnings, microchip numbers, and vet contacts to help others act quickly.',
              },
              {
                title: '3. Attach to Collar',
                desc: 'Secure the tag to your pet’s collar using the included ring or clip. No batteries. No setup. Always on.',
              },
              {
                title: '4. Anyone Can Scan',
                desc: 'If your pet is lost, a good Samaritan can scan the tag to view their profile and contact you instantly — no app needed.',
              },
            ].map((step, index) => (
              <li key={step.title} className="mb-16 ml-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-base text-gray-600">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold text-primary">
              Testimonials
            </h2>
            <p className="mt-2 text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Loved by Pet Parents and Rescuers Alike
            </p>
          </div>

          <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
            <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
              {[
                {
                  name: 'Lindsey R.',
                  handle: 'goldenmom.life',
                  imageUrl: 'https://randomuser.me/api/portraits/women/25.jpg',
                  body: 'Our golden retriever slipped her collar at the park. Someone scanned her tag and called me within minutes. I nearly cried from relief. These tags are a must-have for every dog owner.',
                },
                {
                  name: 'Mark D.',
                  handle: 'petsafe-mark',
                  imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
                  body: 'We run a small animal rescue, and we recommend Jot.Pets to every adopter. It’s affordable, modern, and so much safer than relying on a phone number alone.',
                },
                {
                  name: 'Alejandra M.',
                  handle: 'vettech.ale',
                  imageUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
                  body: 'As a vet tech, I’ve seen how fast Jot profiles help reunite owners. Having medical notes visible is a game-changer in emergencies.',
                },
                {
                  name: 'Riley G.',
                  handle: 'catdadlife',
                  imageUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
                  body: 'I love that I can update my cat’s info anytime. We travel a lot and knowing his tag always has our current number gives me peace of mind.',
                },
                {
                  name: 'Tasha K.',
                  handle: 'happytailsgrooming',
                  imageUrl: 'https://randomuser.me/api/portraits/women/48.jpg',
                  body: 'We started offering Jot.Pets as an add-on at our grooming salon and clients are obsessed. It’s the perfect upgrade from the old metal tags.',
                },
                {
                  name: 'Manny O.',
                  handle: 'dogwalker.dallas',
                  imageUrl: 'https://randomuser.me/api/portraits/men/51.jpg',
                  body: 'I manage over a dozen dogs daily. Having real-time info and a scannable backup on each pup’s collar is a lifesaver.',
                },
              ].map((testimonial) => (
                <div
                  key={testimonial.handle}
                  className="pt-8 sm:inline-block sm:w-full sm:px-4"
                >
                  <figure className="rounded-2xl bg-gray-50 p-8 text-sm/6">
                    <blockquote className="text-gray-900">
                      <p>{`“${testimonial.body}”`}</p>
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-x-4">
                      <img
                        alt=""
                        src={testimonial.imageUrl}
                        className="size-10 rounded-full bg-gray-50"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">
                          {testimonial.name}
                        </div>
                        <div className="text-gray-600">{`@${testimonial.handle}`}</div>
                      </div>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Updated Comparison Grid Section */}
      <div id="why" className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold text-primary">
              Compare for Yourself
            </h2>
            <p className="mt-2 text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Jot.Pets vs. Microchips vs. Old-School Tags
            </p>
            <p className="mt-6 text-lg text-gray-600">
              What happens when your pet goes missing? Here’s how the three most
              common identification tools stack up.
            </p>
          </div>

          <div className="mt-16 overflow-x-auto">
            <table className="mx-auto w-full max-w-7xl table-auto border-collapse text-left text-sm text-gray-700 shadow-md sm:text-base">
              <thead>
                <tr>
                  <th className="bg-white px-6 py-4 font-semibold text-gray-900">
                    Feature
                  </th>
                  <th className="bg-white px-6 py-4 font-semibold text-primary">
                    Jot.Pets
                  </th>
                  <th className="bg-white px-6 py-4 font-semibold text-[#2f855a]">
                    Microchip (RFID)
                  </th>
                  <th className="bg-white px-6 py-4 font-semibold text-gray-500">
                    Traditional Tag
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {[
                  {
                    feature: 'Editable in Real Time',
                    jot: '✔️ Instantly from your dashboard',
                    chip: '❌ Requires vet or registry call',
                    tag: '❌ Must replace the tag',
                  },
                  {
                    feature: 'Visible to Public',
                    jot: '✔️ Anyone can scan with phone',
                    chip: '❌ Requires special scanner',
                    tag: '✔️ Info is engraved on tag',
                  },
                  {
                    feature: 'Medical/Vet Notes',
                    jot: '✔️ Fully customizable fields',
                    chip: '❌ Not stored on chip',
                    tag: '❌ Not enough space',
                  },
                  {
                    feature: 'Scan Alerts (Pro)',
                    jot: '✔️ Get notified when scanned',
                    chip: '❌ No scan feedback',
                    tag: '❌ No tracking',
                  },
                  {
                    feature: 'Multi-Pet Dashboard',
                    jot: '✔️ All pets in one account',
                    chip: '❌ Each pet = separate registry',
                    tag: '❌ One tag per pet',
                  },
                  {
                    feature: 'Eco-Friendly',
                    jot: '✔️ Update, reuse, no waste',
                    chip: '✔️ Embedded for life',
                    tag: '❌ Replaced frequently',
                  },
                  {
                    feature: 'Requires Professional Install',
                    jot: '❌ DIY setup in minutes',
                    chip: '✔️ Requires vet procedure',
                    tag: '❌ Attach to collar manually',
                  },
                ].map((row) => (
                  <tr key={row.feature}>
                    <td className="px-6 py-4 font-medium text-black">
                      {row.feature}
                    </td>
                    <td className="px-6 py-4 text-primary">{row.jot}</td>
                    <td className="px-6 py-4 text-[#2f855a]">{row.chip}</td>
                    <td className="px-6 py-4 text-gray-500">{row.tag}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="bg-primary">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Give Your Pet the Digital Voice They Deserve
              <br />
              <span className="text-tertiary">
                Safe. Visible. One Scan Away.
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg/8 text-indigo-200">
              Jot.Pets tags do more than jingle — they protect, inform, and
              connect. Equip your pet with real-time, editable ID that works
              anywhere, any time.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-x-6">
              <a
                href="/shop/category/969435f8-ba8a-48fc-ace0-075fb1d374d2"
                className="rounded-lg bg-white px-6 py-3 font-semibold text-primary shadow-md hover:bg-gray-100"
              >
                Choose Your Tag
              </a>
              <a
                href="/account/upgrade"
                className="rounded-md bg-tertiary px-3.5 py-2.5 text-sm font-semibold text-primary shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Upgrade to Pro
              </a>
              <a href="#why" className="text-sm/6 font-semibold text-white">
                Why Jot.Pets ? <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer1 />
    </>
  )
}
