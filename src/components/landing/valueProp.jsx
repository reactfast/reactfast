import { CheckCircleIcon } from '@heroicons/react/24/solid'

export function ValueProposition() {
  return (
    <section className="py-16 text-center">
      <h2 className="text-3xl font-bold">Why Jot.Cards?</h2>
      <div className="mt-6 flex justify-center gap-6">
        <div className="w-60 rounded-lg border p-6 text-center shadow-md">
          <CheckCircleIcon className="mx-auto h-8 w-8 text-green-500" />
          <p className="mt-4 font-semibold">No Apps Required</p>
        </div>
        <div className="w-60 rounded-lg border p-6 text-center shadow-md">
          <CheckCircleIcon className="mx-auto h-8 w-8 text-green-500" />
          <p className="mt-4 font-semibold">Customizable Profiles</p>
        </div>
        <div className="w-60 rounded-lg border p-6 text-center shadow-md">
          <CheckCircleIcon className="mx-auto h-8 w-8 text-green-500" />
          <p className="mt-4 font-semibold">Seamless Integration</p>
        </div>
      </div>
    </section>
  )
}
