'use client'

import { useRef, useState, useEffect } from 'react'
import SignaturePad from 'signature_pad'
import { ExclamationCircleIcon } from '@heroicons/react/16/solid'

/**
 * @typedef {import('index').NovaForms.SignatureInputProps} SignatureInputProps
 */

/**
 * @param {SignatureInputProps} props
 *
 * @returns {JSX.Element}
 */
export default function SignatureInput({ field, value, onChange, theme }) {
  const { name, title, description, required, helper } = field
  const canvasRef = useRef(null)
  const signaturePadRef = useRef(null)

  const [error, setError] = useState(null)

  useEffect(() => {
    if (canvasRef.current) {
      signaturePadRef.current = new SignaturePad(canvasRef.current, {
        backgroundColor: theme.inputBackground || '#fff',
        penColor: theme.inputText || '#000',
      })
    }
  }, [theme])

  const handleClear = () => {
    signaturePadRef.current.clear()
    setError(required ? 'Signature is required' : null)
    onChange({ target: { name, value: '' } })
  }

  const handleSave = () => {
    if (signaturePadRef.current.isEmpty()) {
      if (required) {
        setError('Signature is required')
      }
      return
    }
    const data = signaturePadRef.current.toDataURL('image/png')
    setError(null)
    onChange({ target: { name, value: data } })
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
          {!required && !error && (
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

      {/* Signature Pad */}
      <div
        className="rounded-lg border"
        style={{
          borderColor: error ? theme.error : theme.inputBorder,
          backgroundColor: theme.inputBackground,
        }}
      >
        <canvas
          ref={canvasRef}
          width={400}
          height={150}
          style={{ width: '100%', height: '150px' }}
        />
      </div>

      {/* Controls */}
      <div className="mt-2 flex gap-2">
        <button
          type="button"
          onClick={handleClear}
          className="rounded-md border px-3 py-1 text-sm"
          style={{
            borderColor: theme.inputBorder,
            color: theme.inputText,
            backgroundColor: theme.inputBackground,
          }}
        >
          Clear
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="rounded-md px-3 py-1 text-sm"
          style={{
            borderColor: theme.inputFocusBorder,
            color: theme.inputText,
            backgroundColor: theme.inputBackground,
          }}
        >
          Save
        </button>
      </div>

      {/* Error or Description */}
      {error ? (
        <div className="mt-1 flex items-center gap-1">
          <ExclamationCircleIcon
            aria-hidden="true"
            className="h-4 w-4 text-red-500"
          />
          <p
            id={`${name}-error`}
            style={{ color: theme.error }}
            className="text-sm"
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
