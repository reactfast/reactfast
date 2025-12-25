'use client'

import { useState } from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/16/solid'

export default function TimeInput({ field, value, onChange, theme }) {
  const {
    name,
    title,
    placeholder = 'HH:MM',
    description,
    required,
    error,
    helper,
    leadingIcon: LeadingIcon,
    trailingIcon: TrailingIcon,
    min, // optional min="09:00"
    max, // optional max="17:00"
    step, // optional step in seconds (e.g., 60 = 1 minute)
  } = field

  const [isFocused, setIsFocused] = useState(false)
  const hasError = Boolean(error)

  const borderColor = hasError
    ? theme.error
    : isFocused
      ? theme.inputFocusBorder
      : theme.inputBorder

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

      {/* Input */}
      <div className="relative">
        <input
          id={name}
          name={name}
          type="time"
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
          min={min}
          max={max}
          step={step}
          style={{
            color: theme.inputText,
            backgroundColor: theme.inputBackground,
            borderColor: borderColor,
            borderWidth: '1px',
            borderStyle: 'solid',
            borderRadius: '0.375rem',
            paddingLeft: LeadingIcon ? '2.5rem' : '0.75rem',
            paddingRight: TrailingIcon || hasError ? '2.5rem' : '0.75rem',
            outline: 'none',
          }}
          className="block w-full py-1.5 text-base sm:text-sm/6"
        />

        {/* Leading Icon */}
        {LeadingIcon && !hasError && (
          <LeadingIcon
            aria-hidden="true"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        )}

        {/* Trailing Icon */}
        {TrailingIcon && !hasError && (
          <TrailingIcon
            aria-hidden="true"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        )}

        {/* Error Icon */}
        {hasError && (
          <ExclamationCircleIcon
            aria-hidden="true"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500"
          />
        )}
      </div>

      {/* Error or Description */}
      {hasError ? (
        <p
          id={`${name}-error`}
          style={{ color: theme.error }}
          className="mt-1 text-sm"
        >
          {error}
        </p>
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
