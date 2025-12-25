'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabaseClient as supabase } from '@/config/supabase-client'
import Loading from '@/components/loading'

export default function CustomerDetailPage() {
  const { customerid } = useParams()
  const [customer, setCustomer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    business_name: '',
    type: '',
    address: '',
    phone: '',
    email: '',
    instagram: '',
    facebook: '',
    website: '',
    status: '',
  })

  // Notes
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [addingNote, setAddingNote] = useState(false)

  const fetchCustomer = async () => {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', customerid)
      .single()

    if (error) return console.error(error)
    setCustomer(data)
    setFormData({
      business_name: data.business_name || '',
      type: data.type || '',
      address: data.address || '',
      phone: data.phone || '',
      email: data.email || '',
      instagram: data.instagram || '',
      facebook: data.facebook || '',
      website: data.website || '',
      status: data.status || 'cold lead', // 👈 Add this line
    })
    setLoading(false)
  }

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from('customer_notes')
      .select('*')
      .eq('customer_id', customerid)
      .order('created_at', { ascending: false })

    if (error) return console.error(error)
    setNotes(data)
  }

  useEffect(() => {
    fetchCustomer()
    fetchNotes()
  }, [customerid])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    const {
      business_name,
      type,
      address,
      phone,
      email,
      instagram,
      facebook,
      website,
      status, // 👈 Add this
    } = formData

    const { error } = await supabase
      .from('customers')
      .update({
        business_name,
        type,
        address,
        phone,
        email,
        instagram,
        facebook,
        website,
        status, // 👈 Add this
      })
      .eq('id', customerid)

    if (error) console.error(error)
    else {
      setCustomer({ ...customer, ...formData })
      setEditMode(false)
    }
    setSaving(false)
  }

  const handleAddNote = async () => {
    if (!newNote.trim()) return
    setAddingNote(true)

    const user = supabase.auth.getUser
      ? (await supabase.auth.getUser()).data.user
      : null
    const { error } = await supabase
      .from('customer_notes')
      .insert([
        { customer_id: customerid, user_id: user?.id, content: newNote },
      ])

    if (error) console.error(error)
    else {
      setNewNote('')
      fetchNotes()
    }
    setAddingNote(false)
  }

  if (loading) return <Loading />

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 p-8 lg:flex-row">
      {/* Left / Main Section: Customer Info */}
      <div className="flex-1 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Customer Details
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Customer ID: {customer.id}
            </p>
          </div>

          <div className="flex gap-2">
            {editMode && (
              <button
                onClick={handleSave}
                disabled={saving}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-white shadow hover:bg-indigo-500 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            )}
            <button
              onClick={() => setEditMode((prev) => !prev)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              {editMode ? 'Cancel' : 'Edit'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { label: 'Business Name', name: 'business_name' },
            { label: 'Type', name: 'type' },
            { label: 'Address', name: 'address' },
            { label: 'Phone', name: 'phone', isLink: 'tel' },
            { label: 'Email', name: 'email', isLink: 'mailto' },
            { label: 'Instagram', name: 'instagram', isLink: 'url' },
            { label: 'Facebook', name: 'facebook', isLink: 'url' },
            { label: 'Website', name: 'website', isLink: 'url' },
          ].map(({ label, name, isLink }) => (
            <div key={name} className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700">
                {label}
              </label>
              {editMode ? (
                <input
                  type="text"
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              ) : isLink && formData[name] ? (
                name === 'facebook' ? (
                  <a
                    href={`https://facebook.com/${formData[name]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                  >
                    {formData[name]}
                  </a>
                ) : name === 'instagram' ? (
                  <a
                    href={`https://instagram.com/${formData[name]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                  >
                    {formData[name]}
                  </a>
                ) : isLink === 'mailto' ? (
                  <a
                    href={`mailto:${formData[name]}`}
                    className="text-indigo-600 hover:underline"
                  >
                    {formData[name]}
                  </a>
                ) : isLink === 'tel' ? (
                  <a
                    href={`tel:${formData[name]}`}
                    className="text-indigo-600 hover:underline"
                  >
                    {formData[name]}
                  </a>
                ) : (
                  <a
                    href={
                      formData[name].startsWith('http')
                        ? formData[name]
                        : `https://${formData[name]}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                  >
                    {formData[name]}
                  </a>
                )
              ) : (
                <p className="text-gray-900">{formData[name]}</p>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Status
          </label>
          {editMode ? (
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              {['cold lead', 'warm lead', 'customer', 'opted out'].map(
                (option) => (
                  <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ),
              )}
            </select>
          ) : (
            <p
              className={`inline-block rounded-full px-2 py-1 text-sm font-medium ${
                formData.status === 'customer'
                  ? 'bg-green-100 text-green-800'
                  : formData.status === 'warm lead'
                    ? 'bg-yellow-100 text-yellow-800'
                    : formData.status === 'cold lead'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-red-100 text-red-800'
              }`}
            >
              {formData.status}
            </p>
          )}
        </div>

        {customer?.updated_at && (
          <p className="mt-4 text-sm text-gray-500">
            Last updated: {new Date(customer.updated_at).toLocaleString()}
          </p>
        )}
      </div>

      {/* Right Sidebar: Notes */}
      <div className="flex w-full flex-col gap-4 lg:w-1/3">
        <h2 className="text-xl font-semibold">Notes</h2>

        <div className="flex flex-col gap-2">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a new note..."
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <button
            onClick={handleAddNote}
            disabled={addingNote}
            className="self-end rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 disabled:opacity-50"
          >
            {addingNote ? 'Adding...' : 'Add Note'}
          </button>
        </div>

        <div className="mt-2 flex max-h-[70vh] flex-col gap-4 overflow-y-auto">
          {notes.map((note) => (
            <div
              key={note.id}
              className="rounded-lg border border-gray-200 p-3 shadow-sm"
            >
              <p className="text-sm text-gray-700">{note.content}</p>
              <p className="mt-1 text-xs text-gray-500">
                By {note.user?.email || note.user_id} •{' '}
                {new Date(note.created_at).toLocaleString()}
              </p>
            </div>
          ))}
          {notes.length === 0 && (
            <p className="text-sm text-gray-500">No notes yet</p>
          )}
        </div>
      </div>
    </div>
  )
}
