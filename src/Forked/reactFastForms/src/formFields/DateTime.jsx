'use client'

import { useState } from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/16/solid'

/**
 * @typedef {import('index').NovaForms.DateTimeProps} DateTimeProps
 */

/**
 * @param {DateTimeProps} props
 *
 * @returns {JSX.Element}
 */
export default function DateTime({ field, value, onChange, theme }) {
  const { name, title, description, helper, optional, required, error } = field

  const [isFocused, setIsFocused] = useState(false)
  const hasError = Boolean(error)

  const borderColor = hasError
    ? theme.error
    : isFocused
      ? theme.inputFocusBorder
      : theme.inputBorder

  // Format a date value to "YYYY-MM-DDTHH:mm" (what <input type="datetime-local"> expects)
  const formatDateTimeLocal = (val) => {
    if (!val) return ''
    const d = new Date(val)
    if (isNaN(d)) return ''
    return d.toISOString().slice(0, 16)
  }

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
            {required && (
              <span
                style={{ color: theme.requiredAsterisk }}
                className="ml-1 text-xs"
              >
                *
              </span>
            )}
          </label>
        )}
        {optional && !hasError && (
          <span style={{ color: theme.description }} className="text-sm/6">
            Optional
          </span>
        )}
      </div>

      {helper && (
        <p style={{ color: theme.description }} className="mb-1 text-xs">
          {helper}
        </p>
      )}

      {/* Input */}
      <div className="relative">
        <input
          id={name}
          name={name}
          type="datetime-local"
          value={formatDateTimeLocal(value)}
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
            borderRadius: '0.375rem',
            padding: '0.375rem 0.75rem',
          }}
          className="block w-full text-base outline-none sm:text-sm/6"
        />

        {/* Error icon */}
        {hasError && (
          <ExclamationCircleIcon
            aria-hidden="true"
            className="absolute right-3 top-2.5 h-5 w-5"
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
