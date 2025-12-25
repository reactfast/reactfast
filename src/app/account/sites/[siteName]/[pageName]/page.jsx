// app/site-structure/page.js
'use client'

import { useState } from 'react'
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

const siteStructure = [
  {
    id: 1,
    name: 'Home',
    children: [
      {
        id: 2,
        name: 'Blog',
        children: [
          { id: 5, name: 'Post 1' },
          { id: 6, name: 'Post 2' },
        ],
      },
      { id: 3, name: 'About' },
      { id: 4, name: 'Contact' },
    ],
  },
]

export default function SiteStructurePage() {
  const [selectedPage, setSelectedPage] = useState(null)

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white p-4 shadow">
        <h2 className="mb-4 text-xl font-bold">Site Pages</h2>
        <SiteTreeView treeData={siteStructure} onSelectPage={setSelectedPage} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {selectedPage ? (
          <>
            <h1 className="mb-2 text-2xl font-bold">{selectedPage.name}</h1>
            <p className="text-gray-600">
              Preview or manage the "{selectedPage.name}" page content here.
            </p>
          </>
        ) : (
          <div className="text-lg text-gray-400">
            Select a page from the tree to preview its details.
          </div>
        )}
      </main>
    </div>
  )
}

function SiteTreeView({ treeData, onSelectPage }) {
  return (
    <ul className="space-y-1">
      {treeData.map((node) => (
        <PageNode key={node.id} node={node} onSelectPage={onSelectPage} />
      ))}
    </ul>
  )
}

function PageNode({ node, onSelectPage }) {
  const [expanded, setExpanded] = useState(false)
  const hasChildren = node.children && node.children.length > 0

  const handleClick = () => {
    setExpanded(!expanded)
    onSelectPage(node)
  }

  return (
    <li>
      <div
        className="flex cursor-pointer items-center rounded p-1 hover:bg-gray-100"
        onClick={handleClick}
      >
        {hasChildren ? (
          expanded ? (
            <ChevronDownIcon className="mr-1 h-4 w-4 text-gray-500" />
          ) : (
            <ChevronRightIcon className="mr-1 h-4 w-4 text-gray-500" />
          )
        ) : (
          <span className="mr-1 inline-block h-4 w-4" />
        )}
        <span className="text-gray-800">{node.name}</span>
      </div>
      {hasChildren && expanded && (
        <ul className="pl-5">
          {node.children.map((child) => (
            <PageNode key={child.id} node={child} onSelectPage={onSelectPage} />
          ))}
        </ul>
      )}
    </li>
  )
}
