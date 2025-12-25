'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { supabaseClient } from '@/config/supabase-client'
import { motion } from 'framer-motion'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { mockArtists, mockProjects } from '../../../mockData'

export default function DiscographyPage() {
  const params = useParams()
  const slug = params.slug
  const [artist, setArtist] = useState(null)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      fetchData()
    }
  }, [slug])

  async function fetchData() {
    try {
      // Fetch artist
      const { data: artistData, error: artistError } = await supabaseClient
        .from('artists')
        .select('*')
        .eq('slug', slug)
        .single()

      let foundArtist = artistData

      if (artistError && artistError.code !== 'PGRST116') {
        const { data: artistById } = await supabaseClient
          .from('artists')
          .select('*')
          .eq('id', slug)
          .single()
        
        foundArtist = artistById
      }

      // Fallback to mock data
      if (!foundArtist) {
        foundArtist = mockArtists.find(a => a.slug === slug || a.id === slug)
      }

      if (foundArtist) {
        setArtist(foundArtist)
      }

      // Fetch all projects
      const { data: projectsData, error: projectsError } = await supabaseClient
        .from('projects')
        .select('*')
        .eq('artist_id', foundArtist?.id || slug)
        .order('release_date', { ascending: false })

      // Fallback to mock data
      if (projectsError || !projectsData || projectsData.length === 0) {
        const mockArtistProjects = mockProjects.filter(p => 
          p.artist_id === foundArtist?.id || p.artist?.slug === slug || p.artist?.id === slug
        )
        setProjects(mockArtistProjects)
      } else {
        setProjects(projectsData || [])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      // Fallback to mock data on error
      const mockArtist = mockArtists.find(a => a.slug === slug || a.id === slug)
      if (mockArtist) {
        setArtist(mockArtist)
        const mockArtistProjects = mockProjects.filter(p => 
          p.artist_id === mockArtist.id || p.artist?.id === mockArtist.id
        )
        setProjects(mockArtistProjects)
      }
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

  if (!artist) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl">Artist not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-900">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href={`/poke-project/artist/${slug}`}
          className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Profile
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-2">
            {artist.name}'s Discography
          </h1>
          <p className="text-purple-200 text-lg">
            {projects.length} {projects.length === 1 ? 'project' : 'projects'}
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projects.map((project, index) => (
              <Link
                key={project.id}
                href={`/poke-project/project/${project.slug || project.id}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
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
                    <p className="text-purple-200 text-sm">
                      {project.release_date
                        ? new Date(project.release_date).toLocaleDateString()
                        : 'No release date'}
                    </p>
                    {project.description && (
                      <p className="text-purple-300 text-xs mt-2 line-clamp-2">
                        {project.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-white/60 text-lg">No projects yet</p>
          </div>
        )}
      </div>
    </div>
  )
}

