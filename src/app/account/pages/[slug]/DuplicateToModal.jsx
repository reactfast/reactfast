'use client'

import { useEffect, useState } from 'react'
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import Modal from '@/components/modal'
import clsx from 'clsx'
import { supabaseClient as supabase } from '@/config/supabase-client'

export default function DuplicateToModal({ open, setOpen, user, secId }) {
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedPage, setSelectedPage] = useState(null)

  useEffect(() => {
    if (open) {
      fetchPages()
    }
  }, [open])

  async function fetchPages() {
    setLoading(true)
    const { data, error } = await supabase
      .from('pages')
      .select('id, name')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (!error) {
      setPages(data || [])
    }
    setLoading(false)
  }

  function onDuplicate(pageId, options = { go: false }) {
    if (!secId || !pageId) return

    async function addExistingSection() {
      const { error } = await supabase
        .from('page_sections')
        .insert([
          {
            page: selectedPage.id,
            section: secId,
          },
        ])
        .select()

      if (!error) {
        if (options.go) {
          redirectToPage(selectedPage.id)
        }
      } else {
        console.error('Error adding existing section:', error.message)
      }
    }

    addExistingSection()
  }

  function redirectToPage(pageId) {
    window.location.href = `/account/pages/${pageId}`
  }

  return (
    <Modal open={open} setOpen={setOpen} title="Duplicate To..." size="md">
      <div className="space-y-4">
        {/* Dropdown list */}
        <Listbox value={selectedPage} onChange={setSelectedPage}>
          <div className="relative">
            <ListboxButton className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
              <span className="block truncate">
                {selectedPage ? selectedPage.name : 'Select a page'}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
              </span>
            </ListboxButton>

            <ListboxOptions className="z-[1000] mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white py-1 text-sm shadow-lg focus:outline-none">
              {loading ? (
                <div className="px-4 py-2 text-gray-500">Loading...</div>
              ) : pages.length > 0 ? (
                pages.map((page) => (
                  <ListboxOption
                    key={page.id}
                    value={page}
                    className={({ active }) =>
                      clsx(
                        'relative cursor-default select-none py-2 pl-10 pr-4',
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                      )
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={clsx(
                            'block truncate',
                            selected ? 'font-medium' : 'font-normal',
                          )}
                        >
                          {page.name}
                        </span>
                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <CheckIcon className="h-5 w-5" />
                          </span>
                        )}
                      </>
                    )}
                  </ListboxOption>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">No pages found</div>
              )}
            </ListboxOptions>
          </div>
        </Listbox>

        {/* Action buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            onClick={() => setOpen(false)}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            disabled={!selectedPage}
            onClick={() => {
              if (selectedPage) onDuplicate(selectedPage.id, { go: false })
            }}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            Duplicate
          </button>
          <button
            disabled={!selectedPage}
            onClick={() => {
              if (selectedPage) onDuplicate(selectedPage.id, { go: true })
            }}
            className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
          >
            Duplicate & Go
          </button>
        </div>
      </div>
    </Modal>
  )
}
