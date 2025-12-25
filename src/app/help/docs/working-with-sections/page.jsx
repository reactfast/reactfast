import React from 'react'

const BuilderAddSections = () => {
  return (
    <div className="prose prose-lg mx-auto max-w-4xl px-6 py-10">
      <h1 className="mb-4 text-4xl font-bold">Adding Sections</h1>

      <p>
        Sections are the core building blocks of your page. Here’s how to add
        and manage them using the builder.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">
        1. Click the “Add Section” Button
      </h2>
      <p>
        In the builder toolbar, click the <strong>Add Section</strong> button.
        This opens the section drawer where you’ll find a variety of content
        blocks to choose from.
      </p>
      <img
        src="https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/help/builder/Builder%20Tool%20Bar.png"
        alt="Toolbar showing Add Section button"
        className="mt-4 rounded-lg border border-gray-200 shadow"
      />
      <figcaption className="mt-2 text-sm text-gray-500">
        The Add Section button in the builder toolbar
      </figcaption>

      <h2 className="mt-10 text-2xl font-semibold">
        2. Browse and Select a Section
      </h2>
      <p>
        Once the drawer opens, you’ll see section categories. Double click a
        category to view available sections.
      </p>
      <img
        src="https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/help/builder/BuilderAddSection.png"
        alt="Section drawer with categories"
        className="mt-4 rounded-lg border border-gray-200 shadow"
      />
      <figcaption className="mt-2 text-sm text-gray-500">
        Double-click a category to explore sections
      </figcaption>

      <p className="mt-6">
        Then, double click the section you’d like to add to your page.
      </p>
      <img
        src="https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/help/builder/BuilderSelectSection.png"
        alt="Selecting a section"
        className="mt-4 rounded-lg border border-gray-200 shadow"
      />
      <figcaption className="mt-2 text-sm text-gray-500">
        Double-click to add the section to your page
      </figcaption>

      <h2 className="mt-10 text-2xl font-semibold">
        3. Manage Sections from the Left Panel
      </h2>
      <p>
        After adding a section, it appears in the section list on the left-hand
        side of the builder.
      </p>
      <img
        src="https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/help/builder/BuilderListItem.png"
        alt="List of added sections"
        className="mt-4 rounded-lg border border-gray-200 shadow"
      />
      <figcaption className="mt-2 text-sm text-gray-500">
        Your added section appears in the list
      </figcaption>

      <h3 className="mt-8 text-xl font-medium">🛠 Section Controls</h3>
      <p>Each section item has several control icons:</p>

      <ul className="mt-4 list-none space-y-4">
        <li>
          <strong>Edit:</strong> Opens the section editor.
          <br />
          <img
            src="https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/help/builder/ListItemEditButton.png"
            alt="Edit button"
            className="mt-2 rounded-lg border border-gray-200 shadow"
          />
        </li>
        <li>
          <strong>Reorder:</strong> Drag sections up or down using the handles.
          <br />
          <img
            src="https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/help/builder/ListItemReorder.png"
            alt="Reorder controls"
            className="mt-2 rounded-lg border border-gray-200 shadow"
          />
        </li>
        <li>
          <strong>Delete:</strong> Remove the section from your page.
          <br />
          <img
            src="https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/help/builder/ListItemDelete.png"
            alt="Delete button"
            className="mt-2 rounded-lg border border-gray-200 shadow"
          />
        </li>
        <li>
          <strong>Duplicate:</strong> Quickly clone the section.
          <br />
          <img
            src="https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/help/builder/ListItemDuplicate.png"
            alt="Duplicate button"
            className="mt-2 rounded-lg border border-gray-200 shadow"
          />
        </li>
      </ul>

      <div className="mt-10">
        <a
          href="#"
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Learn how to edit sections →
        </a>
      </div>
    </div>
  )
}

export default BuilderAddSections
