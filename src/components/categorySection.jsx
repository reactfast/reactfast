'use client'
import { useEffect, useState } from 'react'
import { ProductCard } from './productCard'
import { supabaseClient as supabase } from '@/config/supabase-client'

export default function CategorySection({ title, categoryId, num, order }) {
  const [category, setCategory] = useState(null)
  const [productIds, setProductIds] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function getCategory() {
      let { data, error } = await supabase
        .from('categories')
        .select(`*`)
        .filter('id', 'eq', categoryId)
        .single()

      if (error) console.error('error', error)
      else setCategory(data)
    }

    getCategory()
  }, [])

  useEffect(() => {
    async function getFeaturedProducts() {
      let { data, error } = await supabase
        .from('category_products')
        .select(`product_id`)
        .filter('category_id', 'eq', categoryId)

      if (error) console.error('error', error)
      else setProductIds(data)
    }

    if (category) getFeaturedProducts()
  }, [category])

  useEffect(() => {
    console.log(productIds)
    if (!productIds.length) return

    async function getProducts() {
      let { data, error } = await supabase
        .from('products')
        .select(`*`)
        .in(
          'id',
          productIds.map((p) => p.product_id),
        )

      if (error) console.error('error', error)
      else setProducts(data)
    }

    if (productIds.length) getProducts()
  }, [productIds])

  return (
    <>
      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-8 text-3xl font-bold text-primary">
          {title}{' '}
          <a
            href={'/shop/category/' + categoryId}
            className="pointer mb-8 text-xl font-thin"
          >
            view all
          </a>
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  )
}
