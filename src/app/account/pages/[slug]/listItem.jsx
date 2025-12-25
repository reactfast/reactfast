'use client'

import {
  ArrowUpIcon,
  ArrowDownIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/solid'
import {
  ArrowRightIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  LockOpenIcon,
} from '@heroicons/react/24/outline'
import { supabaseClient as supabase } from '@/config/supabase-client'
import { Menu } from '@headlessui/react'
import ReturnSecIcon from './returnSecIcon'
import { set } from 'date-fns'
import { useState } from 'react'

// =====================================================================
// ListItem for each Section
// =====================================================================
export default function ListItem({
  icon,
  index,
  move,
  item,
  getDefinition,
  openEditModal,
  subscription,
  movingIndex, // New state to track the moving index
  recent,
  handleDuplicateTo,
  pageId,
}) {
  const [locked, setLocked] = useState(item.locked)

  const [status, setStatus] = useState(item.status)

  const isMoving =
    movingIndex === index
      ? 'transition-transform duration-200 ease-in-out translate-y-2'
      : ''

  const isRecent = item.id === recent?.id ? 'border-primary' : 'border-gray-300'

  const handleDelete = async (secId) => {
    if (!pageId || !secId) return

    // 1️⃣ Check how many pages reference this section
    const { data: refs, error: refError } = await supabase
      .from('page_sections')
      .select('id')
      .eq('section', secId)

    if (refError) {
      console.error('Error fetching section references:', refError.message)
      return
    }

    if (!refs || refs.length === 0) {
      console.warn('No references found for section', secId)
      return
    }

    if (refs.length > 1) {
      // 2️⃣ Section exists on multiple pages → just remove the reference for this page
      const { error: unlinkError } = await supabase
        .from('page_sections')
        .delete()
        .eq('page', pageId)
        .eq('section', secId)

      if (unlinkError) {
        console.error('Error removing page reference:', unlinkError.message)
      } else {
        console.log('Section unlinked from page successfully')
        window.location.reload()
      }
    } else {
      // 3️⃣ Only one reference → safe to delete the section itself
      // Remove from page_sections first to avoid FK constraint issues
      const { error: unlinkError } = await supabase
        .from('page_sections')
        .delete()
        .eq('section', secId)

      if (unlinkError) {
        console.error(
          'Error unlinking section before delete:',
          unlinkError.message,
        )
        return
      }

      const { error: deleteError } = await supabase
        .from('secs')
        .delete()
        .eq('id', secId)

      if (deleteError) {
        console.error('Error deleting section:', deleteError.message)
      } else {
        console.log('Section deleted successfully')
        window.location.reload()
      }
    }
  }

  const handleToggleLocked = async () => {
    const { error } = await supabase
      .from('secs')
      .update({ locked: !locked })
      .eq('id', item.id)
    if (error) {
      console.error('Error toggling lock status:', error.message)
    } else {
      setLocked(!locked)
    }
  }

  const handleToggleHidden = async () => {
    const { error } = await supabase
      .from('secs')
      .update({ status: status === 'draft' ? 'active' : 'draft' })
      .eq('id', item.id)
    if (error) {
      console.error('Error toggling lock status:', error.message)
    } else {
      setStatus(status === 'draft' ? 'active' : 'draft')
    }
  }

  async function handleDupeSection() {
    console.log('Duplicating section:', item)

    // Step 1: Duplicate the section in 'secs'
    const { data: dupeData, error: dupeError } = await supabase
      .from('secs')
      .insert([
        {
          title: item.title + ' Copy',
          page: pageId,
          sec_type: item.sec_type.id,
          definition: item.definition,
        },
      ])
      .select('id') // Get the new section's ID

    if (dupeError) {
      console.warn('Error duplicating section:', dupeError)
      return
    }

    const newSectionId = dupeData[0].id

    // Step 2: Fetch all page_sections for this page, ordered
    const { data: pageSections, error: fetchError } = await supabase
      .from('page_sections')
      .select('id, section, order')
      .eq('page', item.page)
      .order('order', { ascending: true })

    if (fetchError) {
      console.warn('Error fetching page_sections:', fetchError)
      return
    }

    // Step 3: Find original index
    const originalIndex = pageSections.findIndex((ps) => ps.section === item.id)
    const insertOrder = originalIndex + 1

    // Step 4: Insert new section at insertOrder
    const { error: insertError } = await supabase.from('page_sections').insert([
      {
        page: pageId,
        section: newSectionId,
        order: insertOrder,
      },
    ])

    if (insertError) {
      console.warn(
        'Error inserting duplicated section into page_sections:',
        insertError,
      )
      return
    }

    // Step 5: Shift everything after insertOrder down by 1
    const sectionsToShift = pageSections.filter((ps) => ps.order >= insertOrder)

    const shiftUpdates = sectionsToShift.map(({ id, order }) =>
      supabase
        .from('page_sections')
        .update({ order: order + 1 })
        .eq('id', id),
    )

    await Promise.all(shiftUpdates)

    // Step 6: Done!
    window.location.reload()
  }

  return (
    <>
      <div
        key={item.id}
        className={`mb-1 flex w-full items-center justify-between gap-2 rounded-lg border bg-white p-2 shadow-sm ${isRecent}`}
      >
        <div className="flex items-center gap-2">
          <div className="flex space-x-2">
            <button
              onClick={openEditModal}
              className="rounded-full bg-gray-100 p-2 text-gray-500 transition-all duration-200 hover:bg-gray-300 focus:outline-none"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
          </div>
          <ReturnSecIcon name={icon} />
          <div className="text-md font-bold">
            <span className="select-none font-light">{item.title}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => move(index, -1)}
            className="rounded bg-blue-100 px-1 py-2 text-primary transition-all duration-200 hover:bg-blue-200 focus:outline-none"
          >
            <ArrowUpIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => move(index, 1)}
            className="rounded bg-blue-100 px-1 py-2 text-primary transition-all duration-200 hover:bg-blue-200 focus:outline-none"
          >
            <ArrowDownIcon className="h-5 w-5" />
          </button>
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="rounded-full p-2 hover:bg-gray-100 focus:outline-none">
              <EllipsisVerticalIcon className="h-5 w-5 text-gray-500" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <>
                    {/* Lock/Unlock */}
                    <button
                      onClick={handleToggleLocked}
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } flex w-full items-center justify-between rounded-t-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-200`}
                    >
                      {locked ? 'Unlock' : 'Lock'}
                      {locked ? (
                        <LockClosedIcon className="h-4 w-4" />
                      ) : (
                        <LockOpenIcon className="h-4 w-4" />
                      )}
                    </button>

                    {/* Hide/Unhide */}
                    <button
                      onClick={handleToggleHidden}
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } flex w-full items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-200`}
                    >
                      {status === 'draft' ? 'Unhide' : 'Hide'}
                      {status === 'draft' ? (
                        <EyeIcon className="h-4 w-4" />
                      ) : (
                        <EyeSlashIcon className="h-4 w-4" />
                      )}
                    </button>

                    <hr />

                    {/* Duplicate */}
                    <button
                      onClick={handleDupeSection}
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } block w-full rounded-t-md px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200`}
                    >
                      Duplicate
                    </button>

                    {/* Duplicate to */}
                    <button
                      onClick={() => handleDuplicateTo(item.id)}
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } flex w-full items-center justify-between rounded-t-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-200`}
                    >
                      Duplicate to
                      <ArrowRightIcon className="h-4 w-4" />
                    </button>

                    <hr />

                    {/* Move to Top */}
                    <button
                      onClick={() => move(index, 'Top')}
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200`}
                    >
                      Move to Top
                    </button>

                    {/* Move to Bottom */}
                    <button
                      onClick={() => move(index, 'Bottom')}
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200`}
                    >
                      Move to Bottom
                    </button>

                    <hr />

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(item.id)}
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } block w-full rounded-b-md px-4 py-2 text-left text-sm text-red-700 hover:bg-gray-200`}
                    >
                      Delete
                    </button>
                  </>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </>
  )
}
