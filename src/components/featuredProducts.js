import { ProductCard } from './productCard'

const featuredProducts = [
  { id: 1, name: 'Product 1', price: '$50', imageUrl: '/images/product1.jpg' },
  { id: 2, name: 'Product 2', price: '$75', imageUrl: '/images/product2.jpg' },
  { id: 3, name: 'Product 3', price: '$100', imageUrl: '/images/product3.jpg' },
  { id: 4, name: 'Product 4', price: '$60', imageUrl: '/images/product4.jpg' },
  { id: 5, name: 'Product 5', price: '$80', imageUrl: '/images/product5.jpg' },
  { id: 6, name: 'Product 6', price: '$90', imageUrl: '/images/product6.jpg' },
]

export default function FeaturedProducts() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="mb-8 text-3xl font-bold text-primary">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
