'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { supabaseClient } from '@/config/supabase-client'
import { motion } from 'framer-motion'
import { 
  ShareIcon, 
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon,
  DocumentTextIcon,
  PhotoIcon,
  MusicalNoteIcon
} from '@heroicons/react/24/outline'
import MusicPlayer from '@/components/poke-project/MusicPlayer'
import { mockProjects, mockArtists, mockSongs } from '../../mockData'

export default function ProjectPage() {
  const params = useParams()
  const slug = params.slug
  const [project, setProject] = useState(null)
  const [artist, setArtist] = useState(null)
  const [songs, setSongs] = useState([])
  const [currentSong, setCurrentSong] = useState(null)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [backgroundGradient, setBackgroundGradient] = useState('from-purple-900 via-black to-purple-900')

  useEffect(() => {
    if (slug) {
      fetchProjectData()
    }
  }, [slug])

  async function fetchProjectData() {
    try {
      // Fetch project
      const { data: projectData, error: projectError } = await supabaseClient
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single()

      let foundProject = projectData

      if (projectError && projectError.code !== 'PGRST116') {
        // Try by ID if slug doesn't work
        const { data: projectById } = await supabaseClient
          .from('projects')
          .select('*')
          .eq('id', slug)
          .single()
        
        foundProject = projectById
      }

      // Fallback to mock data
      if (!foundProject) {
        foundProject = mockProjects.find(p => p.slug === slug || p.id === slug)
      }

      if (foundProject) {
        setProject(foundProject)
        generateGradient(foundProject)
      }

      // Fetch artist
      if (foundProject?.artist_id) {
        const { data: artistData, error: artistError } = await supabaseClient
          .from('artists')
          .select('*')
          .eq('id', foundProject.artist_id)
          .single()
        
        if (artistError || !artistData) {
          // Fallback to mock artist
          const mockArtist = mockArtists.find(a => a.id === foundProject.artist_id)
          if (mockArtist) {
            setArtist(mockArtist)
          } else if (foundProject.artist) {
            setArtist(foundProject.artist)
          }
        } else {
          setArtist(artistData)
        }
      } else if (foundProject?.artist) {
        setArtist(foundProject.artist)
      }

      // Fetch songs for this project
      const { data: songsData, error: songsError } = await supabaseClient
        .from('songs')
        .select('*')
        .eq('project_id', foundProject?.id || slug)
        .order('track_number', { ascending: true })

      // Fallback to mock songs
      if (songsError || !songsData || songsData.length === 0) {
        const projectId = foundProject?.id || slug
        const mockProjectSongs = mockSongs[projectId] || []
        setSongs(mockProjectSongs)
      } else {
        setSongs(songsData || [])
      }
    } catch (error) {
      console.error('Error fetching project data:', error)
      // Fallback to mock data on error
      const mockProject = mockProjects.find(p => p.slug === slug || p.id === slug)
      if (mockProject) {
        setProject(mockProject)
        if (mockProject.artist) {
          setArtist(mockProject.artist)
        }
        const projectId = mockProject.id
        setSongs(mockSongs[projectId] || [])
      }
    } finally {
      setLoading(false)
    }
  }

  function generateGradient(projectData) {
    if (projectData?.cover_image) {
      // In a real app, extract dominant colors from cover image
      setBackgroundGradient('from-purple-900 via-black to-purple-900')
    }
  }

  function handlePlaySong(song) {
    const index = songs.findIndex(s => s.id === song.id)
    setCurrentSongIndex(index >= 0 ? index : 0)
    setCurrentSong(song)
  }

  function handleNextSong() {
    if (songs.length > 0) {
      const nextIndex = (currentSongIndex + 1) % songs.length
      setCurrentSongIndex(nextIndex)
      setCurrentSong(songs[nextIndex])
    }
  }

  function handlePreviousSong() {
    if (songs.length > 0) {
      const prevIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1
      setCurrentSongIndex(prevIndex)
      setCurrentSong(songs[prevIndex])
    }
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: `${project?.title} by ${artist?.name}`,
        text: `Check out ${project?.title}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  async function handleDownloadProject() {
    if (!project) return
    
    // In a real implementation, you'd create a zip file with all project assets
    // For now, we'll just show a message
    alert('Download functionality will bundle all project files (songs, photos, documents) into a downloadable package.')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl">Project not found</div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgroundGradient} pb-32`}>
      {/* Header Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-end">
          {/* Cover Image */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-lg overflow-hidden ring-4 ring-white/20 shadow-2xl">
              {project.cover_image ? (
                <img
                  src={project.cover_image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white text-6xl">🎵</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Project Info */}
          <div className="flex-1 text-white">
            <div className="mb-4">
              <p className="text-purple-300 mb-2">Project</p>
              <h1 className="text-5xl md:text-7xl font-bold mb-2">{project.title}</h1>
              {artist && (
                <Link
                  href={`/poke-project/artists/${artist.slug || artist.id}`}
                  className="text-xl text-white/80 hover:text-white transition-colors"
                >
                  {artist.name}
                </Link>
              )}
              {project.release_date && (
                <p className="text-white/60 mt-2">
                  Released {new Date(project.release_date).toLocaleDateString()}
                </p>
              )}
            </div>

            {/* Description */}
            {project.description && (
              <p className="text-lg text-white/80 max-w-2xl mb-6">{project.description}</p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleShare}
                className="px-6 py-2 rounded-full font-semibold bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-all flex items-center gap-2"
              >
                <ShareIcon className="w-5 h-5" />
                Share
              </button>
              <button
                onClick={handleDownloadProject}
                className="px-6 py-2 rounded-full font-semibold bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-all flex items-center gap-2"
              >
                <ArrowDownTrayIcon className="w-5 h-5" />
                Download Project
              </button>
              {project.spotify_link && (
                <a
                  href={project.spotify_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 rounded-full font-semibold bg-green-500 text-white hover:bg-green-600 transition-all flex items-center gap-2"
                >
                  <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                  Spotify
                </a>
              )}
              {project.apple_music_link && (
                <a
                  href={project.apple_music_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 rounded-full font-semibold bg-pink-500 text-white hover:bg-pink-600 transition-all flex items-center gap-2"
                >
                  <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                  Apple Music
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Songs List */}
        {songs.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <MusicalNoteIcon className="w-6 h-6" />
              Songs
            </h2>
            <div className="space-y-2">
              {songs.map((song, index) => (
                <motion.div
                  key={song.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handlePlaySong(song)}
                  className="bg-white/10 backdrop-blur-lg rounded-lg p-4 cursor-pointer hover:bg-white/20 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      {song.cover_image || project.cover_image ? (
                        <img
                          src={song.cover_image || project.cover_image}
                          alt={song.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                          <span className="text-white">🎵</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold text-lg truncate">{song.title}</h3>
                      {song.duration && (
                        <p className="text-purple-200 text-sm">{song.duration}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {song.spotify_link && (
                        <a
                          href={song.spotify_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-green-400 hover:text-green-300"
                        >
                          <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                        </a>
                      )}
                      {song.apple_music_link && (
                        <a
                          href={song.apple_music_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-pink-400 hover:text-pink-300"
                        >
                          <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                        </a>
                      )}
                      {song.audio_file && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handlePlaySong(song)
                          }}
                          className="text-white hover:text-purple-300 transition-colors"
                        >
                          <MusicalNoteIcon className="w-6 h-6" />
                        </button>
                      )}
                      {song.downloadable && song.audio_file && (
                        <a
                          href={song.audio_file}
                          download
                          onClick={(e) => e.stopPropagation()}
                          className="text-white/60 hover:text-white transition-colors"
                        >
                          <ArrowDownTrayIcon className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  {song.lyrics && (
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <p className="text-white/70 text-sm whitespace-pre-line">{song.lyrics}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Inspiration & Summary */}
        {(project.inspiration || project.summary) && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">About This Project</h2>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 space-y-4">
              {project.summary && (
                <div>
                  <h3 className="text-white font-semibold mb-2">Summary</h3>
                  <p className="text-white/80 whitespace-pre-line">{project.summary}</p>
                </div>
              )}
              {project.inspiration && (
                <div>
                  <h3 className="text-white font-semibold mb-2">Inspiration</h3>
                  <p className="text-white/80 whitespace-pre-line">{project.inspiration}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* BTS Photos */}
        {project.bts_photos && project.bts_photos.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <PhotoIcon className="w-6 h-6" />
              Behind The Scenes
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.bts_photos.map((photo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="aspect-square rounded-lg overflow-hidden cursor-pointer group"
                >
                  <img
                    src={photo}
                    alt={`BTS photo ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Documents */}
        {project.documents && project.documents.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <DocumentTextIcon className="w-6 h-6" />
              Documents
            </h2>
            <div className="space-y-2">
              {project.documents.map((doc, index) => (
                <a
                  key={index}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 backdrop-blur-lg rounded-lg p-4 hover:bg-white/20 transition-all flex items-center gap-4 group"
                >
                  <DocumentTextIcon className="w-8 h-8 text-purple-300" />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{doc.name || `Document ${index + 1}`}</h3>
                    {doc.description && (
                      <p className="text-white/60 text-sm">{doc.description}</p>
                    )}
                  </div>
                  <ArrowDownTrayIcon className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Music Player */}
      {currentSong && (
        <MusicPlayer
          song={currentSong}
          songs={songs}
          currentIndex={currentSongIndex}
          project={project}
          artist={artist}
          onClose={() => setCurrentSong(null)}
          onNext={handleNextSong}
          onPrevious={handlePreviousSong}
        />
      )}
    </div>
  )
}

