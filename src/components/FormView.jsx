import { useState, useEffect } from 'react'
import { ReturnFieldsV2 } from '@/components/formFields/returnFields'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

export default function FormView({
  steps = [],
  currentStepId,
  fields,
  isMobileView = false,
  formTitle,
  formDescription,
  handleChange,
  formData = {},
  onSubmit,
}) {
  // State for preview step navigation
  const [previewStepIndex, setPreviewStepIndex] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  // Update preview when currentStepId changes
  useEffect(() => {
    if (currentStepId && steps.length > 0) {
      const index = steps.findIndex((s) => s.id === currentStepId)
      if (index >= 0) {
        setPreviewStepIndex(index)
      }
    }
  }, [currentStepId, steps])

  // Use steps if provided (multi-step form), otherwise fallback to single step with fields
  const isMultiStep = steps && steps.length > 0
  const currentStep = isMultiStep ? steps[previewStepIndex] : null
  const currentFields = isMultiStep
    ? currentStep?.form_step_fields?.map((f) => f.field_config) || []
    : fields

  const handleDummyChange = (e) => {
    // No-op for preview; could log or update temporary state if desired.
    console.log('Preview change:', e.target.name, e.target.value)
  }

  const handlePrevStep = () => {
    setPreviewStepIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNextStep = () => {
    setPreviewStepIndex((prev) => Math.min(steps.length - 1, prev + 1))
  }

  // Helper function to get width class
  const getWidthClass = (width) => {
    // If mobile view is forced, always return full width
    if (isMobileView) {
      return 'w-full'
    }

    // Otherwise use responsive classes
    switch (width) {
      case 25:
        return 'w-full sm:w-1/4'
      case 50:
        return 'w-full sm:w-1/2'
      case 75:
        return 'w-full sm:w-3/4'
      case 100:
      default:
        return 'w-full'
    }
  }

  function handleSubmit() {
    setSubmitting(true)
    onSubmit()
  }

  return (
    <div className="w-full">
      {currentFields.length === 0 && !isMultiStep ? (
        <div className="py-8 text-center">
          <div className="mb-2 text-gray-400">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-500">
            Your form preview will appear here
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Add fields to see how they look
          </p>
        </div>
      ) : (
        <div>
          {(formTitle || formDescription) && (
            <div className="mb-6">
              {formTitle && (
                <h3 className="text-xl font-semibold text-gray-900">
                  {formTitle}
                </h3>
              )}
              {formDescription && (
                <p className="mt-1 text-gray-600">{formDescription}</p>
              )}
            </div>
          )}

          {/* Step Progress Indicator */}
          {isMultiStep && steps.length > 1 && (
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-medium transition-colors ${
                        index < previewStepIndex
                          ? 'border-primary bg-primary text-white'
                          : index === previewStepIndex
                            ? 'border-primary bg-white text-primary'
                            : 'border-gray-300 bg-white text-gray-400'
                      }`}
                    >
                      {index < previewStepIndex ? '✓' : index + 1}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`mx-1 h-0.5 flex-1 transition-colors ${
                          index < previewStepIndex
                            ? 'bg-primary'
                            : 'bg-gray-300'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              {currentStep && (
                <div className="text-center">
                  <h4 className="text-sm font-medium text-gray-900">
                    {currentStep.title || `Step ${previewStepIndex + 1}`}
                  </h4>
                  {currentStep.description && (
                    <p className="mt-0.5 text-xs text-gray-500">
                      {currentStep.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Flex wrapper for fields with dynamic widths */}
          <div className="-mx-2 flex flex-wrap">
            {currentFields.map((field, index) => (
              <div
                key={index}
                className={`${getWidthClass(field.width || 100)} mb-4 px-2`}
              >
                <ReturnFieldsV2
                  onChange={(e) => handleChange(e)}
                  value={formData[field.name] || field.defaultValue || ''}
                  field={{
                    ...field,
                    title: field.label || field.title || field.name,
                  }}
                />
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-gray-100 pt-4">
            {isMultiStep && steps.length > 1 ? (
              <div className="flex justify-between gap-3">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  disabled={previewStepIndex === 0}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    previewStepIndex === 0
                      ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                      : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <ChevronLeftIcon className="h-4 w-4" />
                    Previous
                  </span>
                </button>

                {previewStepIndex === steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      submitting
                        ? 'cursor-not-allowed bg-gray-400 text-white'
                        : 'bg-primary text-white hover:bg-primary/90'
                    }`}
                  >
                    {submitting ? 'Submitting…' : 'Submit'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
                  >
                    <span className="flex items-center gap-1">
                      Next
                      <ChevronRightIcon className="h-4 w-4" />
                    </span>
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={handleSubmit}
                className={`w-full rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  submitting
                    ? 'cursor-not-allowed bg-gray-400'
                    : 'bg-primary text-white hover:bg-primary/90'
                }`}
              >
                {submitting ? 'Submitting…' : 'Submit'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
