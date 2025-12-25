'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabaseClient as supabase } from '@/config/supabase-client'

export default function CreateOrEditSecTypeCategory() {
  const { id } = useParams()
  const router = useRouter()
  const isEditMode = id !== 'new'

  const [form, setForm] = useState({ category: '', sec_type: '' })
  const [loading, setLoading] = useState(isEditMode)
  const [categories, setCategories] = useState([])
  const [secTypes, setSecTypes] = useState([])

  // Fetch dropdown options and existing form data (if editing)
  useEffect(() => {
    const fetchDropdowns = async () => {
      const [{ data: catData }, { data: typeData }] = await Promise.all([
        supabase.from('sec_categories').select('id, title'),
        supabase.from('sec_type').select('id, name'),
      ])

      if (catData) setCategories(catData)
      if (typeData) setSecTypes(typeData)
    }

    const fetchFormData = async () => {
      if (!isEditMode) return

      const { data } = await supabase
        .from('sec_type_categories')
        .select()
        .eq('id', id)
        .single()

      if (data) setForm(data)
      setLoading(false)
    }

    fetchDropdowns().then(fetchFormData)
  }, [id])

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      category: form.category,
      sec_type: form.sec_type,
    }

    const { error } = isEditMode
      ? await supabase.from('sec_type_categories').update(payload).eq('id', id)
      : await supabase.from('sec_type_categories').insert([payload])

    if (!error) router.push('/account/admin/section-categories')
  }

  if (loading) return <p className="p-4">Loading...</p>

  return (
    <div className="p-4">
      <button
        onClick={() => router.back()}
        className="rounded bg-gray-300 px-4 py-2 text-sm hover:bg-gray-400"
      >
        ← Back
      </button>
      <h1 className="mb-4 text-xl font-bold">
        {isEditMode ? 'Edit' : 'Create'} Sec Type Category
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="w-full border p-2"
        >
          <option value="">Select a Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.title}
            </option>
          ))}
        </select>

        <select
          name="sec_type"
          value={form.sec_type}
          onChange={handleChange}
          required
          className="w-full border p-2"
        >
          <option value="">Select a Sec Type</option>
          {secTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className={`${
            isEditMode ? 'bg-green-500' : 'bg-blue-500'
          } rounded px-4 py-2 text-white`}
        >
          {isEditMode ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  )
}
