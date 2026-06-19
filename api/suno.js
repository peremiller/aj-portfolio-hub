// Vercel Node serverless function (ESM — package.json has "type":"module").
// Proxies the Suno public profile API and returns data in the same shape as
// src/suno.json so the Music tab can consume it directly. Cached at the edge
// so it refreshes ~hourly (picking up new songs/playlists) without hammering Suno.

const PROFILE = 'millertperez'
const BASE = `https://studio-api.prod.suno.com/api/profiles/${PROFILE}`
const PAGE_SIZE = 20

const HEADERS = {
  'User-Agent': 'Mozilla/5.0',
  Accept: 'application/json',
}

async function fetchPage(page) {
  const url = `${BASE}?playlists_sort_by=created_at&clips_sort_by=created_at&page=${page}`
  const res = await fetch(url, { headers: HEADERS })
  if (!res.ok) {
    throw new Error(`Suno upstream returned ${res.status}`)
  }
  return res.json()
}

function mapSong(clip) {
  const meta = clip.metadata || {}
  return {
    title: clip.title || 'Untitled',
    id: clip.id,
    url: `https://suno.com/song/${clip.id}`,
    image: clip.image_large_url || clip.image_url || '',
    audio: clip.audio_url || '',
    lyrics: meta.prompt || '',
    tags: meta.tags || '',
    plays: clip.play_count ?? 0,
    likes: clip.upvote_count ?? 0,
    duration: meta.duration ?? clip.duration ?? null,
    created: (clip.created_at || '').slice(0, 10),
  }
}

function mapPlaylist(pl) {
  return {
    name: pl.name || 'Untitled',
    id: pl.id,
    url: `https://suno.com/playlist/${pl.id}`,
    image: pl.image_url || '',
    count: pl.num_total_results ?? (Array.isArray(pl.playlist_clips) ? pl.playlist_clips.length : 0),
  }
}

export default async function handler(req, res) {
  try {
    const first = await fetchPage(1)

    const total = first.num_total_clips ?? (Array.isArray(first.clips) ? first.clips.length : 0)
    const pages = Math.max(1, Math.ceil(total / PAGE_SIZE))

    const clips = Array.isArray(first.clips) ? [...first.clips] : []

    // Page 1 already fetched; pull remaining pages.
    for (let p = 2; p <= pages; p++) {
      const data = await fetchPage(p)
      if (Array.isArray(data.clips)) clips.push(...data.clips)
    }

    // De-dup by id, keep order.
    const seen = new Set()
    const songs = []
    for (const clip of clips) {
      if (!clip || !clip.id || seen.has(clip.id)) continue
      seen.add(clip.id)
      songs.push(mapSong(clip))
    }

    const playlists = Array.isArray(first.playlists)
      ? first.playlists.map(mapPlaylist)
      : []

    const out = {
      display_name: first.display_name || 'AJ Miller',
      handle: first.handle || PROFILE,
      avatar: first.avatar_image_url || first.avatar || '',
      total_songs: total || songs.length,
      songs,
      playlists,
    }

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(out)
  } catch (err) {
    res.status(502).json({ error: String((err && err.message) || err) })
  }
}
