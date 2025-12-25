'use client'

import { ReturnFieldsV2 } from '@/components/formFields/returnFields'
import { useState } from 'react'

export default function FormThemePage() {
  const [formData, setFormData] = useState({})

  const defaultTheme = {
    title: '#000',
    label: '#111',
    inputText: '#000',
    inputBackground: '#fff',
    inputBorder: '#ebebeb',
    inputPlaceholder: '#888',
    inputFocusBorder: '#020DF9',
    description: '#555',
    error: '#ff0000',
    requiredAsterisk: '#020DF9',
  }

  function handleFormDataChange(e) {
    const { name, value, type, checked, files } = e.target
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const formFieldsDef = [
    {
      type: 'color',
      name: 'title',
      title: 'Title Color',
      defaultValue: defaultTheme.title,
    },
    {
      type: 'color',
      name: 'label',
      title: 'Label Color',
      defaultValue: defaultTheme.label,
    },
    {
      type: 'color',
      name: 'inputText',
      title: 'Input Text Color',
      defaultValue: defaultTheme.inputText,
    },
    {
      type: 'color',
      name: 'inputBackground',
      title: 'Input Background Color',
      defaultValue: defaultTheme.inputBackground,
    },
    {
      type: 'color',
      name: 'inputBorder',
      title: 'Input Border Color',
      defaultValue: defaultTheme.inputBorder,
    },
    {
      type: 'color',
      name: 'inputPlaceholder',
      title: 'Input Placeholder Color',
      defaultValue: defaultTheme.inputPlaceholder,
    },
    {
      type: 'color',
      name: 'inputFocusBorder',
      title: 'Input Focus Border Color',
      defaultValue: defaultTheme.inputFocusBorder,
    },
    {
      type: 'color',
      name: 'description',
      title: 'Description Color',
      defaultValue: defaultTheme.description,
    },
    {
      type: 'color',
      name: 'error',
      title: 'Error Color',
      defaultValue: defaultTheme.error,
    },
    {
      type: 'color',
      name: 'requiredAsterisk',
      title: 'Required Asterisk Color',
      defaultValue: defaultTheme.requiredAsterisk,
    },
  ]

  return (
    <>
      <div>
        {formFieldsDef.map((f) => (
          <ReturnFieldsV2
            key={f.name}
            field={f}
            onChange={handleFormDataChange}
            label={f.title}
            value={formData[f.name] || ''}
          />
        ))}
      </div>
    </>
  )
}
