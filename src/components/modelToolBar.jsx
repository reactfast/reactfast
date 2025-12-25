'use client'

import { useState, useEffect, useRef } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { supabaseClient as supabase } from '@/config/supabase-client'

export default function ModelToolBar({
  modelName = 'model', // this is now both label and table name
  searchColumn = 'name',
  userId,
  onResults,
  columns = [],
  onRowClick,
  children,
  className = '',
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const containerRef = useRef()

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([])
      setShowDropdown(false)
      return
    }

    const delayDebounce = setTimeout(() => {
      handleSearch(searchTerm)
    }, 300)

    return () => clearTimeout(delayDebounce)
  }, [searchTerm])

  const handleSearch = async (term) => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from(modelName) // dynamic table name
      .select(columns.join(', '))
      .ilike(searchColumn, `%${term}%`)
      // .eq('user_id', userId)
      .limit(5)

    if (error) {
      console.error(`Error searching ${modelName}:`, error)
      setResults([])
      onResults?.([])
    } else {
      setResults(data)
      onResults?.(data)
      setShowDropdown(true)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-4 p-4">
        {/* Search Bar */}
        <div className="relative min-w-[200px] flex-1">
          <MagnifyingGlassIcon className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${modelName}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border border-gray-300 py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            onFocus={() => {
              if (results.length > 0) setShowDropdown(true)
            }}
          />
          {isLoading && (
            <div className="absolute right-2 top-2 animate-pulse text-xs text-gray-500">
              Loading...
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">{children}</div>
      </div>

      {/* Autocomplete Results */}
      {showDropdown && results.length > 0 && (
        <div className="absolute left-4 right-4 z-10 mt-[-8px] rounded-md border border-gray-200 bg-white shadow-lg">
          <ul className="divide-y divide-gray-100">
            {results.map((row, idx) => (
              <li
                key={idx}
                className="cursor-pointer px-4 py-2 hover:bg-gray-50"
                onClick={() => {
                  onRowClick?.(row)
                  setSearchTerm('')
                  setShowDropdown(false)
                }}
              >
                {columns.map((col, i) => (
                  <div key={i} className="text-sm text-gray-700">
                    <strong>{col}: </strong>
                    {String(row[col])}
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
