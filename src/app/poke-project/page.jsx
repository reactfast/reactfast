'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabaseClient } from '@/config/supabase-client'
import { motion } from 'framer-motion'
import { mockArtists, mockProjects } from './mockData'

export default function PokeProjectHome() {
  const [artists, setArtists] = useState([])
  const [latestProjects, setLatestProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      // Fetch featured artists
      const { data: artistsData, error: artistsError } = await supabaseClient
        .from('artists')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6)

      // Fetch latest projects
      const { data: projectsData, error: projectsError } = await supabaseClient
        .from('projects')
        .select(`
          *,
          artist:artists(*)
        `)
        .order('created_at', { ascending: false })
        .limit(12)

      // Use mock data if database fetch fails or returns no data
      if (artistsError || !artistsData || artistsData.length === 0) {
        setArtists(mockArtists)
      } else {
        setArtists(artistsData)
      }

      if (projectsError || !projectsData || projectsData.length === 0) {
        setLatestProjects(mockProjects)
      } else {
        setLatestProjects(projectsData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      // Fallback to mock data on error
      setArtists(mockArtists)
      setLatestProjects(mockProjects)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  function handleSearch(e) {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to search results (you can implement this later)
      console.log('Searching for:', searchQuery)
      // For now, just log the search query
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold text-white mb-4">
            Trust Your Fans
          </h1>
          <p className="text-xl text-purple-200 mb-8">
            A platform built by artists, for artists. Release faster. Connect deeper. Own your art.
          </p>
          <p className="text-lg text-purple-300 italic mb-8">
            "I trust my fans" - The mantra of our users
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search artists, projects, songs..."
                className="w-full px-6 py-4 pl-12 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </form>
        </motion.div>

        {/* Latest Projects Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Latest Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {latestProjects.map((project) => (
              <Link
                key={project.id}
                href={`/poke-project/projects/${project.slug || project.id}`}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden cursor-pointer group"
                >
                  <div className="aspect-square relative overflow-hidden">
                    {project.cover_image ? (
                      <img
                        src={project.cover_image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <span className="text-white text-4xl">🎵</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold text-lg mb-1 truncate">
                      {project.title}
                    </h3>
                    <p className="text-purple-200 text-sm truncate">
                      {project.artist?.name || 'Unknown Artist'}
                    </p>
                    <p className="text-purple-300 text-xs mt-2">
                      {new Date(project.release_date || project.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Artists Section */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8">Featured Artists</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {artists.map((artist) => (
              <Link
                key={artist.id}
                href={`/poke-project/artists/${artist.slug || artist.id}`}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-center cursor-pointer group"
                >
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-purple-500/50 group-hover:ring-purple-400 transition-all">
                    {artist.profile_image ? (
                      <img
                        src={artist.profile_image}
                        alt={artist.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <span className="text-white text-3xl">🎤</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-white font-semibold">{artist.name}</h3>
                  {artist.followers_count > 0 && (
                    <p className="text-purple-300 text-sm">
                      {artist.followers_count} followers
                    </p>
                  )}
                </motion.div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

