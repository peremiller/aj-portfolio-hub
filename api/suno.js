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

// Lightweight language classifier (English / Tagalog / Taglish) from title + lyrics.
const TAG_WORDS = new Set(
  ("ang ng mga sa na ay ako ikaw ka mo ko kita siya niya kami tayo kayo sila ito iyan iyon dito doon " +
    "hindi oo wala walang may meron kung kapag dahil kasi pero para naman lang din rin po ho mahal puso " +
    "iyong aking akin yakap ngiti luha gabi araw buhay tahanan sana gusto ayaw alam tao bawat muli tabi " +
    "kamay langit ulan init lamig pangarap damdamin pag-ibig pagmamahal kaibigan nating iyo akoy kayong " +
    "nang habang upang ngunit subalit kaya nga raw daw yata pala isang dalawa hangin tubig apoy bituin " +
    "buwan magpakailanman pusong sariling piling yakapin halik hanggang dulo simula wakas tuwing basta " +
    "talaga sobra ganda maganda pangako tibok damdam kahit anong bakit paano saan sino ano kailan ngayon " +
    "kahapon bukas mundo mundong ligaya lungkot saya takot galit mahalin minahal iniibig kasama sandali " +
    "alaala umiyak ngumiti tumawa lumuha nawala bumalik babalik lamang nanay tatay").split(' ')
)
const ENG_WORDS = new Set(
  ("the and you to a of in is it my me we your with that for on this be will are love heart light way " +
    "day night time stay go come back home life world dream feel hold close eyes hand sky rain fire star " +
    "moon never always forever every soul together when while but so because if know keep find all out up " +
    "down here there now then she he they was were have has had do does make made take give let just like " +
    "said say see want need smile cry tears hope fear").split(' ')
)
function classifyLanguage(title, lyrics) {
  let text = `${title || ''}\n${title || ''}\n${title || ''}\n${lyrics || ''}`
  text = text.replace(/\[[^\]]*\]/g, ' ').replace(/\([^)]*\)/g, ' ').toLowerCase()
  const words = text.match(/[a-z'\-]+/g) || []
  let t = 0
  let e = 0
  for (const w of words) {
    if (TAG_WORDS.has(w)) t++
    else if (ENG_WORDS.has(w)) e++
  }
  if (t + e === 0) return 'English'
  const r = t / (t + e)
  if (r <= 0.1) return 'English'
  if (r >= 0.3) return 'Tagalog'
  return 'Taglish'
}

async function fetchPage(page) {
  const url = `${BASE}?playlists_sort_by=created_at&clips_sort_by=created_at&page=${page}`
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 8000)
  try {
    const res = await fetch(url, { headers: HEADERS, signal: controller.signal, redirect: 'error' })
    if (!res.ok) {
      throw new Error(`Suno upstream returned ${res.status}`)
    }
    return res.json()
  } finally {
    clearTimeout(timer)
  }
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
    language: classifyLanguage(clip.title, meta.prompt),
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
    language: classifyLanguage(pl.name, ''),
    count: pl.num_total_results ?? (Array.isArray(pl.playlist_clips) ? pl.playlist_clips.length : 0),
  }
}

export default async function handler(req, res) {
  if (req.method && req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  try {
    const first = await fetchPage(1)

    const total = first.num_total_clips ?? (Array.isArray(first.clips) ? first.clips.length : 0)
    // Bound the page fan-out so a malformed/huge upstream count can't trigger
    // an unbounded number of outbound requests.
    const pages = Math.min(25, Math.max(1, Math.ceil(total / PAGE_SIZE)))

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
  } catch {
    res.status(502).json({ error: 'Upstream request failed' })
  }
}
