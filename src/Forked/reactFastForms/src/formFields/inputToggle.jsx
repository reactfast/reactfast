'use client'

/**
 * @typedef {import('index').NovaForms.InputToggleProps} InputToggleProps
 */

/**
 * @param {InputToggleProps} props
 *
 * @returns {JSX.Element}
 */
export default function InputToggle({ field, value, onChange }) {
  const { name, title, description, error } = field
  const hasError = Boolean(error)

  return (
    <div className="flex items-center justify-between gap-3">
      {description ? (
        <>
          <span className="flex grow flex-col">
            <label
              id={`${name}-label`}
              className="text-sm/6 font-medium text-gray-900 dark:text-white"
            >
              {title}
            </label>
            <span
              id={`${name}-description`}
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              {description}
            </span>
          </span>

          <label className="relative inline-flex w-11 shrink-0 cursor-pointer items-center">
            <input
              id={name}
              name={name}
              type="checkbox"
              checked={!!value}
              onChange={(e) => onChange(e)}
              aria-labelledby={`${name}-label`}
              aria-describedby={`${name}-description`}
              className="peer sr-only"
            />
            <div className="h-6 w-11 rounded-full bg-gray-200 transition-colors duration-200 ease-in-out peer-checked:bg-indigo-600 dark:bg-white/5 dark:peer-checked:bg-indigo-500"></div>
            <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out peer-checked:translate-x-5" />
          </label>
        </>
      ) : (
        <>
          <label className="relative inline-flex w-11 shrink-0 cursor-pointer items-center">
            <input
              id={name}
              name={name}
              type="checkbox"
              checked={!!value}
              onChange={(e) => onChange(e)}
              aria-labelledby={`${name}-label`}
              className="peer sr-only"
            />
            <div className="h-6 w-11 rounded-full bg-gray-200 transition-colors duration-200 ease-in-out peer-checked:bg-indigo-600 dark:bg-white/5 dark:peer-checked:bg-indigo-500"></div>
            <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out peer-checked:translate-x-5" />
          </label>

          <div className="text-sm">
            <label
              id={`${name}-label`}
              htmlFor={name}
              className="cursor-pointer font-medium text-gray-900 dark:text-white"
            >
              {title}
            </label>
          </div>
        </>
      )}

      {hasError && (
        <p
          id={`${name}-error`}
          className="mt-1 text-sm text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  )
}
