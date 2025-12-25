'use client'

import { ExclamationCircleIcon } from '@heroicons/react/16/solid'
import { useState } from 'react'

/**
 * @typedef {import('index').NovaForms.InputTextAreaProps} InputTextAreaProps
 */

/**
 * @param {InputTextAreaProps} props
 *
 * @returns {JSX.Element}
 */
export default function InputTextArea({ field, value, onChange, theme }) {
  const {
    name,
    title,
    placeholder = 'Enter text',
    description,
    optional,
    error,
    // TODO: Maybe range sanity-check this to force human-readable error over silent runtime errors with invalid rows? -Josh
    rows = 4, // default rows
  } = field

  const [isFocused, setIsFocused] = useState(false)
  const hasError = Boolean(error)

  // Determine border color
  const borderColor = hasError
    ? theme.error
    : isFocused
      ? theme.inputFocusBorder
      : theme.inputBorder

  return (
    <div>
      {/* Label + optional */}
      <div className="mb-1 flex justify-between">
        {title && (
          <label
            htmlFor={name}
            style={{ color: theme.label }}
            className="block text-sm/6 font-medium"
          >
            {title}
          </label>
        )}
        {optional && !hasError && (
          <span style={{ color: theme.description }} className="text-sm/6">
            Optional
          </span>
        )}
      </div>

      {/* Textarea */}
      <div className="relative mt-2">
        <textarea
          id={name}
          name={name}
          rows={rows}
          placeholder={placeholder}
          value={value || ''}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={
            hasError
              ? `${name}-error`
              : description
                ? `${name}-description`
                : undefined
          }
          style={{
            color: hasError ? theme.error : theme.inputText,
            backgroundColor: theme.inputBackground,
            borderColor: borderColor,
            borderWidth: '1px',
            borderStyle: 'solid',
            borderRadius: '0.375rem', // rounded-md
            padding: '0.375rem 0.75rem', // py-1.5 px-3
          }}
          className="block w-full text-base placeholder-opacity-50 outline-none sm:text-sm/6"
        />

        {/* Error icon inside textarea container */}
        {hasError && (
          <ExclamationCircleIcon
            aria-hidden="true"
            className="absolute right-3 top-2.5 size-5"
            style={{ color: theme.error }}
          />
        )}
      </div>

      {/* Error or description */}
      {hasError ? (
        <p
          id={`${name}-error`}
          style={{ color: theme.error }}
          className="mt-2 text-sm"
        >
          {error}
        </p>
      ) : description ? (
        <p
          id={`${name}-description`}
          style={{ color: theme.description }}
          className="mt-2 text-sm"
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
