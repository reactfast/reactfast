'use client'

import { useEffect, useState } from 'react'
import { getUser } from '@/hooks/Auth'
import { supabaseClient as supabase } from '@/config/supabase-client'
import { convertIsoToReadableDate } from '@/helpers/dateConvert'
import Loading from '../../loading'
import Pagination from '@/components/pagination'
import { useRouter } from 'next/navigation'
import { PlusIcon, PencilIcon, TrashIcon, DocumentDuplicateIcon, EyeIcon } from '@heroicons/react/24/outline'

const columns = ['Name', 'Description', 'Submissions', 'Status', 'Created At', 'Actions']

export default function FormsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [forms, setForms] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [creatingForm, setCreatingForm] = useState(false)
  const itemsPerPage = 10

  useEffect(() => {
    async function _getUser() {
      const user = await getUser()
      if (user) setCurrentUser(user)
    }
    _getUser()
  }, [])

  useEffect(() => {
    if (!currentUser) return

    async function fetchForms() {
      const { data: formsData, error: formsError } = await supabase
        .from('forms')
        .select(`
          *,
          form_steps(*, form_step_fields(*)),
          form_submissions(count)
        `)
        .eq('author', currentUser.id)
        .order('created_at', { ascending: false })

      if (formsError) {
        console.error(formsError)
        setLoading(false)
        return
      }

      const enrichedForms = (formsData || []).map((form) => {
        const steps = form.form_steps || []
        const totalFields = steps.reduce(
          (acc, step) => acc + (step.form_step_fields?.length || 0),
          0,
        )
        return {
          ...form,
          numSteps: steps.length,
          numFields: totalFields,
          submissionsCount: form.form_submissions?.[0]?.count || 0,
        }
      })

      setForms(enrichedForms)
      setLoading(false)
    }

    fetchForms()
  }, [currentUser])

  const createNewForm = async () => {
    if (!currentUser || creatingForm) return
    setCreatingForm(true)

    const newForm = {
      author: currentUser.id,
      name: 'Untitled Form',
      description: 'A new form',
      settings: {},
      theme: {},
      is_public: false,
      is_active: true,
    }

    const { data, error } = await supabase
      .from('forms')
      .insert([newForm])
      .select()
      .single()

    if (error) {
      console.error('Error creating form:', error)
      setCreatingForm(false)
      return
    }

    // Create a default step for the form
    const { data: stepData, error: stepError } = await supabase
      .from('form_steps')
      .insert([{
        form_id: data.id,
        title: 'Step 1',
        description: '',
        step_order: 0,
        settings: {}
      }])
      .select()
      .single()

    if (stepError) {
      console.error('Error creating default step:', stepError)
    }

    router.push(`/account/flows/forms/${data.id}`)
  }

  const deleteForm = async (formId) => {
    if (!confirm('Are you sure you want to delete this form? This action cannot be undone.')) {
      return
    }

    const { error } = await supabase
      .from('forms')
      .delete()
      .eq('id', formId)

    if (error) {
      console.error('Error deleting form:', error)
      return
    }

    // Refresh forms list
    setForms(forms.filter(f => f.id !== formId))
  }

  const duplicateForm = async (form) => {
    const newForm = {
      author: currentUser.id,
      name: `${form.name} (Copy)`,
      description: form.description,
      settings: form.settings,
      theme: form.theme,
      is_public: false,
      is_active: true,
    }

    const { data: newFormData, error: formError } = await supabase
      .from('forms')
      .insert([newForm])
      .select()
      .single()

    if (formError) {
      console.error('Error duplicating form:', formError)
      return
    }

    // Duplicate steps and fields
    for (const step of form.form_steps || []) {
      const { data: newStepData, error: stepError } = await supabase
        .from('form_steps')
        .insert([{
          form_id: newFormData.id,
          title: step.title,
          description: step.description,
          step_order: step.step_order,
          settings: step.settings
        }])
        .select()
        .single()

      if (!stepError && step.form_step_fields) {
        const fieldsToInsert = step.form_step_fields.map(field => ({
          step_id: newStepData.id,
          field_config: field.field_config,
          field_order: field.field_order
        }))

        await supabase
          .from('form_step_fields')
          .insert(fieldsToInsert)
      }
    }

    // Refresh forms list
    window.location.reload()
  }

  if (loading) return <Loading />

  const totalItems = forms.length
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedForms = forms.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="container mx-auto min-h-screen p-4 px-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-thin tracking-wide lg:text-5xl xl:tracking-widest">
          Your Forms
        </h1>
        <button
          onClick={createNewForm}
          disabled={creatingForm}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50"
        >
          <PlusIcon className="h-5 w-5" />
          {creatingForm ? 'Creating...' : 'Create New Form'}
        </button>
      </div>

      {forms.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No forms</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new form.</p>
          <div className="mt-6">
            <button
              onClick={createNewForm}
              disabled={creatingForm}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90"
            >
              <PlusIcon className="h-5 w-5" />
              Create New Form
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-left text-sm font-semibold text-gray-900"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {paginatedForms.map((form) => (
                <tr key={form.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <button
                      onClick={() => router.push(`/account/flows/forms/${form.id}`)}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      {form.name}
                    </button>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {form.description || '-'}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {form.submissionsCount}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      form.is_active 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {form.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {convertIsoToReadableDate(form.created_at)}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => router.push(`/account/flows/forms/${form.id}`)}
                        className="text-primary hover:text-primary/80"
                        title="Edit"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => router.push(`/account/flows/forms/${form.id}/submissions`)}
                        className="text-gray-600 hover:text-gray-800"
                        title="View Submissions"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => duplicateForm(form)}
                        className="text-yellow-600 hover:text-yellow-800"
                        title="Duplicate"
                      >
                        <DocumentDuplicateIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteForm(form.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  )
}
