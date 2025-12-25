'use client'

import IPhoneLayout from '@/components/iphone'
import Link from 'next/link'
import {
  ArrowLeftCircleIcon,
  CheckIcon,
  ChevronUpDownIcon,
  Cog6ToothIcon,
  PaintBrushIcon,
  PlusCircleIcon,
  ChevronDownIcon,
  EllipsisVerticalIcon,
  QrCodeIcon,
  DevicePhoneMobileIcon,
  QuestionMarkCircleIcon,
  ShareIcon,
  DocumentIcon,
} from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { supabaseClient as supabase } from '@/config/supabase-client'
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Menu,
} from '@headlessui/react'
import ReturnSection from '@/app/[slug]/returnSecs3'
import ContextMenu from './contextMenu'
import { getUser } from '@/hooks/Auth'
import { getUserSubscription } from '@/helpers/subs'
import CopyButton from './copy'
import { fonts } from '@/utils/fonts'
import GuidedTour from './joyride'
import SiteSettingsForm from './themeDrawer'
import Loading from '../../loading'
import ListItem from './listItem'
import AddEditSecForm from './addEditSection'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import QRCodeCanvas from '@/components/qrv2.js'
import ShareModal from '@/components/ShareModal'
import DuplicateToModal from './DuplicateToModal'
import Modal from '@/components/modal'

const MAX_SECTIONS = 25 // Max sections allowed per page

const publishingOptions = [
  {
    title: 'Published',
    description: 'This page can be viewed by anyone who has the link.',
    current: true,
  },
  {
    title: 'Draft',
    description: 'This page will no longer be publicly accessible.',
    current: false,
  },
]

