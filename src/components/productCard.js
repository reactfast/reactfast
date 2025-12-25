export function ProductCard({ product }) {
  return (
    <div className="overflow-hidden rounded-lg border shadow-lg">
      <img
        src={product.default_image || '/images/placeholder.jpg'}
        alt={product.name}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{product.name}</h3>
        <p className="text-lg text-primary">{product.price}</p>
        <a href="#" className="text-primary hover:underline">
          View Details
        </a>
      </div>
    </div>
  )
}
