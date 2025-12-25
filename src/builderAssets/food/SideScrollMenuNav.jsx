'use client'

import React, { useRef, useState, useMemo } from 'react'

const defaultMenuItems = [
  { id: 'burgers', title: 'Burgers' },
  { id: 'pasta', title: 'Pasta' },
  { id: 'salads', title: 'Salads' },
  { id: 'drinks', title: 'Drinks' },
  { id: 'desserts', title: 'Desserts' },
]

export default function HorizontalScrollMenu({ obj = {}, colors }) {
  const navRef = useRef(null)
  const [activeId, setActiveId] = useState(null)

  // Use obj to build items, or fall back to defaultMenuItems
  const items = useMemo(() => {
    const result = []

    for (let i = 1; i <= 5; i++) {
      const id = obj[`cat${i}Id`]
      const title = obj[`cat${i}Name`]

      if (id && title) {
        result.push({ id, title })
      }
    }

    return result.length > 0 ? result : defaultMenuItems
  }, [obj])

  const handleClick = (id) => {
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveId(id)
      history.replaceState(null, '', `${window.location.pathname}/#${id}`)
    }
  }

  return (
    <div
      ref={navRef}
      className="sticky top-0 z-[50] mx-auto w-full max-w-7xl border-b border-gray-200 bg-white"
    >
      <div className="overflow-x-auto whitespace-nowrap">
        <ul className="flex gap-4 p-4">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleClick(item.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  activeId === item.id
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
