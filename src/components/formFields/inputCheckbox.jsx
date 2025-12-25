'use client'

export default function InputCheckbox({ field, value, onChange }) {
  const { name, label, optional, description, error } = field
  const hasError = Boolean(error)

  return (
    <div>
      <div className="flex items-center space-x-2">
        <input
          id={name}
          name={name}
          type="checkbox"
          checked={!!value}
          onChange={onChange}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={
            hasError
              ? `${name}-error`
              : description
                ? `${name}-description`
                : undefined
          }
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <label htmlFor={name} className="text-sm text-gray-700 dark:text-white">
          {label || field.title || 'Option'}
          {optional && !hasError && (
            <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
              (Optional)
            </span>
          )}
        </label>
      </div>

      {hasError ? (
        <p
          id={`${name}-error`}
          className="mt-1 text-sm text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      ) : description ? (
        <p
          id={`${name}-description`}
          className="mt-1 text-sm text-gray-500 dark:text-gray-400"
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
