'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getUser } from '@/hooks/Auth'
import {
  UserCircleIcon,
  MusicalNoteIcon,
  ListBulletIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import CreatePlaylistModal from '@/components/poke-project/CreatePlaylistModal'

export default function PokeProjectLayout({ children }) {
  const pathname = usePathname()
  const [user, setUser] = useState(null)
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false)

  useEffect(() => {
    async function fetchUser() {
      const userData = await getUser()
      setUser(userData)
    }
    fetchUser()
  }, [])

  const isActive = (path) => {
    return pathname === path || pathname.startsWith(path + '/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-900">
      {/* Header Navigation */}
      <header className="sticky top-0 z-40 bg-black/50 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/poke-project" className="flex items-center gap-2">
              <MusicalNoteIcon className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">Poke Project</span>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/poke-project"
                className={`px-4 py-2 rounded-full transition-all ${
                  isActive('/poke-project') && pathname === '/poke-project'
                    ? 'bg-white text-black font-semibold'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                Home
              </Link>
              <Link
                href="/poke-project/artists"
                className={`px-4 py-2 rounded-full transition-all ${
                  isActive('/poke-project/artists')
                    ? 'bg-white text-black font-semibold'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                Artists
              </Link>
              <Link
                href="/poke-project/projects"
                className={`px-4 py-2 rounded-full transition-all ${
                  isActive('/poke-project/projects')
                    ? 'bg-white text-black font-semibold'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                Projects
              </Link>
            </nav>

            {/* Account Menu */}
            <div className="relative">
              <button
                onClick={() => setShowAccountMenu(!showAccountMenu)}
                className="p-2 rounded-full hover:bg-white/10 transition-all"
              >
                <UserCircleIcon className="w-8 h-8 text-white" />
              </button>

              {/* Account Flyout Menu */}
              <AnimatePresence>
                {showAccountMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowAccountMenu(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-64 bg-black/90 backdrop-blur-xl border border-white/20 rounded-lg shadow-xl z-50 overflow-hidden"
                    >
                      <div className="p-4 border-b border-white/10">
                        <p className="text-white font-semibold">
                          {user?.email || 'Guest User'}
                        </p>
                        {user && (
                          <p className="text-white/60 text-sm mt-1">
                            {user.email}
                          </p>
                        )}
                      </div>
                      
                      <div className="py-2">
                        <Link
                          href="/poke-project/my-music"
                          onClick={() => setShowAccountMenu(false)}
                          className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 transition-colors"
                        >
                          <MusicalNoteIcon className="w-5 h-5" />
                          <span>My Music</span>
                        </Link>
                        <Link
                          href="/poke-project/my-playlists"
                          onClick={() => setShowAccountMenu(false)}
                          className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 transition-colors"
                        >
                          <ListBulletIcon className="w-5 h-5" />
                          <span>My Playlists</span>
                        </Link>
                        <button
                          onClick={() => {
                            setShowAccountMenu(false)
                            setShowCreatePlaylist(true)
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 transition-colors"
                        >
                          <PlusIcon className="w-5 h-5" />
                          <span>Create Playlist</span>
                        </button>
                      </div>

                      {!user && (
                        <div className="p-4 border-t border-white/10">
                          <Link
                            href="/login"
                            className="block w-full text-center px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                            onClick={() => setShowAccountMenu(false)}
                          >
                            Sign In
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Create Playlist Modal */}
      <CreatePlaylistModal
        isOpen={showCreatePlaylist}
        onClose={() => setShowCreatePlaylist(false)}
      />
    </div>
  )
}

