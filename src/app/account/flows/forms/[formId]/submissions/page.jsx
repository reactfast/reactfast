'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabaseClient as supabase } from '@/config/supabase-client'
import { getUser } from '@/hooks/Auth'
import Loading from '../../../../loading'
import { ArrowLeftIcon, ArrowDownTrayIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { convertIsoToReadableDate } from '@/helpers/dateConvert'

export default function FormSubmissionsPage() {
  const params = useParams()
  const router = useRouter()
  const formId = params.formId
  
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(null)
  const [submissions, setSubmissions] = useState([])
  const [selectedSubmission, setSelectedSubmission] = useState(null)
  const [viewModalOpen, setViewModalOpen] = useState(false)

  useEffect(() => {
    loadData()
  }, [formId])

  const loadData = async () => {
    try {
      const user = await getUser()
      if (!user) {
        router.push('/login')
        return
      }

      // Load form details
      const { data: formData, error: formError } = await supabase
        .from('forms')
        .select('*')
        .eq('id', formId)
        .eq('author', user.id)
        .single()

      if (formError || !formData) {
        console.error('Error loading form:', formError)
        router.push('/account/flows/forms')
        return
      }

      setForm(formData)

      // Load submissions
      const { data: submissionsData, error: submissionsError } = await supabase
        .from('form_submissions')
        .select('*')
        .eq('form_id', formId)
        .order('created_at', { ascending: false })

      if (submissionsError) {
        console.error('Error loading submissions:', submissionsError)
      } else {
        setSubmissions(submissionsData || [])
      }

      setLoading(false)
    } catch (error) {
      console.error('Error in loadData:', error)
      setLoading(false)
    }
  }

  const deleteSubmission = async (submissionId) => {
    if (!confirm('Are you sure you want to delete this submission?')) {
      return
    }

    const { error } = await supabase
      .from('form_submissions')
      .delete()
      .eq('id', submissionId)

    if (error) {
      console.error('Error deleting submission:', error)
      alert('Failed to delete submission')
    } else {
      setSubmissions(submissions.filter(s => s.id !== submissionId))
    }
  }

  const exportToCSV = () => {
    if (submissions.length === 0) {
      alert('No submissions to export')
      return
    }

    // Get all unique field names from all submissions
    const allFields = new Set()
    submissions.forEach(sub => {
      Object.keys(sub.submission_data).forEach(key => allFields.add(key))
    })
    const fieldNames = Array.from(allFields)

    // Create CSV header
    const csvHeader = ['Submission ID', 'Submitted At', 'Status', ...fieldNames].join(',')

    // Create CSV rows
    const csvRows = submissions.map(sub => {
      const row = [
        sub.id,
        convertIsoToReadableDate(sub.created_at),
        sub.status,
        ...fieldNames.map(field => {
          const value = sub.submission_data[field]
          // Escape values that contain commas or quotes
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`
          }
          return value || ''
        })
      ]
      return row.join(',')
    })

    // Combine header and rows
    const csv = [csvHeader, ...csvRows].join('\n')

    // Download CSV
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${form.name.replace(/\s+/g, '_')}_submissions.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const exportToJSON = () => {
    const json = JSON.stringify(submissions, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${form.name.replace(/\s+/g, '_')}_submissions.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const viewSubmission = (submission) => {
    setSelectedSubmission(submission)
    setViewModalOpen(true)
  }

  if (loading) return <Loading />

  return (
    <div className="container mx-auto min-h-screen p-4 px-8">
      {/* Header */}
      <div className="mb-6">
        <Link 
          href={`/account/flows/forms/${formId}`}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Form Builder
        </Link>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{form?.name} - Submissions</h1>
            <p className="text-gray-600 mt-1">
              {submissions.length} {submissions.length === 1 ? 'submission' : 'submissions'}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={exportToCSV}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <ArrowDownTrayIcon className="h-4 w-4" />
              Export CSV
            </button>
            <button
              onClick={exportToJSON}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <ArrowDownTrayIcon className="h-4 w-4" />
              Export JSON
            </button>
          </div>
        </div>
      </div>

      {/* Submissions Table */}
      {submissions.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No submissions yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            Share your form URL to start collecting responses.
          </p>
          <div className="mt-4">
            <code className="px-3 py-1 bg-gray-100 rounded text-sm">
              {`${window.location.origin}/forms/${formId}`}
            </code>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fields
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {submissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {submission.id.slice(0, 8)}...
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {convertIsoToReadableDate(submission.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      submission.status === 'completed' 
                        ? 'bg-green-100 text-green-800'
                        : submission.status === 'partial'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {submission.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {Object.keys(submission.submission_data).length} fields
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => viewSubmission(submission)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => deleteSubmission(submission.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Submission Modal */}
      {viewModalOpen && selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">Submission Details</h2>
                <button
                  onClick={() => setViewModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Submission ID</p>
                  <p className="mt-1 text-sm text-gray-900">{selectedSubmission.id}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Submitted At</p>
                  <p className="mt-1 text-sm text-gray-900">
                    {convertIsoToReadableDate(selectedSubmission.created_at)}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <p className="mt-1 text-sm text-gray-900">{selectedSubmission.status}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Form Data</p>
                  <div className="bg-gray-50 rounded p-4 space-y-2">
                    {Object.entries(selectedSubmission.submission_data).map(([key, value]) => (
                      <div key={key} className="flex">
                        <span className="font-medium text-gray-700 mr-2">{key}:</span>
                        <span className="text-gray-900">
                          {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedSubmission.metadata && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">Metadata</p>
                    <div className="bg-gray-50 rounded p-4">
                      <pre className="text-xs text-gray-600 overflow-x-auto">
                        {JSON.stringify(selectedSubmission.metadata, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setViewModalOpen(false)}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}