# Poke Project - Artist Platform

A proof of concept for an artist platform that puts power back in artists' hands. Built with the philosophy: **"I trust my fans"**.

## Features

### Artist Profiles
- Profile page with photos, bio, and artist information
- Follow/unfollow functionality
- Social media links (Spotify, Apple Music, Instagram, Twitter)
- Photo gallery
- Latest projects showcase
- Full discography view

### Projects
- Rich project pages with:
  - Songs with lyrics
  - Behind-the-scenes photos
  - Documents and files
  - Inspiration summaries
  - Project descriptions
- Spotify/Apple Music link integration
- Download capability for projects and songs
- Share functionality

### Music Player
- Full Spotify-like UI with:
  - Play/pause controls
  - Volume control with mute
  - Progress bar with seek functionality
  - Album artwork display
  - Dynamic gradient backgrounds (based on album art)
  - Download and share buttons
  - External link buttons (Spotify, Apple Music)

## Tech Stack

- **Next.js 14** - React framework
- **Supabase** - Database and file storage
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Heroicons** - Icons

## Setup

### 1. Database Setup

Run the SQL schema in `DATABASE_SCHEMA.sql` in your Supabase SQL editor to create the necessary tables.

### 2. Storage Buckets

Create the following storage buckets in Supabase:

- `artist-photos` (public)
- `project-covers` (public)
- `bts-photos` (public)
- `song-audio` (public or private)
- `documents` (public or private)

### 3. Environment Variables

Ensure your `.env` file has:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Routes

- `/poke-project` - Home page with featured artists and latest projects
- `/poke-project/artist/[slug]` - Artist profile page
- `/poke-project/artist/[slug]/discography` - Full discography view
- `/poke-project/project/[slug]` - Project page with all content

## Philosophy

This platform is built on the principle that artists should:
- Release faster than ever before
- Allow fans to truly OWN the artwork
- Trust their fans
- Connect more deeply with their audience

If someone leaks something, so be it - but we trust our fans.

## Future Enhancements

- Color extraction from images for dynamic gradients
- Playlist functionality
- Comments and community features
- Analytics dashboard for artists
- Multi-format downloads (MP3, FLAC, etc.)
- Video support
- Live streaming integration

