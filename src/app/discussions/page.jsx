'use client'

import { useState, useEffect } from 'react'
import {
  MagnifyingGlassIcon,
  PlusIcon,
  ChatBubbleLeftRightIcon,
  BookmarkIcon,
  BellIcon,
  HashtagIcon,
  FireIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import { supabaseClient as supabase } from '@/config/supabase-client'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

const filters = ['Trending', 'Popular', 'Recent', 'Following']

export default function DiscussionsPage() {
  const [activeFilter, setActiveFilter] = useState('Trending')
  const [threads, setThreads] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchThreads = async () => {
      const { data, error } = await supabase
        .from('forum_posts')
        .select('id, content, created_at, user')
        .order('created_at', { ascending: false })
        .limit(5)

      if (!error) {
        setThreads(data)
      } else {
        console.error('Error fetching posts:', error)
      }
    }

    fetchThreads()

    const _getUser = async () => {
      const { data: user, error: userError } = await supabase.auth.getUser()
      if (userError) {
        console.error('Error fetching user:', userError)
      } else {
        setUser(user)
      }
    }

    _getUser()
  }, [])

  return (
    <div className="mx-auto grid w-full max-w-[1000px] grid-cols-1 gap-10 px-6 py-10 md:grid-cols-[250px_1fr]">
      {/* Left Sidebar */}
      <aside className="space-y-6">
        <div>
          <h2 className="mb-3 text-lg font-semibold">Navigation</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex cursor-pointer items-center gap-2 hover:text-blue-600">
              <ChatBubbleLeftRightIcon className="h-5 w-5" />
              All Discussions
            </li>
            <li className="flex cursor-pointer items-center gap-2 hover:text-blue-600">
              <UserCircleIcon className="h-5 w-5" />
              My Posts
            </li>
            <li className="flex cursor-pointer items-center gap-2 hover:text-blue-600">
              <BookmarkIcon className="h-5 w-5" />
              Bookmarked
            </li>
            <li className="flex cursor-pointer items-center gap-2 hover:text-blue-600">
              <BellIcon className="h-5 w-5" />
              Notifications
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-lg font-semibold">Categories</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex cursor-pointer items-center gap-2 hover:text-blue-600">
              <HashtagIcon className="h-5 w-5" />
              JavaScript
            </li>
            <li className="flex cursor-pointer items-center gap-2 hover:text-blue-600">
              <HashtagIcon className="h-5 w-5" />
              Design
            </li>
            <li className="flex cursor-pointer items-center gap-2 hover:text-blue-600">
              <HashtagIcon className="h-5 w-5" />
              Show & Tell
            </li>
            <li className="flex cursor-pointer items-center gap-2 hover:text-blue-600">
              <HashtagIcon className="h-5 w-5" />
              Off-topic
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="space-y-8">
        {/* Header */}
        <Link href="/discussions/post/new">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Discussions</h1>
            {user ? (
              <button className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
                <PlusIcon className="h-5 w-5" />
                Start a Discussion
              </button>
            ) : (
              <button className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
                Login to Start a Discussion
              </button>
            )}
          </div>
        </Link>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-2 text-sm ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Search and Sort */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search discussions..."
              className="w-full rounded-xl border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <select className="rounded-xl border px-3 py-2 text-sm text-gray-700">
            <option value="mostReplies">Most Replies</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        {/* Threads */}
        <div className="space-y-4">
          {threads.map((thread) => (
            <div
              key={thread.id}
              className="rounded-xl border border-gray-200 p-4 transition hover:shadow-sm"
            >
              <div className="mb-1 flex items-center justify-between">
                <Link href={`/discussions/post/${thread.id}`}>
                  <h2 className="cursor-pointer text-lg font-semibold text-gray-800 hover:underline">
                    {thread.content.slice(0, 100)}...
                  </h2>
                </Link>
                <span className="text-sm text-gray-400">
                  {formatDistanceToNow(new Date(thread.created_at), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                by{' '}
                <span className="font-medium text-gray-700">
                  {thread.user?.slice(0, 8) ?? 'anonymous'}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-500">0 replies</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
