import React from 'react'

const BuilderEditSections = () => {
  return (
    <div className="prose prose-lg mx-auto max-w-4xl px-6 py-10">
      <h1 className="mb-4 text-4xl font-bold">Editing Sections</h1>

      <p>
        Once a section is added to your page, you can customize it by editing
        its content and settings. Each section has different input fields
        designed to help it shine.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Renaming Your Section</h2>
      <p>
        At the top of the section editor, you'll find a field where you can
        rename your section. This is helpful for organizing your
        layout—especially if you're using multiple similar sections.
      </p>

      <img
        src="https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/help/builder/SectionEdit.png"
        alt="Editing a section"
        className="mt-4 rounded-lg border border-gray-200 shadow"
      />
      <figcaption className="mt-2 text-sm text-gray-500">
        Editing a section title and content
      </figcaption>

      <h2 className="mt-10 text-2xl font-semibold">Making It Your Own</h2>
      <p>
        The highlighted editor area will look different depending on the type of
        section you selected. For example, a contact form will have fields for
        phone and email, while a hero section may include a headline and
        background image.
      </p>

      <p className="mt-4">
        Fill out the inputs provided to personalize your section with real
        content. These fields are what bring your section to life, so take a
        moment to give it the info it needs to shine.
      </p>

      <p className="mt-4">
        Once you're done editing, click <strong>Update Section</strong> to save
        your changes.
      </p>

      <div className="mt-10">
        <a
          href="#"
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Learn how to style your page →
        </a>
      </div>
    </div>
  )
}

export default BuilderEditSections
