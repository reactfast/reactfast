import React from 'react'

const EditQRCodeGuide = () => {
  return (
    <div className="prose prose-lg mx-auto max-w-4xl px-6 py-10">
      <h1 className="mb-4 text-4xl font-bold">Editing a QR Code</h1>

      <p className="text-gray-700">
        Jot QR codes are dynamic, meaning you can change where they lead even
        after they're printed or deployed. Here's how to edit and manage them.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">
        Accessing the QR Code Editor
      </h2>
      <p>
        To begin, locate the QR code you want to modify and click the{' '}
        <strong>Edit</strong> button next to it. This will open the QR code
        editor where you can manage its identity and behavior.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Updating the QR Name</h2>
      <p>
        The <strong>Name</strong> field lets you label your QR code. This is
        only visible to you and is used to help identify and organize QR codes
        in your analytics dashboard.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">
        Changing the Redirect URL
      </h2>
      <p>
        Under the <strong>Redirect Page</strong> or URL field, you can enter a
        new destination. When someone scans the QR code, they’ll be taken to
        this new page immediately.
      </p>
      <p>
        This is the core benefit of a <strong>dynamic QR code</strong>: you
        don’t need to reprint or reassign QR codes just to change where they go.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">
        Tracking and Identification
      </h2>
      <p>
        Every QR code you create with Jot is assigned a{' '}
        <strong>unique ID</strong>. This allows us to track scans, update
        behavior, and associate each code with a specific device or campaign —
        even when redirecting to an external site.
      </p>
      <p>
        You’ll be able to preview the QR and test the redirect immediately after
        saving your changes.
      </p>

      <div className="mt-10">
        <a
          href="#"
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Learn how to track QR analytics →
        </a>
      </div>
    </div>
  )
}

export default EditQRCodeGuide
