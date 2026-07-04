// Vercel Node serverless function (ESM — package.json has "type":"module").
// OPEN page-view tracker. Records each page load using Vercel's geo request
// headers, storing ONLY coarse city/country + rounded lat/lng — never IPs or
// anything personal. Persists a single fixed blob analytics/stats.json
// (read-modify-write; fine for low traffic). If no Blob store is connected
// (no BLOB_READ_WRITE_TOKEN) the endpoint is a dormant 204 no-op. Every failure
// path still returns 204 so the client is never errored.

import { put, head } from '@vercel/blob'
import crypto from 'node:crypto'

const BLOB_PATH = 'analytics/stats.json'
const BOT_RE = /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|headless/i

function parseCookies(header) {
  const out = {}
  if (!header) return out
  for (const part of String(header).split(';')) {
    const idx = part.indexOf('=')
    if (idx === -1) continue
    const k = part.slice(0, idx).trim()
    const v = part.slice(idx + 1).trim()
    if (k) out[k] = v
  }
  return out
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST')
      res.status(405).end()
      return
    }

    // No Blob store connected → dormant no-op.
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      res.status(204).end()
      return
    }

    // Skip obvious bots/crawlers.
    const ua = String((req.headers && req.headers['user-agent']) || '')
    if (BOT_RE.test(ua)) {
      res.status(204).end()
      return
    }

    const h = req.headers || {}
    const country = h['x-vercel-ip-country'] || ''
    const region = h['x-vercel-ip-country-region'] || ''
    let city = ''
    try {
      city = decodeURIComponent(h['x-vercel-ip-city'] || '')
    } catch {
      city = String(h['x-vercel-ip-city'] || '')
    }
    const lat = parseFloat(h['x-vercel-ip-latitude'])
    const lng = parseFloat(h['x-vercel-ip-longitude'])

    // Unique visitor via the hub_v cookie (set only when missing).
    const cookies = parseCookies(h.cookie)
    let visitorId = cookies['hub_v']
    let isNew = false
    if (!visitorId) {
      visitorId = crypto.randomUUID()
      isNew = true
      res.setHeader(
        'Set-Cookie',
        `hub_v=${visitorId}; Path=/; Max-Age=31536000; SameSite=Lax; Secure`
      )
    }

    // Load current stats (or initialise).
    let data
    const init = { total: 0, unique: 0, daily: {}, countries: {}, cities: {}, recent: [] }
    try {
      const meta = await head(BLOB_PATH)
      const r = await fetch(meta.url, { cache: 'no-store' })
      data = await r.json()
    } catch {
      data = init
    }
    // Defensive: ensure all shapes exist.
    data.total = data.total || 0
    data.unique = data.unique || 0
    data.daily = data.daily || {}
    data.countries = data.countries || {}
    data.cities = data.cities || {}
    data.recent = Array.isArray(data.recent) ? data.recent : []

    const nowIso = new Date().toISOString()
    const day = nowIso.slice(0, 10) // YYYY-MM-DD (UTC)

    data.total += 1
    if (isNew) data.unique += 1
    data.daily[day] = (data.daily[day] || 0) + 1
    if (country) data.countries[country] = (data.countries[country] || 0) + 1

    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      const key = `${lat.toFixed(1)},${lng.toFixed(1)}`
      const prev = data.cities[key]
      data.cities[key] = {
        city,
        country,
        region,
        lat,
        lng,
        count: (prev && prev.count ? prev.count : 0) + 1,
        last: nowIso,
      }
    }

    data.recent.unshift({ city, country, ts: nowIso })
    if (data.recent.length > 40) data.recent.length = 40

    // Cap daily to the 180 most-recent days.
    const days = Object.keys(data.daily).sort()
    if (days.length > 180) {
      const keep = new Set(days.slice(days.length - 180))
      const trimmed = {}
      for (const d of keep) trimmed[d] = data.daily[d]
      data.daily = trimmed
    }

    // Cap to the top 1000 cities by count.
    const cityEntries = Object.entries(data.cities)
    if (cityEntries.length > 1000) {
      cityEntries.sort((a, b) => (b[1].count || 0) - (a[1].count || 0))
      const trimmed = {}
      for (const [k, v] of cityEntries.slice(0, 1000)) trimmed[k] = v
      data.cities = trimmed
    }

    await put(BLOB_PATH, JSON.stringify(data), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true,
    })

    res.status(204).end()
  } catch {
    // Never error the client.
    try {
      res.status(204).end()
    } catch {
      /* ignore */
    }
  }
}
