import React from 'react'

const BuilderBasics = () => {
  return (
    <div className="prose prose-lg mx-auto max-w-4xl px-6 py-10">
      <h1 className="mb-4 text-4xl font-bold">Builder Basics</h1>

      <p className="text-gray-700">
        The builder toolbar gives you access to everything you need to create,
        customize, and publish your page. Here's an overview of the main tools
        and how to use them:
      </p>

      <img
        src="https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/help/builder/Builder%20Tool%20Bar.png"
        alt="Builder Toolbar Interface"
        className="mt-6 rounded-lg border border-gray-200 shadow"
      />
      <figcaption className="mt-2 text-sm text-gray-500">
        The Builder toolbar with all main controls
      </figcaption>

      <h2 className="mt-10 text-2xl font-semibold text-gray-800">
        Toolbar Overview
      </h2>

      <h3 className="mt-6 text-xl font-medium text-gray-700">🔙 Back Button</h3>
      <p>
        Located at the far left of the toolbar, the back button takes you out of
        the builder and back to your list of pages. Use this to exit the editor
        and manage or create new pages.
      </p>

      <h3 className="mt-6 text-xl font-medium text-gray-700">➕ Add Section</h3>
      <p>
        This button opens the <strong>section drawer</strong>, where you can
        choose and insert content sections like hero banners, contact forms,
        galleries, or testimonials. It's the main way to build out your page
        structure.
      </p>

      <h3 className="mt-6 text-xl font-medium text-gray-700">🎨 Theme</h3>
      <p>
        Clicking the Theme button opens the <strong>theme drawer</strong>. Here
        you can adjust the visual style of your page—such as colors, fonts, and
        spacing. It's a great way to ensure consistency and match your branding.
      </p>

      <h3 className="mt-6 text-xl font-medium text-gray-700">⚙️ Settings</h3>
      <p>
        The settings button opens a panel with options specific to your page,
        such as page metadata, SEO options, or custom scripts. These settings
        only apply to the current page you're editing.
      </p>

      <h3 className="mt-6 text-xl font-medium text-gray-700">
        🌐 Status Selector
      </h3>
      <p>
        Use the status selector to publish or delist your page. A{' '}
        <strong>Published</strong> page is live and visible online. A{' '}
        <strong>Delisted</strong> page is saved but hidden from public view.
        Toggle between these states to control visibility.
      </p>

      <div className="mt-8">
        <a
          href="#"
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Learn how to add sections →
        </a>
      </div>
    </div>
  )
}

export default BuilderBasics
