'use client'

import { useState } from 'react'
import { Form, createFormHandler } from '@reactfast/forms'

const fields = [
  { name: 'firstName', title: 'First Name', type: 'string', width: 50 },
  { name: 'lastName', title: 'Last Name', type: 'string', width: 50 },
  { name: 'email', title: 'Email', type: 'email', width: 100 },
  { name: 'subscribe', title: 'Subscribe?', type: 'boolean', width: 100 },
]

export default function Page() {
  const [formData, setFormData] = useState({})

  const handleChange = createFormHandler({
    fields,
    setState: setFormData,
  })

  return <Form fields={fields} onChange={handleChange} formData={formData} />
}
