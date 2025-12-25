'use client'

import { useEffect, useState } from 'react'
import { supabaseClient as supabase } from '@/config/supabase-client'
import {
  HeartIcon,
  UserIcon,
  PhotoIcon,
  EyeIcon,
  PencilIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import ProUpgradePrompt from '@/components/LostPetModal'
import { getUser } from '@/hooks/Auth'
import ProtectPetsCTA from './protectYourPets'

export default function PetsIndexPage() {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState({})
  const [visits, setVisits] = useState([])
  const [orders, setOrders] = useState([])
  const [scanLogPet, setScanLogPet] = useState(null)
  const [lostPet, setLostPet] = useState(null)

  // Load user
  useEffect(() => {
    async function fetchUser() {
      const thisUser = await getUser()
      setUser(thisUser)
    }
    fetchUser()
  }, [])

  // Load pets
  useEffect(() => {
    if (!user.id) return

    async function fetchPets() {
      try {
        const { data, error } = await supabase
          .from('pets')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (error) throw error
        setPets(data)
      } catch (err) {
        console.error('Error fetching pets:', err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPets()
  }, [user])

  // Load pet scans
  useEffect(() => {
    if (pets.length === 0) return
    const petIds = pets.map((pet) => pet.id)

    async function fetchScans() {
      try {
        const { data, error } = await supabase
          .from('pet_visits')
          .select('*')
          .in('pet_id', petIds)
          .order('created_at', { ascending: false })

        if (error) throw error
        setVisits(data)
      } catch (err) {
        console.error('Error fetching visits:', err.message)
      }
    }

    fetchScans()
  }, [pets])

  // Load orders
  useEffect(() => {
    if (!user.id) return

    async function fetchOrders() {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'paid') // ✅ only paid orders
          .order('created_at', { ascending: false })
          .limit(5)

        if (error) throw error
        setOrders(data)
      } catch (err) {
        console.error('Error fetching orders:', err.message)
      }
    }

    fetchOrders()
  }, [user])

  // Helpers
  const handleEdit = (petId) => {
    window.location.href = `/account/boop-tag/edit/${petId}`
  }

  const handleView = (petId) => {
    window.open(
      `https://jot.space/pets/${petId}`,
      '_blank',
      'width=500,height=800,resizable=yes,scrollbars=yes',
    )
  }

  const handleToggleLost = async (petId, currentLostStatus, petName) => {
    try {
      const newLostStatus = !currentLostStatus
      const { error } = await supabase
        .from('pets')
        .update({ lost: newLostStatus })
        .eq('id', petId)

      if (error) throw error

      setPets((prev) =>
        prev.map((pet) =>
          pet.id === petId ? { ...pet, lost: newLostStatus } : pet,
        ),
      )
    } catch (err) {
      console.error('Error updating lost status:', err.message)
    }

    setLostPet(petName)

    if (!currentLostStatus) setOpen(true)
  }

  const hasLostPets = pets.some((p) => p.lost)

  function hasActiveUpgrade() {
    if (!orders || orders.length === 0) return false

    const upgradeOrder = orders.find((o) =>
      o.items?.some((item) => item.id === 'upgrade-2wk'),
    )
    if (!upgradeOrder) return false

    const orderTime = new Date(upgradeOrder.created_at)
    const now = new Date()
    const diffDays = (now - orderTime) / (1000 * 60 * 60 * 24)

    return diffDays <= 14 // within 2 weeks
  }

  const recentScanForPet = (petId) => visits.find((v) => v.pet_id === petId)

  // UI
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-500">Loading pets...</p>
      </div>
    )
  }

  if (pets.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-500">No pets found.</p>
      </div>
    )
  }

  return (
    <>
      <ProtectPetsCTA />
      <ProUpgradePrompt
        petName={lostPet}
        open={open}
        setOpen={setOpen}
        userId={user.id}
      />

      {scanLogPet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg rounded-lg bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold">
              Scan Log for {scanLogPet.name}
            </h3>
            <ul className="max-h-80 space-y-2 overflow-y-auto">
              {visits
                .filter((v) => v.pet_id === scanLogPet.id)
                .map((v) => (
                  <li
                    key={v.id}
                    className="border-b pb-2 text-sm text-gray-600"
                  >
                    {new Date(v.created_at).toLocaleString()} —{' '}
                    {v.lat && v.lon ? (
                      <a
                        href={`https://www.google.com/maps?q=${v.lat},${v.lon}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Lat: {v.lat}, Lng: {v.lon}
                      </a>
                    ) : (
                      'No location'
                    )}
                  </li>
                ))}
            </ul>
            <button
              onClick={() => setScanLogPet(null)}
              className="mt-4 w-full rounded-md bg-gray-200 py-2"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Pets</h1>

        {hasLostPets && (
          <div className="mb-6 flex justify-end">
            <button
              onClick={() => setOpen(true)}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700"
            >
              Upgrade to Get Scan Alerts
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pets.map((pet) => {
            const lastScan = recentScanForPet(pet.id)
            return (
              <div
                key={pet.id}
                className="overflow-hidden rounded-2xl bg-white shadow-md transition-shadow hover:shadow-lg"
              >
                {/* Pet Image */}
                {pet.photos?.length > 0 ? (
                  <Image
                    src={pet.photos[0].src}
                    alt={pet.name}
                    className="h-48 w-full object-cover"
                    height={192}
                    width={384}
                  />
                ) : (
                  <div className="flex h-48 w-full items-center justify-center bg-gray-100">
                    <PhotoIcon className="h-12 w-12 text-gray-400" />
                  </div>
                )}

                {/* Pet Info */}
                <div className="space-y-2 p-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {pet.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {pet.breed || 'Unknown breed'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {pet.type || 'Unknown type'}
                  </p>

                  {lastScan && hasActiveUpgrade() && (
                    <p className="text-xs text-gray-500">
                      Last spotted:{' '}
                      {new Date(lastScan.created_at).toLocaleString()}
                    </p>
                  )}

                  <div className="mt-2 flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <HeartIcon className="mr-1 h-5 w-5 text-red-500" />
                      {pet.favorite_food || 'No favorite food'}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <UserIcon className="mr-1 h-5 w-5 text-gray-500" />
                      {pet.gender || 'Unknown'}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => handleView(pet.id)}
                      className="flex flex-1 items-center justify-center space-x-1 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <EyeIcon className="h-4 w-4" />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => handleEdit(pet.id)}
                      className="flex flex-1 items-center justify-center space-x-1 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <PencilIcon className="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() =>
                        handleToggleLost(pet.id, pet.lost, pet.name)
                      }
                      className={`flex flex-1 items-center justify-center space-x-1 rounded-md border px-3 py-1 text-sm font-medium ${
                        pet.lost
                          ? 'border-green-300 bg-green-50 text-green-700 hover:bg-green-100'
                          : 'border-red-300 bg-red-50 text-red-700 hover:bg-red-100'
                      }`}
                    >
                      <ExclamationTriangleIcon className="h-4 w-4" />
                      <span>{pet.lost ? 'Found' : 'Lost'}</span>
                    </button>
                  </div>

                  {/* Scan log button (upgrade gated) */}
                  <div className="mt-2">
                    {hasActiveUpgrade() ? (
                      <button
                        onClick={() => setScanLogPet(pet)}
                        className="text-xs text-blue-600 underline"
                      >
                        View Scan Log
                      </button>
                    ) : (
                      <button
                        onClick={() => setOpen(true)}
                        className="text-xs text-blue-600 underline"
                      >
                        Unlock Scan Log
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
