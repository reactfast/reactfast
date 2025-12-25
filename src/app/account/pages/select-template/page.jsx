'use client'

import TemplateSelector from '@/components/formFields/templateSelector'
import Modal from '@/components/modal'
import { useEffect, useState } from 'react'
import { supabaseClient as supabase } from '@/config/supabase-client'
import { SpinUpTemplate } from './spinUpTemplate'
import Link from 'next/link'

export default function ModelToolBar({ children, className, ...props }) {
  const [siteNameModal, setSiteNameModal] = useState(false)
  const [siteName, setSiteName] = useState('')
  const [siteNameTaken, setSiteNameTaken] = useState(null)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [error, setError] = useState(null)

  async function checkAvailability(name) {
    // Format name: lowercase, dashes instead of spaces, remove special chars
    let formatted = name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')

    setSiteName(formatted)

    if (!formatted) {
      setSiteNameTaken(null)
      return false
    }

    const { data, error } = await supabase
      .from('pages')
      .select('id')
      .eq('name', formatted)
      .single()

    if (error) {
      console.error('Error checking site name:', error)
      setSiteNameTaken(false)
      return true // treat as available if error occurs
    }

    const isTaken = Boolean(data)
    setSiteNameTaken(isTaken)
    return !isTaken
  }

  async function handleSubmit() {
    if (!siteName) {
      setError('You must provide a unique page name.')
      return
    }

    const available = await checkAvailability(siteName)
    if (!available) {
      setError('That page name is already taken.')
      return
    }

    setSiteNameTaken(false)

    try {
      await SpinUpTemplate({
        formData: {
          site_name: siteName,
        },
        socialLinks: [], // Pass real values if you have them
        vCardFilePath: null, // Or a string if you’re uploading vCards
        emails: [],
        phoneNumbers: [],
        addresses: [],
        links: [],
        selectedTemplate,
      })
    } catch (error) {
      console.error('Template setup failed:', error)
      setError('Something went wrong while creating your page.')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setVcardInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId)
    console.log('Selected template:', templateId)
  }

  return (
    <div className={'h-[95vh]'}>
      <div className="flex h-[5vh] items-center justify-between bg-primary px-4">
        <Link href={'/account/pages'}>
          <div
            type="button"
            className="rounded-md border border-white bg-primary px-2.5 py-1.5 text-sm font-semibold text-white hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Cancel
          </div>
        </Link>
        <button
          type="button"
          onClick={() => setSiteNameModal(true)}
          className="rounded-md bg-tertiary px-2.5 py-1.5 text-sm font-semibold text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Next
        </button>
      </div>
      <TemplateSelector onChange={handleTemplateSelect} />

      <Modal
        size="xl"
        open={siteNameModal}
        setOpen={setSiteNameModal}
        title="Claim Your Unique Site Name"
      >
        {' '}
        <div className="mx-auto max-w-5xl space-y-6">
          <div key="site_name" className="mt-2">
            <label className="block text-sm font-medium text-primary">
              Unique Site Name
            </label>
            <input
              id="site_name"
              name="site_name"
              type="text"
              placeholder={'Enter text'}
              onChange={(e) => setSiteName(e.target.value)}
              value={siteName}
              className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />{' '}
            <p>
              {siteNameTaken != null && (
                <>
                  {siteNameTaken ? (
                    <>
                      <span className="text-red-800">Site name is Taken</span>
                    </>
                  ) : (
                    <>
                      <span className="text-green-800">
                        Site name is available
                      </span>
                    </>
                  )}
                </>
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Submit
          </button>
        </div>
      </Modal>
    </div>
  )
}
