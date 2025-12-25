'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabaseClient } from '@/config/supabase-client'
import { motion } from 'framer-motion'
import { mockProjects } from '../mockData'

export default function ProjectsIndex() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    try {
      const { data: projectsData, error: projectsError } = await supabaseClient
        .from('projects')
        .select(`
          *,
          artist:artists(*)
        `)
        .order('created_at', { ascending: false })

      if (projectsError || !projectsData || projectsData.length === 0) {
        setProjects(mockProjects)
      } else {
        setProjects(projectsData)
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
      setProjects(mockProjects)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-900">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">All Projects</h1>
          <p className="text-xl text-purple-200">
            Discover amazing music projects from talented artists
          </p>
        </motion.div>

        <div className="flex gap-4 mb-8">
          <Link
            href="/poke-project/projects"
            className="px-6 py-2 rounded-full font-semibold bg-white text-black hover:bg-white/90 transition-all"
          >
            Recent
          </Link>
          <Link
            href="/poke-project/projects/trending"
            className="px-6 py-2 rounded-full font-semibold bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-all"
          >
            Trending
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project) => (
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
      </div>
    </div>
  )
}

