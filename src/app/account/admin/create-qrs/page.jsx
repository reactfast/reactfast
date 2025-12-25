'use client'

import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import ImageUpload from '@/components/qrUpload.jsx'
import { supabaseClient as supabase } from '@/config/supabase-client'
import QRCodeCanvas from './qrv2.js'
import QRCodeCanvasOld from './qr.js'

const QRCodeAndImageUpload = () => {
  // Validation State
  const [uuidExists, setUuidExists] = useState(false)

  // QR Creation State
  const [uuid, setUuid] = useState('') // QR code UUID
  const [qrUrl, setQrUrl] = useState('') // URL for the QR code
  const [formData, setFormData] = useState({
    qrColor: '#ffffff',
    dotType: 'square',
    bgColor: '#000000',
    imageUrl: '',
  })

  //register new QR code
  const [publicURL, setPublicURL] = useState('') // Public URL for the uploaded image
  const [uuidForEdit, setUuidForEdit] = useState('uuid')

  // Check if UUID is unique
  function checkUniqueUUID(id) {
    async function _check() {
      try {
        const { data, error } = await supabase
          .from('qr_codes')
          .select('id')
          .eq('id', id)
          .single()

        if (data?.message) {
          setUuidExists(false)
        } else {
          setUuidExists(true)
        }
      } catch (error) {
        setUuidExists(false)
      }
    }

    return _check()
  }

  useEffect(() => {
    const _uuid = uuidv4()
    checkUniqueUUID(_uuid)
    setUuidForEdit(_uuid)
    setUuid(_uuid)
  }, [])

  useEffect(() => {
    if (uuid) {
      const generatedUrl = `https://jot.space/redirect/${uuid}`
      setQrUrl(generatedUrl)
    }
  }, [uuid])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const newUUID = () => {
    const _uuid = uuidv4()
    setUuid(_uuid)
  }

  const handleImageUpload = (url) => {
    setPublicURL(url)
    console.log('Image uploaded:', url)
  }

  // Function to insert a new QR code reference into the database
  function postRef() {
    async function _post() {
      const { data, error } = await supabase.from('qr_codes').insert([
        {
          id: uuidForEdit,
          img_ref: `https://gjicrqpogkzojcniixqi.supabase.co/storage/v1/object/public/qr-codes/qrv2/qr-code-${uuidForEdit}.jpg`,
        },
      ])
      if (error) {
        console.error('Error inserting new QR code:', error)
        alert('Error inserting new QR code')
      } else {
        console.log('New QR code inserted:', data)
        alert('New QR code inserted')
      }
    }

    _post()
  }

  return (
    <div className="px-8 py-16">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <h1 className="text-3xl font-black">QR Code and Image Upload</h1>
          <div className="flex items-center space-x-2">
            {uuidExists ? (
              <h2 className="text-red-800">UUID: {uuid}</h2>
            ) : (
              <h2>UUID: {uuid}</h2>
            )}

            <button
              onClick={newUUID}
              className="text-indigo-600 hover:text-indigo-500"
            >
              <ArrowPathIcon className="h-5 w-5" />
            </button>
          </div>
          <br />
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Dot Color
            </label>
            <input
              name="qrColor"
              type="text"
              value={formData.qrColor}
              onChange={handleInputChange}
              placeholder="e.g. #000000"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-gray-300 focus:outline-indigo-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Dot Type
            </label>
            <select
              name="dotType"
              value={formData.dotType}
              onChange={handleInputChange}
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
              name="bgColor"
              type="text"
              value={formData.bgColor}
              onChange={handleInputChange}
              placeholder="e.g. #ffffff"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-gray-300 focus:outline-indigo-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Image URL
            </label>
            <input
              name="imageUrl"
              type="text"
              value={formData.imageUrl}
              onChange={handleInputChange}
              placeholder="Image URL"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-gray-300 focus:outline-indigo-600"
            />
          </div>
        </div>

        <div>
          <QRCodeCanvas url={qrUrl} {...formData} />
          <QRCodeCanvasOld uuidfor={uuid} url={qrUrl} />
        </div>
      </div>
      <hr />
      <div className="m-auto w-1/2">
        {/* Image upload functionality */}
        <h1 className="mt-10 text-3xl">Register QR Code</h1>
        <ImageUpload
          bucket={'qr-codes'}
          path={'qrv2/'}
          onUploadComplete={handleImageUpload}
        />
        <div className="mb-10">
          <label
            htmlFor="uuid"
            className="block text-sm/6 font-medium text-gray-900"
          >
            UUID
          </label>
          <div className="mt-2">
            <input
              id="uuid"
              name="uuid"
              type="uuid"
              value={uuidForEdit}
              onChange={(e) => setUuidForEdit(e.target.value)}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => postRef()}
        className="mb-10 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Save Ref
      </button>
    </div>
  )
}

export default QRCodeAndImageUpload
