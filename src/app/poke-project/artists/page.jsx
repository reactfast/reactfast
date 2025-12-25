'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabaseClient } from '@/config/supabase-client'
import { motion } from 'framer-motion'
import { mockArtists } from '../mockData'

export default function ArtistsIndex() {
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchArtists()
  }, [])

  async function fetchArtists() {
    try {
      const { data: artistsData, error: artistsError } = await supabaseClient
        .from('artists')
        .select('*')
        .order('created_at', { ascending: false })

      if (artistsError || !artistsData || artistsData.length === 0) {
        setArtists(mockArtists)
      } else {
        setArtists(artistsData)
      }
    } catch (error) {
      console.error('Error fetching artists:', error)
      setArtists(mockArtists)
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
          <h1 className="text-5xl font-bold text-white mb-4">All Artists</h1>
          <p className="text-xl text-purple-200">
            Discover talented artists from around the world
          </p>
        </motion.div>

        <div className="flex gap-4 mb-8">
          <Link
            href="/poke-project/artists"
            className="px-6 py-2 rounded-full font-semibold bg-white text-black hover:bg-white/90 transition-all"
          >
            All
          </Link>
          <Link
            href="/poke-project/artists/popular"
            className="px-6 py-2 rounded-full font-semibold bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-all"
          >
            Popular
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
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
      </div>
    </div>
  )
}

