'use client'

import { useState } from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/16/solid'

export default function RadioGroup({ field, value, onChange, theme }) {
  const {
    name,
    title,
    description,
    required,
    error,
    helper,
    options = [],
  } = field

  const [touched, setTouched] = useState(false)
  const hasError = Boolean(error || (required && touched && !value))

  return (
    <div>
      {/* Label */}
      {title && (
        <div className="mb-1 flex justify-between">
          <label
            id={`${name}-label`}
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

      {/* Radio Options */}
      <div
        className="space-y-2"
        role="radiogroup"
        aria-labelledby={`${name}-label`}
      >
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex cursor-pointer items-center space-x-2"
            style={{ color: theme.inputText }}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={(e) => onChange(e.target.value)} // ✅ fixed
              onBlur={() => setTouched(true)}
              style={{
                accentColor: hasError ? theme.error : theme.inputFocusBorder,
              }}
              className="h-4 w-4"
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>

      {/* Error / Description */}
      {hasError ? (
        <div className="mt-1 flex items-center space-x-1">
          <ExclamationCircleIcon
            aria-hidden="true"
            className="h-4 w-4 text-red-500"
          />
          <p
            id={`${name}-error`}
            style={{ color: theme.error }}
            className="text-sm"
          >
            {error || 'This field is required'}
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
