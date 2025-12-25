import React from 'react'

const tagStyles = {
  'e-commerce': 'bg-green-100 text-green-800 ring-green-600/20',
  premium: 'bg-yellow-100 text-yellow-800 ring-yellow-600/20',
  default: 'bg-gray-50 text-gray-600 ring-gray-500/10',
}

const CategoryCard = ({ title, tags, description }) => {
  return (
    <div className="h-48 select-none rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-1 flex flex-wrap gap-1">
        {tags?.split(',').map((tag, idx) => {
          const trimmedTag = tag.trim()
          const style = tagStyles[trimmedTag] || tagStyles.default
          return (
            <span
              key={idx}
              className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${style}`}
            >
              {trimmedTag}
            </span>
          )
        })}
      </p>
      <p className="mt-2 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  )
}

export default CategoryCard
