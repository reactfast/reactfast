'use client'

import { useState } from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/16/solid'

/** @import { Dispatch, SetStateAction } from 'react' */

// #region Constants

/**
 * @type {RegExp}
 *
 * Regex for 10 digits only.
 */
const REGEX_PHONE = /^\d{10}$/

/**
 * @type {RegExp}
 *
 * For generic digits string-processing.
 */
const REGEX_DIGIT = /\D/g

// #endregion

// #region Components

/**
 * @typedef {import('index').NovaForms.PhoneProps} PhoneProps
 */

/**
 * @param {PhoneProps} props
 *
 * @returns {JSX.Element}
 */
export default function PhoneInput({ field, value, onChange, theme }) {
  const {
    name,
    title,
    placeholder = '(123) 456-7890',
    description,
    required,
    helper,
    leadingIcon: LeadingIcon,
    trailingIcon: TrailingIcon,
  } = field

  const [isFocused, setIsFocused] = useState(false)

  /** @type {[string|null, Dispatch<SetStateAction<string|null>>]} */
  const [error, setError] = useState(null)

  const hasError = Boolean(error)

  const borderColor = hasError
    ? theme.error
    : isFocused
      ? theme.inputFocusBorder
      : theme.inputBorder

  // Masking formatter: (123) 456-7890
  const formatPhone = (input) => {
    const digits = input.replace(REGEX_DIGIT, '').slice(0, 10) // only 10 digits max
    const parts = []

    if (digits.length > 0) parts.push('(' + digits.substring(0, 3))
    if (digits.length >= 4) parts.push(') ' + digits.substring(3, 6))
    if (digits.length >= 7) parts.push('-' + digits.substring(6, 10))

    return parts.join('')
  }

  const handleChange = (e) => {
    const formatted = formatPhone(e.target.value)
    onChange({ target: { name, value: formatted } })
  }

  const handleBlur = () => {
    setIsFocused(false)
    const rawDigits = (value || '').replace(REGEX_DIGIT, '')
    if (required && !rawDigits) {
      setError('Phone number is required')
    } else if (rawDigits && !REGEX_PHONE.test(rawDigits)) {
      setError('Please enter a valid 10-digit phone number')
    } else {
      setError(null)
    }
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

      {/* Input */}
      <div className="relative">
        <input
          id={name}
          name={name}
          type="tel"
          placeholder={placeholder}
          value={value || ''}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={
            hasError
              ? `${name}-error`
              : description
                ? `${name}-description`
                : undefined
          }
          // baked-in validation helpers
          pattern="\d{10}"
          maxLength={14} // formatted length: (123) 456-7890
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

// #endregion
