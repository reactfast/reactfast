'use client'

import { useEffect, useState } from 'react'
import { Form, createFormHandler, initForms } from '@reactfast/forms'

// Example fields to test your Form
const fields = [
  { name: 'firstName', title: 'First Name', type: 'string', width: 50 },
  { name: 'lastName', title: 'Last Name', type: 'string', width: 50 },
  { name: 'email', title: 'Email', type: 'email', width: 100 },
  { name: 'subscribe', title: 'Subscribe?', type: 'boolean', width: 100 },
]

// Optional rules to test attribute overrides
const rules = [
  {
    name: 'subscribeRule',
    effects: [{ targetField: 'email', prop: 'readOnly', value: true }],
  },
]

export default function TestFormPage() {
  const [ready, setReady] = useState(false)
  const [formData, setFormData] = useState({})

  // 🔑 Initialize Nova Forms AFTER React is alive
  useEffect(() => {
    initForms()
    setReady(true)
  }, [])

  // Prevent rendering before fields are registered
  if (!ready) return null

  const handleChange = createFormHandler({
    fields,
    setState: setFormData,
  })

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="mb-4 text-2xl font-bold">
        Test Form with createFormHandler
      </h1>

      <Form
        fields={fields}
        rules={rules}
        formData={formData}
        onChange={handleChange}
        isMobileView={false}
      />

      <div className="mt-6 rounded border bg-gray-50 p-4">
        <h2 className="mb-2 font-semibold">Current Form Data:</h2>
        <pre className="text-sm">{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </div>
  )
}
