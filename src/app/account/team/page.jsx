'use client'

import { useState, useEffect } from 'react'
import {
  UserPlusIcon,
  UserIcon,
  IdentificationIcon,
  LinkIcon,
  ClipboardIcon,
} from '@heroicons/react/24/outline'
import { supabaseClient as supabase } from '@/config/supabase-client'
import OrgCompletenessCheck from './orgCompletenessCheck'
import { getUser } from '@/hooks/Auth'

export default function AccountTeamPage() {
  const [members, setMembers] = useState([])
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)
  const [orgComplete, setOrgComplete] = useState(false)
  const [user, setUser] = useState(null)
  const [orgId, setOrgId] = useState(null)

  const [userUuid, setUserUuid] = useState('')
  const [copied, setCopied] = useState(false)
  const joinLink = 'https://jot.cards/signup'

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      const u = await getUser()
      setUser(u)
    }
    fetchUser()
  }, [])

  // Fetch organization ID
  useEffect(() => {
    const fetchOrgId = async () => {
      if (!user) return
      const { data, error } = await supabase
        .from('organization')
        .select('id')
        .eq('user_id', user.id)
        .single()
      if (error) console.error('Fetch org ID error:', error.message)
      else setOrgId(data.id)
      setLoading(false)
    }
    fetchOrgId()
  }, [user])

  // Fetch pages available for this user/org
  useEffect(() => {
    const fetchPages = async () => {
      if (!user) return
      const { data, error } = await supabase
        .from('pages')
        .select('id, name')
        .eq('user_id', user.id)
      if (error) console.error('Fetch pages error:', error.message)
      else setPages(data)
    }
    fetchPages()
  }, [user])

  // Fetch members and their page access
  useEffect(() => {
    const fetchMembers = async () => {
      if (!orgId) return
      setLoading(true)
      // Get members
      const { data: membersData, error: membersError } = await supabase
        .from('org_members')
        .select('user_id')
        .eq('org_id', orgId)
      if (membersError) return console.error(membersError.message)

      // Get page access
      const { data: pagesData, error: pagesError } = await supabase
        .from('org_members_pages')
        .select('user_id, page_id')
        .in(
          'user_id',
          membersData.map((m) => m.user_id),
        )
      if (pagesError) return console.error(pagesError.message)

      // Map member objects with pages
      const mapped = membersData.map((m) => ({
        id: m.user_id,
        pages: pagesData
          .filter((p) => p.user_id === m.user_id)
          .map((p) => p.page_id),
      }))

      setMembers(mapped)
      setLoading(false)
    }
    fetchMembers()
  }, [orgId])

  // -------------------------------
  // COPY SIGNUP LINK
  // -------------------------------
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(joinLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch (e) {
      console.error(e)
    }
  }

  // -------------------------------
  // ADD MEMBER
  // -------------------------------
  const handleAdd = async (e) => {
    e.preventDefault()
    const trimmed = userUuid.trim()
    if (!trimmed) return
    if (members.some((m) => m.id === trimmed)) {
      alert('That user is already on the team.')
      return
    }
    const { error } = await supabase
      .from('org_members')
      .insert([{ user_id: trimmed, org_id: orgId }])
    if (error) return console.error(error.message)
    setMembers((prev) => [...prev, { id: trimmed, pages: [] }])
    setUserUuid('')
  }

  // -------------------------------
  // REMOVE MEMBER
  // -------------------------------
  const handleRemove = async (id) => {
    const { error } = await supabase
      .from('org_members')
      .delete()
      .eq('user_id', id)
      .eq('org_id', orgId)
    if (error) return console.error(error.message)
    // Also remove page access
    await supabase.from('org_members_pages').delete().eq('user_id', id)
    setMembers((prev) => prev.filter((m) => m.id !== id))
  }

  // -------------------------------
  // TOGGLE PAGE ACCESS
  // -------------------------------
  const togglePageAccess = async (userId, pageId) => {
    const member = members.find((m) => m.id === userId)
    const hasAccess = member.pages.includes(pageId)

    if (hasAccess) {
      const { error } = await supabase
        .from('org_members_pages')
        .delete()
        .eq('user_id', userId)
        .eq('page_id', pageId)
      if (error) return console.error(error.message)
      setMembers((prev) =>
        prev.map((m) =>
          m.id === userId
            ? { ...m, pages: m.pages.filter((p) => p !== pageId) }
            : m,
        ),
      )
    } else {
      const { error } = await supabase
        .from('org_members_pages')
        .insert([{ user_id: userId, page_id: pageId }])
      if (error) return console.error(error.message)
      setMembers((prev) =>
        prev.map((m) =>
          m.id === userId ? { ...m, pages: [...m.pages, pageId] } : m,
        ),
      )
    }
  }

  // -------------------------------
  // RENDER
  // -------------------------------
  return (
    <div className="min-h-screen bg-gray-50">
      {user && (
        <OrgCompletenessCheck userId={user.id} onComplete={setOrgComplete} />
      )}
      <header className="border-b bg-white px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-800">Team Settings</h1>
        <p className="mt-1 text-sm text-gray-600">
          Add teammates by their UUID. Then manage which team pages they can
          access.
        </p>
      </header>

      <main className="mx-auto max-w-5xl space-y-8 px-6 py-8">
        {/* How it works */}
        <section className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            How it works
          </h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-gray-700">
            <li>Ask your teammate to create a Jot account (or sign in).</li>
            <li>
              They can find their <strong>User UUID</strong> in their profile.
            </li>
            <li>Enter that UUID below to add them to your team.</li>
          </ol>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
              <LinkIcon className="h-5 w-5 text-gray-400" />
              <span className="truncate">{joinLink}</span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center justify-center rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-black"
            >
              <ClipboardIcon className="mr-2 h-4 w-4" />
              {copied ? 'Copied' : 'Copy signup link'}
            </button>
          </div>
        </section>

        {/* Add by UUID */}
        <section className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Add Team Member by UUID
          </h2>
          <form onSubmit={handleAdd} className="grid gap-4 sm:grid-cols-3">
            <div className="relative sm:col-span-1">
              <IdentificationIcon className="pointer-events-none absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={userUuid}
                onChange={(e) => setUserUuid(e.target.value)}
                placeholder="e.g. 3f5d7c1b-1234-4567-890a-bcdef1234567"
                className="w-full rounded-md border py-2 pl-10 pr-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="flex justify-end sm:col-span-3">
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
              >
                <UserPlusIcon className="mr-2 h-5 w-5" />
                Add Member
              </button>
            </div>
          </form>
        </section>

        {/* Members list with page access */}
        <section className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Team Members
          </h2>
          {loading ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {members.map((m) => (
                <li key={m.id} className="mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                      <UserIcon className="h-5 w-5 text-gray-500" />
                    </div>
                    <p className="font-medium text-gray-900">{m.id}</p>
                    <button
                      type="button"
                      onClick={() => handleRemove(m.id)}
                      className="ml-auto rounded-md border px-3 py-1 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Remove
                    </button>
                  </div>

                  {/* Page access */}
                  <div className="ml-12 mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {pages.map((p) => (
                      <label
                        key={p.id}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <input
                          type="checkbox"
                          checked={m.pages?.includes(p.id)}
                          onChange={() => togglePageAccess(m.id, p.id)}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        {p.name}
                      </label>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  )
}
