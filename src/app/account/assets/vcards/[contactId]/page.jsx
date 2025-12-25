'use client'

import { use, useEffect, useState } from 'react'
import { supabaseClient as supabase } from '@/config/supabase-client'
import { ReturnFieldsV2 } from '../../../../../components/formFields/returnFields'
import { jsonToVCard } from '@/helpers/jsonToVCard'
import { getUser } from '@/hooks/Auth'

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

export default function WizardForm({ params }) {
  const [userData, setUserData] = useState(null)
  const [vcardRef, setVcardRef] = useState()
  const [inlineRedirect, setInlineRedirect] = useState('')
  const [formData, setFormData] = useState({})

  useEffect(() => {
    const paramQrid = new URLSearchParams(window.location.search).get('site')
    if (paramQrid) setInlineRedirect(paramQrid)
  }, [])

  useEffect(() => {
    async function _getUser() {
      const user = await getUser()
      setUserData(user)
    }
    _getUser()
  }, [])

  useEffect(() => {
    console.log('Form Data Updated:', formData)
  }, [formData])

  useEffect(() => {
    if (!userData) return
    if (params.contactId === 'new') return

    async function _getVCard() {
      const { data, error } = await supabase
        .from('user_vcards')
        .select('*')
        .eq('id', params.contactId)
        .single()
      if (error) return console.error('Error fetching vCards:', error)
      setVcardRef(data)
    }

    _getVCard()
  }, [userData, params.contactId])

  useEffect(() => {
    if (!userData || params.contactId === 'new' || !vcardRef?.file_name) return

    async function _loadVCard() {
      try {
        const { data, error } = await supabase.storage
          .from('vcards')
          .download(vcardRef.file_name)
        if (error) return console.error('[vCard Loader] Download error:', error)

        const text = await data.text()
        const result = vCardToJson(text)

        setFormData({
          firstName: result.firstName || '',
          lastName: result.lastName || '',
          birthday: result.birthday || '',
          title: result.title || '',
          organization: result.organization || '',
          photo: result.photo || '',
          emails: result.email ? [result.email] : [],
          phones: [result.workPhone, result.homePhone].filter(Boolean),
          addresses: result.homeAddress ? [result.homeAddress] : [],
          websites: result.website ? [result.website] : [],
          socialLinks: result.socialLinks || [],
        })
      } catch (err) {
        console.error('[vCard Loader] Unexpected error:', err)
      }
    }

    _loadVCard()
  }, [userData, vcardRef, params.contactId])

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

  const handleSubmit = async () => {
    if (!userData) return
    try {
      const vCardData = jsonToVCard(formData)
      const vCardBlob = new Blob([vCardData], { type: 'text/vcard' })
      const fileName = `${userData.id}/vcard-${userData.id}-${Date.now()}.vcf`

      const { data: fileData, error: uploadError } = await supabase.storage
        .from('vcards')
        .upload(fileName, vCardBlob)
      if (uploadError) throw uploadError

      const { data: publicUrlData } = supabase.storage
        .from('vcards')
        .getPublicUrl(fileData.path)
      const fileUrl = publicUrlData.publicUrl

      const { error: insertError } = await supabase.from('user_vcards').insert({
        user_id: userData.id,
        path: fileUrl,
        file_name: fileName,
        name: `${formData.firstName || ''} ${formData.lastName || ''}`,
      })
      if (insertError) throw insertError

      if (inlineRedirect) {
        window.location.href = `/account/pages/${inlineRedirect}/settings/?vCardURL=${fileUrl}`
      } else {
        window.location.href = `/account/assets/vcards`
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Error creating vCard: ' + error.message)
    }
  }

  return (
    <div className="mx-4 my-8 md:mx-0">
      <div className="space-y-12">
        <div className="mx-auto max-w-5xl space-y-6">
          <h2 className="text-3xl font-black">Create Contact Card</h2>
          <p className="mt-2 text-gray-600">
            Use this form to create a digital contact card (vCard) that can be
            universally shared and imported into address books across platforms.
          </p>

          <div className="space-y-4">
            {vcardFields.map((field) => (
              <ReturnFieldsV2
                key={field.name || field.title}
                field={field}
                value={formData[field.name]}
                onChange={handleFormDataChange}
              />
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-5xl space-y-6 pb-20">
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
