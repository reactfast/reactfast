// components/AppCard.jsx
import Link from 'next/link'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

export default function AppCard({
  title,
  description,
  route,
  tag,
  icon,
  variant = 'default',
}) {
  const badgeStyleMap = {
    'admin tool': 'bg-blue-50 text-blue-800 ring-blue-600/20',
    'Feature Test': 'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
    Testing: 'bg-purple-50 text-purple-800 ring-purple-600/20',
  }

  const cardClasses =
    variant === 'testing'
      ? 'border border-dashed opacity-75 hover:bg-gray-50'
      : 'border shadow hover:bg-gray-50'

  return (
    <Link
      href={route}
      className={`flex items-center gap-4 rounded-lg p-4 transition ${cardClasses}`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">{title}</h3>
          <ArrowTopRightOnSquareIcon className="h-5 w-5 text-gray-400" />
        </div>
        {description && <p className="text-sm text-gray-500">{description}</p>}
        {tag && (
          <span
            className={`mt-1 inline-block rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
              badgeStyleMap[tag] || 'bg-gray-100 text-gray-800 ring-gray-300'
            }`}
          >
            {tag}
          </span>
        )}
      </div>
    </Link>
  )
}
