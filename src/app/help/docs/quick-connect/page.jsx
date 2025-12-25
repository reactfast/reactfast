import React from 'react'

const BuilderQuickConnect = () => {
  return (
    <div className="prose prose-lg mx-auto max-w-4xl px-6 py-10">
      <h1 className="mb-4 text-4xl font-bold">Using Quick Connect</h1>

      <p>
        <strong>Quick Connect</strong> is a premium feature that lets visitors
        reach out to you instantly via a pre-composed SMS or email. It's
        designed to reduce friction when someone wants to get in touch—perfect
        for networking, business, or lead capture.
      </p>

      <img
        src="https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/help/builder/BuilderQuickConnectSettings.png"
        alt="Quick Connect Settings"
        className="mt-4 rounded-lg border border-gray-200 shadow"
      />
      <figcaption className="mt-2 text-sm text-gray-500">
        Quick Connect settings panel
      </figcaption>

      <h2 className="mt-10 text-2xl font-semibold">What It Does</h2>
      <p>
        When enabled, Quick Connect adds one-click buttons to your page that
        allow others to:
      </p>
      <ul>
        <li>📩 Compose a pre-written email to you</li>
        <li>📲 Launch their SMS app with a custom message already typed</li>
      </ul>
      <p>
        These interactions happen instantly—no copy-pasting required. It’s ideal
        for real-time follow-ups, job leads, or client inquiries.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Settings Explained</h2>

      <h3 className="mt-6 text-xl font-medium">
        📱 Quick Connect Number & SMS Message
      </h3>
      <p>
        Set a phone number where you want to receive text messages. Then, define
        the default message that appears in the user's messaging app. They can
        edit it before sending, but this gives them a fast, thoughtful starting
        point.
      </p>

      <h3 className="mt-6 text-xl font-medium">
        📧 Quick Connect Email & Content
      </h3>
      <p>
        Provide the email address you want to receive messages at, and enter a
        subject + body for the pre-filled email. This helps visitors send
        well-formed inquiries with just one tap or click.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Premium Access Required</h2>
      <p>
        Quick Connect is available to premium Jot users. If you’re on a free
        plan, you’ll see a prompt encouraging you to upgrade in order to
        activate these features.
      </p>

      <div className="mt-10">
        <a
          href="/help/docs/edit-section"
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Learn how to edit your content →
        </a>
      </div>
    </div>
  )
}

export default BuilderQuickConnect
