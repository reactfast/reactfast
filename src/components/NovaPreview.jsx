'use client'

import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { Form, createFormHandler, initForms } from '@reactfast/forms'

export function NovaPreview({
  fields,
  version = '1-0-0',
  className,
  ...props
}) {
  const [formData, setFormData] = useState({})
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Init fields & Nova Forms after mount
    initForms()

    // Initialize form data from defaults
    const initialData = {}
    if (fields && Array.isArray(fields)) {
      fields.forEach((field) => {
        if (field.defaultValue !== undefined) {
          initialData[field.name] = field.defaultValue
        }
      })
    }
    setFormData(initialData)
    setReady(true)
  }, [fields])

  if (!ready || !fields || !Array.isArray(fields)) {
    return (
      <div
        className={clsx(
          'rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800',
          className,
        )}
      >
        <div className="text-sm text-slate-500 dark:text-slate-400">
          Loading preview...
        </div>
      </div>
    )
  }

  const handleChange = createFormHandler({
    fields,
    setState: setFormData,
  })

  return (
    <div
      className={clsx(
        'rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900',
        className,
      )}
    >
      <div className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">
        Live Preview
      </div>
      <div className="nova-preview">
        <Form
          fields={fields}
          onChange={handleChange}
          formData={formData}
          {...props}
        />
      </div>

      {process.env.NODE_ENV === 'development' && (
        <details className="mt-4">
          <summary className="cursor-pointer text-xs text-slate-500 dark:text-slate-400">
            Form Data (Dev Only)
          </summary>
          <pre className="mt-2 overflow-auto rounded bg-slate-100 p-2 text-xs dark:bg-slate-800">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </details>
      )}
    </div>
  )
}
