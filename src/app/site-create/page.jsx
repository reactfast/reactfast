'use client'

import { useEffect, useState } from 'react'
import { defaultSections } from './template1'
import { supabaseClient as supabase } from '@/config/supabase-client'
import TemplateSelector from '@/components/formFields/templateSelector'
import SocialMediaLinks from '@/components/formFields/addSocialmedia'
import { ReturnFieldsV2 } from '../../components/formFields/returnFields'
import { jsonToVCard } from '@/helpers/jsonToVCard'
import { createSiteFromTemplate } from './createSiteFromTemplate'
import { getUser } from '@/hooks/Auth'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import AutoUploadFileField from '@/components/formFields/singleFileUploadNullable'
import Modal from '@/components/modal'
import VideoPlayerWithLoop from '@/components/videoWithLoop'

const steps = [
  {
    id: 'Step 1',
    name: 'Digital Business Card Information',
    status: 'current',
    description: ' Enter your personal details',
  },
  {
    id: 'Step 2',
    name: 'Media & Social Links',
    status: 'upcoming',
    description: '  Add your social links and media',
  },
  {
    id: 'Step 3',
    name: 'Contact Information',
    status: 'upcoming',
    description:
      ' Add your contact information this this will populate your vCard when sharing your contact information ',
  },
  // {
  //   id: 'Step 4',
  //   name: 'Template Select',
  //   status: 'upcoming',
  //   description:
  //     ' Add your contact information this this will populate your vCard when sharing your contact information ',
  // },
]

const socials = [
  'Instagram',
  'LinkedIn',
  'Facebook',
  'Threads',
  'Spotify',
  'Twitter',
  'TikTok',
  'GitHub',
  'Website',
]

const vcardFields = [
  { type: 'header', title: 'Personal Info' },
  { name: 'photo', title: 'Profile Photo', type: 'uploadToBase', width: 100 },
  {
    name: 'firstName',
    title: 'First Name',
    type: 'string',
    width: 50,
    placeholder: 'John',
  },
  {
    name: 'lastName',
    title: 'Last Name',
    type: 'string',
    width: 50,
    placeholder: 'Doe',
  },
  {
    name: 'birthday',
    title: 'Birthday',
    type: 'date',
    width: 50,
    placeholder: '1985-05-15',
  },

  { type: 'header', title: 'Business Info' },
  {
    name: 'title',
    title: 'Job Title',
    type: 'string',
    width: 50,
    placeholder: 'Senior Developer',
  },
  {
    name: 'organization',
    title: 'Organization',
    type: 'string',
    width: 50,
    placeholder: 'Example Corp',
  },

  { type: 'header', title: 'Contact Info' },
  {
    name: 'emails',
    title: 'Emails',
    type: 'array',
    fields: [
      {
        name: 'address',
        type: 'string',
        label: 'Email',
        placeholder: 'johndoe@example.com',
        width: 80,
      },
      {
        name: 'type',
        type: 'select',
        label: 'Type',
        options: ['Work', 'Personal', 'Other'],
        width: 20,
      },
    ],
  },
  {
    name: 'phones',
    title: 'Phone Numbers',
    type: 'array',
    fields: [
      {
        name: 'number',
        type: 'string',
        label: 'Phone',
        placeholder: '+1-800-555-1234',
        width: 80,
      },
      {
        name: 'type',
        type: 'select',
        label: 'Type',
        options: ['Work', 'Home', 'Mobile', 'Other'],
        width: 20,
      },
    ],
  },
  {
    name: 'addresses',
    title: 'Addresses',
    type: 'array',
    fields: [
      {
        name: 'address',
        type: 'text',
        label: 'Address',
        placeholder: '456 Home St, Hometown, HT 98765',
        width: 100,
      },
      {
        name: 'type',
        type: 'select',
        label: 'Type',
        options: ['Home', 'Work', 'Other'],
        width: 50,
      },
    ],
  },
  {
    name: 'websites',
    title: 'Websites',
    type: 'array',
    fields: [
      {
        name: 'url',
        type: 'string',
        label: 'Website',
        placeholder: 'https://www.johndoe.com',
        width: 100,
      },
    ],
  },
  {
    name: 'socialLinks',
    title: 'Social Media',
    type: 'array',
    fields: [
      {
        name: 'platform',
        type: 'select',
        label: 'Platform',
        options: [
          'instagram',
          'twitter',
          'facebook',
          'linkedin',
          'github',
          'other',
        ],
        width: 50,
      },
      {
        name: 'url',
        type: 'string',
        label: 'Profile URL',
        placeholder: 'https://twitter.com/johndoe',
        width: 50,
      },
    ],
  },
]

