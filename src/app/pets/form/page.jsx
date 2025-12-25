'use client'

import { useEffect, useState } from 'react'
import { supabaseClient as supabase } from '@/config/supabase-client'
import { ReturnFieldsV2 } from '@/components/formFields/returnFields'
import { getUser } from '@/hooks/Auth'
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
  ArrowRightIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline'
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid'

const petSteps = [
  {
    id: '01',
    name: 'Basics',
    fullName: 'Pet Basics',
    icon: UserCircleIcon,
    status: 'current',
    // description: 'Essential information',
  },
  {
    id: '02',
    name: 'Appearance',
    fullName: 'Appearance & Personality',
    icon: SparklesIcon,
    status: 'upcoming',
    // description: 'Physical traits and personality',
  },
  {
    id: '03',
    name: 'Health',
    fullName: 'Health & Behavior',
    icon: ShieldCheckIcon,
    status: 'upcoming',
    // description: 'Medical and behavioral traits',
  },
  {
    id: '04',
    name: 'Contact',
    fullName: 'Owner Contact',
    icon: PhoneIcon,
    status: 'upcoming',
    // description: 'Your contact information',
  },
]

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
        name: 'photo',
        type: 'fileV2',
        label: 'Photo',
        required: false,
        width: 100,
      },
    ],
  },
  {
    name: 'microchip_id',
    title: 'Microchip ID',
    type: 'string',
    width: 100,
    placeholder: 'Enter microchip number if available',
    helper: 'Optional - helps reunite lost pets',
    section: 'identification',
  },
]

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

