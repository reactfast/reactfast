import React from 'react'

const BuilderThemeDrawer = () => {
  return (
    <div className="prose prose-lg mx-auto max-w-4xl px-6 py-10">
      <h1 className="mb-4 text-4xl font-bold">Using the Theme Drawer</h1>

      <p>
        The Theme Drawer helps you style your entire page with a unified look
        and feel. These settings control the background, text, and accent colors
        across your layout, and affect how certain sections render. Here's a
        breakdown of each option.
      </p>

      <img
        src="https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/help/builder/BuilderThemeMenu.png"
        alt="Theme Drawer Screenshot"
        className="mt-4 rounded-lg border border-gray-200 shadow"
      />
      <figcaption className="mt-2 text-sm text-gray-500">
        The Theme Drawer controls global page styling
      </figcaption>

      <h2 className="mt-10 text-2xl font-semibold">
        1. Background Color & Background Image
      </h2>
      <p>
        You can set a <strong>background color</strong> and optionally add a{' '}
        <strong>background image</strong>. If a background image is provided, it
        takes priority and will appear behind all content.
      </p>
      <p>
        <strong>Tip:</strong> For better performance and design cohesion, we
        recommend matching your background color to the image’s average tone.
        This ensures a smoother experience for users with slower connections who
        may see the background color before the image loads.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">2. Foreground Color</h2>
      <p>
        The <strong>foreground color</strong> applies to card-based sections.
        Think of it as a secondary background — it adds depth and contrast for
        elements that sit “on top” of the base background.
      </p>
      <p>
        Many premade Jot sections use this foreground color to create visual
        layering and separation between content blocks.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">3. Font Selection</h2>
      <p>
        Choose from a curated list of Google Fonts to apply a consistent
        typographic style across your entire page. Once selected, the font is
        applied globally, making your layout feel professional and cohesive.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">4. Font Color</h2>
      <p>
        Set the <strong>font color</strong> for all text across the page. This
        includes headings, paragraphs, and buttons unless overridden by
        section-specific styles.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">5. Theme Colors</h2>
      <p>
        There are four customizable theme colors: <strong>Primary</strong>,{' '}
        <strong>Secondary</strong>, and two additional accent colors. These
        colors are referenced within Jot sections that are{' '}
        <em>tagged as theme-compatible</em>.
      </p>
      <p>
        These sections inherit most of their styling from your theme settings,
        giving you a unified, brand-like appearance with minimal effort. While
        this sacrifices some per-section customization, it ensures visual
        harmony throughout the page.
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

export default BuilderThemeDrawer
