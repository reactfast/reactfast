'use client'

/**
 * @typedef {import('index').NovaForms.FormHeaderProps} FormHeaderProps
 */

// #region Constants

/**
 * Map size prop to Tailwind classes
 */
const sizeClasses = {
  sm: 'text-sm font-medium',
  md: 'text-lg font-semibold',
  lg: 'text-xl font-bold',
}

// #endregion

// #region Components

/**
 * @param {FormHeaderProps} props
 *
 * @returns {JSX.Element}
 */
export default function FormHeader({ field }) {
  const {
    title,
    size = 'md', // sm, md, lg
    dividerAbove = false,
    dividerBelow = false,
  } = field

  return (
    <div className="my-4">
      {dividerAbove && (
        <hr className="mb-2 border-gray-300 dark:border-gray-600" />
      )}
      <h2 className={`${sizeClasses[size]} text-gray-900 dark:text-white`}>
        {title}
      </h2>
      {dividerBelow && (
        <hr className="mt-2 border-gray-300 dark:border-gray-600" />
      )}
    </div>
  )
}

// #endregion