const medicalDef = [
  {
    name: 'vaccinated',
    title: 'Up-to-date on Vaccinations',
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
    name: 'allergies',
    title: 'Allergies',
    type: 'text',
    width: 100,
    placeholder: 'e.g., Chicken, grass, certain medications',
    helper: 'Known allergies or sensitivities',
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
    name: 'medications',
    title: 'Current Medications',
    type: 'text',
    width: 100,
    placeholder: 'e.g., Heart medication twice daily',
    helper: 'List any regular medications',
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

const sectionConfig = {
  basic: {
    title: 'Essential Information',
    icon: InformationCircleIcon,
    description: 'Just the basics.',
  },
  photos: {
    title: 'Photos',
    icon: CameraIcon,
    description: 'We know you have some.',
  },
  identification: {
    title: 'Microchip',
    icon: ClipboardDocumentCheckIcon,
    // description: 'Tracking and ID information',
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

const countFilledFields = (fields, formData) => {
  let filled = 0
  let total = 0

  fields.forEach((field) => {
    if (field.required) {
      total++
      if (formData[field?.name] && formData[field?.name] !== '') {
        filled++
      }
    }
  })

  return { filled, total }
}

export default function WizardForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [userData, setUserData] = useState(null)
  const [qrid, setQrid] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form data state
  const [formData, setFormData] = useState({})

  // Progress tracking
  const [stepProgress, setStepProgress] = useState({
    1: { filled: 0, total: 0 },
    2: { filled: 0, total: 0 },
    3: { filled: 0, total: 0 },
    4: { filled: 0, total: 0 },
  })

  const stepFields = {
    1: basicInfoDef,
    2: appearanceDef,
    3: medicalDef,
    4: contactDef,
  }

  useEffect(() => {
    async function _getUser() {
      const user = await getUser()
      setUserData(user)
    }

    _getUser()

    const paramQrid = new URLSearchParams(window.location.search).get('qrid')

    if (paramQrid) {
      setQrid(paramQrid)
    }
  }, [])

  // Update progress tracking
  useEffect(() => {
    const newProgress = {}
    Object.entries(stepFields).forEach(([step, fields]) => {
      newProgress[step] = countFilledFields(fields, formData)
    })
    setStepProgress(newProgress)
  }, [formData])

  // Handle form data changes
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

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNextStep = () => {
    // Check if required fields are filled
    const currentFields = stepFields[currentStep]
    const requiredFields = currentFields.filter((f) => f.required)
    const missingFields = requiredFields.filter(
      (f) => !formData[f?.name] || formData[f?.name] === '',
    )

    if (missingFields.length > 0) {
      alert(
        `Please fill in required fields: ${missingFields.map((f) => f.title).join(', ')}`,
      )
      return
    }

    setCurrentStep((prevStep) => Math.min(prevStep + 1, petSteps.length))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleSubmit() {
    if (!userData) {
      alert('User not found, please login again.')
      return
    }

    setIsSubmitting(true)

    try {
      // Map formData to Supabase pet table fields
      const petPayload = {
        user_id: userData.id,
        type: formData.type || null,
        name: formData?.name || '',
        size: formData.size || null,
        age: formData.age || null,
        hair_length: formData.hair_length || null,
        hair_color: formData.hair_color || null,
        breed: formData.breed || null,
        photos: formData.photos || [],
        favorite_food: formData.favorite_food || null,
        house_trained: formData.house_trained || null,
        known_commands: formData.known_commands || null,
        gender: formData.gender || 'Unknown',
        weight: formData.weight || null,
        eye_color: formData.eye_color || null,
        eye_color_right: formData.eye_color_right || null,
        fav_petting_spot: formData.fav_petting_spot || null,
        no_pet_zones: formData.no_pet_zones || null,
        hypoallergenic: formData.hypoallergenic || null,
        chip_id: formData.microchip_id || null,
        medical_notes: formData.medical_notes || null,
        good_with_kids: formData.good_with_kids || null,
        good_with_women: formData.good_with_women || null,
        good_with_men: formData.good_with_men || null,
        good_with_dogs: formData.good_with_dogs || null,
        good_with_cats: formData.good_with_cats || null,
        service_animal: formData.service_animal || null,
        vaccinated: formData.vaccinated || null,
        last_vet_visit: formData.last_vet_visit || null,
        dietary_restrictions: formData.dietary_restrictions || null,
        allergies: formData.allergies || null,
        medications: formData.medications || null,
        lost: false,
        // Owner info
        owner_name: formData.owner_name || null,
        owner_phone: formData.owner_phone || null,
        allow_sms: formData.allow_sms || null,
        owner_email: formData.owner_email || null,
        owner_address: formData.owner_address || null,
        owner_apt_num: formData.owner_apt_num || null,
        owner_city: formData.owner_city || null,
        owner_state: formData.owner_state || null,
        owner_zip: formData.owner_zip || null,
        owner_country: formData.owner_country || null,
      }

      // Insert new pet
      const { data: petData, error: petError } = await supabase
        .from('pets')
        .insert([petPayload])
        .select()
        .single()

      if (petError) throw petError

      console.log('Pet created:', petData)
      alert('Pet successfully added!')

      // Update QR code if qrid exists
      if (qrid) {
        const redirectUrl = `https://jot.space/pets/${petData.id}`

        const { error: qrError } = await supabase
          .from('qr_codes')
          .update({ redirect_url: redirectUrl })
          .eq('id', qrid)

        if (qrError) throw qrError
      }

      // Reset form and step
      setFormData({})
      setCurrentStep(1)

      // Redirect user to boop-tag page
      window.location.href = '/account/boop-tag'
    } catch (error) {
      console.error('Error adding pet or updating QR code:', error)
      alert('Error: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Calculate overall progress
  const totalProgress = Object.values(stepProgress).reduce((acc, step) => {
    return acc + (step.total > 0 ? (step.filled / step.total) * 25 : 0)
  }, 0)

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-6 py-8 sm:py-12 lg:py-16">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold tracking-tight text-[#1A1A1A] sm:mb-2 sm:text-6xl sm:font-light">
            Boop, you're it.
          </h1>
          <p className="text-base font-light text-[#797979] sm:mb-7">
            Let's create a profile for your furry family.
          </p>
          <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-base font-medium text-[#4A4A4A]">
              Step {currentStep} of {petSteps.length}:{' '}
              {petSteps[currentStep - 1].fullName}
            </p>
            <p className="mt-1 text-sm text-[#6B6B6B] sm:mt-0">
              {Math.round(totalProgress)}% Complete
            </p>
          </div>
        </div>

        {/* Unified Progress Bar */}
        <div className="mb-6">
          <div className="h-1 overflow-hidden rounded-full bg-[#F5F5F5]">
            <div
              className="h-full rounded-full bg-[#020DF9] transition-all duration-500 ease-out"
              style={{ width: `${totalProgress}%` }}
            />
          </div>
        </div>

        {/* Minimal Step Navigation Pills */}
        <div className="mb-8">
          <nav aria-label="Progress steps">
            <ol className="flex items-center justify-center space-x-1 sm:space-x-2">
              {petSteps.map((step, index) => {
                const isCompleted = index < currentStep - 1
                const isCurrent = index === currentStep - 1
                const isClickable = index < currentStep

                return (
                  <li key={step?.name} className="flex items-center">
                    <button
                      type="button"
                      onClick={() => isClickable && setCurrentStep(index + 1)}
                      className={`flex items-center rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                        isCurrent
                          ? 'bg-[#020DF9] text-white'
                          : isCompleted
                            ? 'bg-[#F5F5F5] text-[#1A1A1A] hover:bg-[#E8E8E8]'
                            : 'cursor-default bg-transparent text-[#9B9B9B]'
                      } ${isClickable && !isCurrent ? 'cursor-pointer' : ''} `}
                      disabled={!isClickable}
                      aria-current={isCurrent ? 'step' : undefined}
                    >
                      {isCompleted && (
                        <CheckCircleIconSolid className="mr-1.5 h-3.5 w-3.5" />
                      )}
                      <span className="hidden sm:inline">{step?.name}</span>
                      <span className="sm:hidden">{index + 1}</span>
                    </button>
                    {index < petSteps.length - 1 && (
                      <div className="mx-1 h-[1px] w-4 bg-[#E8E8E8] sm:w-8" />
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>
        </div>

        {/* Form Content - Clean Card Design */}
        <div className="rounded-xl border border-[#F5F5F5] bg-white p-8 shadow-sm sm:p-12">
          {/* Form Fields by Section */}
          <div className="space-y-12">
            {Object.entries(groupFieldsBySection(stepFields[currentStep])).map(
              ([sectionKey, fields]) => {
                const section = sectionConfig[sectionKey]

                return (
                  <div key={sectionKey}>
                    {/* Section Header - Minimal */}
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

                    {/* Section Fields - Spacious Grid */}
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
                      {fields.map((field) => (
                        <div
                          key={field?.name}
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
                              value={formData[field?.name] || ''}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              },
            )}
          </div>

          {/* Navigation - Refined Buttons */}
          <div className="mt-16 flex items-center justify-between">
            {/* Previous Button */}
            <button
              type="button"
              onClick={handlePrevStep}
              className={`inline-flex items-center rounded-lg px-6 py-3 text-sm font-medium transition-all duration-200 ${
                currentStep === 1
                  ? 'cursor-not-allowed bg-transparent text-[#E8E8E8]'
                  : 'bg-transparent text-[#4A4A4A] hover:bg-[#FAFAFA] hover:text-[#020DF9]'
              } `}
              disabled={currentStep === 1}
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Previous
            </button>

            {/* Progress Pills - Mobile */}
            <div className="flex space-x-2 md:hidden">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-1 rounded-full transition-all duration-200 ${step <= currentStep ? 'w-6 bg-[#020DF9]' : 'w-2 bg-[#E8E8E8]'} `}
                />
              ))}
            </div>

            {/* Next/Submit Button */}
            {currentStep === petSteps.length ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`inline-flex items-center rounded-lg px-8 py-3 text-sm font-medium text-white transition-all duration-200 ${
                  isSubmitting
                    ? 'cursor-not-allowed bg-[#E8E8E8]'
                    : 'bg-[#020DF9] shadow-sm hover:bg-[#0209D9] hover:shadow-md'
                } `}
              >
                {isSubmitting ? (
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
                    Complete Profile
                    <CheckCircleIcon className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex items-center rounded-lg bg-[#020DF9] px-8 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#0209D9] hover:shadow-md"
              >
                Continue
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </button>
            )}
          </div>

          {/* Required Fields Notice */}
          {stepProgress[currentStep].total > 0 && (
            <div className="mt-8 text-center">
              <p className="text-xs text-[#9B9B9B]">
                <span className="text-[#020DF9]">*</span> Required fields (
                {stepProgress[currentStep].filled} of{' '}
                {stepProgress[currentStep].total} completed)
              </p>
            </div>
          )}
        </div>

        {/* Save for Later - Subtle */}
        <div className="mt-8 text-center">
          <button
            type="button"
            className="text-sm text-[#6B6B6B] transition-colors duration-200 hover:text-[#020DF9]"
          >
            Save and continue later
          </button>
        </div>
      </div>
    </div>
  )
}
