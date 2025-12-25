import {
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TrashIcon,
  PencilIcon,
} from '@heroicons/react/24/outline'

export default function StepTabs({
  steps,
  currentStepId,
  onSelectStep,
  onAddStep,
  onDeleteStep,
  onMoveStep,
  onEditStep,
}) {
  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Form Steps</h3>
        <button
          onClick={onAddStep}
          className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
        >
          <PlusIcon className="h-3 w-3" />
          Add Step
        </button>
      </div>

      {/* Horizontal step list */}
      <div className="overflow-x-auto">
        <div className="flex min-w-max gap-2 pb-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              onClick={() => onSelectStep(step.id)}
              className={`group relative flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 transition-all duration-150 ${
                currentStepId === step.id
                  ? 'border-primary/40 bg-primary/10'
                  : 'border-gray-200 bg-white hover:bg-gray-50'
              } `}
            >
              {/* Step number */}
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                  currentStepId === step.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-600'
                } `}
              >
                {index + 1}
              </div>

              {/* Step content */}
              <div className="flex min-w-[100px] flex-col">
                <div className="truncate text-sm font-medium text-gray-900">
                  {step.title || `Step ${index + 1}`}
                </div>
                <div className="text-xs text-gray-400">
                  {step.form_step_fields?.length || 0} fields
                </div>
              </div>

              {/* Actions (show on hover) */}
              <div className="ml-2 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                {/* Move left */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onMoveStep(index, -1)
                  }}
                  disabled={index === 0}
                  className="p-0.5 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-30"
                  title="Move left"
                >
                  <ChevronLeftIcon className="h-3 w-3" />
                </button>

                {/* Move right */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onMoveStep(index, 1)
                  }}
                  disabled={index === steps.length - 1}
                  className="p-0.5 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-30"
                  title="Move right"
                >
                  <ChevronRightIcon className="h-3 w-3" />
                </button>

                {/* Edit */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onEditStep(step)
                  }}
                  className="rounded p-1 text-gray-400 transition-colors hover:bg-primary/10 hover:text-primary"
                  title="Edit step"
                >
                  <PencilIcon className="h-3.5 w-3.5" />
                </button>

                {/* Delete */}
                {steps.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteStep(step.id)
                    }}
                    className="rounded p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                    title="Delete step"
                  >
                    <TrashIcon className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
