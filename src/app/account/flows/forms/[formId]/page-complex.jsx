'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeftCircleIcon,
  PlusCircleIcon,
  PaintBrushIcon,
  ArrowDownloadIcon,
  ArrowUpTrayIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'
import FieldListItem from './FieldListItem'
import FieldEditorDrawer from './fieldEditorDrawer'
import FormPreview from '../../../../../components/FormPreview'
import Link from 'next/link'
import { supabaseClient as supabase } from '@/config/supabase-client'
import { getUser } from '@/hooks/Auth'
import Loading from '@/app/account/loading'

// Custom debounce function
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export default function FormBuilderPage() {
  const params = useParams()
  const router = useRouter()
  const formId = params.formId

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState(null)
  const [form, setForm] = useState(null)
  const [currentStep, setCurrentStep] = useState(null)
  const [fields, setFields] = useState([])
  const [selectedFieldIndex, setSelectedFieldIndex] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [formName, setFormName] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [editingName, setEditingName] = useState(false)
  const saveTimeoutRef = useRef(null)

  // Load form data on mount
  useEffect(() => {
    loadFormData()
  }, [formId])

  const loadFormData = async () => {
    try {
      const user = await getUser()
      if (!user) {
        router.push('/login')
        return
      }

      // Fetch form with steps and fields
      const { data: formData, error: formError } = await supabase
        .from('forms')
        .select(
          `
          *,
          form_steps(
            *,
            form_step_fields(*)
          )
        `,
        )
        .eq('id', formId)
        .single()

      if (formError) {
        console.error('Error loading form:', formError)
        router.push('/account/flows/forms')
        return
      }

      setForm(formData)
      setFormName(formData.name || '')
      setFormDescription(formData.description || '')

      // Load first step if exists
      if (formData.form_steps && formData.form_steps.length > 0) {
        const firstStep = formData.form_steps.sort(
          (a, b) => a.step_order - b.step_order,
        )[0]
        setCurrentStep(firstStep)

        // Load fields from the step
        const stepFields = firstStep.form_step_fields || []
        const fieldsArray = stepFields
          .sort((a, b) => a.field_order - b.field_order)
          .map((f) => f.field_config)
        setFields(fieldsArray)
      }

      setLoading(false)
    } catch (error) {
      console.error('Error in loadFormData:', error)
      setLoading(false)
    }
  }

  // Auto-save functionality
  const saveFieldsDebounced = useRef(
    debounce(async (fieldsToSave, stepId) => {
      if (!stepId) return

      setSaving(true)

      try {
        // Delete existing fields for this step
        await supabase.from('form_step_fields').delete().eq('step_id', stepId)

        // Insert new fields
        if (fieldsToSave.length > 0) {
          const fieldsData = fieldsToSave.map((field, index) => ({
            step_id: stepId,
            field_config: field,
            field_order: index,
          }))

          const { error } = await supabase
            .from('form_step_fields')
            .insert(fieldsData)

          if (error) {
            console.error('Error saving fields:', error)
          }
        }

        setLastSaved(new Date())
        setSaving(false)
      } catch (error) {
        console.error('Error in saveFields:', error)
        setSaving(false)
      }
    }, 1500),
  ).current

  // Watch for field changes and auto-save
  useEffect(() => {
    if (currentStep && fields.length >= 0) {
      saveFieldsDebounced(fields, currentStep.id)
    }
  }, [fields, currentStep])

  // Save form metadata
  const saveFormMetadata = async () => {
    if (!form) return

    try {
      const { error } = await supabase
        .from('forms')
        .update({
          name: formName,
          description: formDescription,
        })
        .eq('id', form.id)

      if (error) {
        console.error('Error updating form metadata:', error)
      } else {
        setEditingName(false)
      }
    } catch (error) {
      console.error('Error in saveFormMetadata:', error)
    }
  }

  // Toolbar Actions
  const addField = () => {
    const newField = {
      name: `field_${fields.length + 1}`,
      type: 'string',
      placeholder: 'Enter text',
      width: 100,
    }
    setFields([...fields, newField])
    setSelectedFieldIndex(fields.length)
    setDrawerOpen(true)
  }

  const editField = (index) => {
    setSelectedFieldIndex(index)
    setDrawerOpen(true)
  }

  const deleteField = (index) => {
    setFields(fields.filter((_, i) => i !== index))
    setSelectedFieldIndex(null)
  }

  const duplicateField = (index) => {
    const newFields = [...fields]
    const duplicated = { ...fields[index], name: `${fields[index].name}_copy` }
    newFields.splice(index + 1, 0, duplicated)
    setFields(newFields)
  }

  const moveField = (index, direction) => {
    const newIndex = index + direction
    if (newIndex < 0 || newIndex >= fields.length) return
    const newFields = [...fields]
    const [movedField] = newFields.splice(index, 1)
    newFields.splice(newIndex, 0, movedField)
    setFields(newFields)
  }

  const updateField = (key, value) => {
    const updatedFields = [...fields]
    updatedFields[selectedFieldIndex] = {
      ...updatedFields[selectedFieldIndex],
      [key]: value,
    }
    setFields(updatedFields)
  }

  const exportJSON = () => {
    const formData = {
      form: {
        name: formName,
        description: formDescription,
        settings: form?.settings || {},
        theme: form?.theme || {},
      },
      steps: [
        {
          title: currentStep?.title || 'Step 1',
          description: currentStep?.description || '',
          fields: fields,
        },
      ],
    }

    const json = JSON.stringify(formData, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${formName.replace(/\s+/g, '_')}_form.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const importJSON = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        if (data.steps && data.steps[0] && data.steps[0].fields) {
          setFields(data.steps[0].fields)
          if (data.form) {
            setFormName(data.form.name || formName)
            setFormDescription(data.form.description || formDescription)
            saveFormMetadata()
          }
        }
      } catch (error) {
        console.error('Error parsing JSON:', error)
        alert('Invalid JSON file')
      }
    }
    reader.readAsText(file)
  }

  if (loading) return <Loading />

  return (
    <>
      <div className="grid w-full grid-cols-12">
        {/* Left sidebar & main wrapper */}
        <div className="col-span-3 border-b border-gray-200 px-4 py-6 sm:px-6 lg:pl-8 xl:border-r">
          {drawerOpen && (
            <FieldEditorDrawer
              field={fields[selectedFieldIndex]}
              updateField={updateField}
              closeDrawer={() => setDrawerOpen(false)}
            />
          )}
        </div>
        <div className="col-span-5">
          <div className="w-full px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            <div className="h-[100vh] overflow-y-auto">
              {/* Form Header */}
              <div className="mb-4 px-4">
                {editingName ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      onBlur={saveFormMetadata}
                      onKeyDown={(e) => e.key === 'Enter' && saveFormMetadata()}
                      className="w-full border-b-2 border-primary text-2xl font-semibold focus:outline-none"
                      placeholder="Form Name"
                      autoFocus
                    />
                    <textarea
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      onBlur={saveFormMetadata}
                      className="w-full resize-none border-b border-gray-300 text-sm text-gray-600 focus:outline-none"
                      placeholder="Form Description"
                      rows={2}
                    />
                  </div>
                ) : (
                  <div
                    onClick={() => setEditingName(true)}
                    className="cursor-pointer rounded p-2 hover:bg-gray-50"
                  >
                    <h2 className="text-2xl font-semibold">
                      {formName || 'Untitled Form'}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {formDescription || 'Click to add description'}
                    </p>
                  </div>
                )}

                {/* Save Status */}
                <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                  {saving ? (
                    <>
                      <div className="h-3 w-3 animate-spin rounded-full border-b-2 border-primary"></div>
                      <span>Saving...</span>
                    </>
                  ) : lastSaved ? (
                    <>
                      <CheckCircleIcon className="h-3 w-3 text-green-500" />
                      <span>
                        Last saved {new Date(lastSaved).toLocaleTimeString()}
                      </span>
                    </>
                  ) : null}
                </div>
              </div>

              {/* TOOLBAR */}
              <div className="flex justify-between px-4 py-2 text-primary">
                {/* Back Button */}
                <Link
                  href="/account/flows/forms"
                  className="inline-flex h-10 items-center gap-1 rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
                >
                  <ArrowLeftCircleIcon className="h-5 w-5" />
                  <span className="hidden lg:block">Back</span>
                </Link>

                {/* Toolbar Buttons */}
                <div className="flex">
                  <button
                    onClick={addField}
                    className="inline-flex h-10 items-center gap-1 rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-primary shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
                  >
                    <PlusCircleIcon className="h-5 w-5" />
                    <span className="hidden lg:block">Add Field</span>
                  </button>
                  <button
                    onClick={() => setSettingsOpen(!settingsOpen)}
                    className="inline-flex h-10 items-center gap-1 bg-white px-3 py-2 text-sm font-semibold text-primary shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
                  >
                    <PaintBrushIcon className="h-5 w-5" />
                    <span className="hidden lg:block">Theme</span>
                  </button>
                  <button
                    onClick={exportJSON}
                    className="inline-flex h-10 items-center gap-1 bg-white px-3 py-2 text-sm font-semibold text-primary shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
                  >
                    <ArrowDownloadIcon className="h-5 w-5" />
                    <span className="hidden lg:block">Export</span>
                  </button>
                  <label className="inline-flex h-10 cursor-pointer items-center gap-1 rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-primary shadow-sm ring-1 ring-gray-300 hover:bg-gray-50">
                    <ArrowUpTrayIcon className="h-5 w-5" />
                    <span className="hidden lg:block">Import</span>
                    <input
                      type="file"
                      accept="application/json"
                      onChange={importJSON}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Fields List */}
              <div className="p-4">
                {fields.map((field, index) => (
                  <FieldListItem
                    key={index}
                    field={field}
                    index={index}
                    moveField={moveField}
                    editField={editField}
                    deleteField={deleteField}
                    duplicateField={duplicateField}
                    isSelected={selectedFieldIndex === index}
                    selectField={setSelectedFieldIndex}
                  />
                ))}

                {fields.length === 0 && (
                  <div className="p-4 text-center text-gray-500">
                    No fields yet. Click "Add Field" to get started!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-4 border-t border-gray-200 px-4 py-6 lg:border-l lg:border-t-0">
          {/* Right Column: Live Form Preview */}
          <div className="h-[100vh] w-full overflow-y-auto">
            <FormPreview fields={fields} />
          </div>
        </div>
      </div>
    </>
  )
}
