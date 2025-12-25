import { CheckIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { supabaseClient as supabase } from '@/config/supabase-client'
import FontSelector from '@/components/fontSelector'
import UploadFileFormField from '@/components/formFields/singleFileUploadNullable'
import Link from 'next/link'
import MediaSelectorModal from '@/components/formFields/MediaSelectorModal'

// =====================================================================
// SiteSettingsForm – Used in the “Settings” drawer within pageEdit
// =====================================================================
export default function SiteSettingsForm({ page }) {
  const [formData, setFormData] = useState({
    active: false,
    bg_color: '#000000',
    primary: '#000000',
    secondary: '#000000',
    tertiary: '#000000',
    quaternary: '#000000',
    vcard: '',
    sms_number: '',
    sms_message: '',
    email_address: '',
    email_content: '',
    font_name: 'Inter', // Default font
    font_color: '',
  })

  useEffect(() => {
    if (page?.id) {
      setFormData((prev) => ({
        ...prev,
        ...page,
      }))
    }
  }, [page])

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleFontChange = (font) => {
    setFormData((prev) => ({ ...prev, font_name: font }))
  }

  const handleFieldChange = (fieldName, value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!page?.id) return
    async function post() {
      const { data, error } = await supabase
        .from('pages')
        .update(formData)
        .eq('id', page.id)
        .select()
      if (error) {
        console.warn('Error updating settings:', error)
      } else {
        window.location.reload()
      }
    }
    post()
  }

  return (
    <div className="px-4">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-thin text-primary">
              Theme{' '}
              <Link href={`/help/docs/theme-settings`} target="_blank">
                <QuestionMarkCircleIcon className="inline h-6 w-6 cursor-pointer font-black text-primary" />
              </Link>
            </h3>
            {/* <p className="mt-1 text-sm text-primary/75">
              Configure the details of your site
            </p> */}
          </div>
          <div className="py-6 sm:flex sm:justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-1 rounded bg-secondary px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:brightness-110"
            >
              <CheckIcon className="h-5 w-5" />
              Save Settings
            </button>
          </div>
        </div>

        <dl className="divide-y divide-gray-100">
          <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-black tracking-wider text-primary">
              Page Name
            </dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {formData.name || ''}
            </dd>
          </div>

          <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-black tracking-wider text-primary">
              Background Color
            </dt>
            <dd className="mt-1 flex flex-wrap gap-7 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              <input
                type="color"
                name="bg_color"
                value={formData.bg_color}
                onChange={handleChange}
                className="ml-3 h-10 w-16"
              />
            </dd>
          </div>

          <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-black tracking-wider text-primary">
              Background Image
            </dt>
            <dd className="mt-1 flex flex-wrap gap-7 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              <MediaSelectorModal
                onSelect={(value) => handleFieldChange('bg_image', value)}
                value={formData.bg_image}
                label="Select Media"
                name="bg_image"
                id="bg_image"
              />
            </dd>
          </div>

          <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-black tracking-wider text-primary">
              Foreground Color
            </dt>
            <dd className="mt-1 flex flex-wrap gap-7 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              <input
                type="color"
                name="foreground_color"
                value={formData.foreground_color}
                onChange={handleChange}
                className="ml-3 h-10 w-16"
              />
            </dd>
          </div>

          <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-black tracking-wider text-primary">
              Font Selection
            </dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              <FontSelector
                value={formData.font_name}
                onFontChange={handleFontChange}
              />
            </dd>
          </div>

          <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-black tracking-wider text-primary">
              Font Color
            </dt>
            <dd className="mt-1 flex flex-wrap gap-7 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              <input
                type="color"
                name="font_color"
                value={formData.font_color}
                onChange={handleChange}
                className="ml-3 h-10 w-16"
              />
            </dd>
          </div>

          <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-black tracking-wider text-primary">
              Page Theme Colors
            </dt>
            <dd className="mt-1 flex flex-wrap gap-7 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {['primary', 'secondary', 'tertiary', 'quaternary'].map(
                (color) => (
                  <div key={color} className="flex items-center pt-2">
                    <label
                      htmlFor={color}
                      className="block w-20 text-right text-sm font-medium text-primary"
                    >
                      {color}:
                    </label>
                    <input
                      type="color"
                      id={color}
                      name={color}
                      value={formData[color]}
                      onChange={handleChange}
                      className="ml-3 h-10 w-16"
                    />
                  </div>
                ),
              )}
            </dd>
          </div>
        </dl>
      </form>
    </div>
  )
}
