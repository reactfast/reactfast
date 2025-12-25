'use client'

import { useState } from 'react'

export default function MyPlaylists() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-900">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-white mb-8">My Playlists</h1>
        <p className="text-xl text-purple-200">
          Your playlists will appear here. Create a playlist using the account menu!
        </p>
      </div>
    </div>
  )
}

