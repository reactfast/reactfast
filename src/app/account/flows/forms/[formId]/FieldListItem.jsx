import {
  ChevronUpIcon,
  ChevronDownIcon,
  PencilIcon,
  TrashIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline'

export default function FieldListItem({
  field,
  index,
  moveField,
  editField,
  deleteField,
  duplicateField,
  isSelected,
  selectField,
}) {
  // Get field type icon
  const getFieldIcon = (type) => {
    const iconMap = {
      string: 'T', // Text
      text: 'T', // Textarea
      number: '#', // Number
      email: '@', // Email
      select: '▼', // Dropdown
      boolean: '✓', // Checkbox
      date: '📅', // Date
      file: '📎', // File
      header: 'H', // Header
    }
    return iconMap[type] || type[0].toUpperCase()
  }

  return (
    <div
      className={`
        group relative flex items-center justify-between gap-4 
        bg-white rounded-lg border p-4 
        transition-all duration-200 cursor-pointer
        ${isSelected 
          ? 'border-primary shadow-md ring-1 ring-primary/10' 
          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
        }
      `}
      onClick={() => selectField(index)}
    >
      {/* Left side: Field info */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Field type indicator */}
        <div className={`
          flex h-10 w-10 items-center justify-center rounded-lg
          font-mono text-sm font-medium
          ${isSelected 
            ? 'bg-primary/10 text-primary' 
            : 'bg-gray-100 text-gray-600'
          }
        `}>
          {getFieldIcon(field.type)}
        </div>

        {/* Field details */}
        <div className="flex-1 min-w-0">
          <div className="font-medium text-gray-900 truncate">
            {field.label || field.name}
          </div>
          <div className="text-sm text-gray-500">
            {field.name} • {field.type} • {field.width || 100}%
          </div>
        </div>
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Move up/down buttons */}
        <div className="flex flex-col gap-0.5">
          <button
            onClick={(e) => {
              e.stopPropagation()
              moveField(index, -1)
            }}
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
            title="Move up"
          >
            <ChevronUpIcon className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              moveField(index, 1)
            }}
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
            title="Move down"
          >
            <ChevronDownIcon className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1 ml-2 border-l border-gray-200 pl-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              editField(index)
            }}
            className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded transition-colors"
            title="Edit field"
          >
            <PencilIcon className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              duplicateField(index)
            }}
            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
            title="Duplicate field"
          >
            <DocumentDuplicateIcon className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              deleteField(index)
            }}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            title="Delete field"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}