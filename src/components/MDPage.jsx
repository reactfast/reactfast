'use client'

import React, { useEffect, useState } from 'react'
import Markdoc from '@markdoc/markdoc'
import { Tag } from '@markdoc/markdoc'
import clsx from 'clsx'
import { NovaPreview } from './NovaPreview'

import { Callout } from '@components/Callout'
import { QuickLink, QuickLinks } from '@components/QuickLinks'

const tags = {
  'nova-preview': {
    selfClosing: true,
    // use a string name here and provide the component via the
    // `components` mapping when rendering. This avoids inconsistencies
    // between transform-time and render-time component resolution.
    render: 'NovaPreview',
    attributes: {
      fields: { type: Array },
      className: { type: String },
    },
  },
  'quick-links': { render: QuickLinks },
  'quick-link': {
    selfClosing: true,
    render: QuickLink,
    attributes: {
      title: { type: String },
      href: { type: String },
      description: { type: String },
    },
  },
  callout: {
    render: Callout,
    attributes: {
      title: { type: String },
      type: { type: String, default: 'note' },
    },
  },
}

const nodes = {
  heading: {
    render: 'h',
    children: ['inline'],
    attributes: {
      level: { type: Number, required: true },
      id: { type: String },
    },
    transform(node, config) {
      const attributes = node.transformAttributes(config)
      const children = node.transformChildren(config)
      const level = node.attributes.level

      const classMap = {
        1: 'text-4xl font-bold mt-8 mb-4',
        2: 'text-3xl font-bold mt-6 mb-3',
        3: 'text-2xl font-bold mt-4 mb-2',
        4: 'text-xl font-bold mt-3 mb-2',
        5: 'text-lg font-bold mt-2 mb-1',
        6: 'text-base font-bold mt-2 mb-1',
      }

      return new Tag(
        `h${level}`,
        {
          ...attributes,
          className: classMap[level],
        },
        children,
      )
    },
  },
  fence: {
    render: 'pre',
    attributes: {
      content: { type: String, required: true },
      language: { type: String },
    },
    transform(node, config) {
      const attributes = node.transformAttributes(config)

      return new Tag('pre', {
        ...attributes,
        className:
          'my-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-slate-100',
        children: [
          new Tag('code', {
            className: `language-${attributes.language || 'text'}`,
            children: attributes.content,
          }),
        ],
      })
    },
  },
  code: {
    render: 'code',
    attributes: {
      content: { type: String, required: true },
    },
    transform(node, config) {
      const attributes = node.transformAttributes(config)
      return new Tag('code', {
        ...attributes,
        className:
          'rounded bg-slate-200 px-2 py-1 font-mono text-sm dark:bg-slate-800',
        children: attributes.content,
      })
    },
  },
  paragraph: {
    render: 'p',
    children: ['inline'],
    attributes: {},
    transform(node, config) {
      const attributes = node.transformAttributes(config)
      const children = node.transformChildren(config)
      return new Tag('p', { ...attributes, className: 'my-4' }, children)
    },
  },
  list: {
    render: 'ul',
    children: ['item'],
    attributes: {
      ordered: { type: Boolean, default: false },
    },
    transform(node, config) {
      const attributes = node.transformAttributes(config)
      const children = node.transformChildren(config)
      const tag = attributes.ordered ? 'ol' : 'ul'
      const className = attributes.ordered
        ? 'my-2 ml-4 list-inside list-decimal'
        : 'my-2 ml-4 list-inside list-disc'
      return new Tag(tag, { ...attributes, className }, children)
    },
  },
  item: {
    render: 'li',
    children: ['inline', 'block'],
    attributes: {},
    transform(node, config) {
      const attributes = node.transformAttributes(config)
      const children = node.transformChildren(config)
      return new Tag('li', { ...attributes, className: 'my-1' }, children)
    },
  },
  blockquote: {
    render: 'blockquote',
    children: ['block'],
    attributes: {},
    transform(node, config) {
      const attributes = node.transformAttributes(config)
      const children = node.transformChildren(config)
      return new Tag(
        'blockquote',
        {
          ...attributes,
          className:
            'my-4 border-l-4 border-slate-300 pl-4 italic text-slate-600 dark:border-slate-600 dark:text-slate-400',
        },
        children,
      )
    },
  },
  table: {
    render: 'table',
    children: ['thead', 'tbody'],
    attributes: {},
    transform(node, config) {
      const attributes = node.transformAttributes(config)
      const children = node.transformChildren(config)
      return new Tag(
        'table',
        {
          ...attributes,
          className:
            'my-4 min-w-full border-collapse border border-slate-300 dark:border-slate-600',
        },
        children,
      )
    },
  },
  th: {
    render: 'th',
    children: ['inline'],
    attributes: {},
    transform(node, config) {
      const attributes = node.transformAttributes(config)
      const children = node.transformChildren(config)
      return new Tag(
        'th',
        {
          ...attributes,
          className:
            'border border-slate-300 bg-slate-100 p-2 dark:border-slate-600 dark:bg-slate-800',
        },
        children,
      )
    },
  },
  td: {
    render: 'td',
    children: ['inline', 'block'],
    attributes: {},
    transform(node, config) {
      const attributes = node.transformAttributes(config)
      const children = node.transformChildren(config)
      return new Tag(
        'td',
        {
          ...attributes,
          className: 'border border-slate-300 p-2 dark:border-slate-600',
        },
        children,
      )
    },
  },
}

export function MDPage({ mdUrl, className }) {
  const [contentNode, setContentNode] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    async function fetchMD() {
      setLoading(true)
      setErrorMessage(null)
      console.debug('[MDPage] fetching mdUrl:', mdUrl)
      try {
        const res = await fetch(mdUrl)
        if (!res.ok) {
          const statusText = `${res.status} ${res.statusText}`
          setErrorMessage(`Failed to fetch ${mdUrl}: ${statusText}`)
          console.error('[MDPage] fetch failed', mdUrl, statusText)
          setLoading(false)
          return
        }
        const mdText = await res.text()
        const ast = Markdoc.parse(mdText)
        const transformed = Markdoc.transform(ast, { tags, nodes })
        setContentNode(transformed)
      } catch (err) {
        console.error('Error loading Markdown:', err)
        setErrorMessage(String(err))
      } finally {
        setLoading(false)
      }
    }

    fetchMD()
  }, [mdUrl])

  if (loading) return <div className="p-6 text-gray-500">Loading...</div>
  if (!contentNode)
    return (
      <div className="p-6 text-red-500">
        <div>Failed to load content.</div>
        {errorMessage && (
          <pre className="mt-2 whitespace-pre-wrap text-sm">{errorMessage}</pre>
        )}
      </div>
    )

  return (
    <div
      className={clsx(
        'prose dark:prose-invert mx-auto max-w-none p-6',
        className,
      )}
    >
      {Markdoc.renderers.react(contentNode, React, {
        components: { NovaPreview },
      })}
    </div>
  )
}
