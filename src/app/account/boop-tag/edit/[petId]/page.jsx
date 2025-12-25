'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabaseClient as supabase } from '@/config/supabase-client'
import { ReturnFieldsV2 } from '@/components/formFields/returnFields'
import { getUser } from '@/hooks/Auth'
import { useRouter } from 'next/navigation'
import {
  CheckCircleIcon,
  CameraIcon,
  UserCircleIcon,
  HeartIcon,
  ClipboardDocumentCheckIcon,
  PhoneIcon,
  InformationCircleIcon,
  SparklesIcon,
  ShieldCheckIcon,
  HomeIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline'
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid'

// Tab definitions with icons
const tabs = [
  {
    id: 'basic',
    label: 'Basics',
    fullLabel: 'Pet Basics',
    icon: UserCircleIcon,
    description: 'Essential information',
  },
  {
    id: 'appearance',
    label: 'Appearance',
    fullLabel: 'Appearance & Personality',
    icon: SparklesIcon,
    description: 'Physical traits and personality',
  },
  {
    id: 'health',
    label: 'Health',
    fullLabel: 'Health & Behavior',
    icon: ShieldCheckIcon,
    description: 'Medical and behavioral traits',
  },
  {
    id: 'contact',
    label: 'Contact',
    fullLabel: 'Owner Contact',
    icon: PhoneIcon,
    description: 'Your contact information',
  },
]

// Step 1: Pet Basics - Essential information
const basicInfoDef = [
  {
    name: 'type',
    title: 'Type of Pet',
    type: 'select',
    options: ['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'],
    width: 50,
    required: true,
    helper: 'Select the type of pet',
    section: 'basic',
  },
  {
    name: 'name',
    title: "Pet's Name",
    type: 'string',
    width: 50,
    required: true,
    placeholder: 'e.g., Max, Bella',
    helper: 'What do you call your pet?',
    section: 'basic',
  },
  {
    name: 'breed',
    title: 'Breed',
    type: 'string',
    width: 50,
    placeholder: 'e.g., Golden Retriever, Persian',
    helper: 'Specific breed or mix',
    section: 'basic',
  },
  {
    name: 'age',
    title: 'Age',
    type: 'string',
    width: 25,
    placeholder: 'e.g., 3 years',
    helper: 'Years or months old',
    section: 'basic',
  },
  {
    name: 'gender',
    title: 'Gender',
    type: 'select',
    options: ['Male', 'Female', 'Unknown'],
    width: 25,
    section: 'basic',
  },
  {
    name: 'photos',
    title: 'Pet Photos',
    type: 'array',
    width: 100,
    helper: 'Upload photos of your pet to help identify them',
    section: 'photos',
    fields: [
      {
        name: 'src',
        type: 'fileV2',
        label: 'Photo',
        required: false,
        width: 100,
      },
      {
        name: 'alt',
        type: 'string',
        label: 'Alt Text',
        required: false,
        width: 100,
      },
    ],
  },
  {
    name: 'chip_id',
    title: 'Microchip ID',
    type: 'string',
    width: 100,
    placeholder: 'Enter microchip number if available',
    helper: 'Optional - helps reunite lost pets',
    section: 'identification',
  },
]

// Step 2: Physical & Personality
const appearanceDef = [
  {
    name: 'size',
    title: 'Size',
    type: 'select',
    options: [
      'Tiny (Under 10 lbs)',
      'Small (10-25 lbs)',
      'Medium (25-60 lbs)',
      'Large (60-90 lbs)',
      'Giant (Over 90 lbs)',
    ],
    width: 50,
    helper: 'Approximate size category',
    section: 'physical',
  },
  {
    name: 'weight',
    title: 'Weight',
    type: 'string',
    width: 50,
    placeholder: 'e.g., 25 lbs or 11 kg',
    helper: 'Current weight',
    section: 'physical',
  },
  {
    name: 'hair_length',
    title: 'Coat Length',
    type: 'select',
    options: ['Hairless', 'Short', 'Medium', 'Long', 'Curly'],
    width: 50,
    section: 'physical',
  },
  {
    name: 'hair_color',
    title: 'Color/Markings',
    type: 'string',
    width: 50,
    placeholder: 'e.g., Brown with white chest',
    helper: 'Main colors and distinctive markings',
    section: 'physical',
  },
  {
    name: 'eye_color',
    title: 'Eye Color (Left)',
    type: 'string',
    width: 50,
    placeholder: 'e.g., Brown',
    section: 'physical',
  },
  {
    name: 'eye_color_right',
    title: 'Eye Color (Right)',
    type: 'string',
    width: 50,
    placeholder: 'e.g., Blue',
    helper: 'If different from left eye',
    section: 'physical',
  },
  {
    name: 'favorite_food',
    title: 'Favorite Treats',
    type: 'string',
    width: 100,
    placeholder: 'e.g., Peanut butter, salmon',
    helper: 'Useful for gaining trust if lost',
    section: 'personality',
  },
  {
    name: 'fav_petting_spot',
    title: 'Loves Being Pet',
    type: 'text',
    width: 100,
    placeholder: 'e.g., Behind ears, belly rubs',
    helper: 'Where your pet enjoys being petted',
    section: 'personality',
  },
  {
    name: 'no_pet_zones',
    title: 'Sensitive Areas',
    type: 'text',
    width: 100,
    placeholder: 'e.g., Paws, tail',
    helper: 'Areas to avoid touching',
    section: 'personality',
  },
  {
    name: 'house_trained',
    title: 'House Trained',
    type: 'boolean',
    width: 50,
    section: 'training',
  },
  {
    name: 'known_commands',
    title: 'Known Commands',
    type: 'text',
    width: 100,
    placeholder: 'e.g., Sit, stay, come, shake',
    helper: 'Commands your pet responds to',
    section: 'training',
  },
]

// Step 3: Medical & Behavioral
const medicalDef = [
  {
    name: 'vaccinated',
    title: 'Up-to-date on Vaccinations',
    type: 'boolean',
    width: 50,
    section: 'health',
  },
  {
    name: 'spayed_neutered',
    title: 'Spayed/Neutered',
    type: 'boolean',
    width: 50,
    section: 'health',
  },
  {
    name: 'last_vet_visit',
    title: 'Last Vet Visit',
    type: 'date',
    width: 50,
    helper: 'Date of most recent checkup',
    section: 'health',
  },
  {
    name: 'hypoallergenic',
    title: 'Hypoallergenic',
    type: 'boolean',
    width: 50,
    section: 'health',
  },
  {
    name: 'service_animal',
    title: 'Service/Support Animal',
    type: 'boolean',
    width: 50,
    section: 'health',
  },
  {
    name: 'dietary_restrictions',
    title: 'Dietary Restrictions',
    type: 'text',
    width: 100,
    placeholder: 'e.g., Grain-free diet, no chicken',
    helper: 'Special dietary needs',
    section: 'health',
  },
  {
    name: 'medical_notes',
    title: 'Medical Conditions',
    type: 'text',
    width: 100,
    placeholder: 'e.g., Arthritis, diabetes',
    helper: 'Any health conditions to be aware of',
    section: 'health',
  },
  {
    name: 'medical_alerts',
    title: 'Medical Alerts',
    type: 'array',
    width: 100,
    helper: 'Important medical alerts',
    section: 'health',
    fields: [
      {
        name: 'alert',
        type: 'string',
        label: 'Alert',
        required: false,
        width: 100,
      },
    ],
  },
  {
    name: 'primary_vet_info',
    title: 'Primary Vet Information',
    type: 'text',
    width: 100,
    placeholder: 'Vet name, clinic, phone number',
    helper: 'Contact info for your veterinarian',
    section: 'health',
  },
  {
    name: 'good_with_kids',
    title: 'Good with Children',
    type: 'boolean',
    width: 33,
    section: 'behavior',
  },
  {
    name: 'good_with_dogs',
    title: 'Good with Dogs',
    type: 'boolean',
    width: 33,
    section: 'behavior',
  },
  {
    name: 'good_with_cats',
    title: 'Good with Cats',
    type: 'boolean',
    width: 34,
    section: 'behavior',
  },
  {
    name: 'good_with_women',
    title: 'Comfortable with Women',
    type: 'boolean',
    width: 50,
    section: 'behavior',
  },
  {
    name: 'good_with_men',
    title: 'Comfortable with Men',
    type: 'boolean',
    width: 50,
    section: 'behavior',
  },
]

// Step 4: Owner Contact Information
const contactDef = [
  {
    name: 'owner_name',
    title: 'Your Full Name',
    type: 'string',
    width: 100,
    required: true,
    placeholder: 'John Smith',
    section: 'primary',
  },
  {
    name: 'owner_phone',
    title: 'Primary Phone',
    type: 'string',
    width: 50,
    required: true,
    placeholder: '(555) 123-4567',
    helper: 'Best number to reach you',
    section: 'primary',
  },
  {
    name: 'allow_sms',
    title: 'Accept Text Messages',
    type: 'boolean',
    width: 50,
    helper: 'For quick communication',
    section: 'primary',
  },
  {
    name: 'owner_email',
    title: 'Email Address',
    type: 'string',
    width: 100,
    required: true,
    placeholder: 'john@example.com',
    section: 'primary',
  },
  {
    name: 'owner_address',
    title: 'Street Address',
    type: 'string',
    width: 100,
    placeholder: '123 Main Street',
    section: 'address',
  },
  {
    name: 'owner_address2',
    title: 'Address Line 2',
    type: 'string',
    width: 100,
    placeholder: 'Apt, Suite, etc.',
    section: 'address',
  },
  {
    name: 'owner_apt_num',
    title: 'Apt/Unit',
    type: 'string',
    width: 25,
    placeholder: 'Apt 4B',
    section: 'address',
  },
  {
    name: 'owner_city',
    title: 'City',
    type: 'string',
    width: 50,
    placeholder: 'San Francisco',
    section: 'address',
  },
  {
    name: 'owner_state',
    title: 'State',
    type: 'string',
    width: 25,
    placeholder: 'CA',
    section: 'address',
  },
  {
    name: 'owner_zip',
    title: 'ZIP Code',
    type: 'string',
    width: 50,
    placeholder: '94102',
    section: 'address',
  },
  {
    name: 'owner_country',
    title: 'Country',
    type: 'string',
    width: 50,
    placeholder: 'USA',
    section: 'address',
  },
]

// Section configurations for visual grouping
const sectionConfig = {
  basic: {
    title: 'Essential Information',
    icon: InformationCircleIcon,
    description: 'Just the basics.',
  },
  photos: {
    title: 'Photos',
    icon: CameraIcon,
    description: "Update your pet's photos.",
  },
  identification: {
    title: 'Microchip',
    icon: ClipboardDocumentCheckIcon,
  },
  physical: {
    title: 'Physical Characteristics',
    icon: UserCircleIcon,
    description: 'Size, weight, and appearance',
  },
  personality: {
    title: 'Personality & Preferences',
    icon: HeartIcon,
    description: 'Some quirks.',
  },
  training: {
    title: 'Training',
    icon: ClipboardDocumentCheckIcon,
    description: 'Commands and tricks.',
  },
  health: {
    title: 'Health Information',
    icon: ShieldCheckIcon,
    description: 'Medical history and needs',
  },
  behavior: {
    title: 'Behavioral Traits',
    icon: SparklesIcon,
    description: 'Good at making friends?',
  },
  primary: {
    title: 'Primary Contact',
    icon: PhoneIcon,
    description: 'How to reach you immediately',
  },
  address: {
    title: 'Home Address',
    icon: HomeIcon,
    description: 'Optional - Where your pet lives',
  },
}

// Helper function to group fields by section
const groupFieldsBySection = (fields) => {
  const grouped = {}
  fields.forEach((field) => {
    const section = field.section || 'other'
    if (!grouped[section]) {
      grouped[section] = []
    }
    grouped[section].push(field)
  })
  return grouped
}

export default function EditPetForm() {
  const router = useRouter()
  const params = useParams()
  const petId = params?.petId
  const [activeTab, setActiveTab] = useState('basic')
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [userData, setUserData] = useState(null)

  // Map tabs to field definitions
  const tabFields = {
    basic: basicInfoDef,
    appearance: appearanceDef,
    health: medicalDef,
    contact: contactDef,
  }

  // Fetch user and pet data
  useEffect(() => {
    async function fetchData() {
      try {
        const user = await getUser()
        setUserData(user)

        if (!petId) return

        const { data, error } = await supabase
          .from('pets')
          .select('*')
          .eq('id', petId)
          .single()

        if (error) throw error
        setFormData(data || {})
      } catch (err) {
        console.error(err)
        setError('Error loading pet data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [petId])

  // Handle input change
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

  async function handleSave() {
    if (!userData) {
      alert('User not found')
      return
    }

    try {
      setSaving(true)

      const { error } = await supabase
        .from('pets')
        .update(formData)
        .eq('id', petId)

      if (error) throw error

      alert('Pet updated successfully!')

      // Redirect to boop-tag page
      router.push('/account/boop-tag')
    } catch (err) {
      console.error(err)
      alert('Error updating pet: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-[#020DF9]"></div>
          <p className="mt-4 text-[#6B6B6B]">Loading pet information...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="mb-4 text-red-500">⚠️</div>
          <p className="font-medium text-[#1A1A1A]">{error}</p>
          <button
            onClick={() => router.push('/account/boop-tag')}
            className="mt-4 text-sm text-[#020DF9] hover:underline"
          >
            Go back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-6 py-8 sm:py-12 lg:py-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold tracking-tight text-[#1A1A1A] sm:mb-2 sm:text-6xl sm:font-light">
            Update {formData.name ? formData.name + "'s" : "your pet's"}{' '}
            profile.
          </h1>
          {/* <p className="text-base font-light text-[#797979] sm:mb-7">
            Keep {formData.name ? formData.name + "'s" : "your pet's"} profile current.
          </p> */}
          <div className="mt-3">
            <p className="text-base font-medium text-[#4A4A4A]">
              Editing: {tabs.find((t) => t.id === activeTab)?.fullLabel}
            </p>
          </div>
        </div>

        {/* Tab Navigation Pills */}
        <div className="mb-8">
          <nav aria-label="Edit sections">
            <ol className="flex items-center justify-center space-x-1 sm:space-x-2">
              {tabs.map((tab, index) => {
                const isCurrent = activeTab === tab.id
                const Icon = tab.icon

                return (
                  <li key={tab.id} className="flex items-center">
                    <button
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                        isCurrent
                          ? 'bg-[#020DF9] text-white'
                          : 'bg-[#F5F5F5] text-[#1A1A1A] hover:bg-[#E8E8E8]'
                      } `}
                      aria-current={isCurrent ? 'page' : undefined}
                    >
                      <Icon className="mr-1.5 h-3.5 w-3.5" />
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className="sm:hidden">{index + 1}</span>
                    </button>
                    {index < tabs.length - 1 && (
                      <div className="mx-1 h-[1px] w-4 bg-[#E8E8E8] sm:w-8" />
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>
        </div>

        {/* Form Content */}
        <div className="rounded-xl border border-[#F5F5F5] bg-white p-8 shadow-sm sm:p-12">
          <div className="space-y-12">
            {Object.entries(
              groupFieldsBySection(tabFields[activeTab] || []),
            ).map(([sectionKey, fields]) => {
              const section = sectionConfig[sectionKey]

              return (
                <div key={sectionKey}>
                  {/* Section Header */}
                  {section && (
                    <div className="mb-8">
                      <h3 className="font-display text-xl font-normal text-[#1A1A1A]">
                        {section.title}
                      </h3>
                      {section.description && (
                        <p className="mt-2 text-sm text-[#6B6B6B]">
                          {section.description}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Section Fields */}
                  <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
                    {fields.map((field) => (
                      <div
                        key={field.name}
                        className={`${
                          field.width === 100
                            ? 'md:col-span-2'
                            : field.width === 50
                              ? 'md:col-span-1'
                              : field.width === 33
                                ? 'md:col-span-1'
                                : field.width === 34
                                  ? 'md:col-span-1'
                                  : field.width === 25
                                    ? 'md:col-span-1'
                                    : 'md:col-span-2'
                        }`}
                      >
                        <div className="form-field-wrapper">
                          <ReturnFieldsV2
                            onChange={handleFormDataChange}
                            label={field.title}
                            field={{
                              ...field,
                              className: `
                                    w-full rounded-md border border-[#E8E8E8] 
                                    px-4 py-2.5 text-[#1A1A1A] 
                                    placeholder:text-[#9B9B9B]
                                    focus:border-[#020DF9] focus:outline-none
                                    focus:ring-1 focus:ring-[#020DF9] focus:ring-opacity-20
                                    transition-all duration-200
                                  `,
                            }}
                            value={formData[field.name] || ''}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Action Buttons */}
          <div className="mt-16 flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.push('/account/boop-tag')}
              className="inline-flex items-center rounded-lg bg-transparent px-6 py-3 text-sm font-medium text-[#4A4A4A] transition-all duration-200 hover:bg-[#FAFAFA] hover:text-[#020DF9]"
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className={`inline-flex items-center rounded-lg px-8 py-3 text-sm font-medium text-white transition-all duration-200 ${
                saving
                  ? 'cursor-not-allowed bg-[#E8E8E8]'
                  : 'bg-[#020DF9] shadow-sm hover:bg-[#0209D9] hover:shadow-md'
              } `}
            >
              {saving ? (
                <>
                  <svg
                    className="-ml-1 mr-3 h-4 w-4 animate-spin text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  Save Changes
                  <CheckCircleIconSolid className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
