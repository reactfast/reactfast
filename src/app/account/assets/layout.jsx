'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  UserIcon,
  UsersIcon,
  FolderIcon,
  BuildingStorefrontIcon,
  CalendarDaysIcon,
  QueueListIcon,
} from '@heroicons/react/20/solid'
import { LiaSpaceShuttleSolid } from 'react-icons/lia'
import classNames from 'classnames'
import { getUser } from '@/hooks/Auth'
import { getUserSubscription } from '@/helpers/subs'
import { supabaseClient as supabase } from '@/config/supabase-client'
import Link from 'next/link'
import { QrCodeIcon } from '@heroicons/react/24/outline'

export default function AssetsLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()

  const [user, setUser] = useState(null)
  const [roles, setRoles] = useState([])
  const [subscription, setSubscription] = useState('loading')
  const [tabs, setTabs] = useState([])

  // Redirect /account/assets to contacts
  useEffect(() => {
    if (pathname === '/account/assets') {
      router.replace('/account/assets/contacts')
    }
  }, [pathname])

  useEffect(() => {
    async function loadUser() {
      try {
        const userData = await getUser()
        setUser(userData)
      } catch (error) {
        console.error('Error fetching user:', error)
        router.push('/login')
      }
    }

    loadUser()
  }, [])

  useEffect(() => {
    if (!user) return

    async function fetchData() {
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('roles(*)')
        .eq('user', user.id)

      if (rolesError) {
        console.error('Roles error:', rolesError)
      } else {
        setRoles(rolesData.map((r) => r.roles))
      }

      const sub = await getUserSubscription(user.id)
      setSubscription(sub?.designation === 'free' ? null : sub)
    }

    fetchData()
  }, [user])

  // Build tab list dynamically
  useEffect(() => {
    if (!user) return

    const baseTabs = [
      { name: 'Contacts', href: '/account/assets/contacts', icon: UsersIcon },
      { name: 'vCards', href: '/account/assets/vcards', icon: UserIcon },
      { name: 'Files', href: '/account/assets/files', icon: FolderIcon },
    ]

    if (roles.some((r) => r.name === 'vendor')) {
      baseTabs.push({
        name: 'Store',
        href: '/account/assets/products',
        icon: BuildingStorefrontIcon,
      })
    }

    if (roles.some((r) => r.name === 'Admin')) {
      baseTabs.push({
        name: 'Qr Codes',
        href: '/account/assets/qr-codes',
        icon: QrCodeIcon,
      })
    }

    setTabs(baseTabs)
  }, [roles, subscription, user])

  return (
    <div className="p-4 sm:p-6">
      {/* Desktop Tabs */}
      <div className="mb-4 hidden border-b border-gray-200 sm:flex">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href
            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={classNames(
                  isActive
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium',
                )}
              >
                <tab.icon
                  className={classNames(
                    isActive
                      ? 'text-indigo-500'
                      : 'text-gray-400 group-hover:text-gray-500',
                    'mr-2 h-5 w-5',
                  )}
                  aria-hidden="true"
                />
                {tab.name}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Mobile Select */}
      <div className="mb-4 sm:hidden">
        <select
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={pathname}
          onChange={(e) => router.push(e.target.value)}
        >
          {tabs.map((tab) => (
            <option key={tab.name} value={tab.href}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tab content */}
      <div>{children}</div>
    </div>
  )
}
