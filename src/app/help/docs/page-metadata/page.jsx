import React from 'react'

const BuilderMetadataSettings = () => {
  return (
    <div className="prose prose-lg mx-auto max-w-4xl px-6 py-10">
      <h1 className="mb-4 text-4xl font-bold">Metadata Settings</h1>

      <p>
        Metadata Settings allow you to control how your page appears when shared
        on platforms like social media, text messaging apps, and search engines.
        This feature is part of our <strong>premium access plan</strong> and
        helps personalize your link previews for a more branded experience.
      </p>

      <img
        src="https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/help/builder/BuilderSettingsMetadata.png"
        alt="Metadata Settings Panel"
        className="mt-4 rounded-lg border border-gray-200 shadow"
      />
      <figcaption className="mt-2 text-sm text-gray-500">
        Customize how your page appears in link previews
      </figcaption>

      <h2 className="mt-10 text-2xl font-semibold">What Is Metadata?</h2>
      <p>
        Metadata includes the <strong>title</strong>,{' '}
        <strong>description</strong>, and <strong>preview image</strong> that
        show up when your link is shared. By default, Jot branding is applied to
        these previews, but premium users can override it with their own
        content.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Why Customize It?</h2>
      <p>
        When you control your metadata, your page looks polished and
        professional everywhere it's shared—whether it's in DMs, on Twitter,
        LinkedIn, or inside an email signature. It reinforces your personal or
        business brand.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">What Can I Edit?</h2>
      <ul>
        <li>
          <strong>Meta Title</strong>: The headline shown in link previews
        </li>
        <li>
          <strong>Meta Description</strong>: A short summary under the title
        </li>
        <li>
          <strong>Preview Image</strong>: A thumbnail shown in most share embeds
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Who Can Use This?</h2>
      <p>
        Metadata customization is available to users on a premium Jot plan. If
        you're not yet subscribed, you'll see a prompt letting you know it's a
        premium feature.
      </p>

      <div className="mt-10">
        <a
          href="/help/docs/page-settings"
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Learn more about Page Settings →
        </a>
      </div>
    </div>
  )
}

export default BuilderMetadataSettings
