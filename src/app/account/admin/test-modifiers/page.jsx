'use client'

import { useState } from 'react'
import { createFormHandler } from '@/components/formFields/helpers/createFormHandler'
import { ReturnFieldsV2 } from '@/components/formFields/returnFields'
import { initializeFormData } from '@/components/formFields/helpers/initializeFormData'

const fields = [
  {
    name: 'firstName',
    type: 'string',
    title: 'First Name',
    modifiers: [
      {
        target: 'displayName',
        type: 'concat',
        kind: 'string',
        when: 'true', // trigger when non-empty
        value: ' ', // adds space before last name
      },
    ],
  },
  {
    name: 'lastName',
    type: 'string',
    title: 'Last Name',
    modifiers: [
      {
        target: 'displayName',
        type: 'concat',
        kind: 'string',
        when: 'true',
        value: 'Doe', // append last name
      },
    ],
  },
  {
    name: 'displayName',
    type: 'string',
    title: 'Display Name',
    default: '',
    readOnly: true,
  },
  {
    name: 'profilePhoto',
    type: 'fileV2',
    title: 'Profile Photo',
    modifiers: [
      {
        target: 'photoPrice',
        type: 'add',
        kind: 'number',
        when: 'true', // has a file
        value: 15,
      },
      {
        target: 'photoPrice',
        type: 'subtract',
        kind: 'number',
        when: 'false', // removed or null
        value: 15,
      },
    ],
  },
  {
    name: 'photoPrice',
    type: 'string',
    title: 'Photo Price',
    default: 22,
    readOnly: true,
  },
  {
    name: 'age',
    type: 'string',
    title: 'Age',
    modifiers: [
      {
        target: 'discount',
        type: 'multiply',
        kind: 'percent',
        when: 'greater than',
        value: 60, // apply senior discount
      },
      {
        target: 'discount',
        type: 'multiply',
        kind: 'percent',
        when: 'less than',
        value: 18, // apply youth discount
      },
    ],
  },
  {
    name: 'discount',
    type: 'string',
    title: 'Discount',
    default: 0,
    readOnly: true,
  },
  {
    name: 'orderTotal',
    type: 'string',
    title: 'Order Total',
    default: 100,
    readOnly: true,
    modifiers: [
      {
        target: 'finalTotal',
        type: 'replace',
        kind: 'number',
        when: 'greater than',
        value: 200,
      },
      {
        target: 'finalTotal',
        type: 'subtract',
        kind: 'number',
        when: 'between',
        value: [50, 200],
      },
    ],
  },
  {
    name: 'finalTotal',
    type: 'string',
    title: 'Final Total',
    default: 0,
    readOnly: true,
  },
  {
    name: 'email',
    type: 'string',
    title: 'Email',
    modifiers: [
      {
        target: 'emailValid',
        type: 'replace',
        kind: 'string',
        when: 'matches',
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // regex validation
      },
    ],
  },
  {
    name: 'emailValid',
    type: 'string',
    title: 'Email Valid?',
    default: 'No',
    readOnly: true,
  },
]

export default function TestForm() {
  const [formData, setFormData] = useState(() => initializeFormData(fields))

  const handleChange = createFormHandler({
    fields,
    setState: setFormData,
  })

  return (
    <form className="space-y-4">
      {fields.map((field) => (
        <ReturnFieldsV2
          key={field.name}
          field={field}
          value={formData[field.name]}
          onChange={handleChange}
        />
      ))}

      <div className="rounded border bg-gray-50 p-2">
        <h3 className="mb-2 font-bold">Form Data Debug:</h3>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </form>
  )
}
