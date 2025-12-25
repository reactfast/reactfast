import { XMarkIcon } from '@heroicons/react/24/outline'
import FormPreview from '@/components/FormPreview'

export default function FullScreenPreviewHeader({
  steps,
  currentStep,
  fields,
  formTitle,
  formDescription,
  setFullScreenPreview,
}) {
  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-white transition-opacity duration-300">
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              Desktop Preview
            </h2>
            <p className="text-sm text-gray-500">
              How your form appears on larger screens
            </p>
          </div>
          <button
            onClick={() => setFullScreenPreview(false)}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close full screen preview"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <FormPreview
            steps={steps}
            currentStepId={currentStep?.id}
            fields={fields}
            isMobileView={false}
            formTitle={formTitle}
            formDescription={formDescription}
          />
        </div>
      </div>
    </div>
  )
}
