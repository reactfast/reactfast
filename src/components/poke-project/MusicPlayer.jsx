'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  XMarkIcon,
  ArrowDownTrayIcon,
  ShareIcon,
  ArrowTopRightOnSquareIcon,
  ArrowPathIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
} from '@heroicons/react/24/outline'
import {
  ArrowPathIcon as ArrowPathIconSolid,
  ArrowUturnLeftIcon as ArrowUturnLeftIconSolid,
} from '@heroicons/react/24/solid'

export default function MusicPlayer({ song, songs = [], currentIndex = 0, project, artist, onClose, onNext, onPrevious }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [showVolumeControl, setShowVolumeControl] = useState(false)
  const [isShuffled, setIsShuffled] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [isRepeating, setIsRepeating] = useState(false)
  const audioRef = useRef(null)
  const [dominantColor, setDominantColor] = useState('#8b5cf6')

  useEffect(() => {
    if (song?.audio_file && audioRef.current) {
      audioRef.current.src = song.audio_file
      audioRef.current.load()
      
      const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration)
      }

      const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime)
      }

      const handleEnded = () => {
        if (isRepeating) {
          // Repeat current song
          audioRef.current.currentTime = 0
          audioRef.current.play()
        } else if (isLooping && songs.length > 0 && onNext) {
          // Loop to next song
          onNext()
        } else if (songs.length > 0 && currentIndex < songs.length - 1 && onNext) {
          // Auto-play next song
          onNext()
        } else {
          setIsPlaying(false)
          setCurrentTime(0)
        }
      }

      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata)
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate)
      audioRef.current.addEventListener('ended', handleEnded)

      // Extract dominant color from cover image
      if (song?.cover_image || project?.cover_image) {
        extractColor(song?.cover_image || project?.cover_image)
      }

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata)
          audioRef.current.removeEventListener('timeupdate', handleTimeUpdate)
          audioRef.current.removeEventListener('ended', handleEnded)
        }
      }
    }
  }, [song, project, isRepeating, isLooping, songs.length, currentIndex, onNext])

  function extractColor(imageUrl) {
    // In a real implementation, you'd use a library like vibrant.js or colorthief
    // to extract dominant colors from the image
    // For now, we'll use a default gradient
    setDominantColor('#8b5cf6')
  }

  function togglePlayPause() {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  function handleSeek(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = x / rect.width
    const newTime = percentage * duration

    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  function handleVolumeChange(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(1, x / rect.width))
    const newVolume = percentage

    if (audioRef.current) {
      audioRef.current.volume = newVolume
      setVolume(newVolume)
      setIsMuted(newVolume === 0)
    }
  }

  function toggleMute() {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume || 0.5
        setIsMuted(false)
      } else {
        audioRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: `${song.title} by ${artist?.name}`,
        text: `Listen to ${song.title}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  function handleDownload() {
    if (song.audio_file) {
      const link = document.createElement('a')
      link.href = song.audio_file
      link.download = `${song.title}.mp3`
      link.click()
    }
  }

  function handlePrevious() {
    if (songs.length > 0 && onPrevious) {
      onPrevious()
    }
  }

  function handleNext() {
    if (songs.length > 0 && onNext) {
      onNext()
    }
  }

  function toggleShuffle() {
    setIsShuffled(!isShuffled)
  }

  function toggleLoop() {
    setIsLooping(!isLooping)
    setIsRepeating(false)
  }

  function toggleRepeat() {
    setIsRepeating(!isRepeating)
    setIsLooping(false)
  }

  if (!song) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50"
      >
        <div
          className="bg-gradient-to-r from-purple-900 via-black to-purple-900 backdrop-blur-xl border-t border-white/10"
          style={{
            background: `linear-gradient(135deg, ${dominantColor}22 0%, #000 50%, ${dominantColor}22 100%)`,
          }}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              {/* Album Art */}
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 shadow-lg">
                {song.cover_image || project?.cover_image ? (
                  <img
                    src={song.cover_image || project?.cover_image}
                    alt={song.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <span className="text-white text-2xl">🎵</span>
                  </div>
                )}
              </div>

              {/* Song Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-sm truncate">{song.title}</h3>
                {artist && (
                  <p className="text-white/60 text-xs truncate">{artist.name}</p>
                )}
              </div>

              {/* Previous Button */}
              {songs.length > 1 && (
                <button
                  onClick={handlePrevious}
                  className="w-10 h-10 rounded-full hover:bg-white/10 transition-all flex items-center justify-center text-white"
                  title="Previous"
                >
                  <ArrowUturnLeftIcon className="w-5 h-5" />
                </button>
              )}

              {/* Play/Pause Button */}
              <button
                onClick={togglePlayPause}
                className="w-12 h-12 rounded-full bg-white text-black hover:bg-white/90 transition-all flex items-center justify-center flex-shrink-0"
              >
                {isPlaying ? (
                  <PauseIcon className="w-6 h-6" />
                ) : (
                  <PlayIcon className="w-6 h-6 ml-1" />
                )}
              </button>

              {/* Next Button */}
              {songs.length > 1 && (
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full hover:bg-white/10 transition-all flex items-center justify-center text-white"
                  title="Next"
                >
                  <ArrowUturnRightIcon className="w-5 h-5" />
                </button>
              )}

              {/* Shuffle Button */}
              {songs.length > 1 && (
                <button
                  onClick={toggleShuffle}
                  className={`w-10 h-10 rounded-full hover:bg-white/10 transition-all flex items-center justify-center ${
                    isShuffled ? 'text-green-400' : 'text-white/60'
                  }`}
                  title="Shuffle"
                >
                  {isShuffled ? (
                    <ArrowPathIconSolid className="w-5 h-5" />
                  ) : (
                    <ArrowPathIcon className="w-5 h-5" />
                  )}
                </button>
              )}

              {/* Repeat/Loop Buttons */}
              {songs.length > 1 && (
                <>
                  <button
                    onClick={toggleLoop}
                    className={`w-10 h-10 rounded-full hover:bg-white/10 transition-all flex items-center justify-center ${
                      isLooping ? 'text-green-400' : 'text-white/60'
                    }`}
                    title="Loop Playlist"
                  >
                    <ArrowPathIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={toggleRepeat}
                    className={`w-10 h-10 rounded-full hover:bg-white/10 transition-all flex items-center justify-center ${
                      isRepeating ? 'text-green-400' : 'text-white/60'
                    }`}
                    title="Repeat Song"
                  >
                    {isRepeating ? (
                      <ArrowPathIconSolid className="w-5 h-5" />
                    ) : (
                      <ArrowPathIcon className="w-5 h-5" />
                    )}
                  </button>
                </>
              )}

              {/* Progress Bar */}
              <div className="flex-1 min-w-0 hidden md:block">
                <div className="flex items-center gap-2">
                  <span className="text-white/60 text-xs w-12 text-right">
                    {formatTime(currentTime)}
                  </span>
                  <div
                    className="flex-1 h-1 bg-white/20 rounded-full cursor-pointer relative group"
                    onClick={handleSeek}
                  >
                    <div
                      className="h-full bg-white rounded-full transition-all"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                    <div
                      className="absolute top-1/2 left-0 w-3 h-3 bg-white rounded-full -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ left: `${(currentTime / duration) * 100}%`, marginLeft: '-6px' }}
                    />
                  </div>
                  <span className="text-white/60 text-xs w-12">
                    {formatTime(duration)}
                  </span>
                </div>
              </div>

              {/* Volume Control */}
              <div
                className="relative"
                onMouseEnter={() => setShowVolumeControl(true)}
                onMouseLeave={() => setShowVolumeControl(false)}
              >
                <button
                  onClick={toggleMute}
                  className="w-10 h-10 rounded-full hover:bg-white/10 transition-all flex items-center justify-center text-white"
                >
                  {isMuted ? (
                    <SpeakerXMarkIcon className="w-5 h-5" />
                  ) : (
                    <SpeakerWaveIcon className="w-5 h-5" />
                  )}
                </button>
                {showVolumeControl && (
                  <div className="absolute bottom-full right-0 mb-2 w-32 h-8 bg-black/80 backdrop-blur-xl rounded-lg p-2 flex items-center">
                    <div
                      className="flex-1 h-1 bg-white/20 rounded-full cursor-pointer relative"
                      onClick={handleVolumeChange}
                    >
                      <div
                        className="h-full bg-white rounded-full transition-all"
                        style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {song.downloadable && song.audio_file && (
                  <button
                    onClick={handleDownload}
                    className="w-10 h-10 rounded-full hover:bg-white/10 transition-all flex items-center justify-center text-white"
                    title="Download"
                  >
                    <ArrowDownTrayIcon className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={handleShare}
                  className="w-10 h-10 rounded-full hover:bg-white/10 transition-all flex items-center justify-center text-white"
                  title="Share"
                >
                  <ShareIcon className="w-5 h-5" />
                </button>
                {song.spotify_link && (
                  <a
                    href={song.spotify_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full hover:bg-white/10 transition-all flex items-center justify-center text-green-400"
                    title="Open in Spotify"
                  >
                    <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full hover:bg-white/10 transition-all flex items-center justify-center text-white"
                  title="Close"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Mobile Progress Bar */}
            <div className="md:hidden mt-2">
              <div className="flex items-center gap-2">
                <span className="text-white/60 text-xs w-12 text-right">
                  {formatTime(currentTime)}
                </span>
                <div
                  className="flex-1 h-1 bg-white/20 rounded-full cursor-pointer relative"
                  onClick={handleSeek}
                >
                  <div
                    className="h-full bg-white rounded-full transition-all"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
                <span className="text-white/60 text-xs w-12">
                  {formatTime(duration)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden Audio Element */}
        <audio ref={audioRef} />
      </motion.div>
    </AnimatePresence>
  )
}

