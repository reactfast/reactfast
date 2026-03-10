'use client'

import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

export default function QuickStartPage() {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const url =
      'https://raw.githubusercontent.com/reactfast/forms-docs/main/v1/page.md'

    fetch(url)
      .then((res) => res.text())
      .then(setContent)
      .catch(() => setContent('# Error loading doc'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading doc…</div>

  return (
    <div className="prose max-w-none p-4">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}
