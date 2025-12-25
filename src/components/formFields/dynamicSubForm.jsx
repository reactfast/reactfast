'use client'

import { useEffect, useState } from 'react'
import { ReturnFieldsV2 } from './returnFields'

export default function DynamicSubForm({
  fields,
  onSave,
  title = 'Item',
  value = [],
}) {
  const [objFields, setObjFields] = useState([])
  const [valueArray, setValueArray] = useState([])
  const [isDirty, setIsDirty] = useState(false)
  const singular = title.endsWith('s') ? title.slice(0, -1) : title

  useEffect(() => {
    if (fields && fields.length > 0) {
      setObjFields(fields)
    } else {
      setObjFields([
        { name: 'profileImg', type: 'fileV2', title: 'Profile Image' },
        { name: 'altText', type: 'string', title: 'Image Alt Text' },
      ])
    }

    // Initialize valueArray with existing values
    if (Array.isArray(value)) {
      setValueArray(value)
    }
  }, [fields, value])

  const markDirty = () => setIsDirty(true)

  const handleAddBtn = () => {
    setValueArray((prev) => [...prev, {}])
    markDirty()
  }

  const handleFieldChange = (index, e) => {
    const { name, value } = e.target
    const updated = [...valueArray]
    updated[index] = { ...updated[index], [name]: value }
    setValueArray(updated)
    markDirty()
  }

  const handleRemove = (index) => {
    const updated = [...valueArray]
    updated.splice(index, 1)
    setValueArray(updated)
    markDirty()
  }

  const moveUp = (index) => {
    if (index === 0) return
    const updated = [...valueArray]
    const temp = updated[index - 1]
    updated[index - 1] = updated[index]
    updated[index] = temp
    setValueArray(updated)
    markDirty()
  }

  const moveDown = (index) => {
    if (index === valueArray.length - 1) return
    const updated = [...valueArray]
    const temp = updated[index + 1]
    updated[index + 1] = updated[index]
    updated[index] = temp
    setValueArray(updated)
    markDirty()
  }

  const handleSave = () => {
    onSave?.(valueArray)
    setIsDirty(false)
  }

  return (
    <>
      {title && (
        <div className="mb-1 flex justify-between">
          <label className="block text-sm/6 font-medium">{title}</label>
        </div>
      )}
      <div className="mb-6 space-y-4 rounded-lg bg-neutral-100 p-4 shadow-inner">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleAddBtn}
            className="rounded bg-primary px-4 py-2 text-white hover:bg-primary/80"
          >
            Add +
          </button>

          <button
            type="button"
            onClick={handleSave}
            className={`rounded px-4 py-2 text-white transition ${
              isDirty
                ? 'bg-yellow-500 hover:bg-yellow-600'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isDirty ? 'Save Changes ✱' : 'Saved ✅'}
          </button>
        </div>

        {valueArray.map((entry, index) => (
          <div
            key={index}
            className="relative space-y-2 rounded border bg-white p-4 shadow"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-600">
                {singular} #{index + 1}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => moveUp(index)}
                  disabled={index === 0}
                  className="rounded bg-gray-200 px-2 py-1 text-xs hover:bg-gray-300 disabled:opacity-50"
                >
                  ↑ Up
                </button>
                <button
                  onClick={() => moveDown(index)}
                  disabled={index === valueArray.length - 1}
                  className="rounded bg-gray-200 px-2 py-1 text-xs hover:bg-gray-300 disabled:opacity-50"
                >
                  ↓ Down
                </button>
                <button
                  onClick={() => handleRemove(index)}
                  className="rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
                >
                  ✕ Remove
                </button>
              </div>
            </div>

            {objFields.map((field, fIndex) => (
              <>
                <ReturnFieldsV2
                  key={fIndex}
                  field={field}
                  value={entry[field.name] || ''}
                  onChange={(e) => handleFieldChange(index, e)}
                />
              </>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}
