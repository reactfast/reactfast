'use client'

import { useState, useEffect } from 'react'
import { supabaseClient as supabase } from '@/config/supabase-client'
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

export default function SiteStructurePage({ params }) {
  const [loading, setLoading] = useState(true)
  const [selectedPage, setSelectedPage] = useState(null)
  const [treeData, setTreeData] = useState([])
  const [site, setSite] = useState(null)

  useEffect(() => {
    async function fetchSiteAndPages() {
      const { data: siteData, error: siteError } = await supabase
        .from('sites')
        .select('*')
        .eq('name', params.siteName)
        .single()

      if (siteError) {
        console.error('Error fetching site:', siteError)
        return
      }

      setSite(siteData)

      // Fetch pages associated with this site (assuming pages filtered by user_id)
      const { data: pagesData, error: pagesError } = await supabase
        .from('pages')
        .select('*')
        .eq('site', siteData.id)
        .order('id', { ascending: true })

      if (pagesError) {
        console.error('Error fetching pages:', pagesError)
        return
      }

      const tree = buildTree(pagesData)
      setTreeData(tree)
    }

    if (params.siteName) {
      fetchSiteAndPages()
    }
  }, [params.siteName])

  useEffect(() => {
    console.log('SITE: ', site)
    console.log('TREE:', treeData)
  }, [site, treeData])

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-1/4 bg-white p-4 shadow">
        <h2 className="mb-4 text-xl font-bold">
          {site ? `${site.name} Pages` : 'Loading...'}
        </h2>
        <SiteTreeView treeData={treeData} onSelectPage={setSelectedPage} />
      </aside>
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

function buildTree(pages, parentId = null) {
  return pages
    .filter((page) => page.parent === parentId)
    .map((page) => ({
      ...page,
      children: buildTree(pages, page.id),
    }))
}
