'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabaseClient as supabase } from '@/config/supabase-client'

export default function SecTypeCategoriesPage() {
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('sec_type_categories')
        .select(`
          id,
          sec_type (
            id,
            name
          ),
          category:category (
            id,
            title
          )
        `)

      if (!error) setItems(data)
    }

    fetchCategories()
  }, [])

  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">Sec Type Categories</h1>
      <Link
        href="/account/admin/section-categories/new"
        className="text-blue-500"
      >
        Create New
      </Link>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item.id} className="rounded border p-2">
            <div>ID: {item.id}</div>

            <div>
              Category:{' '}
              <span className="inline-flex items-center rounded-md bg-primary/50 px-2 py-1 text-xs font-medium text-primary/100 ring-1 ring-inset ring-red-600/10">
                {item.category?.title || 'Unknown'}
              </span>
            </div>
            <div>
              Sec Type:{' '}
              <span className="inline-flex items-center rounded-md bg-secondary/30 px-2 py-1 text-xs font-medium text-secondary/100 ring-1 ring-inset ring-yellow-600/20">
                {item.sec_type?.name || 'Unknown'}
              </span>
            </div>
            <Link
              href={`/account/admin/section-categories/${item.id}`}
              className="text-sm text-blue-500"
            >
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
