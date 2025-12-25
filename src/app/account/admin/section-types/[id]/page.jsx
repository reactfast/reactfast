'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabaseClient as supabase } from '@/config/supabase-client'
import IPhoneLayout from '@/components/iphone'
import ReturnSection from '@/app/[slug]/returnSecs3'

export default function SecTypeForm() {
  const router = useRouter()
  const params = useParams()
  const isNew = params.id === 'new'

  const [categories, setCategories] = useState([])
  const [assignedCategories, setAssignedCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')

  const [formData, setFormData] = useState({
    definition: '',
    name: '',
    preview_url: '',
    component_name: '',
    status: 'pending',
    folder_name: '',
    num: '',
    type: '',
    version: 1,
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchInitialData() {
      if (!isNew) {
        setLoading(true)

        const [secTypeRes, categoriesRes, assignedRes] = await Promise.all([
          supabase.from('sec_type').select('*').eq('id', params.id).single(),
          supabase.from('sec_categories').select('*'),
          supabase
            .from('sec_type_categories')
            .select('id, category, sec_categories(*)')
            .eq('sec_type', params.id),
        ])

        if (secTypeRes.error)
          console.error('Error fetching type:', secTypeRes.error)
        else {
          setFormData({
            ...secTypeRes.data,
            definition: JSON.stringify(secTypeRes.data.definition, null, 2),
          })
        }

        if (categoriesRes.error)
          console.error('Error fetching categories:', categoriesRes.error)
        else setCategories(categoriesRes.data)

        if (assignedRes.error)
          console.error('Error fetching assigned:', assignedRes.error)
        else setAssignedCategories(assignedRes.data)

        setLoading(false)
      } else {
        const { data, error } = await supabase
          .from('sec_categories')
          .select('*')
        if (error) console.error('Error fetching categories:', error)
        else setCategories(data)
      }
    }

    fetchInitialData()
  }, [params.id, isNew])

  useEffect(() => {
    console.log('Form Data:', formData)
  }, [formData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFixJSON = () => {
    try {
      let fixedJSON = formData.definition
        .replace(/([{,])\s*([\w]+)\s*:/g, '$1 "$2":') // Ensure keys are wrapped in double quotes
        .replace(/'/g, '"') // Convert all single quotes to double quotes
        .replace(/\,(?!\s*?[\{\[\"\'\w])/g, '') // Remove trailing commas

      // Attempt to parse JSON to ensure it's valid
      const parsedJSON = JSON.parse(fixedJSON)

      // Pretty-print the corrected JSON for readability
      setFormData((prev) => ({
        ...prev,
        definition: JSON.stringify(parsedJSON, null, 2),
      }))
    } catch (error) {
      console.error('Invalid JSON format:', error)
      alert(
        'Invalid JSON format! Please ensure keys and values are correctly formatted.',
      )
    }
  }

  const handleAssignCategory = async () => {
    if (!selectedCategory || !formData.id) return

    const { data, error } = await supabase
      .from('sec_type_categories')
      .insert([{ sec_type: formData.id, category: selectedCategory }])

    if (error) {
      console.error('Error assigning category:', error)
      return
    }

    // Refresh assigned list
    const { data: updatedAssigned } = await supabase
      .from('sec_type_categories')
      .select('id, category, sec_categories(*)')
      .eq('sec_type', formData.id)

    setAssignedCategories(updatedAssigned)
    setSelectedCategory('')
  }

  const handleRemoveCategory = async (catId) => {
    const { error } = await supabase
      .from('sec_type_categories')
      .delete()
      .eq('sec_type', formData.id)
      .eq('category', catId)

    if (error) {
      console.error('Error removing category:', error)
      return
    }

    setAssignedCategories((prev) =>
      prev.filter((entry) => entry.category !== catId),
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const payload = {
      ...formData,
      definition: formData.definition ? JSON.parse(formData.definition) : null, // Convert back to JSON
    }

    let response

    if (isNew) {
      response = await supabase.from('sec_type').insert([payload])
    } else {
      response = await supabase
        .from('sec_type')
        .update(payload)
        .eq('id', params.id)
    }

    if (response.error) {
      console.error('Error saving data:', response.error)
    } else {
      router.push(`/account/admin/section-types`) // Redirect after saving
    }
    setLoading(false)
  }

  return (
    <div className="mx-auto flex max-w-6xl gap-8 p-6">
      <div className="w-2/3 rounded-md bg-white p-6 shadow">
        <button
          type="button"
          onClick={() => router.push('/account/admin/section-types')}
          className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {'<'} Back
        </button>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-semibold">
            {isNew ? 'Create' : 'Edit'} Section Type
          </h1>
          {loading && <p className="text-gray-500">Loading...</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded border p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Component Name
              </label>
              <input
                type="text"
                name="component_name"
                value={formData.component_name}
                onChange={handleChange}
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Folder Name
              </label>
              <input
                type="text"
                name="folder_name"
                value={formData.folder_name}
                onChange={handleChange}
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Preview URL
              </label>
              <input
                type="text"
                name="preview_url"
                value={formData.preview_url}
                onChange={handleChange}
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Hero Icon V2
              </label>
              <input
                type="text"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded border p-2"
              >
                <option value="pending">pending</option>
                <option value="active">active</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Number
              </label>
              <input
                type="text"
                name="num"
                value={formData.num}
                onChange={handleChange}
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Version
              </label>
              <input
                type="number"
                name="version"
                value={formData.version}
                onChange={handleChange}
                step="0.1"
                className="w-full rounded border p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Definition (JSON)
              </label>
              <textarea
                name="definition"
                value={formData.definition}
                onChange={handleChange}
                rows="4"
                className="w-full rounded border p-2 font-mono"
              />
              <button
                type="button"
                onClick={handleFixJSON}
                className="mt-2 rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-700"
              >
                Fix JSON Format
              </button>
            </div>

            <button
              type="submit"
              className="w-full rounded bg-blue-600 p-3 text-white hover:bg-blue-700 disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? 'Saving...' : isNew ? 'Create' : 'Update'}
            </button>
          </form>
        </div>
      </div>

      <aside className="w-1/3 rounded-md bg-white p-6 shadow">
        {/* <IPhoneLayout bgColor={'#fff'} fontColor={'#000'}> */}
        <div className="h-[500px] overflow-auto rounded-lg border border-gray-300 py-12">
          <ReturnSection
            key={formData.id}
            section={formData}
            content={formData.definition}
            colors={[
              '3D3D3D',
              'FFFFFF',
              'FFFFFF',
              'FFFFFF',
              'FFFFFF',
              'FFFFFF',
            ]}
            theme={formData.folder_name}
            component_name={formData.component_name}
            site={{ name: 'example-site' }}
          />
        </div>
        {/* </IPhoneLayout> */}
        <h2 className="mb-2 text-lg font-semibold">Assign Categories</h2>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Select Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full rounded border p-2"
          >
            <option value="">-- Select --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            ))}
          </select>
          <button
            onClick={handleAssignCategory}
            type="button"
            className="mt-2 w-full rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            disabled={!formData.id}
          >
            Add to Section
          </button>
        </div>

        <h3 className="mb-2 text-sm font-semibold text-gray-800">
          Assigned Categories
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          {assignedCategories.length > 0 ? (
            assignedCategories.map(({ category, sec_categories }) => (
              <li
                key={category}
                className="flex items-center justify-between rounded border p-2"
              >
                <span>{sec_categories?.title || 'Untitled'}</span>
                <button
                  onClick={() => handleRemoveCategory(category)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))
          ) : (
            <li>No categories assigned.</li>
          )}
        </ul>
      </aside>
    </div>
  )
}