const emailTypes = ['Work', 'Personal', 'Other']
const phoneTypes = ['Work', 'Home', 'Mobile', 'Other']
const addressTypes = ['Home', 'Work', 'Other']

export default function WizardForm() {
  const [error, setError] = useState('')
  const [currentStep, setCurrentStep] = useState(1)
  const [userData, setUserData] = useState(null)
  const [qrid, setQrid] = useState(null)

  // Site Info State
  const [formData, setFormData] = useState({})
  const [socialLinks, setSocialLinks] = useState({})

  // vCard State
  const [vcardInfo, setVcardInfo] = useState({})
  const [emails, setEmails] = useState([])
  const [phoneNumbers, setPhoneNumbers] = useState([])
  const [addresses, setAddresses] = useState([])
  const [links, setLinks] = useState([])

  // template state
  const [selectedTemplate, setSelectedTemplate] = useState('professional')

  // Unique site name state
  const [siteName, setSiteName] = useState('')
  const [siteNameTaken, setSiteNameTaken] = useState(null)

  // help video state
  const [socialExplanationModal, setSocialExplanationModal] = useState(true)
  const [isOpen, setIsOpen] = useState(true)

  // site name modal state
  const [siteNameModal, setSiteNameModal] = useState(false)

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

  //Check Site Name Availability
  useEffect(() => {
    // Convert to lowercase and replace spaces with dashes
    let formatted = siteName.toLowerCase().replace(/\s+/g, '-')

    // Remove any special characters except dashes
    formatted = formatted.replace(/[^a-z0-9-]/g, '')

    setSiteName(formatted) // Store original input for user feedback

    async function checkSiteName() {
      if (siteName) {
        const { data, error } = await supabase
          .from('pages')
          .select('id')
          .eq('name', siteName)
          .single()

        if (error) {
          console.error('Error checking site name:', error)
          setSiteNameTaken(false)
        } else {
          setSiteNameTaken(data ? true : false)
        }
      } else {
        setSiteNameTaken(null)
      }
    }

    checkSiteName()
  }, [siteName])

  //console logs for testing
  useEffect(() => {
    console.log('Form Data:', {
      ...formData,
    })
    console.log('Social Links:', {
      ...socialLinks,
    })
    console.log('vCard Info:', {
      ...vcardInfo,
    })
  }, [formData, socialLinks, vcardInfo])

  // handle change in data from dynamically created form
  function handleFormDataChange(e) {
    const { name, value, type, checked, files } = e.target || e

    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else if (value === 'string' && value.startsWith('data:image/')) {
      setFormData((prev) => ({ ...prev, [name]: value }))
    } else if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  // handle change in custom add social links input field
  const handleSocialLinksChange = (linksObject) => {
    setSocialLinks(linksObject)
  }

  // handle change in custom template selection input field
  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId)
    console.log('Selected template:', templateId)
  }

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1))
  }

  const handleNextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setVcardInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleDynamicChange = (e, index, key, field) => {
    const updatedField = formData[field].map((item, i) =>
      i === index ? { ...item, [key]: e.target.value } : item,
    )
    setFormData((prev) => ({ ...prev, [field]: updatedField }))
  }

  const handleAddField = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [
        ...prev[field],
        {
          type: '',
          [field === 'emails'
            ? 'email'
            : field === 'phoneNumbers'
              ? 'number'
              : 'address']: '',
        },
      ],
    }))
  }

  const def = [
    {
      name: 'userInfo',
      title: 'User Information',
      type: 'header',
      width: 100,
    },
    {
      name: 'profile_image',
      title: 'Profile Image',
      type: 'file',
      width: 100,
    },
    {
      name: 'first_name',
      title: 'First Name',
      type: 'string',
      width: 50,
    },
    {
      name: 'last_name',
      title: 'Last Name',
      type: 'string',
      width: 50,
    },
    {
      name: 'ContactInfo',
      title: 'Contact Information',
      type: 'header',
    },
    {
      name: 'primary_phone',
      title: 'Primary Phone Number',
      type: 'string',
    },
    {
      name: 'primary_email',
      title: 'Primary Email Address',
      type: 'string',
    },
    {
      name: 'BusinessInfo',
      title: 'Business Information',
      type: 'header',
    },
    {
      name: 'business_logo',
      title: 'Business Logo',
      type: 'file',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'organization',
      title: 'Organization / Business Name',
      type: 'string',
    },
    {
      name: 'message',
      title: 'Bio / Message',
      type: 'text',
    },
  ]

  async function handleSubmit() {
    if (!siteName) {
      setError('You must provide a unique page name.')
      alert('You must provide a unique page name.')
      return
    }

    try {
      const vCardFilePath = await saveVCard()

      const FullFormData = { ...formData, site_name: siteName }

      console.log('Full Form Data:', FullFormData)

      const siteResponse = await createSiteFromTemplate({
        formData: FullFormData,
        socialLinks,
        vCardFilePath,
        emails,
        phoneNumbers,
        addresses,
        links,
        selectedTemplate,
      })

      // Optionally, reset form data
      setFormData((prev) => ({
        ...prev,
        name: '',
        meta_title: '',
        bg_color: '#ffffff',
        sections: [],
      }))

      if (qrid) {
        window.location.href = `/register-qr/?qrid=${qrid}`
        return
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Error creating page: ' + error.message)
    }
  }

  const saveVCard = async () => {
    if (!userData) return

    try {
      // Convert JSON to vCard string
      const vCardData = jsonToVCard(vcardInfo)

      // Step 1: Create a .vcf Blob
      const vCardBlob = new Blob([vCardData], { type: 'text/vcard' })
      const fileName = `${userData.id}/vcard-${userData.id}-${Date.now()}.vcf`

      // Step 2: Upload to Supabase Storage
      const { data: fileData, error: uploadError } = await supabase.storage
        .from('vcards')
        .upload(fileName, vCardBlob)

      if (uploadError) throw uploadError

      // Step 3: Get Public URL
      const { data: publicUrlData } = supabase.storage
        .from('vcards')
        .getPublicUrl(fileData.path)
      const fileUrl = publicUrlData.publicUrl

      // Step 4: Add Reference to `user_vcards` Table
      const { error: insertError } = await supabase.from('user_vcards').insert({
        user_id: userData.id,
        path: fileUrl,
        file_name: fileName,
      })

      if (insertError) throw insertError
      return fileUrl
    } catch (error) {
      console.log('Error saving vCard:', error)
    }
  }

  return (
    <div className="">
      <div className="mx-4 my-8 md:mx-0">
        <div className="mx-auto inline flex w-full max-w-md items-center justify-between px-4 py-6 md:hidden">
          <div className="relative mx-2 h-1 flex-auto bg-gray-300">
            <div
              className={
                'absolute left-0 top-0 h-full w-full transition-all duration-300'
              }
            />
          </div>
          {steps.map((step, index) => {
            const isCompleted = index < currentStep
            const isCurrent = index === currentStep

            return (
              <div key={index} className="relative flex w-full items-center">
                {/* Step dot */}
                <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-300 text-white ring-2 ring-white transition-colors duration-300">
                  {isCompleted ? (
                    <CheckCircleIcon className="h-5 w-5 text-white" />
                  ) : (
                    <div className="h-2 w-2 rounded-full bg-white" />
                  )}
                  <div
                    className={`absolute inset-0 rounded-full ${isCompleted ? 'bg-primary' : 'bg-gray-300'} -z-10`}
                  />
                </div>

                {/* Line (except after last dot) */}
                {index < steps.length - 1 && (
                  <div className="relative mx-2 h-1 flex-auto bg-gray-300">
                    <div
                      className={`absolute left-0 top-0 h-full transition-all duration-300 ${index < currentStep - 1 ? 'w-full bg-primary' : 'w-0 bg-gray-300'}`}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <form>
          <div className="space-y-12">
            {/* Navigation Steps */}
            <div className="mx-auto hidden max-w-5xl md:block">
              <nav aria-label="Progress">
                <ol
                  role="list"
                  className="space-y-4 md:flex md:space-x-8 md:space-y-0"
                >
                  {steps.map((step, index) => (
                    <li key={step.name} className="md:flex-1">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(index + 1)}
                        aria-current={
                          index + 1 === currentStep ? 'step' : undefined
                        }
                        className={`flex w-full flex-col border-l-4 py-2 pl-4 text-left md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4 ${
                          index + 1 === currentStep
                            ? 'border-indigo-600 text-indigo-600'
                            : 'border-gray-200 text-gray-500'
                        }`}
                      >
                        <span className="text-sm">{step.id}</span>
                        <span className="text-sm font-bold">{step.name}</span>
                      </button>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
            {/* Step 1: Site Information */}
            {currentStep === 1 && (
              <div className="mx-auto flex max-w-5xl flex-wrap space-y-6">
                {def.map((field) => (
                  <div
                    key={field.name}
                    className="mt-2"
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
            )}
            {currentStep === 2 && (
              <div className="mx-auto max-w-5xl space-y-6">
                <SocialMediaLinks
                  value={socialLinks}
                  onChange={handleSocialLinksChange}
                />
                {/* add social links explanation  */}\
                <Modal
                  open={socialExplanationModal}
                  setOpen={setSocialExplanationModal}
                  title="Adding Social Links"
                  size="4xl"
                >
                  <VideoPlayerWithLoop src="https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/help-videos/JotAddSocials.mp4" />
                  <button
                    onClick={() => setSocialExplanationModal(false)}
                    className="mt-4 rounded bg-gray-700 px-4 py-2 text-white"
                  >
                    Close
                  </button>
                </Modal>
              </div>
            )}
            {/* Step 3: vCard Information   */}
            {currentStep === 3 && (
              <>
                <div className="mx-auto max-w-5xl space-y-6">
                  {vcardFields.map((field) => (
                    <ReturnFieldsV2
                      key={field.name || field.title}
                      field={field}
                      value={formData[field.name]}
                      onChange={handleFormDataChange}
                    />
                  ))}
                </div>
                {/* vcard explanation */}
                <Modal size="xl" open={isOpen} setOpen={setIsOpen} title="">
                  <div className="grid w-full grid-cols-12">
                    <div className="col-span-6">
                      <h1 className="mb-4 text-2xl font-bold text-gray-900">
                        Contact Cards {'('}vCards{')'}
                      </h1>
                      <p className="text-sm text-gray-500">
                        connections will be able to easily add your contact
                        information to their smart phone via the unversal forma
                        .vcf or vcard
                      </p>
                    </div>
                    <div className="col-span-6">
                      {' '}
                      <VideoPlayerWithLoop src="https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/mics/help-videos/JotDownloadVcard.mp4" />
                    </div>
                  </div>
                </Modal>
              </>
            )}
            {/* Step 4: Template Selector */}
            {false && (
              <>
                <div className="mx-auto max-w-5xl space-y-6">
                  <TemplateSelector onChange={handleTemplateSelect} />
                  {selectedTemplate && (
                    <div className="mt-4 text-sm text-gray-700">
                      Selected Template:{' '}
                      <span className="font-semibold">{selectedTemplate}</span>
                    </div>
                  )}
                </div>
              </>
            )}
            {/* Navigation Buttons */}
            <div className="mx-auto max-w-5xl space-y-6 pb-20">
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="text-sm font-semibold text-gray-900"
                  disabled={currentStep === 1}
                >
                  Previous
                </button>
                {steps.length === currentStep ? (
                  <button
                    type="button"
                    onClick={() => setSiteNameModal(true)}
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
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
