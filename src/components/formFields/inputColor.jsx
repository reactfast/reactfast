'use client'

export default function InputColor({ field, value, onChange }) {
  const { name, title, description, optional, error } = field

  const hasError = Boolean(error)

  return (
    <div>
      {/* Label + optional */}
      <div className="flex justify-between">
        {title && (
          <label
            htmlFor={name}
            className="block text-sm/6 font-medium text-gray-900 dark:text-white"
          >
            {title}
          </label>
        )}
        {optional && !hasError && (
          <span className="text-sm/6 text-gray-500 dark:text-gray-400">
            Optional
          </span>
        )}
      </div>

      {/* Color input + preview */}
      <div className="mt-2 flex items-center space-x-3">
        {/* Value preview text */}

        {/* Color picker */}
        <input
          id={name}
          name={name}
          type="color"
          value={value || '#000000'}
          onChange={onChange}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={
            hasError
              ? `${name}-error`
              : description
                ? `${name}-description`
                : undefined
          }
          className="h-10 w-10 cursor-pointer rounded-md border-0 p-0 shadow-none focus:ring-2 focus:ring-indigo-600"
        />
        <p className="text-sm text-gray-900 dark:text-gray-200">
          {value || 'No Color Selected'}
        </p>
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
