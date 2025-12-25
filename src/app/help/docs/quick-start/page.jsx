import React from 'react'
import DocFeedback from '../feedback'

const QuickStartGuide = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-white text-gray-800 sm:flex-row">
        <main className="mx-auto max-w-4xl flex-1 px-6 py-10">
          <div className="prose prose-lg max-w-none">
            <h1 className="mb-6 text-4xl font-bold">Quick Start Guide</h1>

            <p>Follow these simple steps to create your site using Jot.</p>

            {/* Step 1 */}
            <h2 className="mt-10 text-2xl font-semibold">
              1. Navigate to Pages
            </h2>
            <p>
              On desktop, click <strong>“Pages”</strong> from the left-hand
              navigation bar. On mobile, open the hamburger menu and select{' '}
              <strong>“Pages”</strong>.
            </p>
            <img
              src="https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/help/quickstart/quickstart1.png"
              alt="Select Pages"
              className="mt-4 rounded-lg border border-gray-200 shadow-sm"
            />
            <figcaption className="mt-2 text-sm text-gray-500">
              Selecting Pages from the sidebar
            </figcaption>

            {/* Step 2 */}
            <h2 className="mt-10 text-2xl font-semibold">
              2. Choose a Template or Start from Scratch
            </h2>
            <p>
              Choose to <strong>build from a template</strong> or{' '}
              <strong>start with a blank canvas</strong>.
            </p>
            <img
              src="https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/help/quickstart/quickstart2.png"
              alt="Select Template"
              className="mt-4 rounded-lg border border-gray-200 shadow-sm"
            />
            <figcaption className="mt-2 text-sm text-gray-500">
              Choosing a template or starting from scratch
            </figcaption>

            {/* Step 3 (Template flow) */}
            <h3 className="mt-8 text-xl font-medium">➡️ Using a Template</h3>
            <ol className="list-inside list-decimal space-y-1">
              <li>
                Enter your <strong>Page Information</strong>
              </li>
              <li>
                Add <strong>Social Links</strong>
              </li>
              <li>
                Fill in your <strong>Contact Card</strong> details
              </li>
              <li>
                Select your <strong>Template</strong>
              </li>
            </ol>
            <p className="mt-2">
              You’ll then be prompted to{' '}
              <strong>choose or claim a unique site name</strong>. Once done,
              you'll be brought into the builder.
            </p>

            {/* Step 3 (Scratch flow) */}
            <h3 className="mt-6 text-xl font-medium">
              ➡️ Starting from Scratch
            </h3>
            <p>
              Select <strong>Create Blank</strong> and choose a{' '}
              <strong>unique site name</strong> to go directly into the builder.
            </p>
            <img
              src="https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/help/quickstart/quickstart3.png"
              alt="Create Blank"
              className="mt-4 rounded-lg border border-gray-200 shadow-sm"
            />
            <figcaption className="mt-2 text-sm text-gray-500">
              Creating a site from scratch
            </figcaption>

            {/* Next Steps */}
            <h2 className="mt-10 text-2xl font-semibold">Next Steps</h2>
            <p>
              Once you're in the builder, you'll be able to fully customize your
              page. We’ll soon add in-depth videos and docs.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="#"
                className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
              >
                Learn the Jot Builder
              </a>
              <a
                href="#"
                className="inline-block rounded-lg bg-gray-100 px-6 py-3 font-medium text-gray-800 transition hover:bg-gray-200"
              >
                Get Started
              </a>
            </div>
          </div>
        </main>
      </div>
      <DocFeedback />
    </>
  )
}

export default QuickStartGuide
