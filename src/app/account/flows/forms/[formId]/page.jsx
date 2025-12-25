'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabaseClient as supabase } from '@/config/supabase-client'
import { getUser } from '@/hooks/Auth'
import { PlusIcon } from '@heroicons/react/24/outline'
import FieldListItem from './FieldListItem'
import FieldEditorDrawer from './fieldEditorDrawer'
import StepList from './StepList'
import StepEditor from './StepEditor'
import FullScreenPreviewHeader from './fullScreenPreviewHeader'
import MobileScreenPreviewHeader from './mobileScreenPreviewHeader'
import StepFieldSectionHeader from './stepFieldSectionHeader'
import BuilderToolBar from './builderToolBar'
import NoFields from './noFields'
import Loading from './loading'

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
  const [steps, setSteps] = useState([])
  const [currentStep, setCurrentStep] = useState(null)
  const [fields, setFields] = useState([])
  const [selectedFieldIndex, setSelectedFieldIndex] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerAnimating, setDrawerAnimating] = useState(false)
  const [editingTitle, setEditingTitle] = useState(false)
  const [editingDescription, setEditingDescription] = useState(false)
  const [formTitle, setFormTitle] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [savingFields, setSavingFields] = useState(false)
  const [fullScreenPreview, setFullScreenPreview] = useState(false)
  const [editingStep, setEditingStep] = useState(null)

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

      if (formError || !formData) {
        console.error('Error loading form:', formError)
        router.push('/account/flows/forms')
        return
      }

      setForm(formData)
      setFormTitle(formData.name || 'Untitled Form')
      setFormDescription(formData.description || '')

      // Load all steps
      if (formData.form_steps && formData.form_steps.length > 0) {
        const sortedSteps = formData.form_steps.sort(
          (a, b) => a.step_order - b.step_order,
        )
        setSteps(sortedSteps)

        // Set first step as current
        const firstStep = sortedSteps[0]
        setCurrentStep(firstStep)

        // Load fields from the first step
        const stepFields = firstStep.form_step_fields || []
        const fieldsArray = stepFields
          .sort((a, b) => a.field_order - b.field_order)
          .map((f) => f.field_config)
        setFields(fieldsArray)
      } else {
        // Create default step if none exists
        const { data: stepData } = await supabase
          .from('form_steps')
          .insert([
            {
              form_id: formId,
              title: 'Step 1',
              description: '',
              step_order: 0,
              settings: {},
            },
          ])
          .select()
          .single()

        if (stepData) {
          setSteps([stepData])
          setCurrentStep(stepData)
        }
      }

      setLoading(false)
    } catch (error) {
      console.error('Error in loadFormData:', error)
      setLoading(false)
    }
  }

  const selectStep = async (stepId) => {
    // Save current fields before switching
    if (hasUnsavedChanges) {
      await saveFields()
    }

    const step = steps.find((s) => s.id === stepId)
    if (!step) return

    setCurrentStep(step)

    // Load fields for the selected step from database
    const { data: stepFieldsData } = await supabase
      .from('form_step_fields')
      .select('*')
      .eq('step_id', stepId)
      .order('field_order', { ascending: true })

    const fieldsArray = stepFieldsData?.map((f) => f.field_config) || []
    setFields(fieldsArray)

    // Update the step in our local state with the fresh fields data
    setSteps(
      steps.map((s) =>
        s.id === stepId ? { ...s, form_step_fields: stepFieldsData || [] } : s,
      ),
    )
  }

  const addStep = async () => {
    const newOrder = steps.length
    const { data, error } = await supabase
      .from('form_steps')
      .insert([
        {
          form_id: formId,
          title: `Step ${newOrder + 1}`,
          description: '',
          step_order: newOrder,
          settings: {},
        },
      ])
      .select('*, form_step_fields(*)')
      .single()

    if (!error && data) {
      setSteps([...steps, data])
      selectStep(data.id)
    }
  }

  const deleteStep = async (stepId) => {
    if (steps.length <= 1) {
      alert('You must have at least one step')
      return
    }

    if (
      !confirm('Are you sure you want to delete this step and all its fields?')
    ) {
      return
    }

    const { error } = await supabase
      .from('form_steps')
      .delete()
      .eq('id', stepId)

    if (!error) {
      const newSteps = steps.filter((s) => s.id !== stepId)
      setSteps(newSteps)

      // If we deleted the current step, switch to the first step
      if (currentStep?.id === stepId && newSteps.length > 0) {
        selectStep(newSteps[0].id)
      }
    }
  }

  const moveStep = async (index, direction) => {
    const newIndex = index + direction
    if (newIndex < 0 || newIndex >= steps.length) return

    const newSteps = [...steps]
    const [movedStep] = newSteps.splice(index, 1)
    newSteps.splice(newIndex, 0, movedStep)

    // Update step orders
    const updates = newSteps.map((step, idx) => ({
      id: step.id,
      step_order: idx,
    }))

    for (const update of updates) {
      await supabase
        .from('form_steps')
        .update({ step_order: update.step_order })
        .eq('id', update.id)
    }

    setSteps(newSteps)
  }

  const updateStep = async (updatedStep) => {
    const { error } = await supabase
      .from('form_steps')
      .update({
        title: updatedStep.title,
        description: updatedStep.description,
        updated_at: new Date().toISOString(),
      })
      .eq('id', updatedStep.id)

    if (!error) {
      setSteps(steps.map((s) => (s.id === updatedStep.id ? updatedStep : s)))
      setEditingStep(null)
    }
  }

  // Manual save function for fields
  const saveFields = async () => {
    if (!currentStep) return

    setSavingFields(true)

    try {
      // Delete existing fields for this step
      await supabase
        .from('form_step_fields')
        .delete()
        .eq('step_id', currentStep.id)

      // Insert new fields
      if (fields.length > 0) {
        const fieldsData = fields.map((field, index) => ({
          step_id: currentStep.id,
          field_config: field,
          field_order: index,
        }))

        const { error, data: newFieldsData } = await supabase
          .from('form_step_fields')
          .insert(fieldsData)
          .select('*')

        if (error) {
          console.error('Error saving fields:', error)
        } else {
          setHasUnsavedChanges(false)
          setLastSaved(new Date())

          // Update the step with new field count
          setSteps(
            steps.map((s) =>
              s.id === currentStep.id
                ? { ...s, form_step_fields: newFieldsData || [] }
                : s,
            ),
          )
        }
      } else {
        setHasUnsavedChanges(false)
        setLastSaved(new Date())

        // Update step to reflect no fields
        setSteps(
          steps.map((s) =>
            s.id === currentStep.id ? { ...s, form_step_fields: [] } : s,
          ),
        )
      }
    } catch (error) {
      console.error('Error in saveFields:', error)
    } finally {
      setSavingFields(false)
    }
  }

  // inside your component
  const saveFieldsDebounced = useRef(
    debounce(async () => {
      if (fields.length >= 0) {
        await saveFields()
      }
    }, 1000), // 1 second debounce
  ).current

  useEffect(() => {
    if (currentStep && fields.length >= 0) {
      saveFieldsDebounced()
    }
  }, [fields, currentStep])

  // Handle escape key to close drawer or full screen preview
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (fullScreenPreview) {
          setFullScreenPreview(false)
        } else if (drawerOpen) {
          closeDrawer()
        }
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [drawerOpen, fullScreenPreview])

  function publishForm() {
    async function publish() {
      setSaving(true)
      const { error } = await supabase
        .from('forms')
        .update({ status: 'published', updated_at: new Date().toISOString() })
        .eq('id', formId)

      if (error) {
        console.error('Error publishing form:', error)
        alert('Error publishing form. See console for details.')
      } else {
        alert('Form published successfully!')
        router.push('/account/flows/forms')
      }
    }

    publish()
  }

  // Handle drawer animations
  const openDrawer = () => {
    setDrawerOpen(true)
    setTimeout(() => setDrawerAnimating(true), 10) // Small delay for animation
  }

  const closeDrawer = () => {
    setDrawerAnimating(false)
    setTimeout(() => setDrawerOpen(false), 300) // Wait for animation to complete
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
    setHasUnsavedChanges(true)
    openDrawer()
  }

  const deleteField = (index) => {
    setFields(fields.filter((_, i) => i !== index))
    setSelectedFieldIndex(null)
    setHasUnsavedChanges(true)
  }

  const moveField = (index, direction) => {
    const newIndex = index + direction
    if (newIndex < 0 || newIndex >= fields.length) return
    const newFields = [...fields]
    const [movedField] = newFields.splice(index, 1)
    newFields.splice(newIndex, 0, movedField)
    setFields(newFields)
    setHasUnsavedChanges(true)
  }

  const updateField = (key, value) => {
    const updatedFields = [...fields]
    updatedFields[selectedFieldIndex] = {
      ...updatedFields[selectedFieldIndex],
      [key]: value,
    }
    setFields(updatedFields)
    setHasUnsavedChanges(true)
  }

  const exportJSON = () => {
    const formData = {
      form: {
        name: formTitle || 'Untitled Form',
        description: formDescription || '',
      },
      fields: fields,
    }

    const json = JSON.stringify(formData, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${formTitle?.replace(/\s+/g, '_') || 'form'}_export.json`
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
        if (data.fields) {
          setFields(data.fields)
        }
      } catch (error) {
        console.error('Error parsing JSON:', error)
        alert('Invalid JSON file')
      }
    }
    reader.readAsText(file)
  }

  if (loading) <Loading />

  return (
    <>
      <div className="relative grid h-screen w-full grid-cols-3 bg-white">
        {drawerOpen && (
          <>
            {/* Backdrop - only covers the main content column */}
            <div
              className={`absolute inset-y-0 left-0 right-1/3 z-40 bg-black/20 transition-opacity duration-300 ease-out ${
                drawerAnimating ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={closeDrawer}
            />

            {/* Drawer Panel */}
            <div
              className={`fixed bottom-0 left-0 top-0 z-50 w-96 max-w-[90vw] transform bg-white shadow-2xl transition-transform duration-300 ease-out ${
                drawerAnimating ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
              <div className="h-full overflow-y-auto p-6">
                {fields[selectedFieldIndex] && (
                  <FieldEditorDrawer
                    field={fields[selectedFieldIndex]}
                    updateField={updateField}
                    closeDrawer={closeDrawer}
                  />
                )}
              </div>
            </div>
          </>
        )}

        {/* Main content */}
        <div className="col-span-2 overflow-y-auto border-r border-gray-200 bg-white">
          <div className="px-8 py-6">
            <StepFieldSectionHeader
              formId={formId}
              formTitle={formTitle}
              setFormTitle={setFormTitle}
              formDescription={formDescription}
              setFormDescription={setFormDescription}
              saving={saving}
              setSaving={setSaving}
              lastSaved={lastSaved}
              hasUnsavedChanges={hasUnsavedChanges}
            />

            <BuilderToolBar
              saveFields={saveFields}
              hasUnsavedChanges={hasUnsavedChanges}
              savingFields={savingFields}
              addField={addField}
              exportJSON={exportJSON}
              importJSON={importJSON}
              publishForm={publishForm}
            />
            <br />

            {/* Steps Section - Only show if multi-step */}
            <div className="mb-6">
              <StepList
                steps={steps}
                currentStepId={currentStep?.id}
                onSelectStep={selectStep}
                onAddStep={addStep}
                onDeleteStep={deleteStep}
                onMoveStep={moveStep}
                onEditStep={setEditingStep}
              />
            </div>

            {/* Fields Section */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-medium text-gray-900">
                    {steps.length > 1 && currentStep
                      ? `${currentStep.title || `Step ${currentStep.step_order + 1}`} - `
                      : ''}
                    Form Fields
                  </h2>
                  {hasUnsavedChanges && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
                      <span className="h-1.5 w-1.5 rounded-full bg-yellow-600"></span>
                      Unsaved
                    </span>
                  )}
                </div>
                <div>
                  <span className="mr-4 text-sm text-gray-500">
                    {fields.length} {fields.length === 1 ? 'field' : 'fields'}
                  </span>
                  <button
                    onClick={addField}
                    className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                  >
                    <PlusIcon className="h-3 w-3" />
                    Add Field
                  </button>
                </div>
              </div>
              {fields.length === 0 ? (
                <NoFields />
              ) : (
                <div className="space-y-3">
                  {fields.map((field, index) => (
                    <FieldListItem
                      key={index}
                      field={field}
                      index={index}
                      moveField={moveField}
                      editField={(idx) => {
                        setSelectedFieldIndex(idx)
                        openDrawer()
                      }}
                      deleteField={deleteField}
                      duplicateField={(idx) => {
                        const duplicated = {
                          ...fields[idx],
                          name: `${fields[idx].name}_copy`,
                        }
                        const newFields = [...fields]
                        newFields.splice(idx + 1, 0, duplicated)
                        setFields(newFields)
                        setHasUnsavedChanges(true)
                      }}
                      isSelected={selectedFieldIndex === index}
                      selectField={setSelectedFieldIndex}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right sidebar for preview */}
        <MobileScreenPreviewHeader
          steps={steps}
          currentStep={currentStep}
          fields={fields}
          formTitle={formTitle}
          formDescription={formDescription}
          setFullScreenPreview={setFullScreenPreview}
        />
      </div>

      {fullScreenPreview && (
        <FullScreenPreviewHeader
          steps={steps}
          currentStep={currentStep}
          fields={fields}
          formTitle={formTitle}
          formDescription={formDescription}
          setFullScreenPreview={setFullScreenPreview}
        />
      )}

      {editingStep && (
        <StepEditor
          step={editingStep}
          onSave={updateStep}
          onClose={() => setEditingStep(null)}
        />
      )}
    </>
  )
}
