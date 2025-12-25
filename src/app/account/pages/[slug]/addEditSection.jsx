import { useEffect, useState } from 'react'
import { supabaseClient as supabase } from '@/config/supabase-client'
import { ReturnFieldsV2 } from '../../../../components/formFields/returnFields'
import CategoryCard from '@/builderAssets/categoryCards/mics'
import Loading from '@/components/loadingArea'
import Link from 'next/link'
import {
  CheckIcon,
  ChevronUpDownIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline'
import { Listbox } from '@headlessui/react'
import MySectionsAutoComplete from '@/components/formFields/mySections'

const STATUS_OPTIONS = [
  { id: 'active', name: 'Active' },
  { id: 'draft', name: 'Draft' },
]

export default function AddEditSecForm({
  page,
  section,
  editing,
  handleClose,
  sub,
  liveEdit,
  index,
  setDirty,
  setDrawerOpen,
}) {
  const [loading, setLoading] = useState(false)
  const [secTypes, setSecTypes] = useState([])
  const [selected, setSelected] = useState({})
  const [selectedCategoryName, setSelectedCategoryName] = useState(null)
  const [sectionTitle, setSectionTitle] = useState(section ? section.title : '')
  const [def, setDef] = useState([])
  const [formData, setFormData] = useState({})

  const [secCategories, setSecCategories] = useState([])
  const [sectionIdList, setSectionIdList] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [status, setStatus] = useState(section ? section.status : 'active')

  const [showDuplicateToModal, setShowDuplicateToModal] = useState(true)

  // if editing
  useEffect(() => {
    if (editing && section) {
      setSelected(section.sec_type)
      setFormData(section.definition || {})
      setSectionTitle(section.title || '')
      setSelectedCategory('editing')
      setStatus(section.status || 'active')
    }
  }, [editing, section])

  // get all section types
  useEffect(() => {
    async function getSecType() {
      let { data, error } = await supabase
        .from('sec_type')
        .select(`*`)
        .eq('status', 'active')

      if (!error && data) {
        setSecTypes(data)
        if (!editing) setSelected(data[0])
      }
    }
    getSecType()
  }, [editing])

  // get the definition of the selected section type
  useEffect(() => {
    if (selected?.definition) {
      setDef(selected.definition)
    }
  }, [selected])

  // handle change in data from dynamically created form
  function handleFormDataChange(e) {
    const { name, value, type, checked, files } = e.target
    let updatedFormData
    if (type === 'checkbox') {
      updatedFormData = { ...formData, [name]: checked }
      setFormData(updatedFormData)
    } else if (type === 'file') {
      updatedFormData = { ...formData, [name]: files[0] }
      setFormData(updatedFormData)
    } else {
      updatedFormData = { ...formData, [name]: value }
      setFormData(updatedFormData)
    }

    // Only call liveEdit when editing and index is valid
    if (editing && section && index !== null && index !== undefined) {
      liveEdit({
        sec: {
          ...section,
          title: sectionTitle,
          sec_type: selected,
          definition: updatedFormData,
          status,
        },
        i: index,
      })
    }

    setDirty(true)
  }

  useEffect(() => {
    function handleKeyDown(e) {
      // Check for cmd + S (Mac) or ctrl + S (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
        e.preventDefault() // Prevent browser save
        handleSaveSection() // Call your save function
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleSaveSection])

  async function handleSaveSection() {
    if (editing && section?.id) {
      const { error } = await supabase
        .from('secs')
        .update({
          title: sectionTitle,
          sec_type: selected.id,
          definition: formData,
          status, // NEW: save status
        })
        .eq('id', section.id)

      if (!error) setDrawerOpen(false)
    } else {
      // ... existing create logic ...
      const { data: newSectionData, error: insertError } = await supabase
        .from('secs')
        .insert([
          {
            title: selected.name,
            page,
            sec_type: selected.id,
            definition: formData,
            status, // NEW: save status
          },
        ])
        .select('id')

      if (!insertError && newSectionData && newSectionData.length > 0) {
        const newSectionId = newSectionData[0].id
        const { data: orderData } = await supabase
          .from('page_sections')
          .select('order')
          .eq('page', page)
          .order('order', { ascending: false })
          .limit(1)

        const nextOrder =
          orderData && orderData.length > 0 ? orderData[0].order + 1 : 0

        const { error: joinError } = await supabase
          .from('page_sections')
          .insert([{ page, section: newSectionId, order: nextOrder }])

        if (!joinError) window.location.reload()
      }
    }
  }

  function sectionsMaxed() {
    if (secs.length >= 25) return true
    return false
  }

  function handleDoubleClick() {
    handleSaveSection()
  }

  function handleOpenDuplicateToModal() {
    setShowDuplicateToModal(true)
  }

  // get sec_categories
  useEffect(() => {
    async function getSecCategories() {
      const { data, error } = await supabase
        .from('sec_categories')
        .select('*')
        .order('order', { ascending: true }) // sort by "order" column

      if (!error && data) {
        setSecCategories(data)
      }
    }

    getSecCategories()
  }, [])

  // get section types by category
  useEffect(() => {
    setLoading(true)
    async function getSecTypesByCategory() {
      if (!selectedCategory) {
        setLoading(false)
        return
      }

      let { data, error } = await supabase
        .from('sec_type_categories')
        .select(`*`)
        .eq('category', selectedCategory)

      if (!error && data) {
        setSectionIdList(data)
        const selectedCategoryName = secCategories.find(
          (cat) => cat.id === selectedCategory,
        )?.title
        setSelectedCategoryName(selectedCategoryName)
      }
      setSecTypes([])
      setTimeout(() => setLoading(false), 1000)
    }
    getSecTypesByCategory()
  }, [selectedCategory])

  // get all section types in a category
  useEffect(() => {
    async function getAllSectionTypes() {
      if (!sectionIdList.length) {
        return
      }

      const secTypeIds = sectionIdList.map((item) => item.sec_type) // Extract IDs

      let { data, error } = await supabase
        .from('sec_type')
        .select(`*`)
        .in('id', secTypeIds) // Fetch sec_types where id is in secTypeIds
        .eq('status', 'active')

      if (!error && data) {
        setSecTypes(data)
      }
    }

    getAllSectionTypes()
  }, [sectionIdList])

  function handleAddPreExistingSection({ sectionId, pageId }) {
    async function addExistingSection() {
      const { error } = await supabase
        .from('page_sections')
        .insert([
          {
            page: pageId,
            section: sectionId,
          },
        ])
        .select()

      if (!error) window.location.reload()
    }
    addExistingSection()
  }

  return (
    <div className="grid grid-cols-12 gap-4 px-4">
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <div className="col-span-12 mb-8">
            {editing ? (
              <h3 className="text-2xl font-thin text-primary">
                Edit Section
                <Link href={`/help/docs/edit-section`} target="_blank">
                  <QuestionMarkCircleIcon className="inline h-6 w-6 cursor-pointer font-black text-primary" />
                </Link>
              </h3>
            ) : (
              <h3 className="text-2xl font-thin text-primary">
                Add Section{' '}
                <Link href={`/help/docs/working-with-sections`} target="_blank">
                  <QuestionMarkCircleIcon className="inline h-6 w-6 cursor-pointer font-black text-primary" />
                </Link>
              </h3>
            )}

            {selectedCategory && !editing && (
              <>
                <h1 className="text-3xl">{selectedCategoryName}</h1>
                <p
                  className="color-primary cursor-pointer font-black text-primary"
                  onClick={() => setSelectedCategory(null)}
                >
                  {'<'} back to categories
                </p>
              </>
            )}
          </div>

          {/* new section select  */}
          {!selectedCategory && !editing && (
            <>
              {secCategories?.map((cat) => (
                <div
                  onDoubleClick={() => {
                    setLoading(true)
                    setSelectedCategory(cat.id)
                  }}
                  className="col-span-6 cursor-pointer rounded-2xl transition-all duration-200 hover:shadow-lg"
                >
                  <CategoryCard title={cat.title} description={cat.desc} />
                </div>
              ))}
            </>
          )}

          {selectedCategory && !editing && (
            <>
              {secTypes.map((sec) => (
                <>
                  {sec?.tags?.includes('e-commerce') ||
                  sec?.tags?.includes('Premium') ? (
                    <div
                      key={sec.id}
                      className={`col-span-6 cursor-pointer rounded-2xl transition-all duration-200 ${
                        selected?.id === sec.id ? 'border-2 border-primary' : ''
                      }`}
                    >
                      <CategoryCard
                        title={sec.name}
                        tags={sec.tags}
                        description={sec.desc}
                      />
                    </div>
                  ) : (
                    <div
                      key={sec.id}
                      onDoubleClick={handleDoubleClick}
                      onClick={() => setSelected(sec)} // Set selected section when clicked
                      className={`col-span-6 cursor-pointer rounded-2xl transition-all duration-200 ${
                        selected?.id === sec.id ? 'border-2 border-primary' : ''
                      }`}
                    >
                      <CategoryCard
                        title={sec.name}
                        tags={sec.tags}
                        description={sec.desc}
                      />
                    </div>
                  )}
                </>
              ))}
            </>
          )}

          {editing && (
            <>
              <div className="col-span-12">
                <label className="block text-sm font-medium text-primary">
                  Section Title
                </label>
                <input
                  name="title"
                  type="text"
                  value={sectionTitle}
                  onChange={(e) => {
                    const newTitle = e.target.value
                    setSectionTitle(newTitle)
                    // Trigger live edit when editing
                    if (
                      editing &&
                      section &&
                      index !== null &&
                      index !== undefined
                    ) {
                      liveEdit({
                        sec: {
                          ...section,
                          title: newTitle,
                          sec_type: selected,
                          definition: formData,
                          status,
                        },
                        i: index,
                      })
                    }
                  }}
                  placeholder="My-Minute-Link"
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                />
                <br />{' '}
                <p>
                  <span className="font-bold">Section Id:</span> {section.id}
                </p>
                <label className="block text-sm font-medium text-primary">
                  Status
                </label>
                <Listbox
                  value={status}
                  onChange={(newStatus) => {
                    setStatus(newStatus)
                    // Trigger live edit when editing
                    if (
                      editing &&
                      section &&
                      index !== null &&
                      index !== undefined
                    ) {
                      liveEdit({
                        sec: {
                          ...section,
                          title: sectionTitle,
                          sec_type: selected,
                          definition: formData,
                          status: newStatus,
                        },
                        i: index,
                      })
                    }
                  }}
                >
                  <div className="relative mt-2">
                    <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                      <span className="block truncate">
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg sm:text-sm">
                      {STATUS_OPTIONS.map((option) => (
                        <Listbox.Option
                          key={option.id}
                          value={option.id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-3 pr-9 ${
                              active
                                ? 'bg-indigo-600 text-white'
                                : 'text-gray-900'
                            }`
                          }
                        >
                          {({ selected: selectedOption }) => (
                            <>
                              <span
                                className={`block truncate ${selectedOption ? 'font-semibold' : 'font-normal'}`}
                              >
                                {option.name}
                              </span>
                              {selectedOption ? (
                                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              </div>

              {/* Dynamic Definition form */}
              <hr className="col-span-12 my-4" />
              <div className="col-span-12 flex flex-wrap">
                {def.map((field) => (
                  <div
                    key={field.name}
                    className="mt-2 px-2"
                    style={{ width: field.width ? field.width + '%' : '100%' }}
                  >
                    <ReturnFieldsV2
                      onChange={handleFormDataChange}
                      label={field.title}
                      field={field}
                      value={formData[field.name] || ''}
                    />
                  </div>
                ))}
              </div>
              {/* Save Button */}
            </>
          )}

          {selectedCategory && selected && (
            <div className="col-span-12 mt-4 flex justify-end">
              <button
                onClick={handleSaveSection}
                className="rounded-md bg-primary px-4 py-2 text-white transition-all duration-200 hover:brightness-125"
              >
                {editing ? 'Update Section' : 'Add Section'}
              </button>
            </div>
          )}

          {selectedCategory === 'My Sections' && !editing && (
            <>
              <div className="col-span-12">
                <MySectionsAutoComplete />
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
