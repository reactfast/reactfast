import {
  ArrowLeftCircleIcon,
  CheckCircleIcon,
  PencilIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useState } from 'react'
import { supabaseClient as supabase } from '@/config/supabase-client'

export default function StepFieldSectionHeader({
  formId,
  formTitle,
  setFormTitle,
  formDescription,
  setFormDescription,
  saving,
  setSaving,
  lastSaved,
  hasUnsavedChanges,
}) {
  const [editingTitle, setEditingTitle] = useState(false)
  const [editingDescription, setEditingDescription] = useState(false)

  const saveFormMetadata = async () => {
    if (!formId) return
    setSaving(true)

    try {
      const { error } = await supabase
        .from('forms')
        .update({
          name: formTitle,
          description: formDescription,
          updated_at: new Date().toISOString(),
        })
        .eq('id', formId)

      if (error) {
        console.error('Error saving form metadata:', error)
      } else {
        setForm({ ...form, name: formTitle, description: formDescription })
        setLastSaved(new Date())
      }
    } catch (error) {
      console.error('Error in saveFormMetadata:', error)
    } finally {
      setSaving(false)
      setEditingTitle(false)
      setEditingDescription(false)
    }
  }

  return (
    <div className="mb-6">
      {/* Top bar with back link and save status */}
      <div className="flex items-center justify-between">
        {/* Back link */}
        <Link
          href="/account/flows/forms"
          className="mb-6 inline-flex items-center text-sm text-gray-600 transition-colors hover:text-primary"
        >
          <ArrowLeftCircleIcon className="mr-1 h-4 w-4" />
          Back to Forms
        </Link>

        {/* Save Status */}
        <div className="mb-6 flex items-center gap-x-2 text-sm text-gray-500">
          {saving ? (
            <>
              <div className="h-3 w-3 animate-spin rounded-full border-b-2 border-primary"></div>
              <span>Saving changes...</span>
            </>
          ) : lastSaved && !hasUnsavedChanges ? (
            <>
              <CheckCircleIcon className="h-4 w-4 text-green-500" />
              <span>All changes saved</span>
            </>
          ) : null}
        </div>
      </div>

      {/* Title and Description Section */}
      <div className="mb-6">
        <div>
          {/* Editable Title */}
          <div className="group">
            {editingTitle ? (
              <input
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                onBlur={saveFormMetadata}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    saveFormMetadata()
                  }
                  if (e.key === 'Escape') {
                    setFormTitle(form?.name || 'Untitled Form')
                    setEditingTitle(false)
                  }
                }}
                className="w-full border-0 border-b-2 border-primary bg-transparent px-0 font-display text-3xl font-light text-gray-900 focus:outline-none focus:ring-0"
                autoFocus
              />
            ) : (
              <h1
                onClick={() => setEditingTitle(true)}
                className="flex cursor-pointer items-center gap-2 font-display text-3xl font-light text-gray-900 transition-colors hover:text-gray-700"
              >
                {formTitle}
                <PencilIcon className="h-5 w-5 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100" />
              </h1>
            )}
          </div>

          {/* Editable Description */}
          <div className="group mt-2">
            {editingDescription ? (
              <textarea
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                onBlur={saveFormMetadata}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setFormDescription(form?.description || '')
                    setEditingDescription(false)
                  }
                }}
                className="w-full resize-none border-0 border-b border-gray-300 bg-transparent px-0 text-base text-gray-600 focus:border-primary focus:outline-none focus:ring-0"
                rows={2}
                placeholder="Add a description..."
                autoFocus
              />
            ) : (
              <p
                onClick={() => setEditingDescription(true)}
                className="flex min-h-[1.5rem] cursor-pointer items-center gap-2 text-base text-gray-600 transition-colors hover:text-gray-700"
              >
                {formDescription || (
                  <span className="italic text-gray-400">
                    Click to add description...
                  </span>
                )}
                <PencilIcon className="h-4 w-4 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100" />
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
