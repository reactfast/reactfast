import React from 'react'
import DocsFooter from '../docsFooter'

const JotIntroPage = () => {
  return (
    <>
      <div className="prose prose-lg mx-auto max-w-4xl px-6 py-10">
        <h1 className="mb-4 text-4xl font-bold">Welcome to Jot.Space</h1>

        <p>
          <strong>Jot.Space</strong> is a mobile-first website builder that
          pairs with physical QR codes and smart links to make sharing your
          identity and content easier than ever—whether in person, online, or
          anywhere in between.
        </p>

        <p>
          Each page you build on Jot.Space is uniquely customizable with
          metadata designed to shine across every platform: from rich link
          previews in social media, to fast tap-and-share QR experiences, to
          personal profiles sent via SMS or email.
        </p>

        <h2 className="mt-10 text-2xl font-semibold">
          Built for Instant Connection
        </h2>
        <p>
          Unlike traditional website builders, Jot is optimized for{' '}
          <strong>lightning-fast access</strong>, on mobile, with zero setup.
          Create a page in minutes, customize it visually, and share it
          instantly using your Jot device or dynamic QR.
        </p>

        <h2 className="mt-10 text-2xl font-semibold">
          Share Like Never Before
        </h2>
        <p>Jot enables unparalleled flexibility for sharing your identity:</p>
        <ul>
          <li>📱 Tap a Jot device or scan a QR to connect in person</li>
          <li>🌐 Post your page on social media with rich metadata previews</li>
          <li>✉️ Drop a link in your email signature or marketing materials</li>
          <li>
            📲 Share via SMS, messaging apps, or business card replacements
          </li>
        </ul>

        <h2 className="mt-10 text-2xl font-semibold">
          A Mobile App Is Coming Soon
        </h2>
        <p>
          We're actively developing the official <strong>Jot mobile app</strong>{' '}
          to give you even more control and instant editing power from your
          device. Stay tuned!
        </p>
      </div>
      <DocsFooter
        nextUrl="/help/docs/quick-start"
        BtnText="Get Started with Jot"
      />
    </>
  )
}

export default JotIntroPage
