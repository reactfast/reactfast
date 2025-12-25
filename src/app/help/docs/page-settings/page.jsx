import React from 'react'

const BuilderSiteSettings = () => {
  return (
    <div className="prose prose-lg mx-auto max-w-4xl px-6 py-10">
      <h1 className="mb-4 text-4xl font-bold">Page Settings</h1>

      <p>
        The Site Settings drawer allows you to control your page’s visibility,
        branding, and sharing behavior. These options help customize how your
        page appears and interacts with visitors.
      </p>

      <img
        src="https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/help/builder/BuilderSiteSettings1.png"
        alt="Site Settings Panel"
        className="mt-4 rounded-lg border border-gray-200 shadow"
      />
      <figcaption className="mt-2 text-sm text-gray-500">
        Main Site Settings panel in the builder
      </figcaption>

      <h2 className="mt-10 text-2xl font-semibold">1. Page Name</h2>
      <p>
        The <strong>Page Name</strong> is your public-facing URL slug. For
        example, if you set your page name to <code>jonathon-mcclendon</code>,
        your live page might appear at <code>jot.cards/jonathon-mcclendon</code>
        .
      </p>

      <h2 className="mt-10 text-2xl font-semibold">2. Published</h2>
      <p>
        Toggle the <strong>Published</strong> status to control page visibility.
        When set to <strong>Active</strong>, your page is live and publicly
        accessible. Turning this off will unpublish the page, making it
        invisible to others.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">3. Hide Jot Branding</h2>
      <p>
        If you're aiming for a fully white-labeled experience, you can choose to{' '}
        <strong>remove Jot branding</strong> from your landing page. Don’t
        worry—we won’t take it personally.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">
        4. Ask User to Share Contact
      </h2>
      <p>
        Enable this setting to prompt visitors to share their contact
        information when they view your page. This is a simple way to build your
        personal or business network.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">
        5. Let Jot Ask to Create Free Account
      </h2>
      <p>
        This setting allows Jot to encourage your page visitors to create a free
        account after viewing your content. It helps expand the network of Jot
        users through shared interactions.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">6. Show Menu</h2>
      <p>
        Toggle this option to show or hide your page's top menu. This can
        simplify the look for single-section pages or landing pages, or provide
        navigation for multi-section layouts.
      </p>

      <div className="mt-10">
        <a
          href="/help/docs/builder-basics"
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Back to Builder Basics →
        </a>
      </div>
    </div>
  )
}

export default BuilderSiteSettings
