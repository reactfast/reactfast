'use client'

import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function MarkdownDoc({ url, customComponents = {} }) {
  const [content, setContent] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.text()
      })
      .then(setContent)
      .catch((err) => {
        console.error(err)
        setError('Failed to load documentation')
      })
  }, [url])

  if (error) return <div>{error}</div>
  if (!content) return <div>Loading…</div>

  return (
    <div className="markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          ...customComponents,
          code({ node, inline, className, children, ...props }) {
            return (
              <code className="rounded bg-gray-100 px-1 py-0.5" {...props}>
                {children}
              </code>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>

      <style jsx global>{`
        .markdown {
          max-width: 900px;
          padding: 40px;
          margin: auto;
          font-family: system-ui, sans-serif;
          line-height: 1.7;
        }

        .markdown h1,
        .markdown h2,
        .markdown h3 {
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .markdown p {
          margin: 1rem 0;
        }

        .markdown code {
          background: #f3f3f3;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.9em;
        }

        .markdown pre {
          background: #0f172a;
          color: white;
          padding: 16px;
          overflow: auto;
          border-radius: 8px;
          margin: 1.5rem 0;
        }

        .markdown pre code {
          background: none;
          padding: 0;
          color: inherit;
        }

        .markdown ul {
          list-style: disc;
          margin-left: 2rem;
        }

        .markdown blockquote {
          border-left: 4px solid #ddd;
          padding-left: 1rem;
          color: #555;
          margin: 1rem 0;
        }

        .markdown table {
          border-collapse: collapse;
          margin: 1rem 0;
        }

        .markdown th,
        .markdown td {
          border: 1px solid #ddd;
          padding: 8px;
        }
      `}</style>
    </div>
  )
}
