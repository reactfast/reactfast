'use client'

import { useEffect, useState } from 'react'
import { supabaseClient as supabase } from '@/config/supabase-client'
import PrimeProductsSelect from '@/components/formFields/primeProducts'

export default function AddProduct({ params }) {
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    name: 'New Product',
    price: '0.00',
    description: 'Describe your product here...',
    images: [''],
    default_image: '',
  })
  const [disabled, setDisabled] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const isNewProduct = params.productId === 'new'
  const [previewImage, setPreviewImage] = useState('')
  const [showParentSelector, setShowParentSelector] = useState(false)
  const [saveAttempted, setSaveAttempted] = useState(false)
  const [showRequiredMessage, setShowRequiredMessage] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false)
  const [drawerAnimating, setDrawerAnimating] = useState(false)
  const [drawerVisible, setDrawerVisible] = useState(false)

  const [categories, setCategories] = useState([])
  const [assignedCategories, setAssignedCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')

  const defaultValues = {
    name: 'New Product',
    price: '0.00',
    description: 'Describe your product here...',
    images: [''],
    default_image: '',
  }

  async function fetchProduct() {
    const { data, error } = await supabase
      .from('vendor_products')
      .select('*')
      .eq('id', params.productId)
      .single()

    if (error) {
      console.error('Error fetching product:', error)
      return
    }

    const defaultImage =
      data.default_image || (data.images ? data.images.split(',')[0] : '')

    setForm({
      name: data.name,
      price: data.price.toString(),
      description: data.description,
      images: data.images ? data.images.split(',') : [],
      default_image: defaultImage,
    })
    setPreviewImage(defaultImage)
    setLoading(false)
  }

  useEffect(() => {
    if (params.productId === 'new') {
      setLoading(false)
      return
    }

    fetchProduct()
  }, [params.productId])

  // Fetch categories and assigned categories on mount
  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase
        .from('vendor_categories')
        .select('*')
      if (error) console.error('Error fetching categories:', error)
      else setCategories(data)
    }

    async function fetchAssignedCategories(productId) {
      const { data, error } = await supabase
        .from('vendor_category_products')
        .select('id, category_id, vendor_categories (*)')
        .eq('product_id', productId)
      if (error) console.error('Error fetching assigned categories:', error)
      else setAssignedCategories(data)
    }

    fetchCategories()

    if (!isNewProduct) {
      fetchProduct()
      fetchAssignedCategories(params.productId)
    }
  }, [params.productId, isNewProduct])

  const handleAssignCategory = async () => {
    if (!selectedCategory || isNewProduct) return

    const { data, error } = await supabase
      .from('vendor_category_products')
      .insert([{ product_id: params.productId, category_id: selectedCategory }])

    if (error) {
      console.error('Error assigning category:', error)
      return
    }

    // Refresh assigned categories
    const { data: updatedAssigned, error: fetchError } = await supabase
      .from('vendor_category_products')
      .select('id, category_id, vendor_categories (*)')
      .eq('product_id', params.productId)

    if (fetchError) {
      console.error('Error fetching updated categories:', fetchError)
      return
    }

    setAssignedCategories(updatedAssigned)
    setSelectedCategory('')
  }

  const handleRemoveCategory = async (catId) => {
    const { error } = await supabase
      .from('vendor_category_products')
      .delete()
      .eq('product_id', params.productId)
      .eq('category_id', catId)

    if (error) {
      console.error('Error removing category:', error)
      return
    }

    setAssignedCategories((prev) =>
      prev.filter((entry) => entry.category_id !== catId),
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleArrayChange = (index, value) => {
    const updated = [...form.images]
    updated[index] = value
    setForm((prev) => ({
      ...prev,
      images: updated,
      default_image:
        prev.default_image === prev.images[index] ? value : prev.default_image,
    }))
  }

  const handleRemoveImage = (index) => {
    const updated = form.images.filter((_, i) => i !== index)
    const removedUrl = form.images[index]

    setForm((prev) => {
      // If we're removing the default image, set the first remaining image as default
      const newDefault =
        prev.default_image === removedUrl && updated.length > 0
          ? updated[0]
          : prev.default_image

      return {
        ...prev,
        images: updated,
        default_image: newDefault,
      }
    })
  }

  const setDefaultImage = (url) => {
    setForm((prev) => ({
      ...prev,
      default_image: url,
    }))
    setPreviewImage(url)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // If form is invalid for new products, show validation message but don't proceed
    if (isNewProduct && !isFormValid()) {
      setSaveAttempted(true)
      setShowRequiredMessage(true)
      // Hide the message after 5 seconds
      setTimeout(() => setShowRequiredMessage(false), 5000)
      return
    }

    setIsSaving(true)

    try {
      if (isNewProduct) {
        await handleCreate()
      } else {
        await handleUpdate()
      }
    } finally {
      setIsSaving(false)
    }
  }

  const handleCreate = async () => {
    const user = await supabase.auth.getUser()
    const userId = user?.data?.user?.id

    if (!userId) {
      console.error('User not authenticated.')
      return
    }

    const { data, error } = await supabase
      .from('vendor_products')
      .insert({
        user_id: userId,
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        images: form.images.join(','),
        default_image: form.default_image || form.images[0],
      })
      .select()

    if (error) {
      console.error('Error creating product:', error)
    } else {
      console.log('Product created!', data)
      // Redirect to the edit page for the new product
      window.location.href = `/account/products/${data[0].id}`
    }
  }

  const handleUpdate = async () => {
    const { error } = await supabase
      .from('vendor_products')
      .update({
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        images: form.images.join(','),
        default_image: form.default_image || form.images[0],
      })
      .eq('id', params.productId)

    if (error) {
      console.error('Error updating product:', error)
    } else {
      alert('Product updated!')
    }
  }

  function handleCancel(e) {
    e.preventDefault()
    window.history.back()
  }

  const handleProductSelect = (product) => {
    if (product.id) {
      const defaultImage =
        product.default_image || 'https://via.placeholder.com/500'
      setForm({
        name: product.name,
        price: product.price.toString(),
        short_description: product.short_description,
        description: product.description,
        images: [defaultImage],
        default_image: defaultImage,
      })
      setPreviewImage(defaultImage)
      setDisabled(true) // Disable form fields when a parent product is selected
    } else {
      const defaultImage = 'https://via.placeholder.com/500'
      setForm({
        name: '',
        price: '',
        description: '',
        images: [defaultImage],
        default_image: defaultImage,
      })
      setPreviewImage(defaultImage)
      setDisabled(false) // Enable form fields when "No Parent" is selected
    }
  }

  const clearParentProduct = () => {
    setDisabled(false)
    setShowParentSelector(false)
  }

  const isFormValid = () => {
    if (!isNewProduct) return true

    // Check if name is valid - either has meaningful content or hasn't been touched yet
    const nameValid =
      form.name && form.name.trim() !== '' && form.name !== defaultValues.name

    // Check if price is valid - must be a positive number
    const priceValid =
      form.price && !isNaN(parseFloat(form.price)) && parseFloat(form.price) > 0

    // Check if description is valid - either has meaningful content or hasn't been touched yet
    const descriptionValid =
      form.description &&
      form.description.trim() !== '' &&
      form.description !== defaultValues.description

    // Images are now optional - removed from required validation

    return nameValid && priceValid && descriptionValid
  }

  const handleSaveClick = (e) => {
    e.preventDefault()

    // Always show the message if form is invalid for new product
    if (isNewProduct && !isFormValid()) {
      setSaveAttempted(true)
      setShowRequiredMessage(true)
      // Hide the message after 5 seconds
      setTimeout(() => setShowRequiredMessage(false), 5000)
      return
    }

    // Otherwise proceed with normal submission
    handleSubmit(e)
  }

  const handleFocus = (fieldName) => {
    // Only clear the field if it still has the default value
    if (form[fieldName] === defaultValues[fieldName]) {
      setForm((prev) => ({
        ...prev,
        [fieldName]: '',
      }))
    }
  }

  const handleImageFocus = (index) => {
    // Only clear the image URL if it's the default placeholder
    if (form.images[index] === 'https://via.placeholder.com/500') {
      const updatedImages = [...form.images]
      updatedImages[index] = ''
      setForm((prev) => ({
        ...prev,
        images: updatedImages,
      }))
    }
  }

  const isImageValid = (url) => {
    return url && url.trim() !== '' && url !== 'https://via.placeholder.com/500'
  }

  // Function to truncate text with ellipsis
  const truncateText = (text, maxLength = 150) => {
    if (!text || text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="mx-auto min-h-screen bg-neutral-100 px-3 py-6 sm:px-4 sm:py-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={handleCancel}
            className="flex items-center gap-1 rounded-md border border-gray-300 px-2 py-1.5 text-sm font-medium text-primary hover:bg-gray-50 sm:gap-2 sm:px-3 sm:py-2"
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
            <span>Back</span>
          </button>
          <h1 className="truncate text-xl font-thin text-primary sm:text-2xl md:text-3xl">
            {isNewProduct ? 'Create New Product' : 'Edit Product'}
          </h1>
        </div>

        <div className="relative">
          <button
            onClick={(e) => handleSaveClick(e)}
            className={`flex w-full items-center justify-center gap-2 rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/75 focus:ring-offset-2 sm:w-auto ${
              isSaving
                ? 'cursor-not-allowed bg-gray-400 opacity-75'
                : isNewProduct && !isFormValid()
                  ? 'cursor-not-allowed bg-gray-400'
                  : 'bg-primary/90 hover:bg-primary'
            }`}
            aria-label="Save product"
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
                <span>Saving...</span>
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
                <span>Save Product</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Preview Toggle Button (Mobile Only) */}
      <div className="mb-2 mt-4 lg:hidden">
        <button
          type="button"
          onClick={() => {
            // First set animating and show the container
            setDrawerAnimating(true)
            setDrawerVisible(true)
            // Then after a very short delay, trigger the transition
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                setMobilePreviewOpen(true)
              })
            })
          }}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-primary shadow-sm hover:bg-gray-50"
        >
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
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
          <span>Show Product Preview</span>
        </button>
      </div>

      {/* Main product info grid */}
      <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
        {/* Left: Form */}
        <div className="space-y-6 md:space-y-8 lg:col-span-2">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-4 sm:space-y-6 sm:p-6"
            >
              {isNewProduct && (
                <div className="mb-4 sm:mb-6">
                  {showParentSelector ? (
                    <div className="rounded-md border border-gray-200 bg-gray-50 p-3 sm:p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-700">
                          Select a parent product
                        </h3>
                        <button
                          type="button"
                          onClick={clearParentProduct}
                          className="text-xs text-gray-500 hover:text-gray-700"
                        >
                          Cancel
                        </button>
                      </div>
                      <PrimeProductsSelect onChange={handleProductSelect} />
                      <p className="mt-2 text-xs text-gray-500">
                        Selecting a parent product will pre-fill the form with
                        its details.
                      </p>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowParentSelector(true)}
                      className="flex items-center gap-1 text-sm text-primary/90 hover:text-primary"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Create from existing product?
                    </button>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    className="mt-1.5 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary/75 sm:text-sm"
                    required
                    disabled={disabled}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price ($)
                  </label>
                  <input
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    onFocus={() => handleFocus('price')}
                    type="number"
                    step="0.01"
                    className="mt-1.5 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary/75 sm:text-sm"
                    required
                    disabled={disabled}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  onFocus={() => handleFocus('description')}
                  rows={4}
                  className="mt-1.5 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary/75 sm:text-sm"
                  disabled={disabled}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image URLs
                </label>
                <div className="mt-1.5 space-y-2">
                  {form.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="rounded-md border border-gray-200 p-2 sm:p-3"
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
                        {/* Image Preview - Left */}
                        {isImageValid(img) ? (
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded border border-gray-200">
                            <img
                              src={img}
                              alt={`Preview ${idx + 1}`}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null
                                // Use inline SVG as data URL to prevent network requests
                                e.target.src =
                                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='10' text-anchor='middle' dominant-baseline='middle' fill='%23999'%3EError%3C/text%3E%3C/svg%3E"
                              }}
                            />
                          </div>
                        ) : (
                          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded border border-gray-200 bg-gray-50">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="h-8 w-8 text-gray-400"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                              />
                            </svg>
                          </div>
                        )}

                        {/* Input and Controls - Right */}
                        <div className="flex-grow space-y-1">
                          <div className="xs:flex-row xs:items-center flex flex-col items-start gap-1">
                            <input
                              value={img}
                              onChange={(e) =>
                                handleArrayChange(idx, e.target.value)
                              }
                              onFocus={() => handleImageFocus(idx)}
                              placeholder={`Image URL ${idx + 1}`}
                              className="block w-full rounded-md border border-gray-300 px-2 py-1 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-primary/75"
                              disabled={disabled}
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(idx)}
                              className="xs:mt-0 mt-1 inline-flex flex-shrink-0 items-center rounded-md border border-transparent bg-red-100 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                              disabled={disabled || form.images.length <= 1}
                            >
                              Remove
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => setDefaultImage(img)}
                            className={`text-xs ${form.default_image === img ? 'font-bold text-primary/90' : 'text-gray-600 hover:text-primary'}`}
                          >
                            {form.default_image === img
                              ? '✓ Main Image'
                              : 'Set as Main Image'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      images: [...prev.images, ''],
                    }))
                  }
                  className="mt-2 inline-flex items-center text-sm font-medium text-primary/90 hover:text-primary"
                  disabled={disabled}
                >
                  <svg
                    className="mr-1 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Add another image
                </button>
              </div>

              <div className="pt-4">
                <div className="group relative">
                  <button
                    type="button"
                    className={`inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/75 focus:ring-offset-2 sm:text-sm ${
                      isSaving
                        ? 'cursor-not-allowed bg-gray-400 opacity-75'
                        : isNewProduct && !isFormValid()
                          ? 'cursor-not-allowed bg-gray-400'
                          : 'bg-primary/90 hover:bg-primary'
                    }`}
                    onClick={(e) => handleSaveClick(e)}
                  >
                    {isSaving ? (
                      <>
                        <svg
                          className="mr-2 h-4 w-4 animate-spin"
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
                      'Save Product'
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Categories Section - Moved below form but aligned with it */}
          {!isNewProduct ? (
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-4 sm:p-6">
                <h2 className="mb-4 text-lg font-medium text-gray-900">
                  Manage Categories
                </h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="md:col-span-1">
                    <h3 className="mb-2 text-sm font-medium text-gray-700">
                      Assign New Category
                    </h3>
                    <div className="xs:flex-row xs:items-end xs:space-y-0 xs:space-x-2 flex flex-col space-y-2">
                      <div className="flex-grow">
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary/75 sm:text-sm"
                        >
                          <option value="">-- Select Category --</option>
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        onClick={handleAssignCategory}
                        type="button"
                        disabled={!selectedCategory}
                        className="inline-flex items-center rounded-md border border-transparent bg-primary/90 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary/75 focus:ring-offset-2 disabled:bg-neutral-500 disabled:opacity-50"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <h3 className="mb-2 text-sm font-medium text-gray-700">
                      Assigned Categories
                    </h3>
                    {assignedCategories.length > 0 ? (
                      <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
                        {assignedCategories.map(
                          ({ category_id, vendor_categories }) => (
                            <li
                              key={category_id}
                              className="flex items-center justify-between p-3"
                            >
                              <span className="text-sm font-medium">
                                {vendor_categories?.name || 'Untitled'}
                              </span>
                              <button
                                onClick={() =>
                                  handleRemoveCategory(category_id)
                                }
                                className="text-sm font-medium text-red-600 hover:text-red-500"
                              >
                                Remove
                              </button>
                            </li>
                          ),
                        )}
                      </ul>
                    ) : (
                      <div className="rounded-md border border-gray-200 p-4 text-center text-sm text-gray-500">
                        No categories assigned to this product yet.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-lg bg-blue-50 p-4 shadow-sm">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Category Assignment
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>
                      You'll be able to assign categories to this product after
                      saving it. Please save the product first.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Preview (Desktop Only) */}
        <div className="hidden lg:col-span-1 lg:block">
          <div className="sticky top-8">
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-4 sm:p-6">
                <h2 className="mb-4 text-lg font-medium text-gray-900">
                  Product Preview
                </h2>
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  {/* Main Image */}
                  <div className="relative aspect-square w-full">
                    {(previewImage && isImageValid(previewImage)) ||
                    (form.images.length > 0 && isImageValid(form.images[0])) ? (
                      <img
                        src={
                          previewImage || form.default_image || form.images[0]
                        }
                        alt={form.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null
                          // Use inline SVG as data URL for error state to prevent additional network requests
                          e.target.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500' viewBox='0 0 500 500'%3E%3Crect width='500' height='500' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='24' text-anchor='middle' dominant-baseline='middle' fill='%23999'%3EError Loading Image%3C/text%3E%3C/svg%3E"
                        }}
                      />
                    ) : (
                      <div className="flex aspect-square w-full items-center justify-center bg-gray-100">
                        <div className="text-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="mx-auto h-16 w-16 text-gray-400"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                            />
                          </svg>
                          <p className="mt-2 text-sm text-gray-500">No image</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Image Gallery - only show if we have valid images */}
                  {form.images.length > 1 &&
                    form.images.some((img) => img && img.trim() !== '') && (
                      <div className="border-t border-gray-100">
                        <div className="scrollbar-hide flex overflow-x-auto p-2">
                          {form.images.map((img, idx) =>
                            img && img.trim() !== '' ? (
                              <div
                                key={idx}
                                className={`mr-2 h-16 w-16 flex-shrink-0 cursor-pointer overflow-hidden rounded border ${
                                  previewImage === img
                                    ? 'border-primary'
                                    : 'border-gray-200'
                                }`}
                                onClick={() => setPreviewImage(img)}
                              >
                                <img
                                  src={img}
                                  alt={`Product image ${idx + 1}`}
                                  className="h-full w-full object-cover"
                                  onError={(e) => {
                                    e.target.onerror = null
                                    e.target.src =
                                      'https://via.placeholder.com/80?text=Error'
                                  }}
                                />
                              </div>
                            ) : null,
                          )}
                        </div>
                      </div>
                    )}

                  <div className="p-4">
                    <h3 className="text-base font-medium text-gray-900 sm:text-lg">
                      {form.name}
                    </h3>
                    {form.short_description && (
                      <p className="mt-1 text-sm text-gray-500">
                        {form.short_description}
                      </p>
                    )}
                    <p className="mt-2 text-xl font-semibold text-primary/90">
                      ${parseFloat(form.price || 0).toFixed(2)}
                    </p>

                    <div className="mt-4 border-t border-gray-100 pt-4">
                      <h4 className="mb-2 text-sm font-medium text-gray-700">
                        Description
                      </h4>
                      <div className="prose max-w-none overflow-y-auto rounded-md border border-gray-200 p-3 text-sm text-gray-800">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: showFullDescription
                              ? form.description
                              : truncateText(form.description, 150),
                          }}
                        />

                        {form.description && form.description.length > 150 && (
                          <button
                            type="button"
                            onClick={() =>
                              setShowFullDescription(!showFullDescription)
                            }
                            className="mt-2 text-xs font-medium text-primary hover:underline"
                          >
                            {showFullDescription ? 'Show less' : 'Show more'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed position message that appears on save button click when form is invalid */}
      {isNewProduct && !isFormValid() && showRequiredMessage && (
        <div className="fixed bottom-4 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 transform rounded-lg bg-yellow-50 p-4 shadow-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Required Information Missing
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p className="mb-1">
                  Please complete these fields before saving:
                </p>
                <ul className="list-disc pl-5">
                  {(!form.name ||
                    form.name.trim() === '' ||
                    form.name === defaultValues.name) && <li>Product name</li>}
                  {(!form.price ||
                    isNaN(parseFloat(form.price)) ||
                    parseFloat(form.price) <= 0) && (
                    <li>Valid price (greater than 0)</li>
                  )}
                  {(!form.description ||
                    form.description.trim() === '' ||
                    form.description === defaultValues.description) && (
                    <li>Product description</li>
                  )}
                </ul>
              </div>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  type="button"
                  onClick={() => setShowRequiredMessage(false)}
                  className="inline-flex rounded-md p-1.5 text-yellow-500 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2"
                >
                  <span className="sr-only">Dismiss</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer for Product Preview */}
      <div
        className={`fixed inset-0 z-50 overflow-hidden lg:hidden ${!drawerVisible ? 'hidden' : ''}`}
        // Add a global click handler for the entire drawer container
        onClick={() => {
          setDrawerAnimating(true)
          setMobilePreviewOpen(false)
          setTimeout(() => {
            setDrawerAnimating(false)
            setDrawerVisible(false)
          }, 500)
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          {/* Background overlay */}
          <div
            className={`absolute inset-0 bg-gray-500 transition-all duration-[400ms] ease-out ${
              mobilePreviewOpen ? 'opacity-75' : 'opacity-0'
            }`}
            aria-hidden="true"
          ></div>

          <section className="absolute inset-y-0 right-0 flex max-w-full pl-10">
            <div
              className={`relative w-screen max-w-md transform transition duration-300 ease-out ${mobilePreviewOpen ? 'translate-x-0' : 'translate-x-full'}`}
              // Stop propagation to prevent the drawer itself from closing when clicked
              onClick={(e) => e.stopPropagation()}
              onTransitionEnd={() => {
                if (!mobilePreviewOpen) {
                  setDrawerAnimating(false)
                  setDrawerVisible(false)
                }
              }}
            >
              <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-gray-200 p-4">
                  <h2 className="text-lg font-medium text-gray-900">
                    Product Preview
                  </h2>
                  <button
                    type="button"
                    className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                    onClick={(e) => {
                      e.stopPropagation() // Prevent event from reaching parent handlers
                      setDrawerAnimating(true)
                      setMobilePreviewOpen(false)
                      setTimeout(() => {
                        setDrawerAnimating(false)
                        setDrawerVisible(false)
                      }, 500)
                    }}
                  >
                    <span className="sr-only">Close panel</span>
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Rest of drawer content */}
                <div className="relative flex-1 p-4 sm:p-6">
                  <div className="overflow-hidden rounded-lg border border-gray-200">
                    {/* Main Image */}
                    <div className="relative aspect-square w-full">
                      {(previewImage && isImageValid(previewImage)) ||
                      (form.images.length > 0 &&
                        isImageValid(form.images[0])) ? (
                        <img
                          src={
                            previewImage || form.default_image || form.images[0]
                          }
                          alt={form.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null
                            e.target.src =
                              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500' viewBox='0 0 500 500'%3E%3Crect width='500' height='500' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='24' text-anchor='middle' dominant-baseline='middle' fill='%23999'%3EError Loading Image%3C/text%3E%3C/svg%3E"
                          }}
                        />
                      ) : (
                        <div className="flex aspect-square w-full items-center justify-center bg-gray-100">
                          <div className="text-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="mx-auto h-16 w-16 text-gray-400"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                              />
                            </svg>
                            <p className="mt-2 text-sm text-gray-500">
                              No image
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Image Gallery - only show if we have valid images */}
                    {form.images.length > 1 &&
                      form.images.some((img) => img && img.trim() !== '') && (
                        <div className="border-t border-gray-100">
                          <div className="scrollbar-hide flex overflow-x-auto p-2">
                            {form.images.map((img, idx) =>
                              img && img.trim() !== '' ? (
                                <div
                                  key={idx}
                                  className={`mr-2 h-16 w-16 flex-shrink-0 cursor-pointer overflow-hidden rounded border ${
                                    previewImage === img
                                      ? 'border-primary'
                                      : 'border-gray-200'
                                  }`}
                                  onClick={() => setPreviewImage(img)}
                                >
                                  <img
                                    src={img}
                                    alt={`Product image ${idx + 1}`}
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                      e.target.onerror = null
                                      e.target.src =
                                        'https://via.placeholder.com/80?text=Error'
                                    }}
                                  />
                                </div>
                              ) : null,
                            )}
                          </div>
                        </div>
                      )}

                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {form.name}
                      </h3>
                      {form.short_description && (
                        <p className="mt-1 text-sm text-gray-500">
                          {form.short_description}
                        </p>
                      )}
                      <p className="mt-2 text-xl font-semibold text-primary/90">
                        ${parseFloat(form.price || 0).toFixed(2)}
                      </p>

                      <div className="mt-4 border-t border-gray-100 pt-4">
                        <h4 className="mb-2 text-sm font-medium text-gray-700">
                          Description
                        </h4>
                        <div className="prose max-w-none overflow-y-auto rounded-md border border-gray-200 p-3 text-sm text-gray-800">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: showFullDescription
                                ? form.description
                                : truncateText(form.description, 150),
                            }}
                          />

                          {form.description &&
                            form.description.length > 150 && (
                              <button
                                type="button"
                                onClick={() =>
                                  setShowFullDescription(!showFullDescription)
                                }
                                className="mt-2 text-xs font-medium text-primary hover:underline"
                              >
                                {showFullDescription
                                  ? 'Show less'
                                  : 'Show more'}
                              </button>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
