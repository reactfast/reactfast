'use client'

import { useState } from 'react'
import Joyride from 'react-joyride'

const steps = [
  {
    target: '#step-2',
    content: 'This is the editor section of the jot.space builder.',
    placement: 'right',
  },
  {
    target: '#step-3',
    content: 'This is the Live preview of your site.',
    placement: 'right',
  },
  {
    target: '#step-4',
    content: 'This is your unique site name.',
  },
  {
    target: '#step-5',
    content: 'This is your unique site URL. You can visit your site here.',
  },
  {
    target: '#step-6',
    content: 'You can quickly copy your site link to share with friends.',
  },
  {
    target: '#step-7',
    content: 'Click here to add new sections to your site.',
    placement: 'right',
  },
  {
    target: '#step-8',
    content:
      'This is where you can modify the theme of your site, including colors and fonts.',
  },
  {
    target: '#step-9',
    content:
      'This is where you can edit your page settings, including meta title, description, and social media preview image.',
  },
  {
    target: '#step-10',
    content:
      'When modifying the layout order of your sections, you need to save when you are done.',
  },
]

export default function GuidedTour() {
  const [run, setRun] = useState(false)
  const [showModal, setShowModal] = useState(true)

  const handleJoyrideCallback = (data) => {
    const { status } = data
    if (status === 'finished' || status === 'skipped') {
      setRun(false) // Stop tour when finished
    }
  }

  return (
    <>
      {/* Welcome Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-sm rounded-lg bg-white p-6 text-center shadow-lg">
            <h2 className="mb-4 text-2xl font-bold">
              Welcome to the Jot Builder
            </h2>
            <p className="mb-6 text-gray-600">
              Take a quick tour to learn about key features.
            </p>
            <button
              className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
              onClick={() => {
                setShowModal(false)
                setRun(true)
              }}
            >
              Start Tour
            </button>
          </div>
        </div>
      )}

      {/* Joyride Guided Tour */}
      <Joyride
        steps={steps}
        run={run}
        continuous
        scrollToFirstStep
        showSkipButton
        showProgress
        callback={handleJoyrideCallback}
        styles={{
          options: {
            overlayColor: 'rgba(0, 0, 0, 0.5)', // Grey out background
            primaryColor: '#1E40AF', // Changes color of Next button
            textColor: '#333', // Text color inside tooltips
            zIndex: 1000, // Ensure Joyride is above everything
            width: 400, // Tooltip width
          },
        }}
      />
    </>
  )
}
