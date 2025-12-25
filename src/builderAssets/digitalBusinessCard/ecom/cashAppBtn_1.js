import { BanknotesIcon } from '@heroicons/react/24/outline'

export default function CashAppBtn_1({ obj, id }) {
  return (
    <div id={id} className="mx-2 my-1">
      <a
        href={`https://cash.app/$${obj?.cashUsername}/${obj?.payAmmount}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center space-x-2 rounded-lg bg-green-500 px-6 py-3 text-white shadow-lg transition duration-300 hover:bg-green-600"
      >
        <BanknotesIcon className="h-6 w-6" />
        <span className="text-lg font-semibold">Cash App</span>
      </a>
    </div>
  )
}
