'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseClient as supabase } from '@/config/supabase-client'
import Loading from '../loading'

export default function SetDevicePage() {
  const router = useRouter()
  const [qrid, setQrid] = useState(null)
  const [qr, setQr] = useState(null)
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Get qrid from URL
  useEffect(() => {
    const paramQrid = new URLSearchParams(window.location.search).get('qrid')
    if (paramQrid) setQrid(paramQrid)
  }, [])

  // Fetch QR + product
  useEffect(() => {
    if (!qrid) return

    async function fetchQr() {
      setLoading(true)
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
        .single()

      if (error || !data) {
        console.error('Error fetching QR:', error)
        setLoading(false)
        return
      }

      setQr(data)
      setSelectedProduct(data.product?.id || null)
      setLoading(false)
    }

    fetchQr()
  }, [qrid])

  // Fetch all products (devices)
  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, default_image')

      if (error) {
        console.error('Error fetching products:', error)
        return
      }

      setProducts(data || [])
    }

    fetchProducts()
  }, [])

  async function handleSave() {
    if (!selectedProduct) return
    setSaving(true)

    const { error } = await supabase
      .from('qr_codes')
      .update({ product: selectedProduct })
      .eq('id', qrid)

    setSaving(false)

    if (error) {
      console.error('Error updating device:', error)
      alert('Failed to update device')
      return
    }

    router.push(`/register-qr?qrid=${qrid}`)
  }

  if (loading) return <Loading />

  if (!qr) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">QR code not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="container mx-auto p-4">
        <h1 className="mb-6 text-2xl font-semibold">Set Device</h1>

        <div className="mb-6 rounded-xl bg-white p-4 shadow">
          <p className="mb-2 text-gray-600">QR Code ID:</p>
          <code className="text-sm">{qr.id}</code>
        </div>

        <div className="mb-6 rounded-xl bg-white p-4 shadow">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Select Device
          </label>
          <select
            className="w-full rounded border px-3 py-2"
            value={selectedProduct || ''}
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            <option value="">-- Select a device --</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSave}
          disabled={saving || !selectedProduct}
          className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {saving ? 'Saving...' : 'Save Device'}
        </button>
      </div>
    </div>
  )
}
