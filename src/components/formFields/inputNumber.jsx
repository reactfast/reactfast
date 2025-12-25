'use client'

import { ExclamationCircleIcon } from '@heroicons/react/16/solid'

export default function InputNumber({ field, value, onChange }) {
  const {
    name,
    label,
    placeholder = 'Enter a number',
    description,
    optional,
    error,
    min,
    max,
    step,
  } = field

  const hasError = Boolean(error)

  return (
    <div>
      {/* Label + optional */}
      <div className="flex justify-between">
        {label && (
          <label
            htmlFor={name}
            className="block text-sm/6 font-medium text-gray-900 dark:text-white"
          >
            {label}
          </label>
        )}
        {optional && !hasError && (
          <span className="text-sm/6 text-gray-500 dark:text-gray-400">
            Optional
          </span>
        )}
      </div>

      {/* Number input */}
      <div className="relative mt-2">
        <input
          id={name}
          name={name}
          type="number"
          value={value || 0}
          placeholder={placeholder}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={
            hasError
              ? `${name}-error`
              : description
                ? `${name}-description`
                : undefined
          }
          className={[
            'block w-full rounded-md bg-white px-4 py-1.5 text-base outline outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6',
            'dark:bg-white/5',
            hasError
              ? 'text-red-900 outline-red-300 focus:outline-red-600 dark:text-red-400 dark:outline-red-500/50 dark:placeholder:text-red-400/70 dark:focus:outline-red-400'
              : 'text-gray-900 outline-gray-300 focus:outline-indigo-600 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500',
          ].join(' ')}
        />

        {/* Error icon */}
        {hasError && (
          <ExclamationCircleIcon
            aria-hidden="true"
            className="absolute right-3 top-2.5 size-5 text-red-500 dark:text-red-400"
          />
        )}
      </div>

      {/* Error or description */}
      {hasError ? (
        <p
          id={`${name}-error`}
          className="mt-2 text-sm text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      ) : description ? (
        <p
          id={`${name}-description`}
          className="mt-2 text-sm text-gray-500 dark:text-gray-400"
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
