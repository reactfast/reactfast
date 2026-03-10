// src/components/markdown/MarkdownRenderer.jsx
import fs from 'fs'
import path from 'path'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

/**
 * Props:
 *  - file: string (relative path to MD file next to the page)
 */
export default function MarkdownRenderer({ file }) {
  // Resolve path relative to this page
  const pageDir = path.dirname(require.main.filename)
  const fullPath = path.join(pageDir, file)

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Markdown file not found: ${fullPath}`)
  }

  const markdownContent = fs.readFileSync(fullPath, 'utf8')

  return (
    <div className="prose max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {markdownContent}
      </ReactMarkdown>
    </div>
  )
}
