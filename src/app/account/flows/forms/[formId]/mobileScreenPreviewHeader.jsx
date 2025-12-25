import FormPreview from '@/components/FormPreview'
import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline'

export default function MobileScreenPreviewHeader({
  steps,
  currentStep,
  fields,
  formTitle,
  formDescription,
  setFullScreenPreview,
}) {
  return (
    <>
      <div className="col-span-1 overflow-y-auto bg-gray-50/50 p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="mb-1 text-lg font-medium text-gray-900">
                Mobile Preview
              </h2>
              <p className="text-sm text-gray-500">How it looks on phones</p>
            </div>
            <button
              onClick={() => setFullScreenPreview(true)}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-white hover:text-primary"
              title="View desktop preview"
            >
              <ArrowsPointingOutIcon className="h-4 w-4" />
              <span>Desktop</span>
            </button>
          </div>
        </div>
        {/* Mobile device frame */}
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="mx-auto" style={{ maxWidth: '375px' }}>
            <div className="rounded-lg">
              <FormPreview
                steps={steps}
                currentStepId={currentStep?.id}
                fields={fields}
                isMobileView={true}
                formTitle={formTitle}
                formDescription={formDescription}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
