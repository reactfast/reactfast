'use client'

import { useEffect, useState } from 'react'
import { supabaseClient as supabase } from '@/config/supabase-client'
import Link from 'next/link'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function OrgCompletenessCheck({ userId, onComplete }) {
  const [loading, setLoading] = useState(true)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const checkOrg = async () => {
      if (!userId) return

      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('organization')
          .select(
            'id, name, primary_email, primary_phone, website, address_1, city, state, zip, country, description',
          )
          .eq('user_id', userId)
          .single()

        if (error || !data) {
          console.error('Org fetch error:', error?.message)
          setIsComplete(false)
          onComplete(false)
          return
        }

        const requiredFields = [
          'name',
          'primary_email',
          'primary_phone',
          'website',
          'address_1',
          'city',
          'state',
          'zip',
          'country',
          'description',
        ]
        const complete = requiredFields.every((f) => data[f]?.trim() !== '')
        setIsComplete(complete)
        onComplete(complete)
      } catch (err) {
        console.error(err)
        setIsComplete(false)
        onComplete(false)
      } finally {
        setLoading(false)
      }
    }

    checkOrg()
  }, [userId, onComplete])

  if (loading) {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-yellow-50 p-4 text-yellow-700">
        <ExclamationTriangleIcon className="h-5 w-5" />
        <span>Checking organization completeness...</span>
      </div>
    )
  }

  if (!isComplete) {
    return (
      <div className="flex flex-col gap-2 rounded-lg bg-red-50 p-4 text-red-700 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <ExclamationTriangleIcon className="h-5 w-5" />
          <span>
            Your organization profile is incomplete. You must fill out all
            fields before managing team members.
          </span>
        </div>
        <Link
          href="/account/org"
          className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Complete Organization Setup
        </Link>
      </div>
    )
  }

  return null
}
