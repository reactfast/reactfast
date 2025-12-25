// app/discussions/post/[postid]/page.js
'use client'

import {
  ArrowLeftIcon,
  UserCircleIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  TagIcon,
} from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabaseClient as supabase } from '@/config/supabase-client'

export default function PostPage() {
  const router = useRouter()
  const { postId } = useParams()

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [replyText, setReplyText] = useState('') // for new top-level replies
  const [replyToText, setReplyToText] = useState('') // for replies to replies
  const [showReplyBox, setShowReplyBox] = useState(null) // ID of reply being replied to
  const [replies, setReplies] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
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

  useEffect(() => {
    const fetchPostAndReplies = async () => {
      // Fetch post
      const { data: postData, error: postError } = await supabase
        .from('forum_posts')
        .select('*')
        .eq('id', postId)
        .single()

      if (postError) {
        console.error('Error fetching post:', postError)
        return
      }
      setPost(postData)

      // Fetch all replies
      const { data: allReplies, error: replyError } = await supabase
        .from('forum_replies')
        .select('*')
        .eq('forum_post', postId)
        .order('created_at', { ascending: true })

      if (replyError) {
        console.error('Error fetching replies:', replyError)
        return
      }

      // Group replies into top-level + 1-level children
      const topLevel = allReplies.filter((r) => !r.parent)
      const withChildren = topLevel.map((reply) => ({
        ...reply,
        children: allReplies.filter((r) => r.parent === reply.id),
      }))

      setReplies(withChildren)
      setLoading(false)
    }

    fetchPostAndReplies()
  }, [postId])

  const handleReply = async (parentId = null) => {
    const text = parentId ? replyToText : replyText
    if (!text.trim()) return

    const { error } = await supabase.from('forum_replies').insert([
      {
        forum_post: postId,
        content: text,
        parent: parentId, // null = top-level; otherwise = reply to reply
      },
    ])

    if (error) {
      console.error('Error posting reply:', error)
      return
    }

    setReplyText('')
    setReplyToText('')
    setShowReplyBox(null)

    // Refetch replies (you can also extract your fetch logic to a separate function)
    const { data: allReplies, error: replyError } = await supabase
      .from('forum_replies')
      .select('*')
      .eq('forum_post', postId)
      .order('created_at', { ascending: true })

    if (!replyError) {
      const topLevel = allReplies.filter((r) => !r.parent)
      const withChildren = topLevel.map((reply) => ({
        ...reply,
        children: allReplies.filter((r) => r.parent === reply.id),
      }))
      setReplies(withChildren)
    }
  }

  if (loading || !post) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="mx-auto w-full max-w-[1000px] space-y-8 px-6 py-10">
      {/* Back Button */}
      <div>
        <button
          onClick={() => router.push('/discussions')}
          className="flex items-center gap-2 text-blue-600 hover:underline"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Back to Discussions
        </button>
      </div>

      {/* Post Content */}
      <article className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <UserCircleIcon className="h-5 w-5 text-gray-400" />
          <span className="font-medium text-gray-700">
            {post.author || 'Anonymous'}
          </span>
          <span>• {new Date(post.created_at).toLocaleString()}</span>
        </div>
        <div className="prose max-w-none whitespace-pre-wrap text-gray-800">
          {post.content}
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800"
            >
              <TagIcon className="h-4 w-4" />
              {tag}
            </span>
          ))}
        </div>
      </article>

      {/* Replies */}
      {/* Replace with Supabase reply fetch logic when set up */}
      <section className="space-y-6">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <ChatBubbleLeftRightIcon className="h-5 w-5" />
          Replies ({replies.length})
        </h2>

        <div className="space-y-4">
          {replies.map((reply) => (
            <div
              key={reply.id}
              className="rounded-lg border bg-white p-4 shadow-sm"
            >
              <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                <UserCircleIcon className="h-4 w-4 text-gray-400" />
                <span>{reply.user || 'Anonymous'}</span>
                <span>• {new Date(reply.created_at).toLocaleString()}</span>
              </div>
              <div className="whitespace-pre-wrap text-gray-800">
                {reply.content}
              </div>

              {/* Nested Replies */}
              <div className="ml-6 mt-4 space-y-2 border-l pl-4">
                {reply.children?.map((child) => (
                  <div
                    key={child.id}
                    className="rounded-lg border bg-gray-50 p-3 text-sm shadow-sm"
                  >
                    <div className="mb-1 flex items-center gap-2 text-xs text-gray-500">
                      <UserCircleIcon className="h-3 w-3 text-gray-400" />
                      <span>{child.user || 'Anonymous'}</span>
                      <span>
                        • {new Date(child.created_at).toLocaleString()}
                      </span>
                    </div>
                    <div className="whitespace-pre-wrap text-gray-800">
                      {child.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Inline Reply Box */}
              <div className="mt-4">
                {showReplyBox === reply.id ? (
                  <div className="space-y-2">
                    <textarea
                      value={replyToText}
                      onChange={(e) => setReplyToText(e.target.value)}
                      placeholder="Write a reply..."
                      className="w-full rounded-md border p-2 text-sm"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleReply(reply.id)}
                        className="inline-flex items-center gap-2 rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                      >
                        <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
                        Post Reply
                      </button>
                      <button
                        onClick={() => {
                          setShowReplyBox(null)
                          setReplyToText('')
                        }}
                        className="text-sm text-gray-500 hover:underline"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowReplyBox(reply.id)}
                    className="mt-2 text-sm text-blue-600 hover:underline"
                  >
                    Reply
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reply Box */}
      {user && (
        <section className="border-t pt-6">
          <h3 className="mb-2 text-lg font-medium">Add a Reply</h3>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write your reply..."
            className="min-h-[100px] w-full rounded-xl border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleReply}
            className="mt-3 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            <PaperAirplaneIcon className="h-5 w-5 -rotate-45" />
            Post Reply
          </button>
        </section>
      )}

      {/* not logged in */}
      {!user && (
        <section className="rounded-lg border-t bg-gray-200 p-6 text-center">
          <h3 className="mb-2 text-lg font-medium">
            Please login to interact with this discussion board.
          </h3>
          <button className="mt-3 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
            <PaperAirplaneIcon className="h-5 w-5 -rotate-45" />
            Login
          </button>
        </section>
      )}
    </div>
  )
}
