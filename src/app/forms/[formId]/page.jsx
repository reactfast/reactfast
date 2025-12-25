'use client'

import { use, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabaseClient as supabase } from '@/config/supabase-client'
import FormView from '@/components/FormView'

export default function FormViewPage() {
  const params = useParams()
  const formId = params.formId

  const [form, setForm] = useState(null)
  const [steps, setSteps] = useState([])
  const [currentStep, setCurrentStep] = useState(null)
  const [fields, setFields] = useState([])
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({}) // form data to be submitted lives here

  useEffect(() => {
    if (formId) loadForm()
  }, [formId])

  const loadForm = async () => {
    setLoading(true)
    try {
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
        .eq('status', 'published')
        .single()

      if (formError || !formData) {
        console.error('Error loading form:', formError)
        setLoading(false)
        return
      }

      setForm(formData)

      // Load steps
      if (formData.form_steps && formData.form_steps.length > 0) {
        const sortedSteps = formData.form_steps.sort(
          (a, b) => a.step_order - b.step_order,
        )
        setSteps(sortedSteps)
        const firstStep = sortedSteps[0]
        setCurrentStep(firstStep)

        const stepFields = firstStep.form_step_fields || []
        setFields(stepFields.map((f) => f.field_config))
      }

      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  const handleSubmit = () => {
    async function submitData() {
      await supabase.from('form_submissions').insert([
        {
          form_id: form.id,
          submission_data: formData,
        },
      ])
    }
    submitData()
    window.location.href = `/forms/${formId}/success`
  }

  function handleFormDataChange(e) {
    const { name, value, type, checked, files } = e.target
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  useEffect(() => {
    console.log('Form Data Updated:', formData)
  }, [formData])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!form) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-500">
        Form not found
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <FormView
          steps={steps}
          currentStepId={currentStep?.id}
          fields={fields}
          isMobileView={false}
          formTitle={form.name}
          formDescription={form.description}
          formData={formData}
          handleChange={(e) => handleFormDataChange(e)}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}
