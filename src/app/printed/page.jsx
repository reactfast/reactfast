'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseClient as supabase } from '@/config/supabase-client'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

function StatusBadge({ status }) {
  const statusStyles = {
    'awaiting registration': 'bg-yellow-100 text-yellow-800',
    registered: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-600',
    default: 'bg-blue-100 text-blue-800',
  }

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset',
        statusStyles[status] || statusStyles.default,
      )}
    >
      {status}
    </span>
  )
}

export default function Page() {
  const [qrid, setQrid] = useState(null)
  const [qr, setQr] = useState(null)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [products, setProducts] = useState([])
  const [selectedProductId, setSelectedProductId] = useState('')

  useEffect(() => {
    const paramQrid = new URLSearchParams(window.location.search).get('qrid')
    if (paramQrid) setQrid(paramQrid)

    async function fetchProducts() {
      const { data, error } = await supabase.from('products').select('*')
      if (error) {
        console.error('Failed to load products', error)
      } else {
        setProducts(data)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    if (!qrid) return
    async function getQr() {
      const { data, error } = await supabase
        .from('qr_codes')
        .select(
          `
    *,
    product (
      id,
      name,
      default_image
    )
  `,
        )
        .eq('id', qrid)

      if (error) {
        console.error(error)
        return
      }

      if (!data || data.length === 0) {
        router.push('/404')
      } else {
        setQr(data[0])
        setLoading(false)
      }
    }

    getQr()
  }, [qrid])

  async function updateQrStatus() {
    const { error } = await supabase
      .from('qr_codes')
      .update({ status: 'awaiting registration', product: selectedProductId })
      .eq('id', qr.id)

    if (error) {
      console.error(error)
    } else {
      window.location.reload()
    }
  }

  if (loading) return <div className="p-4 text-center">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-6 rounded-2xl bg-white p-6 shadow-md">
        <div className="text-center">
          <h1 className="text-lg font-semibold text-gray-900">
            Quality Control
          </h1>
        </div>
        <DevicePreview qr={qr} />

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-500">
              QR ID
            </label>
            <p className="text-base font-medium text-gray-900">{qr.id}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">
              Created At
            </label>
            <p className="text-sm text-gray-800">{formatDate(qr.created_At)}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">
              Status
            </label>
            <StatusBadge status={qr.status} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">
              Redirect URL
            </label>
            <p className="truncate text-sm text-blue-600">{qr.redirect_url}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">
              Image Ref
            </label>
            <p className="text-sm text-gray-800">{qr.img_ref}</p>
          </div>
        </div>

        <div className="w-full">
          <Menu as="div" className="relative w-full">
            <div>
              <MenuButton className="inline-flex w-full items-center justify-between rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
                {selectedProductId
                  ? products.find((p) => p.id === selectedProductId)?.name ||
                    'Select a Product'
                  : 'Select a Product'}
                <ChevronDownIcon className="h-4 w-4 text-gray-500" />
              </MenuButton>
            </div>

            <MenuItems className="absolute z-50 mt-2 max-h-60 w-full origin-top overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div className="py-1">
                {products.map((product) => (
                  <MenuItem key={product.id}>
                    {({ active }) => (
                      <button
                        onClick={() => setSelectedProductId(product.id)}
                        className={`block w-full px-4 py-2 text-left text-sm ${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        }`}
                      >
                        {product.name}
                      </button>
                    )}
                  </MenuItem>
                ))}
              </div>
            </MenuItems>
          </Menu>
        </div>

        <div className="flex items-center justify-between gap-2">
          <button
            onClick={updateQrStatus}
            className="ml-auto rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600"
          >
            Mark Printed
          </button>
        </div>
      </div>
    </div>
  )
}

function DevicePreview({ qr }) {
  const hasDevice = !!qr?.product?.id

  return (
    <div className="mb-6 flex flex-col gap-4 rounded-xl bg-white p-4 shadow">
      {hasDevice ? (
        <div className="flex items-center gap-4">
          <img
            src={qr.product.default_image || qr.product.img_ref}
            alt={qr.product.name}
            className="h-20 w-20 rounded-lg object-cover"
          />
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">{qr.product.name}</h2>
            <p className="text-sm text-gray-500">Detected Device</p>
            <a
              href={`/set-device?qrid=${qr.id}`}
              className="mt-1 text-sm text-indigo-600 hover:underline"
            >
              Fix mislabeled device
            </a>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-200">
            <span className="text-gray-500">No Device</span>
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">No Device Detected</h2>
            <p className="text-sm text-gray-500">
              This QR code has no associated device. Please assign one.
            </p>
            <a
              href={`/set-device?qrid=${qr.id}`}
              className="mt-1 text-sm text-indigo-600 hover:underline"
            >
              Assign Device
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
