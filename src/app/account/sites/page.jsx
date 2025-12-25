'use client'
import { useEffect, useState } from 'react'
import { getUser } from '@/hooks/Auth'
import { supabaseClient as supabase } from '@/config/supabase-client'
import {
  PencilIcon,
  EyeIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline'
import { convertIsoToReadableDate } from '@/helpers/dateConvert'
import Loading from '../loading'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const columns = ['name', 'description', 'status', 'created_at', 'Actions']

export default function Page() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [sites, setSites] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    async function _getUser() {
      const user = await getUser()
      if (user) setCurrentUser(user)
    }

    _getUser()
  }, [])

  useEffect(() => {
    async function getSites() {
      const { data, error } = await supabase.from('sites').select('*')
      if (error) console.error('error', error)
      else setSites(data)
    }

    if (currentUser) getSites()
  }, [currentUser])

  // loading effect to set loading state based on sites data
  useEffect(() => {
    if (sites) {
      setLoading(false)
    }
  }, [sites])

  const handleEditClick = (qr) => {
    router.push(`/account/sites/${qr.name}`)
  }

  if (loading) return <Loading />

  return (
    <div className="container mx-auto min-h-screen p-4 px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-thin tracking-wide lg:text-5xl xl:tracking-widest">
            Sites
          </h1>
          <p className="mt-2 text-sm text-gray-700"></p>
        </div>
        <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-none">
          <Link href="/account/sites/create">
            <button className="inline-flex items-center gap-1 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-white shadow-sm hover:brightness-110">
              <PlusCircleIcon className="h-5 w-5" />
              Create New Site
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full px-1 py-2 align-middle">
            <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
              <table className="w-full justify-center divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    {columns.map((column) => (
                      <th
                        scope="col"
                        className="px-2 py-3 text-left text-sm font-semibold text-gray-900"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {sites.map((qr) => (
                    <tr key={qr.id}>
                      <td className="whitespace-nowrap px-2 py-4 text-sm font-medium text-gray-900">
                        {qr.name}
                      </td>
                      <td className="whitespace-nowrap px-2 py-4 text-sm text-gray-500">
                        {qr.meta_description}
                      </td>
                      <td className="whitespace-nowrap px-2 py-4 text-sm text-gray-500">
                        {qr.status}
                      </td>
                      <td className="whitespace-nowrap px-2 py-4 text-sm text-gray-500">
                        {convertIsoToReadableDate(qr.created_at)}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium">
                        <button
                          onClick={() => handleEditClick(qr)}
                          className="rounded-md px-2 py-1 text-indigo-600 transition-colors duration-200 hover:bg-neutral-100 hover:text-indigo-900"
                        >
                          <PencilIcon className="h-5 w-5" />
                          <span className="sr-only">, {qr.id}</span>
                        </button>
                        <button
                          onClick={() => console.log('Edit', qr.id)}
                          className="ml-4 rounded-md px-2 py-1 text-indigo-600 transition-colors duration-200 hover:bg-neutral-100 hover:text-indigo-900"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
