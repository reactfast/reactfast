'use client'

import { useEffect, useState } from 'react'
import { supabaseClient as supabase } from '@/config/supabase-client'
import { useRouter } from 'next/navigation'

export default function EditCategory({ params }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    name: '',
    description: '',
    parent_category: '',
  })
  const [isSaving, setIsSaving] = useState(false)

  const [allProducts, setAllProducts] = useState([])
  const [allCategories, setAllCategories] = useState([])
  const [selectedProductIds, setSelectedProductIds] = useState([])

  const isNew = params.categoryId === 'new'

  useEffect(() => {
    async function fetchCategoryAndAssignments() {
      try {
        const [
          { data: category },
          { data: assignments },
          { data: products },
          { data: allCats },
        ] = await Promise.all([
          supabase
            .from('vendor_categories')
            .select('*')
            .eq('id', params.categoryId)
            .single(),
          supabase
            .from('vendor_category_products')
            .select('product_id')
            .eq('category_id', params.categoryId),
          supabase.from('vendor_products').select('id, name'),
          supabase
            .from('vendor_categories')
            .select('id, name')
            .neq('id', params.categoryId),
        ])

        if (category) {
          setForm({
            name: category.name,
            description: category.description || '',
            parent_category: category.parent_category || '',
          })
          setSelectedProductIds(assignments.map((a) => a.product_id))
        }
        if (products) {
          setAllProducts(products)
        }
        if (allCats) {
          setAllCategories(allCats)
        }
      } catch (error) {
        console.error('Error loading category:', error)
      } finally {
        setLoading(false)
      }
    }

    if (!isNew) {
      fetchCategoryAndAssignments()
    } else {
      fetchProductsAndCategories()
    }
  }, [params.categoryId, isNew])

  async function fetchProductsAndCategories() {
    try {
      const [{ data: products }, { data: categories }] = await Promise.all([
        supabase.from('vendor_products').select('id, name'),
        supabase.from('vendor_categories').select('id, name'),
      ])
      setAllProducts(products || [])
      setAllCategories(categories || [])
      setLoading(false)
    } catch (error) {
      console.error('Error loading data:', error)
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const toggleProduct = (id) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id],
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      if (isNew) {
        const { data, error } = await supabase
          .from('vendor_categories')
          .insert({
            name: form.name,
            description: form.description,
            parent_category: form.parent_category || null,
          })
          .select()
          .single()

        if (data) {
          await linkProductsToCategory(data.id, selectedProductIds)
          router.push(`/account/categories/${data.id}`)
        } else {
          console.error('Error creating:', error)
        }
      } else {
        await supabase
          .from('vendor_categories')
          .update({
            name: form.name,
            description: form.description,
            parent_category: form.parent_category || null,
          })
          .eq('id', params.categoryId)

        await supabase
          .from('vendor_category_products')
          .delete()
          .eq('category_id', params.categoryId)

        await linkProductsToCategory(params.categoryId, selectedProductIds)
        alert('Category updated!')
      }
    } finally {
      setIsSaving(false)
    }
  }

  const linkProductsToCategory = async (categoryId, productIds) => {
    if (productIds.length === 0) return

    const inserts = productIds.map((productId) => ({
      category_id: categoryId,
      product_id: productId,
    }))

    await supabase.from('vendor_category_products').insert(inserts)
  }

  function handleCancel(e) {
    e.preventDefault()
    window.history.back()
  }

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="mx-auto min-h-screen max-w-7xl bg-neutral-100 px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-primary hover:bg-gray-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5 text-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Back
          </button>
          <h1 className="text-3xl font-thin text-primary">
            {isNew ? 'Create New Category' : 'Edit Category'}
          </h1>
        </div>

        <div className="relative">
          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className={`flex items-center gap-2 rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/75 focus:ring-offset-2 ${
              isSaving
                ? 'cursor-not-allowed bg-gray-400 opacity-75'
                : 'bg-primary/90 hover:bg-primary'
            }`}
            aria-label="Save category"
          >
            {isSaving ? (
              <>
                <svg
                  className="h-5 w-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Save Category
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left: Form */}
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <form onSubmit={handleSubmit} className="space-y-6 p-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary/75 sm:text-sm"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary/75 sm:text-sm"
                />
              </div>

              {/* Parent Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Parent Category
                </label>
                <select
                  name="parent_category"
                  value={form.parent_category || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary/75 sm:text-sm"
                >
                  <option value="">-- None --</option>
                  {allCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>
        </div>

        {/* Right: Product Assignment Section */}
        <div className="lg:col-span-1">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-6">
              <h2 className="mb-4 text-lg font-medium text-gray-900">
                Assign Products
              </h2>

              <div className="mt-4 space-y-2">
                {allProducts.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No products available to assign.
                  </p>
                ) : (
                  <div className="max-h-96 overflow-y-auto rounded border border-gray-200 p-3">
                    {allProducts.map((product) => (
                      <label
                        key={product.id}
                        className="flex items-center space-x-2 p-2 hover:bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/75"
                          checked={selectedProductIds.includes(product.id)}
                          onChange={() => toggleProduct(product.id)}
                        />
                        <span className="text-sm text-gray-700">
                          {product.name}
                        </span>
                      </label>
                    ))}
                  </div>
                )}

                <div className="mt-2 text-sm text-gray-500">
                  {selectedProductIds.length} product
                  {selectedProductIds.length !== 1 ? 's' : ''} selected
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
