import { BanknotesIcon } from '@heroicons/react/24/outline'

export default function VenmoBtn_1({ obj, colors, id }) {
  return (
    <div id={id} className="mx-2 my-1">
      <a
        href={`venmo://paycharge?txn=pay&recipients=${obj.venmoUsername}&amount=${obj.payAmount}&note=${obj.defaultNote}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center space-x-2 rounded-lg bg-blue-500 px-6 py-3 text-white shadow-lg transition duration-300 hover:bg-blue-600"
      >
        <BanknotesIcon className="h-6 w-6" />
        <span className="text-lg font-semibold">Venmo</span>
      </a>
    </div>
  )
}
