'use client'

import Link from 'next/link'
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  ShareIcon,
  PencilIcon,
  TrashIcon,
  Cog6ToothIcon,
  PlusCircleIcon,
  ArrowLeftCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import AccountPageHeader from '@/components/accountPageHeader'

import { getUser } from '@/hooks/Auth'
import { getUserSubscription } from '@/helpers/subs'

import { useEffect, useState } from 'react'
import { supabaseClient as supabase } from '@/config/supabase-client'
import Loading from '../loading'
import ShareModal from '@/components/ShareModal'
import ModelToolBar from '@/components/modelToolBar'
import PageSelectionModal from './selectThree'
import Modal from '@/components/modal'
import { Card } from './siteCard'

export function AddPage({ closeModal, user }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [slug, setSlug] = useState('')
  const [error, setError] = useState('')
  const [isUnique, setIsUnique] = useState(true)
  const [loading, setLoading] = useState(false)

  function handleTitleChange(value) {
    let formatted = value.toLowerCase().replace(/\s+/g, '-')
    formatted = formatted.replace(/[^a-z0-9-]/g, '')
    setTitle(value)
    setSlug(formatted)
    setError('')
  }

  useEffect(() => {
    if (!slug) return

    async function checkUniqueness() {
      const { data, error } = await supabase
        .from('pages')
        .select('id')
        .eq('name', slug)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Supabase error:', error)
      }

      setIsUnique(!data)
    }

    checkUniqueness()
  }, [slug])

  async function handleCreate() {
    if (!slug) {
      setError('Page title cannot be empty.')
      return
    }
    if (!isUnique) {
      setError('This page name is already taken.')
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase.from('pages').insert([
        {
          name: slug,
          user_id: user.id,
          meta_description: description,
        },
      ])

      if (error) throw error

      window.location.reload()
    } catch (error) {
      console.error('Error creating page:', error.message)
      setError('An error occurred while creating the page.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={true} setOpen={closeModal} title="Create New Page" size="lg">
      <div>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Page Title
          </label>
          <div className="mt-2">
            <input
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="My Page Title"
              className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {slug && (
          <p className="mt-1 text-sm text-gray-500">
            Generated URL: <span className="font-medium">{slug}</span>
          </p>
        )}

        {!isUnique && (
          <p className="mt-1 text-sm text-red-500">
            This page name is already taken.
          </p>
        )}

        <div>
          <label
            htmlFor="description"
            className="mt-4 block text-sm font-medium leading-6 text-gray-900"
          >
            Page Description
          </label>
          <div className="mt-2">
            <input
              id="description"
              name="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a description..."
              className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

        <div className="mt-4 flex justify-end">
          <button
            onClick={closeModal}
            className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Close
          </button>
          <button
            onClick={handleCreate}
            disabled={!isUnique || loading}
            className={`ml-2 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ${
              !isUnique || loading
                ? 'cursor-not-allowed bg-gray-400'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {loading ? 'Creating...' : 'Create Page'}
          </button>
        </div>
      </div>
    </Modal>
  )
}
