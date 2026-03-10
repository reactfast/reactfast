'use client'

import React from 'react'
import MarkdownDoc from './markdownRenderer'
import { Form, createFormHandler } from '@reactfast/forms'

// Handles live form previews inside Markdown
function ReactFastPreview({ fields }) {
  const [formData, setFormData] = React.useState({})
  const handleChange = createFormHandler({ fields, setState: setFormData })

  return (
    <div className="my-4 rounded-lg border bg-white p-4 shadow-sm">
      <Form fields={fields} formData={formData} onChange={handleChange} />
      <pre className="mt-4 rounded bg-gray-100 p-2 text-xs">
        {JSON.stringify(formData, null, 2)}
      </pre>
    </div>
  )
}

// This component wraps MarkdownDoc and injects preview functionality
export default function MarkdownDocWithPreviews({ url }) {
  const components = {
    'reactfast-preview': ({ children }) => {
      try {
        const parsed = JSON.parse(children)
        if (!parsed.fields) return null
        return <ReactFastPreview fields={parsed.fields} />
      } catch (e) {
        console.error('Failed to parse reactfast-preview block', e)
        return null
      }
    },
  }

  return <MarkdownDoc url={url} customComponents={components} />
}
