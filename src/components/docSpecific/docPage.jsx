'use client'

import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Form, createFormHandler } from '@reactfast/forms'

function NovaPreview({ fields }) {
  const [formData, setFormData] = useState({})
  const handleChange = createFormHandler({ fields, setState: setFormData })

  return (
    <div className="my-4 rounded-lg border bg-white p-4 shadow-sm">
      <Form fields={fields} formData={formData} onChange={handleChange} />
      <pre className="mt-4 rounded bg-gray-100 p-2 text-xs">
        {JSON.stringify(formData, null, 2)}
      </pre>
    </div>
  )
}

export default function DocumentationPage({ url, docName }) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(url)
      .then((res) => res.text())
      .then(setContent)
      .catch(() => setContent('# Error loading doc'))
      .finally(() => setLoading(false))
  }, [url])

  if (loading) return <div>Loading doc…</div>

  return (
    <div className="mx-auto max-w-4xl rounded-md bg-white p-8 shadow-lg">
      <h1 className="mb-8 text-3xl font-bold">{docName}</h1>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className="rounded bg-gray-100 px-1 py-0.5" {...props}>
                {children}
              </code>
            )
          },
          'nova-preview': (props) => <NovaPreview {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
