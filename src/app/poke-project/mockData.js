// Mock data for development/demo purposes
// This allows the UI to work without database setup

export const mockArtists = [
  {
    id: '1',
    slug: 'luna-moon',
    name: 'Luna Moon',
    bio: 'Indie pop artist creating dreamy soundscapes and emotional ballads. Based in Los Angeles, California.',
    profile_image: null,
    photos: [
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400',
    ],
    birthdate: '1995-03-15',
    location: 'Los Angeles, CA',
    spotify_link: 'https://open.spotify.com/artist/example',
    apple_music_link: 'https://music.apple.com/artist/example',
    instagram_link: 'https://instagram.com/lunamoon',
    twitter_link: 'https://twitter.com/lunamoon',
    followers_count: 12500,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    slug: 'midnight-vibes',
    name: 'Midnight Vibes',
    bio: 'Electronic music producer pushing boundaries of sound and rhythm.',
    profile_image: null,
    photos: [],
    birthdate: '1992-07-22',
    location: 'Brooklyn, NY',
    spotify_link: 'https://open.spotify.com/artist/example2',
    apple_music_link: null,
    instagram_link: 'https://instagram.com/midnightvibes',
    twitter_link: null,
    followers_count: 8900,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    slug: 'acoustic-dreams',
    name: 'Acoustic Dreams',
    bio: 'Singer-songwriter with a passion for storytelling through music.',
    profile_image: null,
    photos: [],
    birthdate: '1998-11-05',
    location: 'Nashville, TN',
    spotify_link: null,
    apple_music_link: 'https://music.apple.com/artist/example3',
    instagram_link: null,
    twitter_link: 'https://twitter.com/acousticdreams',
    followers_count: 5600,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    slug: 'neon-nights',
    name: 'Neon Nights',
    bio: 'Synthwave duo bringing retro vibes to modern music.',
    profile_image: null,
    photos: [],
    birthdate: null,
    location: 'Miami, FL',
    spotify_link: 'https://open.spotify.com/artist/example4',
    apple_music_link: null,
    instagram_link: null,
    twitter_link: null,
    followers_count: 3200,
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    slug: 'jazz-cat',
    name: 'Jazz Cat',
    bio: 'Smooth jazz saxophonist with a modern twist.',
    profile_image: null,
    photos: [],
    birthdate: '1989-01-18',
    location: 'New Orleans, LA',
    spotify_link: null,
    apple_music_link: null,
    instagram_link: 'https://instagram.com/jazzcat',
    twitter_link: 'https://twitter.com/jazzcat',
    followers_count: 15000,
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    slug: 'rock-rebel',
    name: 'Rock Rebel',
    bio: 'High-energy rock band with a message.',
    profile_image: null,
    photos: [],
    birthdate: null,
    location: 'Seattle, WA',
    spotify_link: 'https://open.spotify.com/artist/example6',
    apple_music_link: 'https://music.apple.com/artist/example6',
    instagram_link: 'https://instagram.com/rockrebel',
    twitter_link: 'https://twitter.com/rockrebel',
    followers_count: 21000,
    created_at: new Date().toISOString(),
  },
]

export const mockProjects = [
  {
    id: '1',
    artist_id: '1',
    slug: 'midnight-serenade',
    title: 'Midnight Serenade',
    description: 'A collection of dreamy ballads perfect for late-night listening. Each track tells a story of love, loss, and hope.',
    summary: 'Midnight Serenade is my most personal work yet. Written during late nights in my home studio, these songs capture the raw emotions of the past year.',
    inspiration: 'Inspired by the quiet moments between dusk and dawn, when the world is still and thoughts run deep. Each song is a letter to someone I\'ve loved, lost, or longed for.',
    cover_image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800',
    release_date: '2024-01-15',
    bts_photos: [
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400',
    ],
    documents: [
      {
        name: 'Album Credits',
        url: '#',
        description: 'Full list of credits and collaborators',
      },
      {
        name: 'Lyrics Booklet',
        url: '#',
        description: 'Complete lyrics for all tracks',
      },
    ],
    spotify_link: 'https://open.spotify.com/album/example',
    apple_music_link: 'https://music.apple.com/album/example',
    downloadable: true,
    created_at: new Date('2024-01-15').toISOString(),
    artist: mockArtists[0],
  },
  {
    id: '2',
    artist_id: '2',
    slug: 'electric-dreams',
    title: 'Electric Dreams',
    description: 'An electronic journey through soundscapes and beats.',
    summary: 'My exploration into the world of electronic music, blending ambient textures with driving rhythms.',
    inspiration: 'Inspired by late-night drives through the city, watching the lights blur past.',
    cover_image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800',
    release_date: '2024-02-20',
    bts_photos: [
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400',
    ],
    documents: [],
    spotify_link: 'https://open.spotify.com/album/example2',
    apple_music_link: null,
    downloadable: true,
    created_at: new Date('2024-02-20').toISOString(),
    artist: mockArtists[1],
  },
  {
    id: '3',
    artist_id: '1',
    slug: 'summer-nights',
    title: 'Summer Nights',
    description: 'Upbeat pop anthems for those warm summer evenings.',
    summary: 'A celebration of youth, freedom, and those perfect summer moments.',
    inspiration: null,
    cover_image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800',
    release_date: '2023-06-10',
    bts_photos: [],
    documents: [
      {
        name: 'Production Notes',
        url: '#',
        description: 'Behind the scenes production details',
      },
    ],
    spotify_link: 'https://open.spotify.com/album/example3',
    apple_music_link: 'https://music.apple.com/album/example3',
    downloadable: true,
    created_at: new Date('2023-06-10').toISOString(),
    artist: mockArtists[0],
  },
  {
    id: '4',
    artist_id: '3',
    slug: 'acoustic-sessions',
    title: 'Acoustic Sessions',
    description: 'Intimate acoustic performances recorded live.',
    summary: 'Raw, unfiltered performances captured in a single take.',
    inspiration: 'The beauty of imperfection and the power of a single voice with a guitar.',
    cover_image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    release_date: '2024-03-05',
    bts_photos: [
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400',
    ],
    documents: [],
    spotify_link: null,
    apple_music_link: 'https://music.apple.com/album/example4',
    downloadable: true,
    created_at: new Date('2024-03-05').toISOString(),
    artist: mockArtists[2],
  },
]

