// components/StickyButton.js
import { ShoppingBagIcon } from '@heroicons/react/24/solid'

export default function CartBtn({ link, colors }) {
  return (
    <button
      onClick={() => (window.location.href = link)}
      style={{ backgroundColor: colors[0], borderColor: colors[2] }}
      className="fixed right-4 top-4 rounded-full border-4 p-4 text-white shadow-xl"
    >
      <ShoppingBagIcon className="h-8 w-8" />
    </button>
  )
}
