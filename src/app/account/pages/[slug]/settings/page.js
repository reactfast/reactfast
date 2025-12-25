'use client'

import { useEffect, useState } from 'react'
import { PaperClipIcon } from '@heroicons/react/20/solid'
import { supabaseClient as supabase } from '@/config/supabase-client'
import Toast from '@/components/toast'
import { getUser } from '@/hooks/Auth'
import { getUserSubscription } from '@/helpers/subs'
import {
  ArrowLeftCircleIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline'
import AutoUploadFileField from '@/components/formFields/singleFileUploadNullable'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
import QRCodeCanvasPreview from '@/components/qrv2Preview'
import Link from 'next/link'

export default function SiteSettings({ params }) {
  const [formData, setFormData] = useState({
    active: false,
  })

  const [user, setUser] = useState(null)
  const [subscription, setSubscription] = useState(null)
  const [pageLimitData, setPageLimitData] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const [inlineVCardURL, setInlineVCardURL] = useState(null)
  const [qrData, setQrData] = useState({
    qrColor: '#ffffff',
    dotType: 'square',
    bgColor: '#000000',
    imageUrl: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setQrData({ ...qrData, [name]: value })
  }

  useEffect(() => {
    async function _getUser() {
      const user = await getUser()
      setUser(user)
    }

    _getUser()
  }, [])

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

  const showToast = () => {
    setToastVisible(true)
  }

  const hideToast = () => {
    setToastVisible(false)
  }

  useEffect(() => {
    async function get() {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('id', params.slug)
        .single()

      setFormData(data)
    }

    get()
  }, [])

  useEffect(() => {
    if (!formData) return

    const paramQrid = new URLSearchParams(window.location.search).get(
      'vCardURL',
    )

    console.log('paramQrid', paramQrid)

    if (paramQrid) {
      setFormData((prev) => ({
        ...prev,
        vcard: paramQrid,
      }))
      // handleSubmit()
    }
  }, [formData])

  useEffect(() => {
    console.log('pageLimitData', pageLimitData)
  }, [pageLimitData])

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target

    console.log('checked', checked)
    console.log('pageLimitData', pageLimitData)

    if (type === 'checkbox' && name === 'active') {
      if (checked && !pageLimitData?.canCreateMorePages) {
        // Prevent activation and show modal if limit is reached
        setModalOpen(true)
        return
      }
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else if (type === 'checkbox' && name === 'show_jot_branding') {
      setFormData((prev) => ({ ...prev, [name]: !checked }))
    } else if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    async function post() {
      const { data, error } = await supabase
        .from('pages')
        .update(formData)
        .eq('id', params.slug)
        .select()

      showToast()
    }

    post()
  }

  function handleUpdateVcard(vcard) {
    async function post() {
      const { data, error } = await supabase
        .from('pages')
        .update({ vcard: vcard })
        .eq('id', params.slug)
        .select()
    }

    post()
  }

  return (
    <div className="py-10 md:px-40 md:py-20">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold text-gray-900">
          Site Settings{' '}
          <Link href={`/help/docs/site-settings`} target="_blank">
            <QuestionMarkCircleIcon className="inline h-6 w-6 cursor-pointer font-black text-primary" />
          </Link>
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Configure the details of your site.
        </p>
      </div>
      <button
        type="button"
        onClick={() =>
          (window.location.href = `/account/pages/${params.slug}/`)
        }
        className="relative -ml-px inline-flex items-center gap-1 rounded-r px-3 py-2 text-sm font-semibold text-primary ring-1 ring-inset ring-gray-300 transition-all duration-200 hover:bg-gray-50 focus:z-10"
      >
        <ArrowLeftCircleIcon className="h-5 w-5 font-bold" />
        Back to Editor
      </button>
      <form onSubmit={handleSubmit} className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">Page Name</dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {formData.name}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">
              Published
              <p>A Page set to active is visible to the world</p>
            </dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleChange}
                className="mt-1"
              />
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt
              className={`text-sm font-medium ${!subscription ? 'text-gray-400' : 'text-gray-900'}`}
            >
              Hide Jot branding
              <p>
                {'('} If you're embarrassed of us {')'}
              </p>
            </dt>
            <dd
              className={`mt-1 text-sm ${!subscription ? 'text-gray-400' : 'text-gray-700'} sm:col-span-2 sm:mt-0`}
            >
              <input
                disabled={!subscription}
                type="checkbox"
                name="show_jot_branding"
                checked={!formData.show_jot_branding}
                onChange={handleChange}
                className="mt-1"
              />
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt
              className={`text-sm font-medium ${!subscription ? 'text-gray-400' : 'text-gray-900'}`}
            >
              Ask user to share contract with me
              <p>Remove the Jot Branding from your landing page</p>
            </dt>
            <dd
              className={`mt-1 text-sm ${!subscription ? 'text-gray-400' : 'text-gray-700'} sm:col-span-2 sm:mt-0`}
            >
              <input
                disabled
                type="checkbox"
                name="ask_contract"
                checked={true}
                className="mt-1"
              />
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt
              className={`text-sm font-medium ${!subscription ? 'text-gray-400' : 'text-gray-900'}`}
            >
              Let Jot ask users to create a free account
              <p>Remove the Jot Branding from your landing page</p>
            </dt>
            <dd
              className={`mt-1 text-sm ${!subscription ? 'text-gray-400' : 'text-gray-700'} sm:col-span-2 sm:mt-0`}
            >
              <input
                disabled
                type="checkbox"
                name="ask_account"
                checked={true}
                className="mt-1"
              />
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt
              className={`text-sm font-medium ${!subscription ? 'text-gray-400' : 'text-gray-900'}`}
            >
              Show Menu
              <p>Remove the Jot Branding from your landing page</p>
            </dt>
            <dd
              className={`mt-1 text-sm ${!subscription ? 'text-gray-400' : 'text-gray-700'} sm:col-span-2 sm:mt-0`}
            >
              <input
                type="checkbox"
                name="show_menu"
                checked={formData.show_menu}
                onChange={handleChange}
                className={`mt-1 ${!subscription ? 'cursor-not-allowed' : ''}`}
                disabled={!subscription}
              />
            </dd>
          </div>

          {/* Meta Data */}
          <Disclosure
            key={'Metadata'}
            as="div"
            className="py-6 first:pt-0 last:pb-0"
          >
            <dt>
              <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                <span className="text-lg font-medium text-gray-900">
                  Metadata
                  <span className="ml-8 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                    Premium Feature
                  </span>
                </span>
                <span className="ml-6 flex h-7 items-center">
                  <PlusSmallIcon
                    aria-hidden="true"
                    className="size-6 group-data-[open]:hidden"
                  />
                  <MinusSmallIcon
                    aria-hidden="true"
                    className="size-6 group-[&:not([data-open])]:hidden"
                  />
                </span>
              </DisclosureButton>
            </dt>
            <DisclosurePanel as="dd" className="mt-2 pr-12">
              <p className="mb-12 text-sm text-gray-500">
                Metadata is information that is used in search engines like
                google and also provides messaging applications with a preview
                of your content when share on platforms like twitter instagram
                or imessage
              </p>
              <div className="mt-4 space-y-6">
                <div>
                  <label
                    htmlFor="meta_title"
                    className={`block text-sm font-medium ${
                      !subscription ? 'text-gray-400' : 'text-gray-900'
                    }`}
                  >
                    Meta Title
                  </label>
                  <input
                    type="text"
                    id="meta_title"
                    name="meta_title"
                    value={formData.meta_title}
                    onChange={handleChange}
                    className={`block w-full rounded-md border-gray-300 shadow-sm ${
                      !subscription ? 'cursor-not-allowed bg-gray-100' : ''
                    }`}
                    disabled={!subscription}
                  />
                </div>
                <div>
                  <label
                    htmlFor="meta_description"
                    className={`block text-sm font-medium ${
                      !subscription ? 'text-gray-400' : 'text-gray-900'
                    }`}
                  >
                    Meta Description
                  </label>
                  <textarea
                    id="meta_description"
                    name="meta_description"
                    value={formData.meta_description}
                    onChange={handleChange}
                    className={`block w-full rounded-md border-gray-300 shadow-sm ${
                      !subscription ? 'cursor-not-allowed bg-gray-100' : ''
                    }`}
                    disabled={!subscription}
                  ></textarea>
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium ${
                      !subscription ? 'text-gray-400' : 'text-gray-900'
                    }`}
                  >
                    Meta Image
                  </label>
                  <AutoUploadFileField
                    bucket="images"
                    folder=""
                    name="meta_img"
                    id="meta_img"
                    value={formData.meta_img}
                    onChange={handleChange}
                    disabled={!subscription}
                    className={
                      !subscription ? 'pointer-events-none opacity-50' : ''
                    }
                  />
                </div>
              </div>
            </DisclosurePanel>
          </Disclosure>

          {/* Quick Connect Settings */}
          <Disclosure
            key={'Quick Connect Settings'}
            as="div"
            className="py-6 first:pt-0 last:pb-0"
          >
            <dt>
              <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                <span className="text-lg font-medium text-gray-900">
                  Quick Connect Settings{' '}
                  <span className="ml-8 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                    Premium Feature
                  </span>
                </span>
                <span className="ml-6 flex h-7 items-center">
                  <PlusSmallIcon
                    aria-hidden="true"
                    className="size-6 group-data-[open]:hidden"
                  />
                  <MinusSmallIcon
                    aria-hidden="true"
                    className="size-6 group-[&:not([data-open])]:hidden"
                  />
                </span>
              </DisclosureButton>
            </dt>
            <DisclosurePanel as="dd" className="mt-2 pr-12">
              <div className="mt-4 space-y-6">
                <div>
                  <label
                    htmlFor="sms_number"
                    className={`block text-sm font-medium ${
                      !subscription ? 'text-gray-400' : 'text-gray-900'
                    }`}
                  >
                    Text Me Number
                  </label>
                  <input
                    type="text"
                    id="sms_number"
                    name="sms_number"
                    value={formData.sms_number}
                    onChange={handleChange}
                    className={`block w-full rounded-md border-gray-300 shadow-sm ${
                      !subscription ? 'cursor-not-allowed bg-gray-100' : ''
                    }`}
                    disabled={!subscription}
                  />
                </div>

                <div>
                  <label
                    htmlFor="sms_message"
                    className={`block text-sm font-medium ${
                      !subscription ? 'text-gray-400' : 'text-gray-900'
                    }`}
                  >
                    Text Me Content
                  </label>
                  <textarea
                    id="sms_message"
                    name="sms_message"
                    value={formData.sms_message}
                    onChange={handleChange}
                    className={`block w-full rounded-md border-gray-300 shadow-sm ${
                      !subscription ? 'cursor-not-allowed bg-gray-100' : ''
                    }`}
                    disabled={!subscription}
                  ></textarea>
                </div>

                <div>
                  <label
                    htmlFor="email_address"
                    className={`block text-sm font-medium ${
                      !subscription ? 'text-gray-400' : 'text-gray-900'
                    }`}
                  >
                    Email Me Number
                  </label>
                  <input
                    type="text"
                    id="email_address"
                    name="email_address"
                    value={formData.email_address}
                    onChange={handleChange}
                    className={`block w-full rounded-md border-gray-300 shadow-sm ${
                      !subscription ? 'cursor-not-allowed bg-gray-100' : ''
                    }`}
                    disabled={!subscription}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email_content"
                    className={`block text-sm font-medium ${
                      !subscription ? 'text-gray-400' : 'text-gray-900'
                    }`}
                  >
                    Email Me Content
                  </label>
                  <textarea
                    id="email_content"
                    name="email_content"
                    value={formData.email_content}
                    onChange={handleChange}
                    className={`block w-full rounded-md border-gray-300 shadow-sm ${
                      !subscription ? 'cursor-not-allowed bg-gray-100' : ''
                    }`}
                    disabled={!subscription}
                  ></textarea>
                </div>
              </div>
            </DisclosurePanel>
          </Disclosure>

          {/* QR Code Settings */}
          <Disclosure
            key={'QR Code Settings'}
            as="div"
            className="py-6 first:pt-0 last:pb-0"
          >
            <dt>
              <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                <span className="text-lg font-medium text-gray-900">
                  QR Code Settings
                  <span className="ml-8 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                    Premium Feature
                  </span>
                </span>
                <span className="ml-6 flex h-7 items-center">
                  <PlusSmallIcon
                    aria-hidden="true"
                    className="size-6 group-data-[open]:hidden"
                  />
                  <MinusSmallIcon
                    aria-hidden="true"
                    className="size-6 group-[&:not([data-open])]:hidden"
                  />
                </span>
              </DisclosureButton>
            </dt>
            <DisclosurePanel as="dd" className="mt-2 pr-12">
              <div className="mt-4 space-y-6">
                <div className="grid w-full grid-cols-12">
                  <div className="col-span-6 space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-900">
                        Dot Color
                      </label>
                      <input
                        name="qr_dot_color"
                        type="color"
                        value={formData.qr_dot_color}
                        onChange={handleChange}
                        className="block w-24 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 focus:outline-indigo-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900">
                        Dot Type
                      </label>
                      <select
                        name="qr_dot_type"
                        value={formData.qr_dot_type}
                        onChange={handleChange}
                        className="w-full rounded-md bg-white py-1.5 pl-3 pr-8 text-gray-900 outline-gray-300 focus:outline-indigo-600"
                      >
                        <option value="dots">dots</option>
                        <option value="rounded">rounded</option>
                        <option value="classy">classy</option>
                        <option value="classy-rounded">classy-rounded</option>
                        <option value="square">square</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900">
                        Background Color
                      </label>
                      <input
                        name="qr_bg_color"
                        type="color"
                        value={formData.qr_bg_color}
                        onChange={handleChange}
                        className="block w-24 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 focus:outline-indigo-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900">
                        Image URL
                      </label>
                      <input
                        name="qr_img_url"
                        type="text"
                        value={formData.qr_img_url}
                        onChange={handleChange}
                        placeholder="Image URL"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-gray-300 focus:outline-indigo-600"
                      />
                    </div>
                  </div>

                  <div
                    style={{ backgroundColor: formData.foreground_color }}
                    className="col-span-6 flex w-full items-center justify-center rounded-lg p-8 shadow-lg"
                  >
                    <QRCodeCanvasPreview
                      url={'https://www.jot.space/' + formData.name}
                      bgColor={formData.qr_bg_color}
                      qrColor={formData.qr_dot_color}
                      logoImage={formData.qr_img_url}
                      dotType={formData.qr_dot_type}
                      downloadLabel="Download QR Code"
                      fileType="jpeg"
                      size={300}
                    />
                  </div>
                </div>
              </div>
            </DisclosurePanel>
          </Disclosure>

          {/* vCard Settings */}
          <Disclosure
            key={'vCard Settings'}
            as="div"
            className="py-6 first:pt-0 last:pb-0"
          >
            <dt>
              <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                <span className="text-lg font-medium text-gray-900">
                  Contact Card {'('}vcard{')'} Settings
                </span>
                <span className="ml-6 flex h-7 items-center">
                  <PlusSmallIcon
                    aria-hidden="true"
                    className="size-6 group-data-[open]:hidden"
                  />
                  <MinusSmallIcon
                    aria-hidden="true"
                    className="size-6 group-[&:not([data-open])]:hidden"
                  />
                </span>
              </DisclosureButton>
            </dt>
            <DisclosurePanel as="dd" className="mt-2 pr-12">
              <div className="mt-4 space-y-6">
                <div className="px-4 py-6">
                  <div className="mt-4 space-y-6">
                    <label
                      htmlFor="vcard"
                      className="block text-sm font-medium text-gray-900"
                    >
                      vCard Upload
                    </label>
                    <AutoUploadFileField
                      id="photo"
                      name="photo"
                      folder={'root'}
                      onChange={handleChange} // Pass the URL back to parent
                      value={formData.vcard}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <div>
                      <label
                        htmlFor="vcard"
                        className="block text-sm font-medium text-gray-900"
                      >
                        vCard Reference
                      </label>
                      <input
                        type="text"
                        id="vCard"
                        name="vcard"
                        value={formData.vcard}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm"
                      />
                    </div>
                  </div>
                  <Link href={`/account/assets/vcards/new?site=${params.slug}`}>
                    <button className="mt-8 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Create vCard +
                    </button>
                  </Link>
                </div>
                <hr />
              </div>
            </DisclosurePanel>
          </Disclosure>
        </dl>

        <div className="px-4 py-6 sm:flex sm:justify-end sm:px-0">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Save Settings
          </button>
        </div>
        <Toast
          title="Action Successful"
          message="Your changes have been saved."
          show={toastVisible}
          onClose={hideToast}
          duration={3000}
        />
      </form>
      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-bold">
              You cant have any more active pages
            </h2>
            <p>
              You will need to deactivate a page in order to activate this one.
            </p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setModalOpen(false)}
                className="rounded bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
              >
                ok
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
