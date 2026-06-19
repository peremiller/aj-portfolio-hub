// Vercel Node serverless function (ESM). Fetches a single Suno playlist's tracks
// on demand so a clicked playlist can populate the in-app player (audio + lyrics).
// Output shape matches the `tracks` arrays in src/suno.json.

const BASE = 'https://studio-api.prod.suno.com/api/playlist'

const HEADERS = {
  'User-Agent': 'Mozilla/5.0',
  Accept: 'application/json',
}

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

export default async function handler(req, res) {
  if (req.method && req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  try {
    const id = (req.query && req.query.id) || ''
    if (!id || id.length > 64 || !/^[a-zA-Z0-9-]+$/.test(id)) {
      res.status(400).json({ error: 'missing or invalid id' })
      return
    }
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 8000)
    let data
    try {
      const r = await fetch(`${BASE}/${id}?page=1`, { headers: HEADERS, signal: controller.signal, redirect: 'error' })
      if (!r.ok) throw new Error(`Suno upstream returned ${r.status}`)
      data = await r.json()
    } finally {
      clearTimeout(timer)
    }
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
    const langs = [...new Set(tracks.map((tr) => tr.language))]
    const language = langs.length === 0 ? classifyLanguage(data.name, '') : langs.length === 1 ? langs[0] : 'Taglish'
    res.status(200).json({
      id,
      name: data.name || '',
      url: `https://suno.com/playlist/${id}`,
      language,
      count: data.song_count ?? tracks.length,
      tracks,
    })
  } catch {
    res.status(502).json({ error: 'Upstream request failed' })
  }
}
