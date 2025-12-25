'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { supabaseClient } from '@/config/supabase-client'
import { motion } from 'framer-motion'
import { 
  HeartIcon, 
  ShareIcon, 
  CalendarIcon,
  MapPinIcon,
  ArrowTopRightOnSquareIcon,
  MusicNoteIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { mockArtists, mockProjects } from '../../mockData'

export default function ArtistProfile() {
  const params = useParams()
  const slug = params.slug
  const [artist, setArtist] = useState(null)
  const [projects, setProjects] = useState([])
  const [isFollowing, setIsFollowing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [backgroundGradient, setBackgroundGradient] = useState('from-purple-900 via-black to-purple-900')

  useEffect(() => {
    if (slug) {
      fetchArtistData()
    } else {
      setLoading(false)
    }
  }, [slug])

  async function fetchArtistData() {
    try {
      // Fetch artist
      const { data: artistData, error: artistError } = await supabaseClient
        .from('artists')
        .select('*')
        .eq('slug', slug)
        .single()

      let foundArtist = artistData

      if (artistError && artistError.code !== 'PGRST116') {
        // Try by ID if slug doesn't work
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
        generateGradient(foundArtist)
      } else {
        // If still no artist found, set loading to false so we show "not found"
        setLoading(false)
        return
      }

      // Fetch artist's projects
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

      // Check if user is following (you'll need to implement this with auth)
      // For now, we'll use localStorage as a simple check
      if (typeof window !== 'undefined') {
        const following = JSON.parse(localStorage.getItem('following_artists') || '[]')
        setIsFollowing(following.includes(foundArtist?.id || slug))
      }
    } catch (error) {
      console.error('Error fetching artist data:', error)
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

  function generateGradient(artistData) {
    // Generate dynamic gradient based on artist's profile image or default
    if (artistData?.profile_image) {
      // In a real app, you'd extract dominant colors from the image
      // For now, we'll use a default gradient
      setBackgroundGradient('from-purple-900 via-black to-purple-900')
    }
  }

  async function handleFollow() {
    if (!artist) return

    const following = JSON.parse(localStorage.getItem('following_artists') || '[]')
    
    if (isFollowing) {
      const newFollowing = following.filter(id => id !== artist.id)
      localStorage.setItem('following_artists', JSON.stringify(newFollowing))
      setIsFollowing(false)
      
      // Update followers count (only if not using mock data)
      try {
        await supabaseClient
          .from('artists')
          .update({ followers_count: (artist.followers_count || 0) - 1 })
          .eq('id', artist.id)
      } catch (error) {
        // Silently fail if using mock data
        console.log('Using mock data, skipping database update')
      }
      
      // Update local state for mock data
      setArtist({ ...artist, followers_count: Math.max(0, (artist.followers_count || 0) - 1) })
    } else {
      following.push(artist.id)
      localStorage.setItem('following_artists', JSON.stringify(following))
      setIsFollowing(true)
      
      // Update followers count (only if not using mock data)
      try {
        await supabaseClient
          .from('artists')
          .update({ followers_count: (artist.followers_count || 0) + 1 })
          .eq('id', artist.id)
      } catch (error) {
        // Silently fail if using mock data
        console.log('Using mock data, skipping database update')
      }
      
      // Update local state for mock data
      setArtist({ ...artist, followers_count: (artist.followers_count || 0) + 1 })
    }
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: `${artist?.name} on Poke Project`,
        text: `Check out ${artist?.name}'s profile`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
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
    <div className={`min-h-screen bg-gradient-to-br ${backgroundGradient}`}>
      {/* Header with Artist Info */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-end">
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden ring-4 ring-white/20 shadow-2xl">
              {artist.profile_image ? (
                <img
                  src={artist.profile_image}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white text-6xl">🎤</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Artist Info */}
          <div className="flex-1 text-white">
            <div className="mb-4">
              <h1 className="text-5xl md:text-7xl font-bold mb-2">{artist.name}</h1>
              {artist.bio && (
                <p className="text-lg text-white/80 max-w-2xl">{artist.bio}</p>
              )}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-6 text-sm">
              {artist.followers_count > 0 && (
                <div>
                  <span className="font-semibold">{artist.followers_count.toLocaleString()}</span>
                  <span className="text-white/60 ml-1">followers</span>
                </div>
              )}
              {projects.length > 0 && (
                <div>
                  <span className="font-semibold">{projects.length}</span>
                  <span className="text-white/60 ml-1">projects</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleFollow}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  isFollowing
                    ? 'bg-white text-black hover:bg-white/90'
                    : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                }`}
              >
                {isFollowing ? (
                  <span className="flex items-center gap-2">
                    <HeartIconSolid className="w-5 h-5" />
                    Following
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <HeartIcon className="w-5 h-5" />
                    Follow
                  </span>
                )}
              </button>
              <button
                onClick={handleShare}
                className="px-6 py-2 rounded-full font-semibold bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-all flex items-center gap-2"
              >
                <ShareIcon className="w-5 h-5" />
                Share
              </button>
            </div>

            {/* Artist Details */}
            <div className="mt-6 flex flex-wrap gap-6 text-sm">
              {artist.birthdate && (
                <div className="flex items-center gap-2 text-white/80">
                  <CalendarIcon className="w-4 h-4" />
                  <span>Born {new Date(artist.birthdate).toLocaleDateString()}</span>
                </div>
              )}
              {artist.location && (
                <div className="flex items-center gap-2 text-white/80">
                  <MapPinIcon className="w-4 h-4" />
                  <span>{artist.location}</span>
                </div>
              )}
            </div>

            {/* Social Links */}
            {(artist.spotify_link || artist.apple_music_link || artist.instagram_link || artist.twitter_link) && (
              <div className="mt-6 flex flex-wrap gap-4">
                {artist.spotify_link && (
                  <a
                    href={artist.spotify_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                      Spotify
                    </span>
                  </a>
                )}
                {artist.apple_music_link && (
                  <a
                    href={artist.apple_music_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                      Apple Music
                    </span>
                  </a>
                )}
                {artist.instagram_link && (
                  <a
                    href={artist.instagram_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                      Instagram
                    </span>
                  </a>
                )}
                {artist.twitter_link && (
                  <a
                    href={artist.twitter_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                      Twitter
                    </span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Photo Gallery */}
        {artist.photos && artist.photos.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Photos</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {artist.photos.map((photo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="aspect-square rounded-lg overflow-hidden cursor-pointer group"
                >
                  <img
                    src={photo}
                    alt={`${artist.name} photo ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Latest Projects Section */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <MusicNoteIcon className="w-6 h-6" />
              Latest Projects
            </h2>
            {projects.length > 4 && (
              <Link
                href={`/poke-project/artists/${slug}/discography`}
                className="text-purple-300 hover:text-purple-200 transition-colors"
              >
                View All Projects →
              </Link>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {projects.slice(0, 4).map((project) => (
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
                    <p className="text-purple-200 text-sm">
                      {new Date(project.release_date || project.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

