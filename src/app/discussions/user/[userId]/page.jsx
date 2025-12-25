'use client'

import {
  UserCircleIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabaseClient as supabase } from '@/config/supabase-client'

export default function ForumUserProfile() {
  const { userId } = useParams()
  const [user, setUser] = useState(null)
  const [userDiscussions, setUserDiscussions] = useState([])
  const [userReplies, setUserReplies] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('Discussions')

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true)

      const { data: userData, error: userError } = await supabase
        .from('profiles') // or whatever your user table is called
        .select('*')
        .eq('id', userId)
        .single()

      const { data: discussions, error: postError } = await supabase
        .from('forum_posts')
        .select('*')
        .eq('author', userId)
        .order('created_at', { ascending: false })

      const { data: replies, error: replyError } = await supabase
        .from('forum_replies')
        .select(`*, forum_post(title)`)
        .eq('user', userId)
        .order('created_at', { ascending: false })

      if (userError || postError || replyError) {
        console.error(
          'Error loading profile:',
          userError || postError || replyError,
        )
        setLoading(false)
        return
      }

      setUser(userData)
      setUserDiscussions(discussions)
      setUserReplies(replies)
      setLoading(false)
    }

    if (userId) fetchUserProfile()
  }, [userId])

  if (loading || !user) {
    return <div className="p-6">Loading profile...</div>
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-6 py-10">
      {/* Header */}
      <div className="flex items-center gap-4">
        <UserCircleIcon className="h-16 w-16 text-gray-400" />
        <div>
          <h1 className="text-2xl font-bold">{user.username}</h1>
          <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
            <CalendarDaysIcon className="h-4 w-4" />
            Joined {new Date(user.created_at).toLocaleDateString()}
          </div>
          <p className="mt-2 text-sm text-gray-700">{user.bio}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-6 border-y py-4 text-sm text-gray-600">
        <div>
          <span className="font-medium text-gray-900">
            {userDiscussions.length}
          </span>{' '}
          posts
        </div>
        <div>
          <span className="font-medium text-gray-900">
            {userReplies.length}
          </span>{' '}
          replies
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b pb-2 text-sm">
        <button
          onClick={() => setActiveTab('Discussions')}
          className={`flex items-center gap-1 px-2 py-1 ${
            activeTab === 'Discussions'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600'
          }`}
        >
          <DocumentTextIcon className="h-4 w-4" />
          Discussions
        </button>
        <button
          onClick={() => setActiveTab('Replies')}
          className={`flex items-center gap-1 px-2 py-1 ${
            activeTab === 'Replies'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600'
          }`}
        >
          <ChatBubbleLeftRightIcon className="h-4 w-4" />
          Replies
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'Discussions' &&
          userDiscussions.map((d) => (
            <div
              key={d.id}
              className="rounded-xl border border-gray-200 p-4 transition hover:shadow-sm"
            >
              <h2 className="cursor-pointer text-lg font-semibold text-gray-800 hover:underline">
                {d.title}
              </h2>
              <div className="mt-1 flex justify-between text-sm text-gray-500">
                <span>{new Date(d.created_at).toLocaleDateString()}</span>
              </div>
              {d.tags && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {d.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}

        {activeTab === 'Replies' &&
          userReplies.map((r) => (
            <div
              key={r.id}
              className="rounded-xl border border-gray-200 bg-gray-50 p-4"
            >
              <div className="mb-1 text-sm text-gray-500">
                Replied to:{' '}
                <span className="text-blue-600 hover:underline">
                  {r.forum_post?.title || 'Thread'}
                </span>
              </div>
              <div className="mb-1 text-sm text-gray-800">{r.content}</div>
              <div className="text-xs text-gray-400">
                {new Date(r.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
