'use client'

import { useState } from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/16/solid'

/**
 * @typedef {import('index').NovaForms.InputDefaultProps} InputDefaultProps
 */

/**
 * @param {InputDefaultProps} props
 *
 * @returns {JSX.Element}
 */
export default function InputDefault({ field, value, onChange, theme }) {
  const {
    name,
    title,
    type = 'text',
    placeholder = 'Enter text',
    description,
    required,
    error,
    helper,
    leadingIcon: LeadingIcon,
    trailingIcon: TrailingIcon,
    pattern, // string | RegExp | Array<{ regex, message } | string>
  } = field

  const [isFocused, setIsFocused] = useState(false)
  const hasError = Boolean(error)

  // Determine border color
  const borderColor = hasError
    ? theme.error
    : isFocused
      ? theme.inputFocusBorder
      : theme.inputBorder

  // Pattern validation (client-side, non-blocking display)
  let patternError = ''
  if (pattern) {
    const checks = Array.isArray(pattern) ? pattern : [pattern]
    for (const p of checks) {
      const re = typeof p === 'object' && p?.regex ? p.regex : p
      const msg = typeof p === 'object' && p?.message ? p.message : 'Invalid format'
      try {
        const regex = re instanceof RegExp ? re : new RegExp(re)
        if (!regex.test(String(value || ''))) {
          patternError = msg
          break
        }
      } catch (e) {
        // invalid regex, ignore gracefully
      }
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

      {/* Input wrapper */}
      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value || ''}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          readOnly={field.readOnly === true}
          aria-readonly={field.readOnly === true ? 'true' : 'false'}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={
            hasError
              ? `${name}-error`
              : description
                ? `${name}-description`
                : undefined
          }
          style={{
            color: theme.inputText,
            backgroundColor: theme.inputBackground,
            borderColor: borderColor,
            borderWidth: '1px',
            borderStyle: 'solid',
            borderRadius: '0.375rem', // default rounded-md
            paddingLeft: LeadingIcon ? '2.5rem' : '0.75rem',
            paddingRight: TrailingIcon || hasError ? '2.5rem' : '0.75rem',
            outline: 'none', // disable default focus outline
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
      {hasError || patternError ? (
        <p
          id={`${name}-error`}
          style={{ color: theme.error }}
          className="mt-1 text-sm"
        >
          {patternError || error}
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