export const mockSongs = {
  '1': [
    {
      id: '1-1',
      project_id: '1',
      title: 'Midnight Serenade',
      track_number: 1,
      duration: '4:32',
      audio_file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      cover_image: null,
      lyrics: `Midnight serenade
Whispers in the dark
Your voice echoes through my heart
Midnight serenade
Where do we begin?
When the night falls in

Every word you say
Takes my breath away
In this midnight serenade`,
      spotify_link: 'https://open.spotify.com/track/example1',
      apple_music_link: 'https://music.apple.com/song/example1',
      downloadable: true,
      created_at: new Date().toISOString(),
    },
    {
      id: '1-2',
      project_id: '1',
      title: 'Starlight Dreams',
      track_number: 2,
      duration: '3:45',
      audio_file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      cover_image: null,
      lyrics: `Under starlight dreams
We dance in the moonlight
Nothing's as it seems
When you're by my side

Starlight dreams
Take me away
To a place where we can stay`,
      spotify_link: 'https://open.spotify.com/track/example2',
      apple_music_link: null,
      downloadable: true,
      created_at: new Date().toISOString(),
    },
    {
      id: '1-3',
      project_id: '1',
      title: 'Echoes of You',
      track_number: 3,
      duration: '5:12',
      audio_file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      cover_image: null,
      lyrics: `Echoes of you
Still ringing in my ears
Memories so true
Through all these years

I hear your voice
In every sound
Echoes of you
All around`,
      spotify_link: null,
      apple_music_link: 'https://music.apple.com/song/example3',
      downloadable: true,
      created_at: new Date().toISOString(),
    },
  ],
  '2': [
    {
      id: '2-1',
      project_id: '2',
      title: 'Electric Pulse',
      track_number: 1,
      duration: '4:15',
      audio_file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      cover_image: null,
      lyrics: null,
      spotify_link: 'https://open.spotify.com/track/example4',
      apple_music_link: null,
      downloadable: true,
      created_at: new Date().toISOString(),
    },
    {
      id: '2-2',
      project_id: '2',
      title: 'Digital Waves',
      track_number: 2,
      duration: '3:58',
      audio_file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
      cover_image: null,
      lyrics: null,
      spotify_link: null,
      apple_music_link: null,
      downloadable: true,
      created_at: new Date().toISOString(),
    },
  ],
  '3': [
    {
      id: '3-1',
      project_id: '3',
      title: 'Summer Breeze',
      track_number: 1,
      duration: '3:20',
      audio_file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
      cover_image: null,
      lyrics: `Summer breeze
Blowing through my hair
Nothing can compare
To this feeling in the air`,
      spotify_link: 'https://open.spotify.com/track/example6',
      apple_music_link: 'https://music.apple.com/song/example6',
      downloadable: true,
      created_at: new Date().toISOString(),
    },
  ],
  '4': [
    {
      id: '4-1',
      project_id: '4',
      title: 'Acoustic Morning',
      track_number: 1,
      duration: '4:05',
      audio_file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
      cover_image: null,
      lyrics: `Morning light
Filters through the window
Acoustic sounds
Soft and mellow`,
      spotify_link: null,
      apple_music_link: null,
      downloadable: true,
      created_at: new Date().toISOString(),
    },
  ],
}

