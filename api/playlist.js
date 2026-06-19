// Vercel Node serverless function (ESM). Fetches a single Suno playlist's tracks
// on demand so a clicked playlist can populate the in-app player (audio + lyrics).
// Output shape matches the `tracks` arrays in src/suno.json.

const BASE = 'https://studio-api.prod.suno.com/api/playlist'

const HEADERS = {
  'User-Agent': 'Mozilla/5.0',
  Accept: 'application/json',
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

export default async function handler(req, res) {
  try {
    const id = (req.query && req.query.id) || ''
    if (!id || !/^[a-zA-Z0-9-]+$/.test(id)) {
      res.status(400).json({ error: 'missing or invalid id' })
      return
    }
    const r = await fetch(`${BASE}/${id}?page=1`, { headers: HEADERS })
    if (!r.ok) throw new Error(`Suno upstream returned ${r.status}`)
    const data = await r.json()
    const raw = Array.isArray(data.playlist_clips) ? data.playlist_clips : []
    const seen = new Set()
    const tracks = []
    for (const pc of raw) {
      const clip = (pc && pc.clip) || pc
      if (!clip || !clip.id || seen.has(clip.id)) continue
      seen.add(clip.id)
      tracks.push(mapSong(clip))
    }
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json({
      id,
      name: data.name || '',
      url: `https://suno.com/playlist/${id}`,
      count: data.song_count ?? tracks.length,
      tracks,
    })
  } catch (err) {
    res.status(502).json({ error: String((err && err.message) || err) })
  }
}
