'use client'

import { useState } from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/16/solid'

export default function ScaleInput({ field, value, onChange, theme }) {
  const {
    name,
    title,
    description,
    required,
    helper,
    min = 1,
    max = 10,
    step = 1, // just in case you want 1–5 or 2–20 etc.
  } = field

  const [error, setError] = useState(null)
  const hasError = Boolean(error)

  const handleChange = (val) => {
    if (required && !val) {
      setError('Selection is required')
    } else {
      setError(null)
    }
    onChange({ target: { name, value: val } })
  }

  const numbers = []
  for (let i = min; i <= max; i += step) {
    numbers.push(i)
  }

  return (
    <div>
      {/* Label */}
      {title && (
        <div className="mb-1 flex justify-between">
          <label
            htmlFor={name}
            style={{ color: theme.label }}
            className="block text-sm/6 font-medium"
          >
            {title}
            {required && (
              <span style={{ color: theme.requiredAsterisk }}> *</span>
            )}
          </label>
          {!required && !hasError && (
            <span style={{ color: theme.description }} className="text-sm/6">
              Optional
            </span>
          )}
        </div>
      )}

      {helper && (
        <p style={{ color: theme.description }} className="mb-1 text-xs">
          {helper}
        </p>
      )}

      {/* Scale (radio buttons) */}
      <div
        id={name}
        role="radiogroup"
        className="flex flex-wrap gap-2"
        aria-invalid={hasError ? 'true' : 'false'}
        aria-describedby={
          hasError
            ? `${name}-error`
            : description
              ? `${name}-description`
              : undefined
        }
      >
        {numbers.map((num) => (
          <label key={num} className="flex flex-col items-center text-sm">
            <input
              type="radio"
              name={name}
              value={num}
              checked={String(value) === String(num)}
              onChange={() => handleChange(num)}
              className="peer hidden"
            />
            <span
              className="cursor-pointer rounded-md px-3 py-1 peer-checked:font-bold"
              style={{
                border: `1px solid ${
                  String(value) === String(num)
                    ? theme.inputFocusBorder
                    : theme.inputBorder
                }`,
                backgroundColor:
                  String(value) === String(num)
                    ? theme.inputBackground
                    : 'transparent',
                color:
                  String(value) === String(num)
                    ? theme.inputText
                    : theme.description,
              }}
            >
              {num}
            </span>
          </label>
        ))}
      </div>

      {/* Error or Description */}
      {hasError ? (
        <div className="mt-1 flex items-center gap-1">
          <ExclamationCircleIcon
            aria-hidden="true"
            className="h-4 w-4 text-red-500"
          />
          <p
            id={`${name}-error`}
            style={{ color: theme.error }}
            className="mt-1 text-sm"
          >
            {error}
          </p>
        </div>
      ) : description ? (
        <p
          id={`${name}-description`}
          style={{ color: theme.description }}
          className="mt-1 text-sm"
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
