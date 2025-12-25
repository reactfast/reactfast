'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseClient as supabase } from '@/config/supabase-client'
import {
  PlusIcon,
  PaperAirplaneIcon,
  TagIcon,
  PencilIcon,
} from '@heroicons/react/24/outline'

const categories = ['General', 'React', 'Tailwind', 'Off-topic', 'Design']

export default function CreateDiscussion() {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [body, setBody] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    setSubmitting(true)

    // Optional: Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      console.error('User not authenticated')
      setSubmitting(false)
      return
    }

    // Insert post
    const { error } = await supabase.from('forum_posts').insert({
      user: user.id,
      title: title,
      content: body,
      tags: '',
    })

    if (error) {
      console.error('Insert error:', error)
    } else {
      // Optional: Redirect to forum or new post page
      router.push('/discussions')
    }

    setSubmitting(false)
  }

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-6 px-6 py-10">
      <h1 className="flex items-center gap-2 text-2xl font-bold">
        <PencilIcon className="h-6 w-6 text-blue-600" />
        Start a New Discussion
      </h1>

      {/* Title */}
      <div>
        <label className="mb-1 block text-sm font-medium">Title</label>
        <input
          type="text"
          className="w-full rounded-xl border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. How do you manage state in large apps?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Category */}
      <div>
        <label className="mb-1 block text-sm font-medium">Category</label>
        <select
          className="w-full rounded-xl border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Body */}
      <div>
        <label className="mb-1 block text-sm font-medium">Content</label>
        <div className="min-h-[200px] rounded-xl border bg-white p-4">
          <textarea
            className="min-h-[150px] w-full resize-none focus:outline-none"
            placeholder="Write your discussion here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          You can format this text using markdown or rich editor.
        </p>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          <PaperAirplaneIcon className="h-5 w-5 -rotate-45" />
          {submitting ? 'Posting...' : 'Post Discussion'}
        </button>
      </div>
    </div>
  )
}
