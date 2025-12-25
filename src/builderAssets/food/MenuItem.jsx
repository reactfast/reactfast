export default function MenuItem({ title, description, price }) {
  const defaultItem = {
    title: 'Classic Margherita Pizza',
    description:
      'Fresh tomatoes, mozzarella cheese, basil, and a drizzle of olive oil on a thin crust.',
    price: '12.99',
  }

  return (
    <div className="mx-auto max-w-5xl px-2 py-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">
          {title || defaultItem.title}
        </h3>
        <span className="text-lg font-semibold text-gray-900">
          ${price || defaultItem.price}
        </span>
      </div>
      <p className="mt-1 text-sm text-gray-600">
        {description || defaultItem.description}
      </p>
    </div>
  )
}
