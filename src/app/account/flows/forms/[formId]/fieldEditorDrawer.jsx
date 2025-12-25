import { useEffect, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ReturnFieldsV2 } from '@/components/formFields/returnFields'

const addOptions = [
  {
    name: 'options',
    title: 'Options',
    type: 'array',
    width: 100,
    helper: 'Add options for select, radio, or checkbox fields',
    fields: [
      {
        name: 'value',
        type: 'string',
        title: 'value',
        required: false,
        width: 100,
      },
      {
        name: 'label',
        type: 'string',
        title: 'Label',
        required: false,
        width: 100,
      },
    ],
  },
]

const fieldDynamicField = [
  {
    name: 'fields',
    title: 'Fields',
    type: 'array',
    width: 100,
    helper: 'Add fields for list of none to many.',
    fields: [
      {
        name: 'field type',
        type: 'select',
        title: 'Field Type',
        options: [
          'string',
          'text',
          'number',
          'email',
          'tel',
          'url',
          'select',
          'radio',
          'boolean',
          'toggle',
          'multiselect',
          'date',
          'datetime',
          'time',
          'color',
          'header',
          'paragraph',
          'image',
          'signature',
          'scale',
          'rating',
          'captcha',
        ],
        required: false,
        width: 100,
      },
    ],
  },
]

const fieldSettingsFields = [
  { type: 'header', title: 'General' },
  {
    name: 'name',
    title: 'Field Name (ID)',
    type: 'string',
    placeholder: 'contact-form',
    width: 100,
  },
  {
    name: 'label',
    title: 'Display Label',
    type: 'string',
    width: 100,
  },
  {
    name: 'type',
    title: 'Field Type',
    type: 'select',
    options: [
      'string',
      'text',
      'number',
      'email',
      'tel',
      'url',
      'select',
      'radio',
      'boolean',
      'toggle',
      'multiselect',
      'date',
      'datetime',
      'time',
      'color',
      'file',
      'array',
      'header',
      'paragraph',
      'image',
      'signature',
      'scale',
      'rating',
      'captcha',
    ],
    width: 50,
    required: true,
    helper: 'Select the type of pet',
    section: 'basic',
  },
  {
    name: 'helperText',
    title: 'Helper Text',
    type: 'Text',
    placeholder: '',
    width: 100,
  },
  {
    name: 'description',
    title: 'Description',
    type: 'text',
    placeholder: '',
    width: 100,
  },
  {
    name: 'placeholder',
    title: 'Placeholder Text',
    type: 'string',
    width: 100,
  },
  {
    name: 'defaultValue',
    title: 'Default Value',
    type: 'string',
    width: 100,
  },
]

export default function FieldEditorDrawer({ field, updateField, closeDrawer }) {
  const [localField, setLocalField] = useState(field || {})
  const [fieldFields, setFieldFields] = useState(fieldSettingsFields)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value
    setLocalField({ ...localField, [name]: newValue })
    updateField(name, newValue)
  }

  const handleNumberChange = (name, value) => {
    setLocalField({ ...localField, [name]: value })
    updateField(name, value)
  }

  useEffect(() => {
    let settings = []
    if (['select', 'radio', 'multiselect'].includes(localField.type)) {
      settings = [...fieldSettingsFields, ...addOptions]
    } else if (['array', 'dynamicForm'].includes(localField.type)) {
      settings = [...fieldSettingsFields, ...fieldDynamicField]
    } else {
      settings = fieldSettingsFields
    }
    setFieldFields(settings)
    console.log('Field type changed to', localField)
  }, [localField.type])

  // Handle select options for select/radio/checkbox fields
  const handleOptionsChange = (optionsText) => {
    const options = optionsText
      .split('\n')
      .filter((o) => o.trim())
      .map((o) => {
        const [value, label] = o.split('|').map((s) => s.trim())
        return { value: value || label, label: label || value }
      })
    setLocalField({ ...localField, options })
    updateField('options', options)
  }

  function handleFormDataChange(e) {
    const { name, value, type, checked, files } = e.target
    if (type === 'checkbox') {
      setLocalField((prev) => ({ ...prev, [name]: checked }))
      updateField(name, checked)
    } else if (type === 'file') {
      setLocalField((prev) => ({ ...prev, [name]: files[0] }))
      updateField(name, files[0])
    } else {
      setLocalField((prev) => ({ ...prev, [name]: value }))
      updateField(name, value)
    }
  }

  const optionsText =
    localField.options
      ?.map((o) => (o.value === o.label ? o.value : `${o.value}|${o.label}`))
      .join('\n') || ''

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-lg font-medium text-gray-900">
            Field Properties
          </h2>
          <p className="mt-0.5 text-sm text-gray-500">
            Configure {localField.label || localField.name || 'field'}
          </p>
        </div>
        <button
          onClick={closeDrawer}
          className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto py-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <>
              {fieldFields.map((f) => (
                <ReturnFieldsV2
                  key={f.name}
                  field={f}
                  onChange={handleFormDataChange}
                  label={f.title}
                  value={localField[f.name] || ''}
                />
              ))}
            </>

            <hr />
          </div>

          {/* Layout Section */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="mb-4 text-sm font-medium text-gray-900">Display</h3>
            <div className="mb-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="required"
                  checked={localField.required || false}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/20"
                />
                <span className="text-sm text-gray-700">Hidden field</span>
              </label>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Field Width
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[25, 50, 75, 100].map((w) => (
                  <button
                    key={w}
                    onClick={() => handleNumberChange('width', w)}
                    className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                      localField.width === w
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    } `}
                  >
                    {w}%
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Validation Section */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="mb-4 text-sm font-medium text-gray-900">
              Validation Rules
            </h3>

            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="required"
                  checked={localField.required || false}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/20"
                />
                <span className="text-sm text-gray-700">Required field</span>
              </label>

              {localField.type === 'string' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Min Length
                      </label>
                      <input
                        type="number"
                        name="minLength"
                        min={0}
                        value={localField.minLength || ''}
                        onChange={(e) =>
                          handleNumberChange(
                            'minLength',
                            Number(e.target.value),
                          )
                        }
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Max Length
                      </label>
                      <input
                        type="number"
                        name="maxLength"
                        min={0}
                        value={localField.maxLength || ''}
                        onChange={(e) =>
                          handleNumberChange(
                            'maxLength',
                            Number(e.target.value),
                          )
                        }
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Pattern (Regex)
                    </label>
                    <input
                      type="text"
                      name="pattern"
                      value={localField.pattern || ''}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="^[A-Z].*"
                    />
                  </div>
                </>
              )}

              {localField.type === 'number' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Min Value
                    </label>
                    <input
                      type="number"
                      name="min"
                      value={localField.min || ''}
                      onChange={(e) =>
                        handleNumberChange('min', Number(e.target.value))
                      }
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Max Value
                    </label>
                    <input
                      type="number"
                      name="max"
                      value={localField.max || ''}
                      onChange={(e) =>
                        handleNumberChange('max', Number(e.target.value))
                      }
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 pt-4">
        <button
          onClick={closeDrawer}
          className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
        >
          Done Editing
        </button>
      </div>
    </div>
  )
}