// =================== pageEdit ===================
export default function pageEdit({ params }) {
  // Standard state
  const [loading, setLoading] = useState(true)

  // User and subscription access state
  const [user, setUser] = useState(null)
  const [subscription, setSubscription] = useState(null)

  // -- State for the page info & sections
  const [pageInfo, setPageInfo] = useState({})
  const [sectionsIdArray, setSectionsIdArray] = useState([])
  const [secs, setSecs] = useState([])
  const [def, setDef] = useState([])
  const [recentSelection, setRecentSelection] = useState(null)
  const [movingIndex, setMovingIndex] = useState(null)

  // -- Drawer for adding/editing sections
  const [drawerOpen, setDrawerOpen] = useState(false)
  const handleDrawer = () => setDrawerOpen(!drawerOpen)
  const [editSection, setEditSection] = useState(false)
  const [sectionEditing, setSectionEditing] = useState({})
  const [editingSectionIndex, setEditingSectionIndex] = useState(null)
  const [joyride, setJoyride] = useState(false)

  // -- state for if order changes it triggers use effect for auto save
  const [change, setChange] = useState(false)

  // -- State for the “Published” toggle
  const [published, setPublished] = useState(false)
  const [pageLimitData, setPageLimitData] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  // -- Drawer for “Site Settings” form (previously a separate page)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const handleSettingsDrawer = () => setSettingsOpen(!settingsOpen)

  const [showQR, setShowQR] = useState(false)
  const [mobilePreview, setMobilePreview] = useState(false)
  const [open, setOpen] = useState(false)

  const [showDuplicateToModal, setShowDuplicateToModal] = useState(false)
  const [secToDuplicate, setSecToDuplicate] = useState(null)

  const [editFormDirty, setEditFormDirty] = useState(false)
  const [confirmDirtyFormOpen, setConfirmDirtyFormOpen] = useState(false)

  // Init get user and start joyride
  useEffect(() => {
    if (!checkCookie()) {
      setJoyride(true)
    }

    async function _getUser() {
      const user = await getUser()
      setUser(user)
    }
    _getUser()
  }, [])

  // Get user subscription and fetch the subscription page limit
  useEffect(() => {
    if (!user) return

    async function getSubscription() {
      if (user) {
        const sub = await getUserSubscription(user.id)
        setSubscription(sub)
      }
    }
    getSubscription()

    const fetchPageLimit = async () => {
      try {
        const response = await fetch(`/api/check-page-limit?userId=${user.id}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch')
        }

        setPageLimitData(data)
      } catch (err) {
        alert(err.message)
      }
    }
    fetchPageLimit()
  }, [user])

  // auto save use effect
  useEffect(() => {
    if (!change) return
    handleSaveOrder()
    setChange(false)
  }, [change])

  // ------------------------------------------------------------------
  // 1. Fetch the page data on load
  // ------------------------------------------------------------------
  useEffect(() => {
    async function getPage() {
      setLoading(true)
      let { data, error } = await supabase
        .from('pages')
        .select(`*`)
        .eq('id', params.slug)
        .single()

      if (error) {
        console.warn(error)
      } else if (data) {
        setPageInfo(data)
      }
    }

    getPage()
  }, [params.slug])

  // ------------------------------------------------------------------
  // 1. Fetch the section IDs for the current page from 'page_sections'
  // ------------------------------------------------------------------
  useEffect(() => {
    async function getPageSectionIds() {
      if (!pageInfo.id) return
      setLoading(true)

      const { data, error } = await supabase
        .from('page_sections')
        .select('*')
        .eq('page', pageInfo.id)
        .order('order', { ascending: true })

      if (error) {
        console.warn('Error fetching page_sections:', error)
      } else if (data) {
        const orderedSectionIds = data.map((sec) => sec.section)
        setSectionsIdArray(orderedSectionIds)
      }

      setLoading(false)
    }

    if (pageInfo.id) {
      getPageSectionIds()
      setPublished(pageInfo?.active || false)
    }
  }, [pageInfo, params.slug])

  // ------------------------------------------------------------------
  // 2. Fetch the actual sections for those IDs from 'secs' table
  // ------------------------------------------------------------------
  useEffect(() => {
    async function getPageSections() {
      if (!pageInfo.id || sectionsIdArray.length === 0) return
      setLoading(true)

      console.log('pageInfo:', pageInfo)
      console.log('FONT', fonts[pageInfo?.font_name])

      const { data, error } = await supabase
        .from('secs')
        .select('* , sec_type(*)') // Join with sec_type table
        .in('id', sectionsIdArray)

      if (error) {
        console.warn('Error fetching sections:', error)
      } else if (data) {
        // Order sections based on the order of section IDs
        const orderedSections = sectionsIdArray.map((id) =>
          data.find((section) => section.id === id),
        )

        setSecs(orderedSections)
      }

      setLoading(false)
    }

    if (pageInfo.id && sectionsIdArray.length > 0) {
      getPageSections()
    }

    setPublished(pageInfo?.active || false)
  }, [pageInfo, sectionsIdArray, params.slug])

  useEffect(() => {
    console.log('secs:', secs)
  }, [secs])

  // If you need the "definition" from a sec_type
  const handleGetDefinition = (defID) => {
    async function getDef() {
      let { data, error } = await supabase
        .from('sec_type')
        .select(`definition`)
        .eq('id', defID)
        .single()

      if (error) {
        console.warn(error)
      } else if (data) {
        setDef(data)
      }
    }
    getDef()
  }

  // Reorder sections
  const handleMove = (currentIndex, direction) => {
    setMovingIndex(currentIndex) // Track which item is moving
    let newIndex = currentIndex + direction

    if (direction === 'Top') {
      newIndex = 0
    } else if (direction === 'Bottom') {
      newIndex = sectionsIdArray.length - 1
    }

    const newSections = [...secs]
    setSecs(moveAndReorder(newSections, currentIndex, newIndex))
    setChange(true) // Set change to true to trigger auto save
    setTimeout(() => {
      setMovingIndex(null) // Reset animation state
    }, 200)
  }

  function moveAndReorder(sections, currentIndex, newIndex) {
    if (
      currentIndex < 0 ||
      currentIndex >= sections.length ||
      newIndex < 0 ||
      newIndex >= sections.length
    ) {
      return sections
    }
    const [movedItem] = sections.splice(currentIndex, 1)
    sections.splice(newIndex, 0, movedItem)

    return sections
  }

  async function handleSaveOrder() {
    const sectionOrder = secs.map((section, index) => ({
      section_id: section.id,
      order: index,
    }))

    async function _save() {
      const updates = sectionOrder.map(async ({ section_id, order }) => {
        const { error } = await supabase
          .from('page_sections')
          .update({ order })
          .eq('page', pageInfo.id)
          .eq('section', section_id)

        if (error) {
          console.warn(`Error updating section ${section_id}:`, error)
        }
      })

      await Promise.all(updates)

      console.log('Order Saved')
    }

    await _save()
  }

  // "Add Section" logic
  function createDrawer() {
    if (sectionsMaxed()) {
      alert(
        'You have reached the maximum number of sections (25). Please remove a section before adding a new one.',
      )
      return
    }

    setEditSection(false) // We're adding, not editing
    setSectionEditing(null)
    setEditingSectionIndex(null) // Reset index when adding new section
    setDrawerOpen(true)
  }

  // "Edit Section" logic
  function editDrawer(sec) {
    // Find the index of the section in the secs array
    const sectionIndex = secs.findIndex((s) => s.id === sec.id)
    setEditSection(true)
    setSectionEditing(sec)
    setEditingSectionIndex(sectionIndex >= 0 ? sectionIndex : null)
    handleDrawer()
  }

  function handleLiveEdit({ sec, i = 0 }) {
    setSecs((prev) => {
      const copy = [...prev]
      copy[i] = sec
      return copy
    })
  }

  // Function to check if Joyride Cookie exists
  function checkCookie() {
    if (typeof document !== 'undefined') {
      return document.cookie
        .split('; ')
        .some((cookie) => cookie.startsWith('jot-builder-joyride='))
    }
    return false
  }

  // Handle the change of the published status
  const handleChange = (e) => {
    const checked = e?.current
    if (checked && !pageLimitData?.canCreateMorePages) {
      alert(
        'You have reached your page limit. Please upgrade your plan to create more pages.',
      )
      setPublished(false)
      setModalOpen(true)
      return
    }
    setPublished(checked)

    async function updatePageStatus() {
      const { error } = await supabase
        .from('pages')
        .update({ active: checked })
        .eq('id', params.slug)

      if (error) {
        console.warn('Error updating page status:', error)
      } else {
        console.log('Page status updated:', checked)
      }
    }

    updatePageStatus()
  }

  function handleSectionClick(section) {
    setRecentSelection(section)
  }

  function handleOpenDuplicateToModal(secId) {
    setShowDuplicateToModal(true)
    setSecToDuplicate(secId)
  }

  function handleSectionDoubleClick(section) {
    // Find the index of the section in the secs array
    const sectionIndex = secs.findIndex((s) => s.id === section.id)
    setRecentSelection(section)
    setEditSection(true)
    setSectionEditing(section)
    setEditingSectionIndex(sectionIndex >= 0 ? sectionIndex : null)
    setDrawerOpen(true)
  }

  function sectionsMaxed() {
    if (secs.length >= MAX_SECTIONS) return true
    return false
  }

  if (loading) return <Loading />

  // ------------------------------------------------------------------
  // Main component jsx
  // ------------------------------------------------------------------
  return (
    <>
      <div className="max-h-[100vh] min-w-full">
        {/* MOBILE BUILDER MENU  */}
        <div className="mx-auto w-full max-w-6xl">
          <div className={`w-full max-w-7xl`}>
            <div className="flex select-none items-center gap-4 px-4 py-2 pt-8 text-primary">
              {/* Left: Back + Page Name */}
              <div className="flex min-w-0 flex-grow items-center gap-2">
                <Link href="/account/pages">
                  <button
                    type="button"
                    className="relative inline-flex h-10 items-center gap-1 rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-300 hover:bg-gray-50"
                  >
                    <ArrowLeftCircleIcon className="h-5 w-5" />
                    <span className="hidden xl:block">Back</span>
                  </button>
                </Link>
                <span className="overflow-hidden truncate whitespace-nowrap text-sm font-medium">
                  <Link href={`/help/docs/builder-basics`} target="_blank">
                    <QuestionMarkCircleIcon className="inline h-5 w-5 cursor-pointer font-black text-primary" />
                  </Link>
                  {pageInfo?.name}
                </span>
              </div>

              {/* Right: Button Group */}
              <div className="z-[50] flex flex-wrap items-center">
                <span className="isolate inline-flex rounded-md">
                  <button
                    id="step-7"
                    onClick={() => setMobilePreview(!mobilePreview)}
                    type="button"
                    className={`relative inline-flex h-10 items-center gap-1 rounded-l-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-200 focus:z-10 md:hidden ${
                      mobilePreview
                        ? 'bg-primary text-white'
                        : 'bg-white text-primary hover:bg-gray-50'
                    }`}
                  >
                    <DevicePhoneMobileIcon className="h-5 w-5" />
                    <span className="hidden lg:block">Add Section</span>
                  </button>

                  <button
                    id="step-7"
                    onClick={createDrawer}
                    type="button"
                    className="relative -ml-px inline-flex h-10 items-center gap-1 rounded-none bg-white px-3 py-2 text-sm font-semibold text-primary shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-200 hover:bg-gray-50 focus:z-10 md:rounded-l-md"
                  >
                    <PlusCircleIcon className="h-5 w-5" />
                    <span className="hidden lg:block">Add Section</span>
                  </button>

                  <div className="relative -ml-px hidden items-center bg-gray-100 px-3 py-2 text-sm font-semibold text-primary shadow-sm ring-1 ring-inset ring-gray-300 md:inline-flex">
                    <span>
                      {secs.length}/{MAX_SECTIONS}
                    </span>
                  </div>

                  <button
                    id="step-8"
                    type="button"
                    onClick={handleSettingsDrawer}
                    className="relative -ml-px inline-flex items-center gap-1 bg-white px-3 py-2 text-sm font-semibold text-primary shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-200 hover:bg-gray-50 focus:z-10"
                  >
                    <PaintBrushIcon className="h-5 w-5 font-bold" />
                    <span className="hidden xl:block">Theme</span>
                  </button>

                  <button
                    id="step-8"
                    type="button"
                    onClick={() => setOpen(true)}
                    className="relative -ml-px inline-flex items-center gap-1 bg-white px-3 py-2 text-sm font-semibold text-primary shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-200 hover:bg-gray-50 focus:z-10"
                  >
                    <ShareIcon className="h-5 w-5 font-bold" />
                    <span className="hidden xl:block">Share</span>
                  </button>

                  <button
                    id="step-9"
                    type="button"
                    onClick={() =>
                      (window.location.href = `/account/pages/${pageInfo.id}/settings`)
                    }
                    className="relative -ml-px inline-flex items-center gap-1 rounded-r bg-white px-3 py-2 text-sm font-semibold text-primary ring-1 ring-inset ring-gray-300 transition-all duration-200 hover:bg-gray-50 focus:z-10"
                  >
                    <Cog6ToothIcon className="h-5 w-5 font-bold" />
                    <span className="hidden xl:block">Settings</span>
                  </button>

                  <Listbox value={published} onChange={handleChange}>
                    <Label className="sr-only">Change published status</Label>
                    <div className="relative ml-2">
                      <div className="inline-flex divide-x divide-primary rounded outline-none">
                        <div
                          className={`inline-flex items-center gap-x-1.5 rounded-l-md px-3 py-2 text-white ${
                            published ? 'bg-primary' : 'bg-yellow-500'
                          }`}
                        >
                          {published ? (
                            <CheckIcon
                              aria-hidden="true"
                              className="-ml-0.5 size-5"
                            />
                          ) : (
                            <DocumentIcon
                              aria-hidden="true"
                              className="-ml-0.5 size-5"
                            />
                          )}
                          <p className="hidden text-sm font-semibold lg:block">
                            {published ? 'Published' : 'Draft'}
                          </p>
                        </div>

                        <ListboxButton
                          className={`inline-flex items-center rounded-l-none rounded-r-md p-2 outline-none hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 ${
                            published ? 'bg-primary' : 'bg-yellow-500'
                          }`}
                        >
                          <ChevronDownIcon
                            aria-hidden="true"
                            className="size-5 text-white forced-colors:text-[Highlight]"
                          />
                        </ListboxButton>
                      </div>

                      <ListboxOptions className="absolute right-0 z-[999] mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        {publishingOptions.map((option) => (
                          <ListboxOption
                            key={option.title}
                            value={option}
                            onClick={() => handleChange(option)}
                            className="group cursor-default select-none p-4 text-sm text-gray-900 data-[focus]:bg-primary data-[focus]:text-white"
                          >
                            <div className="flex flex-col">
                              <div className="flex justify-between">
                                <p className="font-normal group-data-[selected]:font-semibold">
                                  {option.title}
                                </p>
                                <span className="text-indigo-600 group-[&:not([data-selected])]:hidden group-data-[focus]:text-white">
                                  <CheckIcon
                                    aria-hidden="true"
                                    className="size-5"
                                  />
                                </span>
                              </div>
                              <p className="mt-2 text-gray-500 group-data-[focus]:text-indigo-200">
                                {option.description}
                              </p>
                            </div>
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </div>
                  </Listbox>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* END MOBILE BUILDER MENU  */}

        <div className="mx-auto flex max-w-7xl justify-around">
          {/* Left Column: The List of Sections */}
          <div
            id="step-2"
            className={`h-[80vh] w-full max-w-3xl md:inline-block md:w-1/2 ${mobilePreview ? 'hidden' : ''}`}
          >
            {/* Page Title */}

            <div>
              <span
                id="step-4"
                className="mx-4 mt-8 text-3xl font-thin text-gray-900"
              >
                Section List
                <Link href={`/help/docs/builder-basics`} target="_blank">
                  <QuestionMarkCircleIcon className="inline h-6 w-6 cursor-pointer font-black text-primary" />
                </Link>
              </span>
            </div>
            {/* SECTIONS LIST */}
            <div
              id="list"
              className="col-span-12 min-h-[70vh] overflow-y-auto p-4"
            >
              {secs.map((sec, index) => (
                <span onClick={() => setRecentSelection(sec)} key={sec.id}>
                  <ListItem
                    icon={sec.sec_type.icon}
                    index={index}
                    move={handleMove}
                    getDefinition={handleGetDefinition}
                    item={sec}
                    openEditModal={() => editDrawer(sec)}
                    subscription={subscription}
                    movingIndex={movingIndex} // Pass the moving index to ListItem
                    recent={recentSelection}
                    handleDuplicateTo={() => handleOpenDuplicateToModal(sec.id)}
                    pageId={pageInfo.id}
                  />
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: The iPhone Layout Preview */}
          <div
            id="step-3"
            className={`col-span-6 mt-8 p-4 md:inline-block ${!mobilePreview ? 'hidden' : ''}`}
          >
            <IPhoneLayout
              bgColor={pageInfo?.bg_color}
              fontColor={pageInfo?.font_color}
              bgImage={pageInfo?.bg_image}
            >
              <div className={fonts[pageInfo?.font_name] || ''}>
                {!showQR && (
                  <>
                    {' '}
                    {secs.map((section, i) => (
                      <div key={section.id} className="relative">
                        {/* The actual section */}
                        <ReturnSection
                          sec={section.sec_type.name}
                          section={section}
                          content={section.definition}
                          colors={[
                            pageInfo.primary,
                            pageInfo.secondary,
                            pageInfo.tertiary,
                            pageInfo.quaternary,
                            pageInfo.bg_color,
                            pageInfo.foreground_color,
                          ]}
                          theme={section.sec_type.folder_name}
                          kind={section.sec_type.type}
                          num={section.sec_type.num}
                          component_name={section.sec_type.component_name}
                          recent={recentSelection}
                          site={pageInfo}
                        />

                        {/* Invisible overlay */}
                        <div
                          className="absolute inset-0 z-10 cursor-pointer"
                          onClick={() => handleSectionClick(section)}
                          onDoubleClick={() =>
                            handleSectionDoubleClick(section)
                          }
                          style={{
                            backgroundColor: 'transparent',
                            pointerEvents: 'auto',
                          }}
                        />
                      </div>
                    ))}
                    {secs.length === 0 && (
                      <div className="p-4">
                        <h1 className="text-center text-xl font-bold">
                          No Sections on This Page
                        </h1>
                        <p className="mt-4 text-center">
                          Click the Plus Button to Add Your First Section
                        </p>
                      </div>
                    )}
                  </>
                )}

                {showQR && (
                  <div className="absolute h-full w-full">
                    <div className="flex h-full flex-col items-center justify-center">
                      <h2 className="mb-4 text-2xl font-semibold">
                        {pageInfo.name}
                      </h2>

                      <div
                        style={{ backgroundColor: pageInfo.foreground_color }}
                        className="flex items-center justify-center rounded-lg bg-red-800 p-8 shadow-lg"
                      >
                        <QRCodeCanvas
                          bgColor={pageInfo.foreground_color}
                          qrColor={pageInfo.qr_dot_color}
                          logoImage={pageInfo.qr_img_url}
                          dotType={pageInfo.qr_dot_type}
                          url={'https://jot.space/' + pageInfo.name}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </IPhoneLayout>

            {/* <div className="h-25 w-25 flex gap-3 py-5">
              <div
                onClick={() => setShowQR(false)}
                className={`h-25 w-25 inline cursor-pointer rounded-full border-[2px] bg-[#CEFF1F] p-3 ${
                  !showQR ? 'border-primary' : 'border-[##CEFF1F]'
                }`}
              >
                <UserCircleIcon className="h-8 w-8 font-bold text-gray-800" />
              </div>
              <div
                onClick={() => setShowQR(true)}
                className={`h-25 w-25 inline cursor-pointer rounded-full border-[2px] bg-[#CEFF1F] p-3 ${
                  showQR ? 'border-primary' : 'border-[##CEFF1F]'
                }`}
              >
                <QrCodeIcon className="h-8 w-8 font-bold text-gray-800" />
              </div>
            </div> */}
          </div>

          {!loading && joyride && (
            <div className="hidden md:block">
              <GuidedTour />
            </div>
          )}

          {/* Drawer on the left: for Creating / Editing a Section */}
          <ContextMenu
            handle={handleDrawer}
            open={drawerOpen}
            handleClose={setDrawerOpen}
            dirtyForm={editFormDirty}
            setConfirmDirtyFormOpen={setConfirmDirtyFormOpen}
          >
            <AddEditSecForm
              editing={editSection}
              section={sectionEditing}
              page={pageInfo.id}
              sub={subscription}
              liveEdit={handleLiveEdit}
              index={editingSectionIndex}
              setDirty={setEditFormDirty}
              setDrawerOpen={setDrawerOpen}
            />
          </ContextMenu>

          {/* Drawer for “Site Settings” */}
          <ContextMenu
            handle={handleSettingsDrawer}
            open={settingsOpen}
            handleClose={setSettingsOpen}
          >
            <SiteSettingsForm page={pageInfo} />
          </ContextMenu>
        </div>

        <DuplicateToModal
          open={showDuplicateToModal}
          setOpen={setShowDuplicateToModal}
          secId={secToDuplicate}
          user={user}
        />
        <ShareModal open={open} setOpen={setOpen} site={pageInfo} />

        {/* Dirty edit form confirmation */}

        <Modal
          setOpen={setConfirmDirtyFormOpen}
          open={confirmDirtyFormOpen}
          title="You Have Unsaved Changes"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              You have unsaved changes to this section. If you close now, all
              unsaved changes will be lost. Would you like to save your changes
              before closing?
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmDirtyFormOpen(false)}
                className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  window.location.reload()
                }}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
              >
                Close Anyway
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  )
}
