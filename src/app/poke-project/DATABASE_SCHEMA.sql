-- Poke Project Database Schema
-- This schema defines the tables needed for the artist platform

-- Artists Table
CREATE TABLE IF NOT EXISTS artists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE,
  name TEXT NOT NULL,
  bio TEXT,
  profile_image TEXT,
  photos JSONB DEFAULT '[]'::jsonb, -- Array of photo URLs
  birthdate DATE,
  location TEXT,
  spotify_link TEXT,
  apple_music_link TEXT,
  instagram_link TEXT,
  twitter_link TEXT,
  followers_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id UUID REFERENCES artists(id) ON DELETE CASCADE,
  slug TEXT UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  summary TEXT,
  inspiration TEXT,
  cover_image TEXT,
  release_date DATE,
  bts_photos JSONB DEFAULT '[]'::jsonb, -- Array of BTS photo URLs
  documents JSONB DEFAULT '[]'::jsonb, -- Array of {name, url, description}
  spotify_link TEXT,
  apple_music_link TEXT,
  downloadable BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Songs Table
CREATE TABLE IF NOT EXISTS songs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  track_number INTEGER,
  duration TEXT, -- Format: "3:45"
  audio_file TEXT, -- URL to audio file
  cover_image TEXT,
  lyrics TEXT,
  spotify_link TEXT,
  apple_music_link TEXT,
  downloadable BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Follows Table (for tracking user follows)
CREATE TABLE IF NOT EXISTS follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  artist_id UUID REFERENCES artists(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, artist_id)
);

-- Playlists Table
CREATE TABLE IF NOT EXISTS playlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  cover_image TEXT,
  is_public BOOLEAN DEFAULT false,
  song_ids JSONB DEFAULT '[]'::jsonb, -- Array of song IDs
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Playlist Songs Junction Table (for better querying)
CREATE TABLE IF NOT EXISTS playlist_songs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  playlist_id UUID REFERENCES playlists(id) ON DELETE CASCADE,
  song_id UUID REFERENCES songs(id) ON DELETE CASCADE,
  position INTEGER DEFAULT 0, -- Order of songs in playlist
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(playlist_id, song_id)
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_artist_id ON projects(artist_id);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_artists_slug ON artists(slug);
CREATE INDEX IF NOT EXISTS idx_songs_project_id ON songs(project_id);
CREATE INDEX IF NOT EXISTS idx_follows_user_id ON follows(user_id);
CREATE INDEX IF NOT EXISTS idx_follows_artist_id ON follows(artist_id);
CREATE INDEX IF NOT EXISTS idx_playlists_user_id ON playlists(user_id);
CREATE INDEX IF NOT EXISTS idx_playlist_songs_playlist_id ON playlist_songs(playlist_id);
CREATE INDEX IF NOT EXISTS idx_playlist_songs_song_id ON playlist_songs(song_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at
CREATE TRIGGER update_artists_updated_at BEFORE UPDATE ON artists
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_songs_updated_at BEFORE UPDATE ON songs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_playlists_updated_at BEFORE UPDATE ON playlists
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
-- Enable RLS on all tables
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE playlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE playlist_songs ENABLE ROW LEVEL SECURITY;

-- Policies: Allow public read access to artists, projects, and songs
CREATE POLICY "Public read access for artists" ON artists
  FOR SELECT USING (true);

CREATE POLICY "Public read access for projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Public read access for songs" ON songs
  FOR SELECT USING (true);

-- Policies: Allow authenticated users to insert/update their own data
CREATE POLICY "Artists can insert their own data" ON artists
  FOR INSERT WITH CHECK (auth.uid() = id OR auth.role() = 'service_role');

CREATE POLICY "Artists can update their own data" ON artists
  FOR UPDATE USING (auth.uid() = id OR auth.role() = 'service_role');

-- Policies: Allow artists to create projects
CREATE POLICY "Artists can create projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = artist_id OR auth.role() = 'service_role');

CREATE POLICY "Artists can update their own projects" ON projects
  FOR UPDATE USING (auth.uid() = artist_id OR auth.role() = 'service_role');

-- Policies: Allow artists to create songs for their projects
CREATE POLICY "Artists can create songs" ON songs
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = songs.project_id 
      AND projects.artist_id = auth.uid()
    ) OR auth.role() = 'service_role'
  );

CREATE POLICY "Artists can update their own songs" ON songs
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = songs.project_id 
      AND projects.artist_id = auth.uid()
    ) OR auth.role() = 'service_role'
  );

-- Policies: Allow users to follow/unfollow artists
CREATE POLICY "Users can manage their own follows" ON follows
  FOR ALL USING (auth.uid() = user_id OR auth.role() = 'service_role');

-- Policies: Allow users to manage their own playlists
CREATE POLICY "Users can read public playlists" ON playlists
  FOR SELECT USING (is_public = true OR auth.uid() = user_id OR auth.role() = 'service_role');

CREATE POLICY "Users can create their own playlists" ON playlists
  FOR INSERT WITH CHECK (auth.uid() = user_id OR auth.role() = 'service_role');

CREATE POLICY "Users can update their own playlists" ON playlists
  FOR UPDATE USING (auth.uid() = user_id OR auth.role() = 'service_role');

CREATE POLICY "Users can delete their own playlists" ON playlists
  FOR DELETE USING (auth.uid() = user_id OR auth.role() = 'service_role');

-- Policies: Allow users to manage playlist songs
CREATE POLICY "Users can read playlist songs from accessible playlists" ON playlist_songs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM playlists 
      WHERE playlists.id = playlist_songs.playlist_id 
      AND (playlists.is_public = true OR playlists.user_id = auth.uid())
    ) OR auth.role() = 'service_role'
  );

CREATE POLICY "Users can add songs to their own playlists" ON playlist_songs
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM playlists 
      WHERE playlists.id = playlist_songs.playlist_id 
      AND playlists.user_id = auth.uid()
    ) OR auth.role() = 'service_role'
  );

CREATE POLICY "Users can remove songs from their own playlists" ON playlist_songs
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM playlists 
      WHERE playlists.id = playlist_songs.playlist_id 
      AND playlists.user_id = auth.uid()
    ) OR auth.role() = 'service_role'
  );

-- Storage buckets for file uploads
-- Note: These need to be created in Supabase Storage, not via SQL
-- Buckets needed:
-- - 'artist-photos' (public)
-- - 'project-covers' (public)
-- - 'bts-photos' (public)
-- - 'song-audio' (public or private, depending on your needs)
-- - 'documents' (public or private)

