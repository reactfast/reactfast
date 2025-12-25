'use client'

import { useState, useEffect } from 'react'
import { ReturnFieldsV2 } from './formFields/returnFields'
import { supabaseClient as supabase } from '@/config/supabase-client'

export default function PublicFormRenderer({ formId, formSlug, onSubmit }) {
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState(null)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})

  useEffect(() => {
    loadForm()
  }, [formId, formSlug])

  const loadForm = async () => {
    try {
      let query = supabase
        .from('forms')
        .select(`
          *,
          form_steps(
            *,
            form_step_fields(*)
          )
        `)
        .eq('is_public', true)
        .eq('is_active', true)
        .single()

      if (formId) {
        query = query.eq('id', formId)
      } else if (formSlug) {
        query = query.eq('slug', formSlug)
      } else {
        setLoading(false)
        return
      }

      const { data, error } = await query

      if (error || !data) {
        console.error('Error loading form:', error)
        setLoading(false)
        return
      }

      // Sort steps and fields
      data.form_steps = data.form_steps?.sort((a, b) => a.step_order - b.step_order) || []
      data.form_steps.forEach(step => {
        step.form_step_fields = step.form_step_fields?.sort((a, b) => a.field_order - b.field_order) || []
      })

      setForm(data)
      
      // Initialize form data with default values
      const initialData = {}
      data.form_steps.forEach(step => {
        step.form_step_fields.forEach(field => {
          const fieldConfig = field.field_config
          if (fieldConfig.defaultValue !== undefined) {
            initialData[fieldConfig.name] = fieldConfig.defaultValue
          }
        })
      })
      setFormData(initialData)
      
      setLoading(false)
    } catch (error) {
      console.error('Error in loadForm:', error)
      setLoading(false)
    }
  }

  const validateField = (fieldConfig, value) => {
    const errors = []

    // Required validation
    if (fieldConfig.required && (!value || value === '')) {
      errors.push(`${fieldConfig.label || fieldConfig.name} is required`)
    }

    // Type-specific validation
    if (value) {
      switch (fieldConfig.type) {
        case 'email':
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            errors.push('Please enter a valid email address')
          }
          break
        case 'url':
          try {
            new URL(value)
          } catch {
            errors.push('Please enter a valid URL')
          }
          break
        case 'tel':
          if (!/^[\d\s\-\+\(\)]+$/.test(value)) {
            errors.push('Please enter a valid phone number')
          }
          break
        case 'number':
          if (fieldConfig.min !== undefined && Number(value) < fieldConfig.min) {
            errors.push(`Value must be at least ${fieldConfig.min}`)
          }
          if (fieldConfig.max !== undefined && Number(value) > fieldConfig.max) {
            errors.push(`Value must be at most ${fieldConfig.max}`)
          }
          break
        case 'string':
        case 'text':
          if (fieldConfig.minLength && value.length < fieldConfig.minLength) {
            errors.push(`Must be at least ${fieldConfig.minLength} characters`)
          }
          if (fieldConfig.maxLength && value.length > fieldConfig.maxLength) {
            errors.push(`Must be at most ${fieldConfig.maxLength} characters`)
          }
          if (fieldConfig.pattern) {
            try {
              const regex = new RegExp(fieldConfig.pattern)
              if (!regex.test(value)) {
                errors.push('Invalid format')
              }
            } catch (e) {
              console.error('Invalid regex pattern:', fieldConfig.pattern)
            }
          }
          break
      }
    }

    return errors
  }

  const validateCurrentStep = () => {
    if (!form || !form.form_steps[currentStepIndex]) return true

    const step = form.form_steps[currentStepIndex]
    const stepErrors = {}
    let isValid = true

    step.form_step_fields.forEach(field => {
      const fieldConfig = field.field_config
      const value = formData[fieldConfig.name]
      const fieldErrors = validateField(fieldConfig, value)
      
      if (fieldErrors.length > 0) {
        stepErrors[fieldConfig.name] = fieldErrors
        isValid = false
      }
    })

    setErrors(stepErrors)
    return isValid
  }

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStepIndex(prev => Math.min(prev + 1, form.form_steps.length - 1))
    }
  }

  const handlePrevStep = () => {
    setCurrentStepIndex(prev => Math.max(prev - 1, 0))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateCurrentStep()) {
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch('/api/forms/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formId: form.id,
          data: formData,
          metadata: {
            formName: form.name,
            submittedAt: new Date().toISOString()
          }
        })
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitted(true)
        if (onSubmit) {
          onSubmit(result)
        }
      } else {
        console.error('Submission error:', result)
        alert('Failed to submit form. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const checkFieldCondition = (fieldConfig) => {
    if (!fieldConfig.hasCondition) return true

    const { conditionField, conditionOperator, conditionValue } = fieldConfig
    const watchedValue = formData[conditionField]

    switch (conditionOperator) {
      case 'equals':
        return watchedValue === conditionValue
      case 'not_equals':
        return watchedValue !== conditionValue
      case 'contains':
        return watchedValue && watchedValue.includes(conditionValue)
      case 'not_empty':
        return watchedValue && watchedValue !== ''
      case 'empty':
        return !watchedValue || watchedValue === ''
      default:
        return true
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!form) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Form Not Found</h2>
        <p className="mt-2 text-gray-600">This form is either not available or has been deactivated.</p>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">Thank You!</h2>
        <p className="mt-2 text-gray-600">Your form has been submitted successfully.</p>
      </div>
    )
  }

  const currentStep = form.form_steps[currentStepIndex]
  const isFirstStep = currentStepIndex === 0
  const isLastStep = currentStepIndex === form.form_steps.length - 1

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Form Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{form.name}</h1>
        {form.description && (
          <p className="mt-2 text-gray-600">{form.description}</p>
        )}
      </div>

      {/* Progress Indicator */}
      {form.form_steps.length > 1 && (
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {form.form_steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center ${index < form.form_steps.length - 1 ? 'flex-1' : ''}`}
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    index < currentStepIndex
                      ? 'bg-primary border-primary text-white'
                      : index === currentStepIndex
                      ? 'border-primary text-primary'
                      : 'border-gray-300 text-gray-300'
                  }`}
                >
                  {index < currentStepIndex ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                {index < form.form_steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 ${
                      index < currentStepIndex ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {form.form_steps.map((step, index) => (
              <div
                key={step.id}
                className={`text-xs ${
                  index === currentStepIndex ? 'text-primary font-semibold' : 'text-gray-500'
                }`}
              >
                {step.title || `Step ${index + 1}`}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step Content */}
      <form onSubmit={handleSubmit}>
        {currentStep && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            {currentStep.title && (
              <h2 className="text-xl font-semibold mb-4">{currentStep.title}</h2>
            )}
            {currentStep.description && (
              <p className="text-gray-600 mb-6">{currentStep.description}</p>
            )}

            <div className="space-y-4">
              {currentStep.form_step_fields.map((field) => {
                const fieldConfig = field.field_config
                
                // Check conditional visibility
                if (!checkFieldCondition(fieldConfig)) {
                  return null
                }

                return (
                  <div key={field.id} className={`${fieldConfig.width ? `w-${fieldConfig.width}/100` : 'w-full'}`}>
                    <ReturnFieldsV2
                      field={{
                        ...fieldConfig,
                        title: fieldConfig.label || fieldConfig.name
                      }}
                      value={formData[fieldConfig.name] || ''}
                      onChange={handleFieldChange}
                      theme={form.theme}
                    />
                    {errors[fieldConfig.name] && (
                      <div className="mt-1">
                        {errors[fieldConfig.name].map((error, idx) => (
                          <p key={idx} className="text-sm text-red-600">{error}</p>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handlePrevStep}
            disabled={isFirstStep}
            className={`px-6 py-2 rounded-md font-medium ${
              isFirstStep
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Previous
          </button>

          {isLastStep ? (
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary/90 disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNextStep}
              className="px-6 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary/90"
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  )
}